<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Install {

    public static function activate(): void {
        self::create_tables();
        add_option( 'nudge_version', NUDGE_VERSION );
    }

    public static function create_tables(): void {
        global $wpdb;
        $charset = $wpdb->get_charset_collate();
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        dbDelta( "
            CREATE TABLE {$wpdb->prefix}nudge_suppressions (
                id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                email         VARCHAR(200)    NOT NULL,
                suppressed_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY email (email)
            ) $charset;
        " );

        dbDelta( "
            CREATE TABLE {$wpdb->prefix}nudge_campaigns (
                id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                prompt      TEXT            NOT NULL,
                subject     VARCHAR(250)    NOT NULL,
                body_html   LONGTEXT        NOT NULL,
                audience    TEXT            NOT NULL,
                status      VARCHAR(20)     NOT NULL DEFAULT 'draft',
                created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
                sent_at     DATETIME        NULL,
                PRIMARY KEY (id)
            ) $charset;
        " );

        dbDelta( "
            CREATE TABLE {$wpdb->prefix}nudge_campaign_recipients (
                id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                campaign_id BIGINT UNSIGNED NOT NULL,
                customer_id BIGINT UNSIGNED NULL,
                email       VARCHAR(200)    NOT NULL,
                name        VARCHAR(200)    NOT NULL DEFAULT '',
                status      VARCHAR(20)     NOT NULL DEFAULT 'pending',
                sent_at     DATETIME        NULL,
                PRIMARY KEY (id),
                KEY campaign_id (campaign_id),
                KEY status (status)
            ) $charset;
        " );
    }
}
