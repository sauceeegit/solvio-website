<?php
defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

global $wpdb;
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}nudge_campaign_recipients" );
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}nudge_campaigns" );
$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}nudge_suppressions" );
delete_option( 'nudge_version' );
delete_option( 'nudge_claude_api_key' );
