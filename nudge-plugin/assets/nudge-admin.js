/* global NudgeData */
( function () {
    'use strict';

    /* ── state ────────────────────────────────────────────────── */
    let campaignId     = null;
    let recipientCount = 0;
    let contentJson    = null;
    let activeTemplate = 'minimal';

    /* ── elements ─────────────────────────────────────────────── */
    const compose      = document.getElementById( 'nudge-compose' );
    const preview      = document.getElementById( 'nudge-preview' );
    const success      = document.getElementById( 'nudge-success' );

    const promptEl     = document.getElementById( 'nudge-prompt' );
    const generateBtn  = document.getElementById( 'nudge-generate' );
    const loading      = document.getElementById( 'nudge-loading' );
    const errorEl      = document.getElementById( 'nudge-error' );

    const subjectEl    = document.getElementById( 'nudge-subject' );
    const countEl      = document.getElementById( 'nudge-count' );
    const segmentEl    = document.getElementById( 'nudge-segment' );
    const emailPreview = document.getElementById( 'nudge-email-preview' );
    const sendBtn      = document.getElementById( 'nudge-send' );
    const sendCount    = document.getElementById( 'nudge-send-count' );
    const resetBtn     = document.getElementById( 'nudge-reset' );
    const sendSpinner  = document.getElementById( 'nudge-send-spinner' );
    const sendError    = document.getElementById( 'nudge-send-error' );

    const refineInput  = document.getElementById( 'nudge-refine-input' );
    const refineBtn    = document.getElementById( 'nudge-refine-btn' );
    const refineLoad   = document.getElementById( 'nudge-refine-loading' );
    const refineError  = document.getElementById( 'nudge-refine-error' );
    const tplBar       = document.getElementById( 'nudge-tpl-bar' );

    const anotherBtn   = document.getElementById( 'nudge-another' );
    const successMsg   = document.getElementById( 'nudge-success-msg' );

    /* ── helpers ──────────────────────────────────────────────── */
    function apiFetch( path, method, body ) {
        var opts = {
            method : method,
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce'  : NudgeData.nonce,
            },
        };
        if ( body ) opts.body = JSON.stringify( body );
        return fetch( NudgeData.restUrl + path, opts ).then( function ( r ) {
            return r.json().then( function ( data ) {
                if ( ! r.ok ) throw new Error( data.error || data.message || 'Request failed (' + r.status + ')' );
                return data;
            } );
        } );
    }

    function show( el )  { if ( el ) el.hidden = false; }
    function hide( el )  { if ( el ) el.hidden = true; }
    function showError( el, msg ) { if ( el ) { el.textContent = msg; show( el ); } }
    function clearError( el )     { if ( el ) { el.textContent = ''; hide( el ); } }
    function esc( s )   { var d = document.createElement( 'div' ); d.textContent = s; return d.innerHTML; }

    function setGenerating( on ) {
        generateBtn.disabled = on;
        on ? show( loading ) : hide( loading );
        on ? hide( generateBtn ) : show( generateBtn );
    }

    function setSending( on ) {
        sendBtn.disabled = on;
        on ? show( sendSpinner ) : hide( sendSpinner );
    }

    function setRefining( on ) {
        refineBtn.disabled = on;
        on ? show( refineLoad ) : hide( refineLoad );
    }

    /* ── Compose chips ────────────────────────────────────────── */
    document.querySelectorAll( '#nudge-compose .nudge-chip' ).forEach( function ( chip ) {
        chip.addEventListener( 'click', function () {
            promptEl.value = chip.dataset.prompt || '';
            promptEl.focus();
        } );
    } );

    /* ── Template bar ─────────────────────────────────────────── */
    if ( tplBar ) {
        tplBar.addEventListener( 'click', function ( e ) {
            var btn = e.target.closest( '.nudge-tpl-btn' );
            if ( ! btn || ! campaignId ) return;
            var tpl = btn.dataset.template;
            if ( tpl === activeTemplate ) return;
            tplBar.querySelectorAll( '.nudge-tpl-btn' ).forEach( function ( b ) { b.classList.remove( 'active' ); } );
            btn.classList.add( 'active' );
            activeTemplate = tpl;
            renderEmailPreview();
        } );
    }

    /* ── Refine chips ─────────────────────────────────────────── */
    document.querySelectorAll( '.nudge-refine-chips .nudge-chip' ).forEach( function ( chip ) {
        chip.addEventListener( 'click', function () {
            refineInput.value = chip.dataset.refine || '';
            refineInput.focus();
            triggerRefine();
        } );
    } );

    /* ── Refine button ────────────────────────────────────────── */
    if ( refineBtn ) {
        refineBtn.addEventListener( 'click', triggerRefine );
    }

    function triggerRefine() {
        var instruction = refineInput ? refineInput.value.trim() : '';
        if ( ! instruction || ! campaignId ) return;
        clearError( refineError );
        setRefining( true );

        apiFetch( '/refine', 'POST', { campaign_id: campaignId, instruction: instruction } )
            .then( function ( data ) {
                contentJson       = data.content_json;
                subjectEl.value   = data.subject || subjectEl.value;
                if ( refineInput ) refineInput.value = '';
                renderEmailPreview();
            } )
            .catch( function ( err ) {
                showError( refineError, err.message || 'Refine failed. Please try again.' );
            } )
            .finally( function () {
                setRefining( false );
            } );
    }

    /* ── Client-side template rendering ──────────────────────── */
    function renderEmailPreview() {
        if ( ! contentJson || ! emailPreview ) return;
        var brand   = NudgeData.brand || {};
        var shop    = NudgeData.shopName || '';
        var html    = '';

        switch ( activeTemplate ) {
            case 'editorial': html = tplEditorial( contentJson, brand, shop ); break;
            case 'bold':      html = tplBold( contentJson, brand, shop );      break;
            case 'product':   html = tplProduct( contentJson, brand, shop );   break;
            default:          html = tplMinimal( contentJson, brand, shop );   break;
        }

        emailPreview.innerHTML = html;
        makeEditable();
    }

    function makeEditable() {
        if ( ! emailPreview ) return;
        emailPreview.querySelectorAll( '[data-editable]' ).forEach( function ( el ) {
            el.setAttribute( 'contenteditable', 'true' );
            el.setAttribute( 'spellcheck', 'true' );
            el.style.outline = 'none';
            el.style.cursor  = 'text';
        } );
    }

    function collectEdits() {
        if ( ! emailPreview || ! contentJson ) return contentJson;
        var copy = JSON.parse( JSON.stringify( contentJson ) );
        var h    = emailPreview.querySelector( '[data-editable="headline"]' );
        if ( h ) copy.headline = h.innerText.trim();
        var cta  = emailPreview.querySelector( '[data-editable="cta"]' );
        if ( cta ) copy.cta_label = cta.innerText.trim();
        var paras = emailPreview.querySelectorAll( '[data-editable="body"]' );
        if ( paras.length ) {
            copy.body = Array.from( paras ).map( function ( p ) { return p.innerText.trim(); } );
        }
        return copy;
    }

    /* ── Template builders ────────────────────────────────────── */

    function offerBlock( offer, accent ) {
        if ( ! offer ) return '';
        var label = '';
        if ( offer.type === 'percentage' && offer.value ) label = offer.value + '% OFF';
        else if ( offer.type === 'fixed' && offer.value ) label = '฿' + offer.value + ' OFF';
        else if ( offer.type === 'freeShipping' ) label = 'FREE SHIPPING';
        if ( ! label ) return '';
        var code = offer.code
            ? '<div style="font-size:12px;color:#888;margin-top:6px">Use code <strong style="font-family:monospace;background:#f3f3f3;padding:2px 7px;border-radius:3px;color:#111">' + esc( offer.code ) + '</strong></div>'
            : '';
        return '<div style="background:#f9f9f9;border:1px solid #e0e0e0;border-left:4px solid ' + esc( accent ) + ';padding:14px 18px;margin:18px 0;text-align:center;border-radius:3px">'
            + '<div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.1em">Special Offer</div>'
            + '<div style="font-size:28px;font-weight:800;color:#111;letter-spacing:-0.03em;margin-top:3px">' + esc( label ) + '</div>'
            + code
            + '</div>';
    }

    function ctaBtn( label, bg, tc, radius ) {
        return '<a data-editable="cta" href="#" style="display:inline-block;background:' + esc( bg ) + ';color:' + esc( tc ) + ';text-decoration:none;font-weight:600;font-size:14px;padding:12px 26px;border-radius:' + esc( radius ) + ';margin:18px 0;cursor:text">' + esc( label ) + '</a>';
    }

    function bodyParas( body, color ) {
        return ( body || [] ).map( function ( p, i ) {
            return '<p data-editable="body" style="margin:0 0 14px;font-size:15px;line-height:1.7;color:' + esc( color ) + ';cursor:text">' + esc( p ) + '</p>';
        } ).join( '' );
    }

    function shopLogo( brand, shop, lightBg ) {
        if ( brand.logo_url ) {
            var filter = lightBg ? '' : 'filter:brightness(0) invert(1);';
            return '<img src="' + esc( brand.logo_url ) + '" alt="' + esc( shop ) + '" style="max-height:34px;max-width:150px;display:block;' + filter + '">';
        }
        var color = lightBg ? '#111' : '#fff';
        return '<span style="font-size:15px;font-weight:700;color:' + color + '">' + esc( shop ) + '</span>';
    }

    function tplMinimal( c, b, shop ) {
        var font   = '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';
        var accent = b.accent_color || '#111';
        var text   = b.text_color   || '#1a1a1a';
        var bg     = b.bg_color     || '#fff';
        return '<div style="background:#f5f5f5;padding:24px 16px;font-family:' + font + '">'
            + '<div style="max-width:560px;margin:0 auto;background:' + esc(bg) + '">'
            + '<div style="height:4px;background:' + esc(accent) + '"></div>'
            + '<div style="padding:22px 32px 6px">' + shopLogo( b, shop, true ) + '</div>'
            + '<div style="padding:22px 32px 24px">'
            + '<h2 data-editable="headline" style="margin:0 0 18px;font-size:24px;font-weight:700;line-height:1.25;color:#111;letter-spacing:-0.02em;cursor:text">' + esc( c.headline || '' ) + '</h2>'
            + bodyParas( c.body, text )
            + offerBlock( c.offer, accent )
            + ctaBtn( c.cta_label || 'Shop Now', b.cta_bg_color || '#111', b.cta_text_color || '#fff', b.cta_border_radius || '4px' )
            + '</div>'
            + '<div style="padding:14px 32px;border-top:1px solid #eee;font-size:12px;color:#aaa">Unsubscribe</div>'
            + '</div></div>';
    }

    function tplEditorial( c, b, shop ) {
        var font   = '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';
        var accent = b.accent_color || '#111';
        var text   = b.text_color   || '#1a1a1a';
        return '<div style="background:#fff;padding:28px 16px;font-family:' + font + '">'
            + '<div style="max-width:560px;margin:0 auto;border:1px solid #e8e8e8">'
            + '<div style="padding:28px 36px 0">'
            + '<div style="font-size:11px;font-weight:700;letter-spacing:.14em;color:#aaa;text-transform:uppercase">' + esc( shop ) + '</div>'
            + '<div style="height:1px;background:#111;margin:12px 0 16px"></div>'
            + '<h2 data-editable="headline" style="margin:0 0 5px;font-size:30px;font-weight:800;line-height:1.15;color:#111;letter-spacing:-0.03em;cursor:text">' + esc( c.headline || '' ) + '</h2>'
            + '<div style="height:2px;width:36px;background:' + esc(accent) + ';margin:16px 0 20px"></div>'
            + '</div>'
            + '<div style="padding:0 36px 24px">'
            + bodyParas( c.body, text )
            + offerBlock( c.offer, accent )
            + ctaBtn( c.cta_label || 'Shop Now', b.cta_bg_color || '#111', b.cta_text_color || '#fff', b.cta_border_radius || '4px' )
            + '</div>'
            + '<div style="padding:14px 36px;border-top:1px solid #eee;font-size:12px;color:#aaa">Unsubscribe</div>'
            + '</div></div>';
    }

    function tplBold( c, b, shop ) {
        var font    = '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';
        var primary = b.primary_color || '#111';
        var accent  = b.accent_color  || '#111';
        var text    = b.text_color    || '#1a1a1a';
        return '<div style="background:#f0f0f0;padding:24px 16px;font-family:' + font + '">'
            + '<div style="max-width:560px;margin:0 auto;background:#fff">'
            + '<div style="background:' + esc(primary) + ';padding:24px 32px">' + shopLogo( b, shop, false ) + '</div>'
            + '<div style="background:' + esc(primary) + ';padding:0 32px 28px">'
            + '<h2 data-editable="headline" style="margin:0;font-size:30px;font-weight:900;line-height:1.15;color:#fff;letter-spacing:-0.03em;cursor:text">' + esc( c.headline || '' ) + '</h2>'
            + '</div>'
            + '<div style="padding:28px 32px 24px">'
            + bodyParas( c.body, text )
            + offerBlock( c.offer, accent )
            + ctaBtn( c.cta_label || 'Shop Now', b.cta_bg_color || '#111', b.cta_text_color || '#fff', b.cta_border_radius || '4px' )
            + '</div>'
            + '<div style="padding:14px 32px;border-top:1px solid #eee;font-size:12px;color:#aaa">Unsubscribe</div>'
            + '</div></div>';
    }

    function tplProduct( c, b, shop ) {
        var font   = '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';
        var accent = b.accent_color || '#111';
        var text   = b.text_color   || '#1a1a1a';
        var offerHero = '';
        if ( c.offer ) {
            var label = '';
            if ( c.offer.type === 'percentage' && c.offer.value ) label = c.offer.value + '% OFF';
            else if ( c.offer.type === 'fixed' && c.offer.value )  label = '฿' + c.offer.value + ' OFF';
            else if ( c.offer.type === 'freeShipping' )             label = 'FREE SHIPPING';
            if ( label ) {
                var codeHtml = c.offer.code
                    ? '<div style="font-size:13px;color:rgba(255,255,255,.75);margin-top:6px">Code: <strong style="font-family:monospace;background:rgba(255,255,255,.15);padding:2px 7px;border-radius:3px">' + esc( c.offer.code ) + '</strong></div>'
                    : '';
                offerHero = '<div style="background:' + esc(accent) + ';padding:22px 32px;text-align:center">'
                    + '<div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.7);text-transform:uppercase">Exclusive Offer</div>'
                    + '<div style="font-size:34px;font-weight:900;color:#fff;letter-spacing:-0.04em;line-height:1;margin-top:4px">' + esc(label) + '</div>'
                    + codeHtml + '</div>';
            }
        }
        var bullets = ( c.body || [] ).map( function ( p, i ) {
            var prefix = i > 0 ? '✓ ' : '';
            return '<p data-editable="body" style="margin:0 0 11px;font-size:15px;line-height:1.7;color:' + esc(text) + ';cursor:text">' + ( i > 0 ? '✓&nbsp;' : '' ) + esc( p ) + '</p>';
        } ).join( '' );
        return '<div style="background:#f5f5f5;padding:24px 16px;font-family:' + font + '">'
            + '<div style="max-width:560px;margin:0 auto;background:#fff">'
            + '<div style="padding:20px 32px;border-bottom:1px solid #eee">' + shopLogo( b, shop, true ) + '</div>'
            + offerHero
            + '<div style="padding:28px 32px 24px">'
            + '<h2 data-editable="headline" style="margin:0 0 18px;font-size:24px;font-weight:700;line-height:1.25;color:#111;letter-spacing:-0.02em;cursor:text">' + esc( c.headline || '' ) + '</h2>'
            + bullets
            + ctaBtn( c.cta_label || 'Shop Now', b.cta_bg_color || '#111', b.cta_text_color || '#fff', b.cta_border_radius || '4px' )
            + '</div>'
            + '<div style="padding:14px 32px;border-top:1px solid #eee;font-size:12px;color:#aaa">Unsubscribe</div>'
            + '</div></div>';
    }

    /* ── Generate / preview ───────────────────────────────────── */
    generateBtn.addEventListener( 'click', function () {
        var prompt = promptEl.value.trim();
        if ( ! prompt ) {
            showError( errorEl, 'Please describe the email you want to send.' );
            return;
        }
        clearError( errorEl );
        setGenerating( true );

        apiFetch( '/preview', 'POST', { prompt: prompt } )
            .then( function ( data ) {
                campaignId      = data.campaign_id;
                recipientCount  = data.recipient_count;
                contentJson     = data.content_json;
                activeTemplate  = data.template_id || 'minimal';

                subjectEl.value       = data.subject || '';
                countEl.textContent   = recipientCount;
                sendCount.textContent = recipientCount;
                segmentEl.textContent = data.audience_label || '';

                // Sync template bar
                if ( tplBar ) {
                    tplBar.querySelectorAll( '.nudge-tpl-btn' ).forEach( function ( b ) {
                        b.classList.toggle( 'active', b.dataset.template === activeTemplate );
                    } );
                }

                renderEmailPreview();

                hide( compose );
                show( preview );
            } )
            .catch( function ( err ) {
                showError( errorEl, err.message || 'Something went wrong. Please try again.' );
            } )
            .finally( function () {
                setGenerating( false );
            } );
    } );

    /* ── Send ─────────────────────────────────────────────────── */
    sendBtn.addEventListener( 'click', function () {
        if ( ! campaignId ) return;
        clearError( sendError );
        setSending( true );

        var editedContent = collectEdits();

        apiFetch( '/send', 'POST', {
            campaign_id  : campaignId,
            subject      : subjectEl.value.trim(),
            content_json : editedContent,
            template_id  : activeTemplate,
        } )
            .then( function ( data ) {
                successMsg.textContent =
                    'Your email is on its way to ' + ( data.recipient_count || recipientCount ) + ' customers.';
                hide( preview );
                show( success );
            } )
            .catch( function ( err ) {
                showError( sendError, err.message || 'Send failed. Please try again.' );
            } )
            .finally( function () {
                setSending( false );
            } );
    } );

    /* ── Reset ────────────────────────────────────────────────── */
    function reset() {
        campaignId     = null;
        recipientCount = 0;
        contentJson    = null;
        activeTemplate = 'minimal';
        promptEl.value        = '';
        subjectEl.value       = '';
        countEl.textContent   = '0';
        sendCount.textContent = '0';
        segmentEl.textContent = '';
        if ( emailPreview ) emailPreview.innerHTML = '';
        if ( refineInput ) refineInput.value = '';
        clearError( errorEl );
        clearError( sendError );
        clearError( refineError );
        hide( preview );
        hide( success );
        show( compose );
    }

    resetBtn.addEventListener( 'click', reset );
    anotherBtn.addEventListener( 'click', reset );

    /* ── Settings panel (API key) ─────────────────────────────── */
    var settingsForm = document.getElementById( 'nudge-settings-form' );
    if ( settingsForm ) {
        settingsForm.addEventListener( 'submit', function ( e ) {
            e.preventDefault();
            var keyInput = document.getElementById( 'nudge-api-key' );
            var saveMsg  = document.getElementById( 'nudge-save-msg' );
            if ( ! keyInput ) return;

            apiFetch( '/settings', 'POST', { claude_api_key: keyInput.value.trim() } )
                .then( function () {
                    if ( saveMsg ) { saveMsg.textContent = 'Saved!'; show( saveMsg ); }
                    setTimeout( function () { if ( saveMsg ) hide( saveMsg ); }, 2500 );
                } )
                .catch( function ( err ) {
                    alert( 'Could not save: ' + err.message );
                } );
        } );
    }

} )();
