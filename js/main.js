(function () {
  'use strict';

  /* ================================================================
     HILFSFUNKTIONEN
  ================================================================ */

  /** Gibt true zurück, wenn der Nutzer reduzierte Bewegung bevorzugt */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     BURGER-MENÜ (mobil)
  ================================================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav   = document.querySelector('.main-nav');
  const navLinks  = document.querySelectorAll('.main-nav a');
  const desktopNavMedia = window.matchMedia('(min-width: 48rem)');

  if (navToggle && mainNav) {
    const syncNavHeight = () => {
      if (desktopNavMedia.matches) {
        mainNav.style.maxHeight = '';
        return;
      }

      mainNav.style.maxHeight = mainNav.classList.contains('open')
        ? `${mainNav.scrollHeight}px`
        : '0px';
    };

    const closeNav = () => {
      mainNav.classList.remove('open');
      mainNav.setAttribute('aria-hidden', desktopNavMedia.matches ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
      syncNavHeight();
    };

    const openNav = () => {
      mainNav.classList.add('open');
      mainNav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Menü schliessen');
      syncNavHeight();
    };

    const toggleNav = () => {
      const isOpen = mainNav.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    };

    closeNav();
    syncNavHeight();

    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleNav();
    });

    // Menü schliessen wenn ein Nav-Link geklickt wird (Mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (!desktopNavMedia.matches) {
          closeNav();
        }
      });
    });

    // Menü schliessen bei Klick ausserhalb
    document.addEventListener('click', (event) => {
      if (!mainNav.classList.contains('open') || desktopNavMedia.matches) return;
      if (mainNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    // Menü schliessen bei ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    // Menüzustand beim Breakpoint-Wechsel konsistent halten
    const handleDesktopChange = () => {
      closeNav();
      syncNavHeight();
    };
    if (typeof desktopNavMedia.addEventListener === 'function') {
      desktopNavMedia.addEventListener('change', handleDesktopChange);
    } else {
      desktopNavMedia.addListener(handleDesktopChange);
    }

    window.addEventListener('resize', syncNavHeight, { passive: true });
  }

  /* ================================================================
     JAHRESZAHL IM FOOTER
  ================================================================ */
  const yearTarget = document.getElementById('jahr');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  /* ================================================================
     STICKY-HEADER: Klasse «scrolled» beim Scrollen hinzufügen
  ================================================================ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const updateHeader = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    // Initialer Check (z. B. bei Seiten-Reload mit Scroll-Position)
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ================================================================
     SCROLL-FORTSCHRITTSBALKEN
  ================================================================ */
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const updateProgress = () => {
      const scrollTop  = window.scrollY || document.documentElement.scrollTop;
      const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress.toFixed(2) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ================================================================
     SMOOTH-SCROLLING mit korrektem Offset (wegen Sticky-Header)
  ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const isTopAnchor =
        targetId === '#top' ||
        (anchor.classList.contains('logo') && targetId === '#start');
      const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
      const targetPosition = isTopAnchor
        ? 0
        : targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      if (prefersReducedMotion()) {
        window.scrollTo({ top: targetPosition });
      } else {
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }

      // Fokus auf Ziel-Element für Barrierefreiheit
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
      targetElement.addEventListener('blur', () => {
        targetElement.removeAttribute('tabindex');
      }, { once: true });
    });
  });

  /* ================================================================
     SCROLL-REVEAL (IntersectionObserver)
     Elemente mit Klasse «reveal» werden beim Sichtbarwerden eingeblendet.
     Gestaffelte Einblendung via CSS-Variable --reveal-delay.
  ================================================================ */
  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Einmal eingeblendet: Observer entfernen (Performance)
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,      // 10 % des Elements müssen sichtbar sein
        rootMargin: '0px 0px -40px 0px', // Früher triggern als erst am unteren Rand
      }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Kein Observer oder reduzierte Bewegung: alle Elemente direkt einblenden
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* ================================================================
     COUNT-UP ANIMATION für Kennzahlen (.stat-value[data-count])
     Startet beim Sichtbarwerden der jeweiligen Stat-Karte.
  ================================================================ */
  const countUpElements = document.querySelectorAll('.stat-value[data-count]');

  if (countUpElements.length && !prefersReducedMotion() && 'IntersectionObserver' in window) {
    /**
     * Animiert eine Zahl von 0 auf den Zielwert.
     * @param {HTMLElement} el   - Ziel-Element
     * @param {number}      end  - Zielzahl
     * @param {string}      suffix - Suffix z. B. «+»
     * @param {number}      duration - Dauer in ms
     */
    const animateCount = (el, end, suffix, duration) => {
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out-Quad
        const eased    = 1 - (1 - progress) * (1 - progress);
        const current  = Math.round(eased * end);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const end    = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            animateCount(el, end, suffix, 1600);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    countUpElements.forEach((el) => countObserver.observe(el));
  }

  /* ================================================================
     KONTAKTFORMULAR – Validierung und mailto:-Fallback
  ================================================================ */
  const form     = document.getElementById('anfrageformular');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const submitButton = form.querySelector('button[type="submit"]');
    const submitButtonLabel = submitButton?.querySelector('.btn-label');
    const defaultSubmitLabel = submitButtonLabel?.textContent || 'Anfrage senden';

    const normalizeSingleLine = (value) =>
      String(value ?? '')
        .replace(/[\r\n]+/g, ' ')
        .trim();

    const normalizeMultiLine = (value) =>
      String(value ?? '')
        .replace(/\u0000/g, '')
        .trim();

    const setInvalidState = (field) => {
      field.classList.add('is-invalid');
    };

    const clearInvalidState = (field) => {
      field.classList.remove('is-invalid');
    };

    const setFeedback = (message, type = '') => {
      feedback.textContent = message;
      feedback.classList.remove('is-success', 'is-error');

      if (type) {
        feedback.classList.add(type === 'success' ? 'is-success' : 'is-error');
      }
    };

    const setSubmittingState = (isSubmitting) => {
      form.setAttribute('aria-busy', String(isSubmitting));

      if (!submitButton) return;

      submitButton.disabled = isSubmitting;
      submitButton.setAttribute('aria-disabled', String(isSubmitting));

      if (submitButtonLabel) {
        submitButtonLabel.textContent = isSubmitting ? 'Wird gesendet …' : defaultSubmitLabel;
      }
    };

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) {
          clearInvalidState(field);
        }
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback('');

      let formIsValid = true;
      requiredFields.forEach((field) => {
        if (!field.checkValidity()) {
          formIsValid = false;
          setInvalidState(field);
        } else {
          clearInvalidState(field);
        }
      });

      if (!formIsValid) {
        setFeedback('Bitte füllen Sie alle Pflichtfelder korrekt aus.', 'error');
        // Fokus auf erstes fehlerhaftes Feld setzen
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formData = new FormData(form);
      const endpoint = form.getAttribute('action') || '';
      const hasPlaceholderEndpoint = endpoint.includes('FORM_ID_PLATZHALTER');

      if (hasPlaceholderEndpoint) {
        // PLATZHALTER-FALLBACK: auf echte Manager-Adresse ändern, falls kein Formspree-Endpoint hinterlegt ist
        const managerEmailPlaceholder = 'kontakt@gebrueder-sadriji.ch';
        // MAILTO-FALLBACK solange kein Formular-Backend angebunden ist
        const name       = normalizeSingleLine(formData.get('name'));
        const email      = normalizeSingleLine(formData.get('email'));
        const phone      = normalizeSingleLine(formData.get('telefon'));
        const message    = normalizeMultiLine(formData.get('nachricht'));
        const subjectRaw = normalizeSingleLine(formData.get('betreff')) || 'Neue Anfrage';
        const bodyRaw    = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`;
        const params     = new URLSearchParams({
          subject: `Anfrage: ${subjectRaw}`,
          body:    bodyRaw,
        });
        window.location.href = `mailto:${managerEmailPlaceholder}?${params.toString()}`;
        setFeedback(
          'Ihr Mailprogramm wurde geöffnet. Bitte Nachricht senden, um die Anfrage abzuschliessen.'
        );
        form.reset();
        return;
      }

      // Echtbetrieb: Daten per fetch an das Backend senden
      try {
        setSubmittingState(true);

        const response = await fetch(endpoint, {
          method:  'POST',
          body:    formData,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          let errorMessage =
            'Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch unter +41 78 255 88 25.';

          try {
            const data = await response.json();
            const formspreeErrors = Array.isArray(data?.errors)
              ? data.errors
                  .map((entry) => entry?.message)
                  .filter(Boolean)
              : [];

            if (formspreeErrors.length) {
              errorMessage = `${formspreeErrors.join('. ')}. Alternativ erreichen Sie uns telefonisch unter +41 78 255 88 25.`;
            }
          } catch (_parseError) {
            // Defensive Fehlerbehandlung: ungültige oder leere JSON-Antwort ignorieren
          }

          throw new Error(errorMessage);
        }

        setFeedback(
          'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.',
          'success'
        );
        form.reset();
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? error.message
            : 'Senden aktuell nicht möglich. Bitte kontaktieren Sie uns alternativ telefonisch unter +41 78 255 88 25.',
          'error'
        );
      } finally {
        setSubmittingState(false);
      }
    });
  }
})();
