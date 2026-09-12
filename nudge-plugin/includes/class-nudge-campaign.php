<?php
defined( 'ABSPATH' ) || exit;

class Nudge_Campaign {

    public static function create( array $data ): int {
        global $wpdb;
        $wpdb->insert(
            $wpdb->prefix . 'nudge_campaigns',
            [
                'prompt'    => $data['prompt'],
                'subject'   => $data['subject'],
                'body_html' => $data['body_html'],
                'audience'  => wp_json_encode( $data['audience'] ?? [] ),
                'status'    => 'draft',
            ],
            [ '%s', '%s', '%s', '%s', '%s' ]
        );
        return (int) $wpdb->insert_id;
    }

    public static function get( int $id ): ?array {
        global $wpdb;
        $row = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}nudge_campaigns WHERE id = %d",
                $id
            ),
            ARRAY_A
        );
        if ( ! $row ) return null;
        $row['audience'] = json_decode( $row['audience'], true ) ?? [];
        return $row;
    }

    public static function update_status( int $id, string $status ): void {
        global $wpdb;
        $update = [ 'status' => $status ];
        if ( $status === 'sent' ) {
            $update['sent_at'] = current_time( 'mysql' );
        }
        $wpdb->update(
            $wpdb->prefix . 'nudge_campaigns',
            $update,
            [ 'id' => $id ],
            array_fill( 0, count( $update ), '%s' ),
            [ '%d' ]
        );
    }

    public static function save_recipients( int $campaign_id, array $recipients ): void {
        global $wpdb;
        foreach ( $recipients as $r ) {
            $wpdb->insert(
                $wpdb->prefix . 'nudge_campaign_recipients',
                [
                    'campaign_id' => $campaign_id,
                    'customer_id' => $r['id'] ?? null,
                    'email'       => $r['email'],
                    'name'        => $r['name'] ?? '',
                    'status'      => 'pending',
                ],
                [ '%d', '%d', '%s', '%s', '%s' ]
            );
        }
    }

    public static function get_pending_recipient( int $campaign_id ): ?array {
        global $wpdb;
        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}nudge_campaign_recipients
                 WHERE campaign_id = %d AND status = 'pending' LIMIT 1",
                $campaign_id
            ),
            ARRAY_A
        );
    }

    public static function mark_recipient_sent( int $recipient_id ): void {
        global $wpdb;
        $wpdb->update(
            $wpdb->prefix . 'nudge_campaign_recipients',
            [ 'status' => 'sent', 'sent_at' => current_time( 'mysql' ) ],
            [ 'id' => $recipient_id ],
            [ '%s', '%s' ],
            [ '%d' ]
        );
    }

    public static function get_recent( int $limit = 20 ): array {
        global $wpdb;
        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT c.*,
                    (SELECT COUNT(*) FROM {$wpdb->prefix}nudge_campaign_recipients r
                     WHERE r.campaign_id = c.id) AS total,
                    (SELECT COUNT(*) FROM {$wpdb->prefix}nudge_campaign_recipients r
                     WHERE r.campaign_id = c.id AND r.status = 'sent') AS sent_count
                 FROM {$wpdb->prefix}nudge_campaigns c
                 ORDER BY c.created_at DESC
                 LIMIT %d",
                $limit
            ),
            ARRAY_A
        );
    }
}
