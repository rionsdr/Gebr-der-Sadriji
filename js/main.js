(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const yearTarget = document.getElementById('jahr');
  const form = document.getElementById('anfrageformular');
  const feedback = document.getElementById('form-feedback');

  // Mobiles Menü ein-/ausblenden
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schliessen' : 'Menü öffnen');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Menü öffnen');
        }
      });
    });
  }

  // Jahreszahl im Footer dynamisch setzen
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  // Kontaktformular validieren und absenden
  if (form && feedback) {
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
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

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) {
          clearInvalidState(field);
        }
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      feedback.textContent = '';

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
        feedback.textContent = 'Bitte füllen Sie alle Pflichtfelder korrekt aus.';
        return;
      }

      const formData = new FormData(form);
      const endpoint = form.getAttribute('action') || '';
      const hasPlaceholderEndpoint = endpoint.includes('FORM_ID_PLATZHALTER');

      if (hasPlaceholderEndpoint) {
        // MAILTO-FALLBACK solange kein Formular-Backend angebunden ist
        const name = normalizeSingleLine(formData.get('name'));
        const email = normalizeSingleLine(formData.get('email'));
        const phone = normalizeSingleLine(formData.get('telefon'));
        const message = normalizeMultiLine(formData.get('nachricht'));
        const subjectRaw = normalizeSingleLine(formData.get('betreff')) || 'Neue Anfrage';
        const subject = encodeURIComponent(`Anfrage: ${subjectRaw}`);
        const bodyRaw = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`;
        const body = encodeURIComponent(bodyRaw);
        window.location.href = `mailto:kontakt@gebrueder-sadriji.ch?subject=${subject}&body=${body}`;
        feedback.textContent =
          'Ihr Mailprogramm wurde geöffnet. Bitte Nachricht senden, um die Anfrage abzuschliessen.';
        form.reset();
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Anfrage konnte nicht gesendet werden');
        }

        feedback.textContent = 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.';
        form.reset();
      } catch (error) {
        feedback.textContent =
          'Senden aktuell nicht möglich. Bitte kontaktieren Sie uns direkt telefonisch über die Notfallnummer.';
      }
    });
  }
})();
