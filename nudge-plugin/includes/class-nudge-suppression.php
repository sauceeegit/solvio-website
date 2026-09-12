<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Suppression {

    public static function is_suppressed( string $email ): bool {
        global $wpdb;
        $email = strtolower( trim( $email ) );

        $in_db = (bool) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT id FROM {$wpdb->prefix}nudge_suppressions WHERE email = %s LIMIT 1",
                $email
            )
        );

        if ( $in_db ) return true;

        // Allow third-party consent plugins to mark a recipient ineligible.
        $eligible = apply_filters( 'nudge_recipient_is_eligible', true, $email );
        return ! $eligible;
    }

    public static function suppress( string $email ): void {
        global $wpdb;
        $wpdb->replace(
            $wpdb->prefix . 'nudge_suppressions',
            [ 'email' => strtolower( trim( $email ) ) ],
            [ '%s' ]
        );
    }
}
