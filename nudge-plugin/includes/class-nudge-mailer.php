<?php
defined( 'ABSPATH' ) || exit;

interface Nudge_Mailer_Interface {
    public function send( string $to, string $name, string $subject, string $html ): bool;
    public function readiness_check(): array; // ['ok' => bool, 'message' => string]
}

class Nudge_WP_Mailer implements Nudge_Mailer_Interface {

    public function send( string $to, string $name, string $subject, string $html ): bool {
        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo( 'name' ) . ' <' . get_option( 'admin_email' ) . '>',
        ];
        add_filter( 'wp_mail_content_type', static fn() => 'text/html' );
        $result = wp_mail( $to, $subject, $html, $headers );
        remove_all_filters( 'wp_mail_content_type' );
        return $result;
    }

    public function readiness_check(): array {
        return [ 'ok' => true, 'message' => 'Using wp_mail.' ];
    }
}

class Nudge_Mailer {

    private static ?Nudge_Mailer_Interface $instance = null;

    public static function get(): Nudge_Mailer_Interface {
        if ( self::$instance === null ) {
            // Hook nudge_mailer to swap in Brevo, Postmark, SES, etc.
            self::$instance = apply_filters( 'nudge_mailer', new Nudge_WP_Mailer() );
        }
        return self::$instance;
    }
}
