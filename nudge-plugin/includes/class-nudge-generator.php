<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Generator {

    /**
     * Generate structured campaign content JSON from a merchant prompt.
     *
     * Returns an array with keys: subject, preview_text, headline, body (array),
     * cta_label, cta_url_intent, offer (array|null).
     */
    public static function generate_campaign_content( string $prompt, array $intent, array $audience ): array {
        $api_key = get_option( 'nudge_claude_api_key', '' );
        $shop    = get_bloginfo( 'name' );
        $count   = count( $audience );

        if ( ! $api_key ) {
            return self::fallback_content( $shop );
        }

        $tone    = $intent['tone'] ?? 'casual';
        $segment = $intent['segment'] ?? 'all';
        $days    = (int) ( $intent['days'] ?? 0 );

        $audience_desc = match ( $segment ) {
            'lapsed'     => "customers inactive for {$days}+ days",
            'recent'     => "customers who ordered in the last {$days} days",
            'first_time' => 'first-time buyers',
            default      => 'all customers',
        };

        $system = implode( "\n", [
            "You are an expert email copywriter for a WooCommerce store called \"{$shop}\".",
            "Audience: {$count} {$audience_desc}.",
            "Merchant intent: {$prompt}",
            "Tone: {$tone}.",
            '',
            'Return ONLY a valid JSON object with these exact keys (no extra keys, no markdown fences):',
            '{',
            '  "subject": "Short email subject line (max 60 chars)",',
            '  "preview_text": "Email preview snippet (max 90 chars)",',
            '  "headline": "Main email headline (max 12 words)",',
            '  "body": ["Paragraph 1 text.", "Paragraph 2 text (optional, can omit)."],',
            '  "cta_label": "Button label (max 4 words)",',
            '  "cta_url_intent": "shop|sale|category|home",',
            '  "offer": null',
            '}',
            '',
            'If a discount/offer is mentioned, set offer to: {"type":"percentage|fixed|freeShipping","value":NUMBER_OR_0,"code":"COUPONCODE_OR_EMPTY"}',
            'Body array must have 1-3 paragraphs. Start body[0] with "Hi {{customer_name}},".',
            'Never hardcode URLs. Never include HTML tags in values.',
        ] );

        $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', [
            'timeout' => 30,
            'headers' => [
                'x-api-key'         => $api_key,
                'anthropic-version' => '2023-06-01',
                'content-type'      => 'application/json',
            ],
            'body' => wp_json_encode( [
                'model'      => 'claude-haiku-4-5-20251001',
                'max_tokens' => 1024,
                'system'     => $system,
                'messages'   => [ [ 'role' => 'user', 'content' => 'Generate the email content JSON now.' ] ],
            ] ),
        ] );

        if ( is_wp_error( $response ) ) {
            return self::fallback_content( $shop );
        }

        $body    = json_decode( wp_remote_retrieve_body( $response ), true );
        $text    = $body['content'][0]['text'] ?? '{}';
        $text    = preg_replace( '/^```json\s*/i', '', trim( $text ) );
        $text    = preg_replace( '/\s*```$/', '', $text );
        $content = json_decode( $text, true );

        if ( ! is_array( $content ) || empty( $content['subject'] ) ) {
            return self::fallback_content( $shop );
        }

        return self::sanitize_content( $content );
    }

    /**
     * Refine existing content based on a plain-English instruction.
     */
    public static function refine_content( array $current_content, string $instruction, string $shop ): array {
        $api_key = get_option( 'nudge_claude_api_key', '' );
        if ( ! $api_key ) {
            return $current_content;
        }

        $current_json = wp_json_encode( $current_content );

        $system = implode( "\n", [
            "You are an expert email copywriter for a WooCommerce store called \"{$shop}\".",
            'You will receive current email content as JSON and an instruction to modify it.',
            'Apply the instruction and return the updated JSON only (no markdown fences, no extra keys).',
            'Preserve the same structure: subject, preview_text, headline, body (array), cta_label, cta_url_intent, offer.',
            'Never add HTML tags. Keep {{customer_name}} placeholder in body[0] if present.',
        ] );

        $message = "Current content:\n{$current_json}\n\nInstruction: {$instruction}";

        $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', [
            'timeout' => 30,
            'headers' => [
                'x-api-key'         => $api_key,
                'anthropic-version' => '2023-06-01',
                'content-type'      => 'application/json',
            ],
            'body' => wp_json_encode( [
                'model'      => 'claude-haiku-4-5-20251001',
                'max_tokens' => 1024,
                'system'     => $system,
                'messages'   => [ [ 'role' => 'user', 'content' => $message ] ],
            ] ),
        ] );

        if ( is_wp_error( $response ) ) {
            return $current_content;
        }

        $body    = json_decode( wp_remote_retrieve_body( $response ), true );
        $text    = $body['content'][0]['text'] ?? '{}';
        $text    = preg_replace( '/^```json\s*/i', '', trim( $text ) );
        $text    = preg_replace( '/\s*```$/', '', $text );
        $refined = json_decode( $text, true );

        if ( ! is_array( $refined ) || empty( $refined['subject'] ) ) {
            return $current_content;
        }

        return self::sanitize_content( $refined );
    }

    /* ── Private ──────────────────────────────────────────────────── */

    private static function sanitize_content( array $c ): array {
        $out = [
            'subject'       => sanitize_text_field( $c['subject'] ?? '' ),
            'preview_text'  => sanitize_text_field( $c['preview_text'] ?? '' ),
            'headline'      => sanitize_text_field( $c['headline'] ?? '' ),
            'body'          => [],
            'cta_label'     => sanitize_text_field( $c['cta_label'] ?? 'Shop Now' ),
            'cta_url_intent'=> sanitize_text_field( $c['cta_url_intent'] ?? 'shop' ),
            'offer'         => null,
        ];
        foreach ( (array) ( $c['body'] ?? [] ) as $para ) {
            $out['body'][] = sanitize_textarea_field( $para );
        }
        if ( is_array( $c['offer'] ?? null ) ) {
            $out['offer'] = [
                'type'  => sanitize_text_field( $c['offer']['type'] ?? '' ),
                'value' => (int) ( $c['offer']['value'] ?? 0 ),
                'code'  => strtoupper( sanitize_text_field( $c['offer']['code'] ?? '' ) ),
            ];
        }
        return $out;
    }

    private static function fallback_content( string $shop ): array {
        return [
            'subject'        => "A message from {$shop}",
            'preview_text'   => 'We wanted to reach out.',
            'headline'       => 'We have something for you',
            'body'           => [
                'Hi {{customer_name}}, thanks for being a customer.',
                'We'd love to have you back. Visit us to see what's new.',
            ],
            'cta_label'      => 'Shop Now',
            'cta_url_intent' => 'shop',
            'offer'          => null,
        ];
    }
}
