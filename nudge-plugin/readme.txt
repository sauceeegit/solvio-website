=== Nudge ===
Contributors: nudge
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 1.0.0
Requires PHP: 8.0
License: GPL-2.0-or-later
WC requires at least: 7.0
WC tested up to: 9.0

Turn one sentence into a ready-to-send WooCommerce email campaign.

== Description ==
Nudge lets you describe an email campaign in plain English. It interprets your
intent, finds the right customers in WooCommerce, generates a personalised email,
and queues it for delivery — all from a single compose box inside WooCommerce.

== Installation ==
1. Upload the `nudge` folder to `/wp-content/plugins/`
2. Activate the plugin via WP Admin → Plugins
3. Go to WooCommerce → Nudge
4. Enter your Claude API key (get one at console.anthropic.com)
5. Describe your first campaign and hit "Create campaign"

== Frequently Asked Questions ==

= Do I need a Claude API key? =
Yes. Nudge uses Claude Haiku to parse your intent and generate the email copy.
Without a key it falls back to a basic template but audience detection won't work.

= Does it work with HPOS (High Performance Order Storage)? =
Yes — full HPOS compatibility is declared.

= How does sending work? =
Emails are queued in batches of 20 using Action Scheduler (if WooCommerce is
version 7+) or wp_schedule_single_event as a fallback. Recipients are resolved
fresh at send time so no stale data is sent.

= Can I plug in a different mail provider? =
Yes — hook `nudge_mailer` and return a class implementing `Nudge_Mailer_Interface`.

= How does unsubscribe work? =
Each email contains a signed unsubscribe link. When clicked it nonce-verifies
the request and adds the email to the suppressions table. Third-party consent
plugins can also hook `nudge_recipient_is_eligible`.

== Changelog ==
= 1.0.0 =
* Initial release
