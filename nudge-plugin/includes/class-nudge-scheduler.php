<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Scheduler {

    private const BATCH = 20;
    private const HOOK  = 'nudge_process_batch';

    public static function init(): void {
        add_action( self::HOOK, [ __CLASS__, 'process_batch' ] );
    }

    public static function queue_campaign( int $campaign_id ): void {
        if ( function_exists( 'as_schedule_single_action' ) ) {
            as_schedule_single_action( time() + 5, self::HOOK, [ $campaign_id ], 'nudge' );
        } else {
            wp_schedule_single_event( time() + 5, self::HOOK, [ $campaign_id ] );
        }
    }

    public static function process_batch( int $campaign_id ): void {
        $campaign = Nudge_Campaign::get( $campaign_id );
        if ( ! $campaign || $campaign['status'] === 'sent' ) return;

        Nudge_Campaign::update_status( $campaign_id, 'sending' );
        $mailer = Nudge_Mailer::get();
        $sent   = 0;

        while ( $sent < self::BATCH ) {
            $r = Nudge_Campaign::get_pending_recipient( $campaign_id );
            if ( ! $r ) break;
            $html = self::personalise( $campaign['body_html'], $r );
            $mailer->send( $r['email'], $r['name'], $campaign['subject'], $html );
            Nudge_Campaign::mark_recipient_sent( (int) $r['id'] );
            $sent++;
        }

        if ( Nudge_Campaign::get_pending_recipient( $campaign_id ) ) {
            self::queue_campaign( $campaign_id );
        } else {
            Nudge_Campaign::update_status( $campaign_id, 'sent' );
        }
    }

    private static function personalise( string $html, array $r ): string {
        $unsub = add_query_arg( [
            'nudge_unsubscribe' => 1,
            'email'             => rawurlencode( $r['email'] ),
            '_nonce'            => wp_create_nonce( 'nudge_unsub_' . $r['email'] ),
        ], home_url( '/' ) );

        return str_replace(
            [ '{{customer_name}}', '{{shop_url}}', '{{unsubscribe_url}}' ],
            [
                esc_html( $r['name'] ?: 'there' ),
                esc_url( home_url( '/' ) ),
                esc_url( $unsub ),
            ],
            $html
        );
    }
}
