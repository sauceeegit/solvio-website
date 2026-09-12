<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Template_Renderer {

    public static function template_ids(): array {
        return [ 'minimal', 'editorial', 'bold', 'product' ];
    }

    public static function render( string $template_id, array $content, array $brand ): string {
        $fn = [ __CLASS__, 'template_' . $template_id ];
        if ( ! is_callable( $fn ) ) {
            $fn = [ __CLASS__, 'template_minimal' ];
        }
        return call_user_func( $fn, $content, $brand );
    }

    /* ── Helpers ──────────────────────────────────────────────────── */

    private static function font_stack( string $choice ): string {
        return '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';
    }

    private static function esc( string $s ): string {
        return esc_html( $s );
    }

    private static function render_offer_block( ?array $offer, string $accent ): string {
        if ( empty( $offer ) ) return '';
        $type  = $offer['type'] ?? '';
        $value = (int) ( $offer['value'] ?? 0 );
        $code  = strtoupper( sanitize_text_field( $offer['code'] ?? '' ) );

        $label = '';
        if ( $type === 'percentage' && $value > 0 ) $label = "{$value}% OFF";
        elseif ( $type === 'fixed' && $value > 0 )  $label = "฿{$value} OFF";
        elseif ( $type === 'freeShipping' )          $label = 'FREE SHIPPING';
        if ( ! $label ) return '';

        $border  = esc_attr( $accent );
        $display = esc_html( $label );
        $snippet = $code ? '<div style="font-size:13px;color:#888;margin-top:6px">Use code <strong style="font-family:\'Courier New\',monospace;color:#111;background:#f3f3f3;padding:2px 7px;border-radius:3px">' . esc_html( $code ) . '</strong></div>' : '';

        return <<<HTML
<table role="presentation" width="100%" style="margin:20px 0">
  <tr><td style="background:#f9f9f9;border:1px solid #e0e0e0;border-left:4px solid {$border};padding:16px 20px;text-align:center;border-radius:3px">
    <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.1em">Special Offer</div>
    <div style="font-size:30px;font-weight:800;color:#111;letter-spacing:-0.03em;line-height:1.1;margin-top:4px">{$display}</div>
    {$snippet}
  </td></tr>
</table>
HTML;
    }

    private static function render_cta_button( string $label, string $bg, string $text_color, string $radius ): string {
        $bg    = esc_attr( $bg );
        $tc    = esc_attr( $text_color );
        $r     = esc_attr( $radius );
        $label = esc_html( $label );
        return <<<HTML
<table role="presentation" style="margin:24px 0">
  <tr><td style="background:{$bg};border-radius:{$r}">
    <a href="{{shop_url}}" style="display:inline-block;background:{$bg};color:{$tc};text-decoration:none;font-weight:600;font-size:14px;padding:13px 28px;border-radius:{$r}">{$label}</a>
  </td></tr>
</table>
HTML;
    }

    private static function render_footer( array $brand ): string {
        $company = $brand['footer_company'] ? esc_html( $brand['footer_company'] ) . '<br>' : '';
        $address = $brand['footer_address'] ? esc_html( $brand['footer_address'] ) . '<br>' : '';
        return <<<HTML
<table role="presentation" width="100%" style="margin-top:8px">
  <tr><td style="padding:20px 36px;border-top:1px solid #eeeeee;font-size:12px;color:#aaaaaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;line-height:1.6">
    {$company}{$address}
    <a href="{{unsubscribe_url}}" style="color:#aaaaaa;text-decoration:underline">Unsubscribe</a>
  </td></tr>
</table>
HTML;
    }

    private static function body_paragraphs( array $body, string $color, string $font ): string {
        $out = '';
        foreach ( $body as $para ) {
            $p    = esc_html( $para );
            $out .= "<p style=\"margin:0 0 16px;font-size:15px;line-height:1.7;color:{$color};font-family:{$font}\">{$p}</p>";
        }
        return $out;
    }

    /* ── Template: Minimal ────────────────────────────────────────── */

    private static function template_minimal( array $content, array $brand ): string {
        $font      = self::font_stack( $brand['body_font'] );
        $accent    = esc_attr( $brand['accent_color'] );
        $bg        = esc_attr( $brand['bg_color'] );
        $text      = esc_attr( $brand['text_color'] );
        $shop      = esc_html( get_bloginfo( 'name' ) );
        $headline  = esc_html( $content['headline'] ?? '' );
        $bodyHtml  = self::body_paragraphs( $content['body'] ?? [], $text, $font );
        $offer     = self::render_offer_block( $content['offer'] ?? null, $brand['accent_color'] );
        $cta       = self::render_cta_button(
            $content['cta_label'] ?? 'Shop Now',
            $brand['cta_bg_color'],
            $brand['cta_text_color'],
            $brand['cta_border_radius']
        );
        $footer    = self::render_footer( $brand );
        $logoHtml  = $brand['logo_url']
            ? '<img src="' . esc_url( $brand['logo_url'] ) . '" alt="' . $shop . '" style="max-height:36px;max-width:160px;display:block">'
            : '<span style="font-size:15px;font-weight:700;letter-spacing:-0.02em;color:#111">' . $shop . '</span>';

        return <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:{$font}">
<table role="presentation" width="100%" bgcolor="#f5f5f5" style="background:#f5f5f5">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="600" style="max-width:600px;width:100%;background:{$bg}">
      <tr><td style="height:4px;background:{$accent};font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="padding:28px 36px 0 36px">{$logoHtml}</td></tr>
      <tr><td style="padding:28px 36px 8px">
        <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;line-height:1.25;color:#111;letter-spacing:-0.02em;font-family:{$font}">{$headline}</h1>
        {$bodyHtml}
        {$offer}
        {$cta}
      </td></tr>
      <tr><td>{$footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;
    }

    /* ── Template: Editorial ──────────────────────────────────────── */

    private static function template_editorial( array $content, array $brand ): string {
        $font      = self::font_stack( $brand['body_font'] );
        $accent    = esc_attr( $brand['accent_color'] );
        $text      = esc_attr( $brand['text_color'] );
        $shop      = esc_html( get_bloginfo( 'name' ) );
        $headline  = esc_html( $content['headline'] ?? '' );
        $bodyHtml  = self::body_paragraphs( $content['body'] ?? [], $text, $font );
        $offer     = self::render_offer_block( $content['offer'] ?? null, $brand['accent_color'] );
        $cta       = self::render_cta_button(
            $content['cta_label'] ?? 'Shop Now',
            $brand['cta_bg_color'],
            $brand['cta_text_color'],
            $brand['cta_border_radius']
        );
        $footer    = self::render_footer( $brand );

        return <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:{$font}">
<table role="presentation" width="100%" bgcolor="#ffffff">
  <tr><td align="center" style="padding:40px 16px">
    <table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff;border:1px solid #e8e8e8">
      <tr><td style="padding:32px 40px 0">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;color:#aaa;text-transform:uppercase;font-family:{$font}">{$shop}</div>
        <div style="height:1px;background:#111;margin:14px 0 20px"></div>
        <h1 style="margin:0 0 6px;font-size:32px;font-weight:800;line-height:1.15;color:#111;letter-spacing:-0.03em;font-family:{$font}">{$headline}</h1>
        <div style="height:2px;width:40px;background:{$accent};margin:20px 0 24px"></div>
      </td></tr>
      <tr><td style="padding:0 40px 8px">
        {$bodyHtml}
        {$offer}
        {$cta}
      </td></tr>
      <tr><td>{$footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;
    }

    /* ── Template: Bold ───────────────────────────────────────────── */

    private static function template_bold( array $content, array $brand ): string {
        $font      = self::font_stack( $brand['body_font'] );
        $primary   = esc_attr( $brand['primary_color'] );
        $accent    = esc_attr( $brand['accent_color'] );
        $text      = esc_attr( $brand['text_color'] );
        $shop      = esc_html( get_bloginfo( 'name' ) );
        $headline  = esc_html( $content['headline'] ?? '' );
        $bodyHtml  = self::body_paragraphs( $content['body'] ?? [], $text, $font );
        $offer     = self::render_offer_block( $content['offer'] ?? null, $brand['accent_color'] );
        $cta       = self::render_cta_button(
            $content['cta_label'] ?? 'Shop Now',
            $brand['cta_bg_color'],
            $brand['cta_text_color'],
            $brand['cta_border_radius']
        );
        $footer    = self::render_footer( $brand );
        $logoHtml  = $brand['logo_url']
            ? '<img src="' . esc_url( $brand['logo_url'] ) . '" alt="' . $shop . '" style="max-height:32px;max-width:140px;display:block;filter:brightness(0) invert(1)">'
            : '<span style="font-size:18px;font-weight:800;letter-spacing:-0.03em;color:#fff">' . $shop . '</span>';

        return <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:{$font}">
<table role="presentation" width="100%" bgcolor="#f0f0f0" style="background:#f0f0f0">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="600" style="max-width:600px;width:100%;background:#ffffff">
      <tr><td style="background:{$primary};padding:28px 36px">{$logoHtml}</td></tr>
      <tr><td style="background:{$primary};padding:0 36px 36px">
        <h1 style="margin:0;font-size:34px;font-weight:900;line-height:1.15;color:#ffffff;letter-spacing:-0.03em;font-family:{$font}">{$headline}</h1>
      </td></tr>
      <tr><td style="padding:32px 36px 8px">
        {$bodyHtml}
        {$offer}
        {$cta}
      </td></tr>
      <tr><td>{$footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;
    }

    /* ── Template: Product ────────────────────────────────────────── */

    private static function template_product( array $content, array $brand ): string {
        $font      = self::font_stack( $brand['body_font'] );
        $accent    = esc_attr( $brand['accent_color'] );
        $text      = esc_attr( $brand['text_color'] );
        $shop      = esc_html( get_bloginfo( 'name' ) );
        $headline  = esc_html( $content['headline'] ?? '' );
        $offer     = $content['offer'] ?? null;
        $bodyParts = $content['body'] ?? [];
        $footer    = self::render_footer( $brand );
        $logoHtml  = $brand['logo_url']
            ? '<img src="' . esc_url( $brand['logo_url'] ) . '" alt="' . $shop . '" style="max-height:32px;max-width:140px;display:block">'
            : '<span style="font-size:15px;font-weight:700;color:#111">' . $shop . '</span>';

        // Build body with bullet styling if multiple paragraphs
        $bodyHtml = '';
        foreach ( $bodyParts as $i => $para ) {
            $p        = esc_html( $para );
            $bullet   = $i > 0 ? '&#10003; ' : '';
            $bodyHtml .= "<p style=\"margin:0 0 12px;font-size:15px;line-height:1.7;color:{$text};font-family:{$font}\">{$bullet}{$p}</p>";
        }

        $offerHtml = '';
        if ( $offer ) {
            $type  = $offer['type'] ?? '';
            $value = (int) ( $offer['value'] ?? 0 );
            $code  = strtoupper( sanitize_text_field( $offer['code'] ?? '' ) );
            $label = '';
            if ( $type === 'percentage' && $value > 0 ) $label = "{$value}% OFF";
            elseif ( $type === 'fixed' && $value > 0 )  $label = "฿{$value} OFF";
            elseif ( $type === 'freeShipping' )          $label = 'FREE SHIPPING';
            if ( $label ) {
                $codeHtml  = $code ? '<div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:6px">Code: <strong style="font-family:\'Courier New\',monospace;background:rgba(255,255,255,0.15);padding:2px 7px;border-radius:3px;color:#fff">' . esc_html( $code ) . '</strong></div>' : '';
                $offerHtml = <<<HTML
<table role="presentation" width="100%" style="margin:0 0 0 0">
  <tr><td style="background:{$accent};padding:24px 36px;text-align:center">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;color:rgba(255,255,255,0.7);text-transform:uppercase">Exclusive Offer</div>
    <div style="font-size:36px;font-weight:900;color:#fff;letter-spacing:-0.04em;line-height:1;margin-top:4px">{$label}</div>
    {$codeHtml}
  </td></tr>
</table>
HTML;
            }
        }

        $cta = self::render_cta_button(
            $content['cta_label'] ?? 'Shop Now',
            $brand['cta_bg_color'],
            $brand['cta_text_color'],
            $brand['cta_border_radius']
        );

        return <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:{$font}">
<table role="presentation" width="100%" bgcolor="#f5f5f5">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff">
      <tr><td style="padding:24px 36px;border-bottom:1px solid #eeeeee">{$logoHtml}</td></tr>
      {$offerHtml}
      <tr><td style="padding:32px 36px 8px">
        <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;line-height:1.25;color:#111;letter-spacing:-0.02em;font-family:{$font}">{$headline}</h1>
        {$bodyHtml}
        {$cta}
      </td></tr>
      <tr><td>{$footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;
    }
}
