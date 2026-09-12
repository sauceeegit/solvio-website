<?php
/**
 * Plugin Name: Nudge
 * Plugin URI:  https://github.com/SUPERMAGIC1111/nudge
 * Description: Turn one sentence into a ready-to-send WooCommerce email campaign.
 * Version:     1.0.0
 * Author:      Nudge
 * License:     GPL-2.0-or-later
 * Text Domain: nudge
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * WC requires at least: 7.0
 * WC tested up to: 9.0
 */

defined( 'ABSPATH' ) || exit;

define( 'NUDGE_VERSION', '1.0.0' );
define( 'NUDGE_FILE',    __FILE__ );
define( 'NUDGE_DIR',     plugin_dir_path( __FILE__ ) );
define( 'NUDGE_URL',     plugin_dir_url( __FILE__ ) );

// Declare HPOS compatibility.
add_action( 'before_woocommerce_init', function () {
    if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility(
            'custom_order_tables',
            __FILE__,
            true
        );
    }
} );

register_activation_hook( __FILE__, [ 'Nudge_Install', 'activate' ] );

add_action( 'plugins_loaded', function () {
    if ( ! class_exists( 'WooCommerce' ) ) {
        add_action( 'admin_notices', function () {
            echo '<div class="notice notice-error"><p><strong>Nudge</strong> requires WooCommerce to be active.</p></div>';
        } );
        return;
    }
    require_once NUDGE_DIR . 'includes/class-nudge-install.php';
    require_once NUDGE_DIR . 'includes/class-nudge-suppression.php';
    require_once NUDGE_DIR . 'includes/class-nudge-campaign.php';
    require_once NUDGE_DIR . 'includes/class-nudge-audience.php';
    require_once NUDGE_DIR . 'includes/class-nudge-generator.php';
    require_once NUDGE_DIR . 'includes/class-nudge-mailer.php';
    require_once NUDGE_DIR . 'includes/class-nudge-scheduler.php';
    require_once NUDGE_DIR . 'includes/class-nudge-rest.php';
    require_once NUDGE_DIR . 'includes/class-nudge-admin.php';
    Nudge_Rest::init();
    Nudge_Admin::init();
    Nudge_Scheduler::init();
} );
