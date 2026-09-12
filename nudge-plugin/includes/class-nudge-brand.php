<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Brand {

    private const OPTION = 'nudge_brand_settings';

    public static function defaults(): array {
        return [
            'logo_url'          => '',
            'primary_color'     => '#111111',
            'accent_color'      => '#111111',
            'bg_color'          => '#ffffff',
            'text_color'        => '#1a1a1a',
            'cta_bg_color'      => '#111111',
            'cta_text_color'    => '#ffffff',
            'cta_border_radius' => '4px',
            'heading_font'      => 'system',
            'body_font'         => 'system',
            'footer_company'    => '',
            'footer_address'    => '',
            'active_template'   => 'minimal',
        ];
    }

    public static function get(): array {
        $stored = get_option( self::OPTION, [] );
        return array_merge( self::defaults(), is_array( $stored ) ? $stored : [] );
    }

    public static function save( array $settings ): void {
        $allowed = array_keys( self::defaults() );
        $clean   = self::get();
        foreach ( $allowed as $key ) {
            if ( ! array_key_exists( $key, $settings ) ) continue;
            $clean[ $key ] = ( $key === 'logo_url' )
                ? esc_url_raw( $settings[ $key ] )
                : sanitize_text_field( $settings[ $key ] );
        }
        update_option( self::OPTION, $clean );
    }
}
