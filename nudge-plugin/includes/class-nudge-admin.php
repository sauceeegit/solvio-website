<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Admin {

    public static function init(): void {
        add_action( 'admin_menu',            [ __CLASS__, 'add_menu' ] );
        add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue' ] );
        add_action( 'init',                  [ __CLASS__, 'handle_unsubscribe' ] );
    }

    public static function add_menu(): void {
        add_submenu_page(
            'woocommerce',
            'Nudge',
            'Nudge',
            'manage_woocommerce',
            'nudge',
            [ __CLASS__, 'render' ]
        );
    }

    public static function enqueue( string $hook ): void {
        if ( strpos( $hook, 'nudge' ) === false ) return;
        wp_enqueue_style(  'nudge-admin', NUDGE_URL . 'assets/nudge-admin.css', [], NUDGE_VERSION );
        wp_enqueue_script( 'nudge-admin', NUDGE_URL . 'assets/nudge-admin.js',  [], NUDGE_VERSION, true );
        wp_localize_script( 'nudge-admin', 'NudgeData', [
            'nonce'   => wp_create_nonce( 'wp_rest' ),
            'restUrl' => esc_url_raw( rest_url( 'nudge/v1' ) ),
            'hasKey'  => ! empty( get_option( 'nudge_claude_api_key', '' ) ),
        ] );
    }

    public static function render(): void {
        ?>
        <div id="nudge-app" class="nudge-wrap">

            <!-- Compose -->
            <div id="nudge-compose">
                <div class="nudge-hero">
                    <h1 class="nudge-headline">Tell Nudge what you want.</h1>
                    <p class="nudge-headline-2">It handles the rest.</p>
                    <p class="nudge-sub">Describe the email in plain English. Nudge finds the right customers, writes it, and gets it ready to send.</p>
                </div>

                <div class="nudge-chips-label">Try an example</div>
                <div class="nudge-chips">
                    <button class="nudge-chip" data-prompt="Win back customers who haven't ordered in 3 months. Casual and warm tone.">Win-back for lapsed customers</button>
                    <button class="nudge-chip" data-prompt="Thank everyone who placed an order this week. Personal and heartfelt.">Thank this week's buyers</button>
                    <button class="nudge-chip" data-prompt="Announce a 20% off weekend flash sale. Urgent and exciting tone.">20% off flash sale</button>
                    <button class="nudge-chip" data-prompt="Welcome email for first-time buyers. Friendly introduction to the shop.">Welcome first-time buyers</button>
                </div>

                <textarea id="nudge-prompt" placeholder="e.g. Win back customers who haven't ordered in 3 months. Casual tone."></textarea>

                <div class="nudge-actions">
                    <button id="nudge-generate" class="nudge-btn-primary">Create campaign &rarr;</button>
                    <span id="nudge-loading" hidden>
                        <span class="nudge-spinner"></span> Finding customers&hellip;
                    </span>
                </div>
                <p id="nudge-error" class="nudge-error" hidden></p>
            </div>

            <!-- Preview -->
            <div id="nudge-preview" hidden>
                <div class="nudge-section-title">Preview &amp; Send</div>
                <div class="nudge-field-row">
                    <div class="nudge-field nudge-field-subject">
                        <label class="nudge-label" for="nudge-subject">Subject line</label>
                        <input type="text" id="nudge-subject" class="nudge-input" />
                    </div>
                    <div class="nudge-field">
                        <span class="nudge-label">Recipients</span>
                        <div class="nudge-recipients">
                            <strong id="nudge-count">0</strong> customers
                            <span class="nudge-segment-tag" id="nudge-segment"></span>
                        </div>
                    </div>
                </div>

                <div class="nudge-email-frame">
                    <div class="nudge-frame-bar">
                        <span class="nudge-dot r"></span>
                        <span class="nudge-dot y"></span>
                        <span class="nudge-dot g"></span>
                        <span class="nudge-frame-label">Email preview</span>
                    </div>
                    <iframe id="nudge-iframe" sandbox="allow-same-origin" title="Email preview"></iframe>
                </div>

                <div class="nudge-send-row">
                    <button id="nudge-send" class="nudge-btn-secondary">
                        Send to <span id="nudge-send-count">0</span> customers &uarr;
                    </button>
                    <button id="nudge-reset" class="nudge-btn-text">Start over &rarr;</button>
                    <span id="nudge-send-spinner" class="nudge-spinner" hidden></span>
                </div>
                <p id="nudge-send-error" class="nudge-error" hidden></p>
            </div>

            <!-- Success -->
            <div id="nudge-success" hidden>
                <div class="nudge-success-big">Sent &#10003;</div>
                <p id="nudge-success-msg" class="nudge-success-sub"></p>
                <button id="nudge-another" class="nudge-btn-primary">Send another &rarr;</button>
            </div>

        </div>
        <?php
    }

    public static function handle_unsubscribe(): void {
        if ( ! isset( $_GET['nudge_unsubscribe'], $_GET['email'], $_GET['_nonce'] ) ) return;
        $email = sanitize_email( wp_unslash( $_GET['email'] ) );
        $nonce = sanitize_text_field( wp_unslash( $_GET['_nonce'] ) );
        if ( ! wp_verify_nonce( $nonce, 'nudge_unsub_' . $email ) ) return;
        Nudge_Suppression::suppress( $email );
        wp_die( esc_html__( 'You have been unsubscribed successfully.', 'nudge' ) );
    }
}
