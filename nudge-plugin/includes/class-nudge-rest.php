<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Rest {

    public static function init(): void {
        add_action( 'rest_api_init', [ __CLASS__, 'register_routes' ] );
    }

    public static function register_routes(): void {
        $ns = 'nudge/v1';
        register_rest_route( $ns, '/preview',  [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'preview'       ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/send',     [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'send'          ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/history',  [ 'methods' => 'GET',  'callback' => [ __CLASS__, 'history'       ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/settings', [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'save_settings' ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
    }

    public static function check_permission(): bool {
        return current_user_can( 'manage_woocommerce' );
    }

    public static function preview( WP_REST_Request $req ): WP_REST_Response {
        $prompt = sanitize_text_field( $req->get_param( 'prompt' ) ?? '' );
        if ( strlen( $prompt ) < 5 ) {
            return new WP_REST_Response( [ 'error' => 'Prompt too short.' ], 400 );
        }

        $intent      = Nudge_Audience::parse_intent( $prompt );
        $audience    = array_values( Nudge_Audience::resolve( $intent ) );
        $email       = Nudge_Generator::generate( $prompt, $intent, $audience );
        $campaign_id = Nudge_Campaign::create( [
            'prompt'    => $prompt,
            'subject'   => $email['subject'],
            'body_html' => $email['body_html'],
            'audience'  => $intent,
        ] );

        return new WP_REST_Response( [
            'campaign_id'     => $campaign_id,
            'subject'         => $email['subject'],
            'preview_text'    => $email['preview_text'] ?? '',
            'body_html'       => $email['body_html'],
            'recipient_count' => count( $audience ),
            'audience_label'  => self::audience_label( $intent ),
            'recipients'      => array_slice( $audience, 0, 500 ),
        ] );
    }

    public static function send( WP_REST_Request $req ): WP_REST_Response {
        $campaign_id = (int) $req->get_param( 'campaign_id' );
        $subject     = sanitize_text_field( $req->get_param( 'subject' ) ?? '' );
        $campaign    = Nudge_Campaign::get( $campaign_id );

        if ( ! $campaign ) {
            return new WP_REST_Response( [ 'error' => 'Campaign not found.' ], 404 );
        }
        if ( $campaign['status'] !== 'draft' ) {
            return new WP_REST_Response( [ 'error' => 'Campaign already sent or in progress.' ], 409 );
        }

        if ( $subject && $subject !== $campaign['subject'] ) {
            global $wpdb;
            $wpdb->update(
                $wpdb->prefix . 'nudge_campaigns',
                [ 'subject' => $subject ],
                [ 'id' => $campaign_id ],
                [ '%s' ], [ '%d' ]
            );
        }

        $audience = array_values( Nudge_Audience::resolve( $campaign['audience'] ) );
        if ( empty( $audience ) ) {
            return new WP_REST_Response( [ 'error' => 'No eligible recipients found.' ], 400 );
        }

        Nudge_Campaign::save_recipients( $campaign_id, $audience );
        Nudge_Campaign::update_status( $campaign_id, 'queued' );
        Nudge_Scheduler::queue_campaign( $campaign_id );

        return new WP_REST_Response( [
            'queued'          => true,
            'recipient_count' => count( $audience ),
        ] );
    }

    public static function history(): WP_REST_Response {
        return new WP_REST_Response( Nudge_Campaign::get_recent( 20 ) );
    }

    public static function save_settings( WP_REST_Request $req ): WP_REST_Response {
        $key = sanitize_text_field( $req->get_param( 'claude_api_key' ) ?? '' );
        update_option( 'nudge_claude_api_key', $key );
        return new WP_REST_Response( [ 'saved' => true ] );
    }

    private static function audience_label( array $intent ): string {
        $segment = $intent['segment'] ?? 'all';
        $days    = (int) ( $intent['days'] ?? 0 );
        return match ( $segment ) {
            'lapsed'     => "customers inactive {$days}+ days",
            'recent'     => "customers who ordered in the last {$days} days",
            'first_time' => 'first-time buyers',
            default      => 'all customers',
        };
    }
}
