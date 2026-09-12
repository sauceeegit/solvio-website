/* global NudgeData */
( function () {
    'use strict';

    /* ── state ────────────────────────────────────────────────── */
    let campaignId   = null;
    let recipientCount = 0;

    /* ── elements ─────────────────────────────────────────────── */
    const compose    = document.getElementById( 'nudge-compose' );
    const preview    = document.getElementById( 'nudge-preview' );
    const success    = document.getElementById( 'nudge-success' );

    const promptEl   = document.getElementById( 'nudge-prompt' );
    const generateBtn= document.getElementById( 'nudge-generate' );
    const loading    = document.getElementById( 'nudge-loading' );
    const errorEl    = document.getElementById( 'nudge-error' );

    const subjectEl  = document.getElementById( 'nudge-subject' );
    const countEl    = document.getElementById( 'nudge-count' );
    const segmentEl  = document.getElementById( 'nudge-segment' );
    const iframe     = document.getElementById( 'nudge-iframe' );
    const sendBtn    = document.getElementById( 'nudge-send' );
    const sendCount  = document.getElementById( 'nudge-send-count' );
    const resetBtn   = document.getElementById( 'nudge-reset' );
    const sendSpinner= document.getElementById( 'nudge-send-spinner' );
    const sendError  = document.getElementById( 'nudge-send-error' );

    const anotherBtn = document.getElementById( 'nudge-another' );
    const successMsg = document.getElementById( 'nudge-success-msg' );

    /* ── chips ────────────────────────────────────────────────── */
    document.querySelectorAll( '.nudge-chip' ).forEach( function ( chip ) {
        chip.addEventListener( 'click', function () {
            promptEl.value = chip.dataset.prompt || '';
            promptEl.focus();
        } );
    } );

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
                if ( ! r.ok ) {
                    throw new Error( data.error || data.message || 'Request failed (' + r.status + ')' );
                }
                return data;
            } );
        } );
    }

    function show( el )  { el.hidden = false; }
    function hide( el )  { el.hidden = true; }
    function showError( el, msg ) { el.textContent = msg; show( el ); }
    function clearError( el )     { el.textContent = ''; hide( el ); }

    function setGenerating( on ) {
        generateBtn.disabled = on;
        on ? show( loading ) : hide( loading );
        on ? hide( generateBtn ) : show( generateBtn );
    }

    function setSending( on ) {
        sendBtn.disabled = on;
        on ? show( sendSpinner ) : hide( sendSpinner );
    }

    /* ── generate / preview ───────────────────────────────────── */
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
                campaignId    = data.campaign_id;
                recipientCount = data.recipient_count;

                subjectEl.value       = data.subject || '';
                countEl.textContent   = recipientCount;
                sendCount.textContent = recipientCount;
                segmentEl.textContent = data.audience_label || '';

                var doc = iframe.contentDocument || iframe.contentWindow.document;
                doc.open();
                doc.write( data.body_html || '' );
                doc.close();

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

    /* ── send ─────────────────────────────────────────────────── */
    sendBtn.addEventListener( 'click', function () {
        if ( ! campaignId ) return;
        clearError( sendError );
        setSending( true );

        apiFetch( '/send', 'POST', {
            campaign_id: campaignId,
            subject    : subjectEl.value.trim(),
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

    /* ── reset ────────────────────────────────────────────────── */
    function reset() {
        campaignId    = null;
        recipientCount = 0;
        promptEl.value      = '';
        subjectEl.value     = '';
        countEl.textContent = '0';
        sendCount.textContent = '0';
        segmentEl.textContent = '';
        clearError( errorEl );
        clearError( sendError );
        hide( preview );
        hide( success );
        show( compose );
    }

    resetBtn.addEventListener( 'click', reset );
    anotherBtn.addEventListener( 'click', reset );

    /* ── settings panel (API key) ─────────────────────────────── */
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
