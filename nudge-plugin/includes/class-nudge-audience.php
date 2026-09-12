<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Audience {

    public static function parse_intent( string $prompt ): array {
        $api_key = get_option( 'nudge_claude_api_key', '' );
        if ( ! $api_key ) {
            return self::fallback_intent( $prompt );
        }

        $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', [
            'timeout' => 20,
            'headers' => [
                'x-api-key'         => $api_key,
                'anthropic-version' => '2023-06-01',
                'content-type'      => 'application/json',
            ],
            'body' => wp_json_encode( [
                'model'      => 'claude-haiku-4-5-20251001',
                'max_tokens' => 256,
                'system'     => 'You extract email campaign intent from merchant prompts. Return JSON only: {"segment":"all"|"recent"|"lapsed"|"first_time","days":null|integer,"tone":"casual"|"formal"|"urgent","type":"winback"|"promo"|"transactional"|"welcome"}',
                'messages'   => [ [ 'role' => 'user', 'content' => $prompt ] ],
            ] ),
        ] );

        if ( is_wp_error( $response ) ) {
            return self::fallback_intent( $prompt );
        }

        $body   = json_decode( wp_remote_retrieve_body( $response ), true );
        $text   = $body['content'][0]['text'] ?? '{}';
        $intent = json_decode( trim( $text ), true );
        return is_array( $intent ) ? $intent : self::fallback_intent( $prompt );
    }

    public static function resolve( array $intent ): array {
        $segment = $intent['segment'] ?? 'all';
        $days    = (int) ( $intent['days'] ?? 90 );

        return match ( $segment ) {
            'lapsed'     => self::query_lapsed( $days ),
            'recent'     => self::query_recent( $days ?: 30 ),
            'first_time' => self::query_first_time(),
            default      => self::query_all(),
        };
    }

    private static function query_all(): array {
        return self::build_customer_list( wc_get_orders( [
            'status' => [ 'wc-completed', 'wc-processing' ],
            'limit'  => 500,
            'return' => 'objects',
        ] ) );
    }

    private static function query_recent( int $days ): array {
        return self::build_customer_list( wc_get_orders( [
            'status'     => [ 'wc-completed', 'wc-processing' ],
            'limit'      => 500,
            'date_after' => date( 'Y-m-d', strtotime( "-{$days} days" ) ),
            'return'     => 'objects',
        ] ) );
    }

    private static function query_lapsed( int $days ): array {
        $cutoff        = date( 'Y-m-d', strtotime( "-{$days} days" ) );
        $all           = self::build_customer_list( wc_get_orders( [
            'status'      => [ 'wc-completed', 'wc-processing' ],
            'limit'       => 1000,
            'date_before' => $cutoff,
            'return'      => 'objects',
        ] ) );
        $recent_emails = array_column( self::query_recent( $days ), 'email' );
        return array_values( array_filter(
            $all,
            fn( $c ) => ! in_array( $c['email'], $recent_emails, true )
        ) );
    }

    private static function query_first_time(): array {
        $all    = self::build_customer_list( wc_get_orders( [
            'status' => [ 'wc-completed', 'wc-processing' ],
            'limit'  => 1000,
            'return' => 'objects',
        ] ) );
        $counts = [];
        foreach ( $all as $c ) {
            $counts[ $c['email'] ] = ( $counts[ $c['email'] ] ?? 0 ) + 1;
        }
        $seen = $result = [];
        foreach ( $all as $c ) {
            if ( $counts[ $c['email'] ] === 1 && ! isset( $seen[ $c['email'] ] ) ) {
                $result[]            = $c;
                $seen[ $c['email'] ] = true;
            }
        }
        return $result;
    }

    private static function build_customer_list( array $orders ): array {
        $seen = $list = [];
        foreach ( $orders as $order ) {
            $email = $order->get_billing_email();
            if ( ! $email || isset( $seen[ $email ] ) ) continue;
            if ( Nudge_Suppression::is_suppressed( $email ) ) continue;
            $seen[ $email ] = true;
            $list[] = [
                'id'    => $order->get_customer_id() ?: null,
                'email' => $email,
                'name'  => trim( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ),
            ];
        }
        return array_values( $list );
    }

    private static function fallback_intent( string $prompt ): array {
        $p = strtolower( $prompt );
        if ( str_contains( $p, 'laps' ) || str_contains( $p, 'win' ) || str_contains( $p, 'miss' ) || str_contains( $p, 'inact' ) ) {
            return [ 'segment' => 'lapsed', 'days' => 90, 'tone' => 'casual', 'type' => 'winback' ];
        }
        if ( str_contains( $p, 'first' ) || str_contains( $p, 'new' ) || str_contains( $p, 'welcome' ) ) {
            return [ 'segment' => 'first_time', 'days' => null, 'tone' => 'casual', 'type' => 'welcome' ];
        }
        if ( str_contains( $p, 'thank' ) || str_contains( $p, 'week' ) ) {
            return [ 'segment' => 'recent', 'days' => 7, 'tone' => 'casual', 'type' => 'transactional' ];
        }
        return [ 'segment' => 'all', 'days' => null, 'tone' => 'casual', 'type' => 'promo' ];
    }
}
