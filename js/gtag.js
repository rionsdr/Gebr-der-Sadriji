/**
 * Google Tag / Google Ads Tracking – Gebrüder Sadriji
 * Google Ads ID: AW-18241166068
 *
 * Enthält:
 * - Consent Mode v2 Verwaltung
 * - Cookie-/Consent-Banner
 * - Tracking-Hilfsfunktionen für alle Kontakt-CTAs
 *
 * HINWEIS: Conversion Labels müssen nach Einrichtung in Google Ads
 * durch die entsprechenden echten Labels ersetzt werden.
 */
(function () {
  'use strict';

  /* ================================================================
     KONSTANTEN
  ================================================================ */
  var GTAG_ID = 'AW-18241166068';

  // TODO: Conversion Labels aus Google Ads einsetzen, sobald verfügbar
  var CONVERSION_LABEL_CONTACT_FORM = 'REPLACE_WITH_CONVERSION_LABEL';
  var CONVERSION_LABEL_PHONE        = 'REPLACE_WITH_PHONE_CONVERSION_LABEL';
  var CONVERSION_LABEL_WHATSAPP     = 'REPLACE_WITH_WHATSAPP_CONVERSION_LABEL';

  var CONSENT_STORAGE_KEY = 'gs_consent_v1';

  /* ================================================================
     HILFSFUNKTIONEN
  ================================================================ */

  /** Sicherer gtag-Wrapper – feuert nur, wenn window.gtag verfügbar ist */
  function gtagSend() {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(window, arguments);
    }
  }

  /** Consent Mode v2 aktualisieren */
  function updateConsent(granted) {
    gtagSend('consent', 'update', {
      ad_storage:        granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }

  /** Gespeicherte Einwilligung lesen */
  function getStoredConsent() {
    try {
      return localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  /** Einwilligung speichern */
  function storeConsent(value) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch (_) {}
  }

  /* ================================================================
     TRACKING-FUNKTIONEN (global verfügbar für main.js)
  ================================================================ */

  /** Generisches Event-Tracking */
  function trackEvent(eventName, params) {
    gtagSend('event', eventName, params || {});
  }

  /** Conversion-Tracking */
  function trackConversion(sendTo) {
    gtagSend('event', 'conversion', { send_to: sendTo });
  }

  /**
   * Kontaktsektion angesehen
   * Wird durch IntersectionObserver automatisch aufgerufen.
   */
  window.trackContactSectionView = function () {
    trackEvent('contact_section_view', {
      section:       'kontakt',
      page_location: window.location.href,
      page_title:    document.title
    });
  };

  /**
   * Anfrageformular erfolgreich abgesendet
   * Wird von main.js nach erfolgreicher Formspree-Antwort aufgerufen.
   */
  window.trackContactFormSubmit = function () {
    trackEvent('contact_form_submit', {
      method:        'contact_form',
      page_location: window.location.href,
      page_title:    document.title
    });
    // TODO: Auskommentierung entfernen und Label ersetzen, sobald vorhanden
    // trackConversion(GTAG_ID + '/' + CONVERSION_LABEL_CONTACT_FORM);
  };

  /**
   * Telefon-Klick
   * @param {string} location – Herkunftsbereich (floating_button | contact_section | header | footer | page)
   */
  window.trackPhoneClick = function (location) {
    trackEvent('phone_click', {
      method:        'phone',
      location:      location || 'unknown',
      page_location: window.location.href
    });
    // TODO: Auskommentierung entfernen und Label ersetzen, sobald vorhanden
    // trackConversion(GTAG_ID + '/' + CONVERSION_LABEL_PHONE);
  };

  /**
   * WhatsApp-Klick
   * @param {string} location – Herkunftsbereich
   */
  window.trackWhatsappClick = function (location) {
    trackEvent('whatsapp_click', {
      method:        'whatsapp',
      location:      location || 'unknown',
      page_location: window.location.href
    });
    // TODO: Auskommentierung entfernen und Label ersetzen, sobald vorhanden
    // trackConversion(GTAG_ID + '/' + CONVERSION_LABEL_WHATSAPP);
  };

  /**
   * E-Mail-Klick
   * @param {string} location – Herkunftsbereich
   */
  window.trackEmailClick = function (location) {
    trackEvent('email_click', {
      method:        'email',
      location:      location || 'unknown',
      page_location: window.location.href
    });
  };

  /* ================================================================
     LINK-TRACKING – Telefon, WhatsApp, E-Mail
  ================================================================ */

  /**
   * Bestimmt den Herkunftsbereich eines angeklickten Links
   * @param {Element} element
   * @returns {string}
   */
  function detectLinkLocation(element) {
    if (!element) return 'unknown';
    if (element.closest('.floating-call'))         return 'floating_button';
    if (element.closest('#kontakt'))               return 'contact_section';
    if (element.closest('.site-header'))           return 'header';
    if (element.closest('.hero'))                  return 'hero';
    if (element.closest('.site-footer'))           return 'footer';
    return 'page';
  }

  /** Event-Delegation für alle Link-Klick-Events */
  function initLinkTracking() {
    document.addEventListener('click', function (event) {
      var anchor = event.target.closest('a[href]');
      if (!anchor) return;

      var href = anchor.getAttribute('href') || '';
      var loc  = detectLinkLocation(anchor);

      if (href.startsWith('tel:')) {
        window.trackPhoneClick(loc);
      } else if (href.startsWith('mailto:')) {
        window.trackEmailClick(loc);
      } else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        window.trackWhatsappClick(loc);
      }
    });
  }

  /* ================================================================
     KONTAKTSEKTION-TRACKING – IntersectionObserver
  ================================================================ */

  var contactSectionTracked = false;

  function initContactSectionTracking() {
    var section = document.getElementById('kontakt');
    if (!section || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !contactSectionTracked) {
          contactSectionTracked = true;
          observer.disconnect();
          window.trackContactSectionView();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  }

  /* ================================================================
     CONSENT-BANNER
  ================================================================ */

  function hideBanner(banner) {
    banner.classList.add('gs-consent-hidden');
    setTimeout(function () {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 350);
  }

  function createConsentBanner() {
    if (document.getElementById('gs-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'gs-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');

    // Datenschutz-Link: relativ zur aktuellen Seite auflösen
    var pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    var privacyPath = (pathname === '' || pathname === '/' || /\/index\.html?$/.test(pathname))
      ? '/datenschutz/'
      : '../datenschutz/';

    banner.innerHTML =
      '<div class="gs-consent-inner">' +
        '<p class="gs-consent-text">' +
          'Diese Website verwendet Google Tag und Google Ads für Marketing-Tracking und Analysen. ' +
          'Funktionale Cookies (z. B. Spracheinstellungen) sind immer aktiv. ' +
          'Weitere Informationen in unserer ' +
          '<a href="' + privacyPath + '" class="gs-consent-link">Datenschutzerklärung</a>.' +
        '</p>' +
        '<div class="gs-consent-actions">' +
          '<button id="gs-consent-reject" class="gs-consent-btn gs-consent-btn--secondary" type="button">Ablehnen</button>' +
          '<button id="gs-consent-accept" class="gs-consent-btn gs-consent-btn--primary" type="button">Akzeptieren</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    // Kleine Verzögerung, damit die CSS-Transition sichtbar wird
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('gs-consent-visible');
      });
    });

    document.getElementById('gs-consent-accept').addEventListener('click', function () {
      storeConsent('granted');
      updateConsent(true);
      hideBanner(banner);
    });

    document.getElementById('gs-consent-reject').addEventListener('click', function () {
      storeConsent('denied');
      updateConsent(false);
      hideBanner(banner);
    });
  }

  /* ================================================================
     INITIALISIERUNG
  ================================================================ */

  function init() {
    var stored = getStoredConsent();

    if (stored === 'granted') {
      updateConsent(true);
    } else if (stored === 'denied') {
      // Consent bleibt denied (Standard aus Head-Snippet)
      updateConsent(false);
    } else {
      // Noch keine Entscheidung – Banner anzeigen
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createConsentBanner);
      } else {
        createConsentBanner();
      }
    }

    // Link- und Sektions-Tracking
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initLinkTracking();
        initContactSectionTracking();
      });
    } else {
      initLinkTracking();
      initContactSectionTracking();
    }
  }

  init();
})();
