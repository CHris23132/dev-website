/**
 * Google Ads conversion tracking (gtag)
 * - Page view conversion: fires once per page load (optional pathname allowlist).
 * - App Store click conversion: fires on click of App Store link, then navigates (with fallback).
 *
 * Replace {{PAGE_VIEW_LABEL}} and {{APP_STORE_CLICK_LABEL}} with your real conversion labels.
 * No Google account credentials are used; only the Conversion ID and labels below.
 */
(function () {
  'use strict';

  // --- Configuration (replace labels with real values from Google Ads) ---
  var CONVERSION_ID = 'AW-11202136687';
  var PAGE_VIEW_LABEL = '{{PAGE_VIEW_LABEL}}';
  var APP_STORE_CLICK_LABEL = '{{APP_STORE_CLICK_LABEL}}';

  /**
   * Page view conversion: when to fire.
   * - null = fire on every page load (all routes).
   * - ['/', '/3d-filmaker.html'] = fire only when location.pathname is in this list.
   */
  var CONVERSION_PAGE_VIEW_ALLOWLIST = null;

  /** Fallback: navigate to App Store link after this ms if event_callback never runs. */
  var APP_STORE_NAV_FALLBACK_MS = 1000;

  /** Set true to log conversion events to console (for Tag Assistant verification). */
  var DEBUG = false;

  // --- Helpers ---
  function log() {
    if (DEBUG && typeof console !== 'undefined' && console.log) {
      console.log.apply(console, ['[Google Ads]'].concat(Array.prototype.slice.call(arguments)));
    }
  }

  /**
   * Fire page view conversion once per load.
   * (1) If ALLOWLIST is null: fires on every page.
   * (2) If ALLOWLIST is set: fires only when pathname is in the list.
   */
  function firePageViewConversion() {
    if (CONVERSION_PAGE_VIEW_ALLOWLIST !== null) {
      var path = typeof location !== 'undefined' && location.pathname ? location.pathname : '/';
      if (CONVERSION_PAGE_VIEW_ALLOWLIST.indexOf(path) === -1) {
        log('Page view conversion skipped (path not in allowlist):', path);
        return;
      }
    }
    if (typeof gtag !== 'function') {
      log('Page view conversion skipped: gtag not loaded');
      return;
    }
    var sendTo = CONVERSION_ID + '/' + PAGE_VIEW_LABEL;
    gtag('event', 'conversion', { send_to: sendTo });
    log('Page view conversion sent:', sendTo);
  }

  /**
   * Find App Store links: #appStoreBtn if present, else all a[href*="apps.apple.com"].
   * We avoid broad "apple.com" to prevent matching unrelated links.
   */
  function getAppStoreLinks() {
    var byId = document.getElementById('appStoreBtn');
    if (byId && byId.tagName === 'A') return [byId];
    var list = document.querySelectorAll('a[href*="apps.apple.com"]');
    return list ? Array.prototype.slice.call(list, 0) : [];
  }

  /**
   * Handle click: fire conversion then navigate. Prevents double-count by using
   * a single handler per link and navigating only once (callback or fallback).
   */
  function handleAppStoreClick(event) {
    var link = event.currentTarget;
    var href = link && link.href;
    if (!href) return;
    event.preventDefault();
    event.stopPropagation();

    var navigated = false;
    function doNavigate() {
      if (navigated) return;
      navigated = true;
      log('App Store click: navigating to', href);
      window.location.href = href;
    }

    if (typeof gtag !== 'function') {
      doNavigate();
      return;
    }

    var sendTo = CONVERSION_ID + '/' + APP_STORE_CLICK_LABEL;
    gtag('event', 'conversion', {
      send_to: sendTo,
      event_callback: function () {
        doNavigate();
      }
    });
    log('App Store click conversion sent:', sendTo);

    setTimeout(doNavigate, APP_STORE_NAV_FALLBACK_MS);
  }

  function setupAppStoreClickConversion() {
    var links = getAppStoreLinks();
    links.forEach(function (link) {
      if (link._googleAdsConversionBound) return;
      link._googleAdsConversionBound = true;
      link.addEventListener('click', handleAppStoreClick, false);
    });
    if (DEBUG && links.length) log('App Store click conversion attached to', links.length, 'link(s)');
  }

  function init() {
    firePageViewConversion();
    setupAppStoreClickConversion();
  }

  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/*
 * VERIFICATION (Tag Assistant / Google Ads):
 * 1. Replace {{PAGE_VIEW_LABEL}} and {{APP_STORE_CLICK_LABEL}} with your real labels.
 * 2. In google-ads-conversions.js set DEBUG = true to see console logs.
 * 3. Tag Assistant: load any page -> page view conversion should fire once per load.
 * 4. Tag Assistant: click an App Store link -> click conversion should fire once, then navigate.
 * 5. Ensure no double-firing: one page view per load, one click conversion per click.
 */
