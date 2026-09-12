<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Generator {

    public static function generate( string $prompt, array $intent, array $audience ): array {
        $api_key = get_option( 'nudge_claude_api_key', '' );
        $shop    = get_bloginfo( 'name' );
        $count   = count( $audience );

        if ( ! $api_key ) {
            return self::fallback( $shop );
        }

        $system = implode( "\n", [
            "You are an email copywriter for a WooCommerce store called \"{$shop}\".",
            "Write a marketing email for {$count} customers.",
            "Merchant prompt: {$prompt}",
            "Tone: " . ( $intent['tone'] ?? 'casual' ) . ".",
            'Return JSON only: {"subject":"...","preview_text":"...","body_html":"..."}',
            'body_html must be a complete self-contained HTML email with inline styles, max-width 600px, dark header, clear CTA.',
            'Use {{customer_name}}, {{shop_url}}, {{unsubscribe_url}} as placeholders — never hardcode values.',
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
                'max_tokens' => 2048,
                'system'     => $system,
                'messages'   => [ [ 'role' => 'user', 'content' => 'Write the email now.' ] ],
            ] ),
        ] );

        if ( is_wp_error( $response ) ) {
            return self::fallback( $shop );
        }

        $body  = json_decode( wp_remote_retrieve_body( $response ), true );
        $text  = $body['content'][0]['text'] ?? '{}';
        // Strip markdown fences if the model wraps the JSON.
        $text  = preg_replace( '/^```json\s*/i', '', trim( $text ) );
        $text  = preg_replace( '/\s*```$/', '', $text );
        $email = json_decode( $text, true );

        if ( ! is_array( $email ) || empty( $email['subject'] ) ) {
            return self::fallback( $shop );
        }

        return $email;
    }

    private static function fallback( string $shop ): array {
        return [
            'subject'      => "A message from {$shop}",
            'preview_text' => 'We wanted to reach out.',
            'body_html'    => <<<HTML
<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
body{margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.w{max-width:600px;margin:32px auto;background:#fff}
.hd{background:#111;padding:32px 36px;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.02em}
.bd{padding:32px 36px;color:#1a1a1a;font-size:15px;line-height:1.7}
.bd p{margin:0 0 16px}
.cta{display:inline-block;background:#111;color:#fff!important;text-decoration:none;padding:12px 26px;font-weight:600;font-size:14px}
.ft{background:#f9f9f9;padding:16px 36px;font-size:12px;color:#999;border-top:1px solid #eee}
</style>
</head><body>
<div class="w">
  <div class="hd">{$shop}</div>
  <div class="bd">
    <p>Hi {{customer_name}},</p>
    <p>We have something for you. Visit us at <a href="{{shop_url}}" class="cta">{{shop_url}}</a>.</p>
  </div>
  <div class="ft"><a href="{{unsubscribe_url}}">Unsubscribe</a></div>
</div>
</body></html>
HTML,
        ];
    }
}
