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
        register_rest_route( $ns, '/refine',   [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'refine'        ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/template', [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'switch_template'], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/history',  [ 'methods' => 'GET',  'callback' => [ __CLASS__, 'history'       ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/settings', [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'save_settings' ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/brand',    [ 'methods' => 'GET',  'callback' => [ __CLASS__, 'get_brand'     ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
        register_rest_route( $ns, '/brand',    [ 'methods' => 'POST', 'callback' => [ __CLASS__, 'save_brand'    ], 'permission_callback' => [ __CLASS__, 'check_permission' ] ] );
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
        $brand       = Nudge_Brand::get();
        $template_id = $brand['active_template'] ?? 'minimal';

        $content     = Nudge_Generator::generate_campaign_content( $prompt, $intent, $audience );
        $body_html   = Nudge_Template_Renderer::render( $template_id, $content, $brand );

        $campaign_id = Nudge_Campaign::create( [
            'prompt'       => $prompt,
            'subject'      => $content['subject'],
            'body_html'    => $body_html,
            'content_json' => $content,
            'template_id'  => $template_id,
            'audience'     => $intent,
        ] );

        return new WP_REST_Response( [
            'campaign_id'     => $campaign_id,
            'subject'         => $content['subject'],
            'preview_text'    => $content['preview_text'] ?? '',
            'content_json'    => $content,
            'body_html'       => $body_html,
            'template_id'     => $template_id,
            'recipient_count' => count( $audience ),
            'audience_label'  => self::audience_label( $intent ),
        ] );
    }

    public static function refine( WP_REST_Request $req ): WP_REST_Response {
        $campaign_id = (int) $req->get_param( 'campaign_id' );
        $instruction = sanitize_text_field( $req->get_param( 'instruction' ) ?? '' );

        if ( ! $campaign_id || strlen( $instruction ) < 3 ) {
            return new WP_REST_Response( [ 'error' => 'Missing campaign_id or instruction.' ], 400 );
        }

        $campaign = Nudge_Campaign::get( $campaign_id );
        if ( ! $campaign ) {
            return new WP_REST_Response( [ 'error' => 'Campaign not found.' ], 404 );
        }

        $current_content = $campaign['content_json'] ?? [];
        $shop            = get_bloginfo( 'name' );
        $brand           = Nudge_Brand::get();
        $template_id     = $campaign['template_id'] ?? $brand['active_template'] ?? 'minimal';

        $refined_content = Nudge_Generator::refine_content( $current_content, $instruction, $shop );
        $body_html       = Nudge_Template_Renderer::render( $template_id, $refined_content, $brand );

        Nudge_Campaign::update_content( $campaign_id, $refined_content, $body_html, $template_id );

        return new WP_REST_Response( [
            'content_json' => $refined_content,
            'body_html'    => $body_html,
            'subject'      => $refined_content['subject'],
        ] );
    }

    public static function switch_template( WP_REST_Request $req ): WP_REST_Response {
        $campaign_id = (int) $req->get_param( 'campaign_id' );
        $template_id = sanitize_text_field( $req->get_param( 'template_id' ) ?? '' );

        if ( ! in_array( $template_id, Nudge_Template_Renderer::template_ids(), true ) ) {
            return new WP_REST_Response( [ 'error' => 'Invalid template_id.' ], 400 );
        }

        $campaign = Nudge_Campaign::get( $campaign_id );
        if ( ! $campaign ) {
            return new WP_REST_Response( [ 'error' => 'Campaign not found.' ], 404 );
        }

        $brand     = Nudge_Brand::get();
        $content   = $campaign['content_json'] ?? [];
        $body_html = Nudge_Template_Renderer::render( $template_id, $content, $brand );

        Nudge_Campaign::update_content( $campaign_id, $content, $body_html, $template_id );

        return new WP_REST_Response( [
            'body_html'   => $body_html,
            'template_id' => $template_id,
        ] );
    }

    public static function send( WP_REST_Request $req ): WP_REST_Response {
        $campaign_id  = (int) $req->get_param( 'campaign_id' );
        $subject      = sanitize_text_field( $req->get_param( 'subject' ) ?? '' );
        $content_json = $req->get_param( 'content_json' );
        $template_id  = sanitize_text_field( $req->get_param( 'template_id' ) ?? '' );
        $campaign     = Nudge_Campaign::get( $campaign_id );

        if ( ! $campaign ) {
            return new WP_REST_Response( [ 'error' => 'Campaign not found.' ], 404 );
        }
        if ( $campaign['status'] !== 'draft' ) {
            return new WP_REST_Response( [ 'error' => 'Campaign already sent or in progress.' ], 409 );
        }

        // If the client sent updated content or a template change, re-render before sending.
        if ( is_array( $content_json ) && ! empty( $content_json ) ) {
            $brand       = Nudge_Brand::get();
            $use_tpl     = $template_id ?: ( $campaign['template_id'] ?? 'minimal' );
            $body_html   = Nudge_Template_Renderer::render( $use_tpl, $content_json, $brand );
            Nudge_Campaign::update_content( $campaign_id, $content_json, $body_html, $use_tpl );
        } elseif ( $template_id && $template_id !== $campaign['template_id'] ) {
            $brand       = Nudge_Brand::get();
            $content     = $campaign['content_json'] ?? [];
            $body_html   = Nudge_Template_Renderer::render( $template_id, $content, $brand );
            Nudge_Campaign::update_content( $campaign_id, $content, $body_html, $template_id );
        }

        // Subject update.
        if ( $subject ) {
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

    public static function get_brand(): WP_REST_Response {
        return new WP_REST_Response( Nudge_Brand::get() );
    }

    public static function save_brand( WP_REST_Request $req ): WP_REST_Response {
        Nudge_Brand::save( (array) $req->get_params() );
        return new WP_REST_Response( [ 'saved' => true, 'brand' => Nudge_Brand::get() ] );
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
