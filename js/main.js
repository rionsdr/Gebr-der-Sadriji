(function () {
  'use strict';

  /* ================================================================
     HILFSFUNKTIONEN
  ================================================================ */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     I18N – ÜBERSETZUNGSSYSTEM
     Zentrale Texte für DE / EN / FR / IT
  ================================================================ */
  const translations = {
    de: {
      'a11y.skip':                   'Zum Hauptinhalt springen',
      'nav.start':                   'Start',
      'nav.about':                   'Über uns',
      'nav.services':                'Leistungen',
      'nav.process':                 'Ablauf',
      'nav.contact':                 'Kontakt',
      'nav.cta':                     'Kostenlose Anfrage',
      'hero.eyebrow':                'Maler- & Gipserarbeiten · Zürich',
      'hero.title':                  'Schweizer Qualität für<br>Neubau, Renovation<br>und Unterhalt',
      'hero.sub':                    'Gebrüder Sadriji begleitet private und gewerbliche Projekte mit präziser Handwerksarbeit, verlässlicher Kommunikation und termingerechter Ausführung.',
      'hero.cta.primary':            'Kostenlose Anfrage',
      'hero.cta.call':               'Jetzt anrufen',
      'hero.card.label':             'Ihr Betrieb auf einen Blick',
      'hero.card.fact1':             'Firmenbestehen seit 2006',
      'hero.card.fact2':             'Fachkräfte mit jahrzehntelanger Erfahrung',
      'hero.card.fact3':             '8 Mitarbeitende',
      'trust.experience':            'Jahrzehntelange Erfahrung',
      'trust.quality':               'Hochwertige Materialien',
      'trust.punctual':              'Termingerecht & sauber',
      'trust.reachable':             '24/7 telefonisch erreichbar',
      'about.eyebrow':               'Über uns',
      'about.title':                 'Ihr verlässlicher Partner für Maler- und Gipserarbeiten in Zürich',
      'about.intro':                 'Gebrüder Sadriji ist ein Zürcher Fachbetrieb für Maler-, Gipser-, Renovations- und Umbauarbeiten. Wir verbinden handwerkliches Know-how mit einer gut organisierten Arbeitsweise und betreuen Aufträge vom einzelnen Raum bis zur umfassenden Sanierung.',
      'stats.experience':            'Jahre Erfahrung',
      'stats.founded':               'Jahre Firmenbestehen',
      'stats.employees':             'Mitarbeitende',
      'usp.eyebrow':                 'Unsere Stärken',
      'usp.title':                   'Warum Gebrüder Sadriji?',
      'usp.intro':                   'Was uns von anderen Betrieben unterscheidet – und warum Kunden auf Gebrüder Sadriji setzen.',
      'usp.card1.title':             'Ein starkes Team durch unterschiedliche Fachkompetenzen',
      'usp.card1.text':              'Qualität entsteht, wenn Kompetenzen gezielt eingesetzt werden. Unser Team vereint erfahrene Fachleute mit unterschiedlichen Stärken, fundiertem Fachwissen und handwerklichem Können. So realisieren wir jedes Projekt effizient, präzise und auf hohem Qualitätsniveau.',
      'usp.card2.title':             'Schweizer Qualität',
      'usp.card2.text':              'Wir arbeiten ausschliesslich mit hochwertigen Materialien und nach Schweizer Standards – sichtbar in jedem Pinselstrich und jeder Oberfläche.',
      'usp.card3.title':             'Vielseitige Fachbereiche',
      'usp.card3.text':              'Wir decken verschiedene Arbeiten rund um Maler-, Gipser-, Renovations- und Umbauprojekte ab – passend zum jeweiligen Auftrag.',
      'usp.card4.title':             'Anfragen direkt bei uns',
      'usp.card4.text':              'Telefonische und schriftliche Anfragen werden persönlich entgegengenommen und intern an die passende Fachperson weitergeleitet.',
      'services.eyebrow':            'Was wir anbieten',
      'services.title':              'Unsere Leistungen',
      'services.intro':              'Individuelle Lösungen für Wohn-, Gewerbe- und Umbauprojekte in Zürich und Umgebung.',
      'services.onRequest':          'Weitere Arbeiten auf Anfrage',
      'services.painting.title':     'Malerarbeiten',
      'services.painting.li1':       'Innenanstriche für Wohn- und Geschäftsflächen',
      'services.painting.li2':       'Renovationsanstriche bei Sanierungen',
      'services.painting.li3':       'Vorbereitungs-, Abdeck- und Abschlussarbeiten',
      'services.plaster.title':      'Gipserarbeiten',
      'services.plaster.li1':        'Verputzarbeiten im Innen- und Aussenbereich',
      'services.plaster.li2':        'Q1–Q4 Spachtelarbeiten für unterschiedliche Qualitätsanforderungen',
      'services.plaster.li3':        'Vorbereitende Gipserarbeiten für Trockenbau- und Deckensysteme',
      'services.plaster.li4':        'Reparatur und Instandsetzung bestehender Flächen',
      'services.renovation.title':   'Renovation & Unterhalt',
      'services.renovation.li1':     'Koordinierte Renovationspakete aus einer Hand',
      'services.renovation.li2':     'Abdeck- und Schutzarbeiten',
      'services.renovation.li3':     'Umsetzung nach besprochenem Projektumfang',
      'services.conversion.title':   'Umbau',
      'services.conversion.li1':     'Komplett-Umbauten von Wohn- und Gewerbeflächen',
      'services.conversion.li2':     'Umnutzungen mit klarer Ablauf- und Terminplanung',
      'services.conversion.li3':     'Sanierungen aus einer Hand mit abgestimmten Gewerken',
      'services.drywall.title':      'Trockenbau',
      'services.drywall.li1':        'Trennwände für flexible Raumkonzepte',
      'services.drywall.li2':        'Abgehängte Decken für Technik und Akustik',
      'services.drywall.li3':        'Dämmungen für Wärme-, Schall- und Brandschutz',
      'services.masonry.title':      'Nassbau',
      'services.masonry.li1':        'Mauer- und Verputzarbeiten im konventionellen Bau',
      'services.masonry.li2':        'Fachgerechte Ausführung von Nassbereichen',
      'process.eyebrow':             'Unser Vorgehen',
      'process.title':               'So arbeiten wir',
      'process.intro':               'Von der Anfrage bis zum Abschluss begleiten wir Ihr Projekt Schritt für Schritt.',
      'process.step1.title':         'Anfrage',
      'process.step1.text':          'Sie kontaktieren uns per Formular, Telefon, E-Mail oder WhatsApp. Wir nehmen Ihr Anliegen auf und klären die wichtigsten Informationen.',
      'process.step2.title':         'Besichtigung',
      'process.step2.text':          'Je nach Auftrag schauen wir uns die Situation vor Ort an und besprechen, welche Arbeiten benötigt werden.',
      'process.step3.title':         'Offerte',
      'process.step3.text':          'Sie erhalten eine transparente Offerte mit den besprochenen Arbeiten, den Leistungen und allen wichtigen Details.',
      'process.step4.title':         'Umsetzung & Abschluss',
      'process.step4.text':          'Nach Ihrer Zusage wird der Auftrag ausgeführt. Zum Schluss wird das Ergebnis gemeinsam geprüft und der Auftrag abgeschlossen.',
      'contact.eyebrow':             'Kostenlose Anfrage',
      'contact.title':               'Kontakt & Anfrage',
      'contact.intro':               'Senden Sie uns Ihre Anfrage – wir melden uns zeitnah mit einer passenden Lösung.',
      'contact.direct':              'Direktkontakt',
      'contact.reachable':           '24/7 telefonisch erreichbar',
      'contact.callBtn':             'Jetzt anrufen: +41 78 255 88 25',
      'contact.whatsapp':            'WhatsApp Business schreiben',
      'form.name':                   'Name *',
      'form.name.placeholder':       'Ihr vollständiger Name',
      'form.email':                  'E-Mail',
      'form.email.placeholder':      'ihre@email.ch',
      'form.phone':                  'Telefon',
      'form.contactHint':            'Bitte geben Sie mindestens E-Mail oder Telefon an, damit wir Sie erreichen können.',
      'form.subject':                'Betreff / Leistung *',
      'form.subject.placeholder':    'z. B. Innenanstrich, Verputzarbeiten …',
      'form.message':                'Nachricht *',
      'form.message.placeholder':    'Beschreiben Sie kurz Ihr Vorhaben …',
      'form.location':               'Ort / Objektadresse',
      'form.location.placeholder':   'z. B. Musterstrasse 1, 8000 Zürich',
      'form.period':                 'Gewünschter Zeitraum',
      'form.period.placeholder':     'z. B. ab August, flexibel …',
      'form.customerType':           'Kundentyp',
      'form.customerType.private':   'Privatkunde',
      'form.customerType.management':'Verwaltung',
      'form.customerType.company':   'Firma',
      'form.objectType':             'Objektart',
      'form.objectType.apartment':   'Wohnung',
      'form.objectType.house':       'Haus',
      'form.objectType.office':      'Büro',
      'form.objectType.commercial':  'Gewerbe',
      'form.objectType.construction':'Baustelle',
      'form.objectType.other':       'Anderes',
      'form.scope':                  'Ungefährer Umfang',
      'form.scope.placeholder':      'z. B. 3.5-Zimmer-Wohnung, ca. 80 m² …',
      'form.visit':                  'Besichtigung gewünscht',
      'form.visit.yes':              'Ja',
      'form.visit.no':               'Nein',
      'form.visit.open':             'Noch offen',
      'form.select.placeholder':     'Bitte wählen',
      'form.privacy':                'Ich habe die Datenschutzerklärung gelesen und bin mit der Bearbeitung meiner Angaben zur Beantwortung der Anfrage einverstanden. *',
      'form.privacy.link':           'Datenschutzerklärung',
      'form.submit':                 'Anfrage senden',
      'form.sending':                'Wird gesendet …',
      'form.success':                'Vielen Dank für Ihre Anfrage. Wir haben Ihre Angaben erhalten und melden uns so schnell wie möglich bei Ihnen.',
      'form.error.fields':           'Bitte füllen Sie alle Pflichtfelder korrekt aus.',
      'form.error.contact':          'Bitte geben Sie mindestens eine E-Mail-Adresse oder eine Telefonnummer an.',
      'form.error.send':             'Die Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt telefonisch unter +41 78 255 88 25.',
      'form.mailOpened':             'Ihr Mailprogramm wurde geöffnet. Bitte Nachricht senden, um die Anfrage abzuschliessen.',
      'footer.tagline':              'Maler- und Gipserarbeiten<br><br>Gebr. Sadriji Gipserarbeiten, Inhaber Skender Sadriji<br>Altwiesenstrasse 199, 8051 Zürich, Schweiz · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Rechtliches',
      'footer.imprint':              'Impressum',
      'footer.agb':                  'AGB',
      'footer.privacy':              'Datenschutz',
      'footer.rights':               'Alle Rechte vorbehalten.',
      'footer.cookieSettings':       'Cookie-Einstellungen',
      'floatingBtn.text':            'Jetzt anrufen',
      'nav.menuOpen':                'Menü öffnen',
      'nav.menuClose':               'Menü schliessen',
      'meta.description':            'Gebrüder Sadriji aus Zürich: Maler-, Gipser-, Renovations-, Umbau-, Trockenbau- und Nassbauarbeiten in Schweizer Qualität. Fachkräfte mit jahrzehntelanger Erfahrung. Kostenlose Offerte anfragen oder telefonisch kontaktieren.',
      'form.email.subject':          'Neue Anfrage über die Website Gebrüder Sadriji',
    },

    en: {
      'a11y.skip':                   'Skip to main content',
      'nav.start':                   'Home',
      'nav.about':                   'About us',
      'nav.services':                'Services',
      'nav.process':                 'Process',
      'nav.contact':                 'Contact',
      'nav.cta':                     'Free enquiry',
      'hero.eyebrow':                'Painting & Plastering · Zurich',
      'hero.title':                  'Swiss quality for<br>new builds, renovations<br>and maintenance',
      'hero.sub':                    'Gebrüder Sadriji accompanies private and commercial projects with precise craftsmanship, reliable communication and on-time execution.',
      'hero.cta.primary':            'Free enquiry',
      'hero.cta.call':               'Call now',
      'hero.card.label':             'Your company at a glance',
      'hero.card.fact1':             'In business since 2006',
      'hero.card.fact2':             'Skilled professionals with decades of experience',
      'hero.card.fact3':             '8 employees',
      'trust.experience':            'Decades of experience',
      'trust.quality':               'Swiss quality',
      'trust.punctual':              'On time & clean',
      'trust.reachable':             'Available 24/7 by phone',
      'about.eyebrow':               'About us',
      'about.title':                 'Your reliable partner for painting and plastering in Zurich',
      'about.intro':                 'Gebrüder Sadriji is a Zurich-based specialist for painting, plastering, renovation and conversion work. We combine craftsmanship with a well-organised approach and handle projects from a single room to comprehensive refurbishments.',
      'stats.experience':            'Years of experience',
      'stats.founded':               'Years in business',
      'stats.employees':             'Employees',
      'usp.eyebrow':                 'Our strengths',
      'usp.title':                   'Why Gebrüder Sadriji?',
      'usp.intro':                   'What sets us apart from other companies – and why clients choose Gebrüder Sadriji.',
      'usp.card1.title':             'A strong team through diverse expertise',
      'usp.card1.text':              'Quality is created when competencies are used purposefully. Our team combines experienced specialists with different strengths, sound know-how and craftsmanship. This is how we deliver every project efficiently, precisely and to a high standard of quality.',
      'usp.card2.title':             'Swiss quality',
      'usp.card2.text':              'We work exclusively with premium materials and to Swiss standards – visible in every brushstroke and every surface.',
      'usp.card3.title':             'Versatile areas of expertise',
      'usp.card3.text':              'We cover a wide range of painting, plastering, renovation and conversion work – tailored to each individual project.',
      'usp.card4.title':             'Enquiries directly with us',
      'usp.card4.text':              'Phone and written enquiries are received personally and forwarded internally to the right specialist.',
      'services.eyebrow':            'What we offer',
      'services.title':              'Our services',
      'services.intro':              'Individual solutions for residential, commercial and conversion projects in Zurich and the surrounding area.',
      'services.onRequest':          'Further work on request',
      'services.painting.title':     'Painting',
      'services.painting.li1':       'Interior painting for residential and commercial spaces',
      'services.painting.li2':       'Renovation painting during refurbishments',
      'services.painting.li3':       'Clean preparation, masking and finishing work',
      'services.plaster.title':      'Plastering',
      'services.plaster.li1':        'Render work for interiors and exteriors',
      'services.plaster.li2':        'Q1–Q4 skim coats for varying quality requirements',
      'services.plaster.li3':        'Preparatory plastering for drylining and ceiling systems',
      'services.plaster.li4':        'Repair and restoration of existing surfaces',
      'services.renovation.title':   'Renovation & maintenance',
      'services.renovation.li1':     'Coordinated renovation packages from a single source',
      'services.renovation.li2':     'Clean covering and protective work',
      'services.renovation.li3':     'On-time execution with clear communication',
      'services.conversion.title':   'Conversion',
      'services.conversion.li1':     'Complete conversions of residential and commercial spaces',
      'services.conversion.li2':     'Change-of-use projects with clear scheduling',
      'services.conversion.li3':     'Refurbishments from a single source with coordinated trades',
      'services.drywall.title':      'Drylining',
      'services.drywall.li1':        'Partition walls for flexible room layouts',
      'services.drywall.li2':        'Suspended ceilings for services and acoustics',
      'services.drywall.li3':        'Insulation for thermal, acoustic and fire protection',
      'services.masonry.title':      'Wet trade',
      'services.masonry.li1':        'Masonry and render work in conventional construction',
      'services.masonry.li2':        'Professional execution of wet areas',
      'process.eyebrow':             'Our process',
      'process.title':               'How we work',
      'process.intro':               'From first contact to clean handover – transparent and reliable in four steps.',
      'process.step1.title':         'Enquiry',
      'process.step1.text':          'Contact us by form, phone or email. We respond within 24 hours.',
      'process.step2.title':         'Consultation & quote',
      'process.step2.text':          'We visit the site, advise you and provide a transparent, binding quote.',
      'process.step3.title':         'Execution',
      'process.step3.text':          'Our experienced team carries out the work on time, cleanly and with the utmost care.',
      'process.step4.title':         'Handover',
      'process.step4.text':          'Joint inspection, quality control and clean handover – only when you are fully satisfied.',
      'contact.eyebrow':             'Free enquiry',
      'contact.title':               'Contact & enquiry',
      'contact.intro':               'Send us your enquiry – we will get back to you promptly with a suitable solution.',
      'contact.direct':              'Direct contact',
      'contact.reachable':           'Available 24/7 by phone',
      'contact.callBtn':             'Call now: +41 78 255 88 25',
      'contact.whatsapp':            'Write via WhatsApp Business',
      'form.name':                   'Name *',
      'form.name.placeholder':       'Your full name',
      'form.email':                  'Email',
      'form.email.placeholder':      'your@email.ch',
      'form.phone':                  'Phone',
      'form.contactHint':            'Please provide at least an email address or a phone number so we can reach you.',
      'form.subject':                'Subject / service *',
      'form.subject.placeholder':    'e.g. interior painting, plastering …',
      'form.message':                'Message *',
      'form.message.placeholder':    'Please describe your project briefly …',
      'form.location':               'Location / property address',
      'form.location.placeholder':   'e.g. Musterstrasse 1, 8000 Zürich',
      'form.period':                 'Preferred timeframe',
      'form.period.placeholder':     'e.g. from August, flexible …',
      'form.customerType':           'Customer type',
      'form.customerType.private':   'Private customer',
      'form.customerType.management':'Property management',
      'form.customerType.company':   'Company',
      'form.objectType':             'Property type',
      'form.objectType.apartment':   'Apartment',
      'form.objectType.house':       'House',
      'form.objectType.office':      'Office',
      'form.objectType.commercial':  'Commercial',
      'form.objectType.construction':'Construction site',
      'form.objectType.other':       'Other',
      'form.scope':                  'Approximate scope',
      'form.scope.placeholder':      'e.g. 3.5-room apartment, approx. 80 m² …',
      'form.visit':                  'On-site visit desired',
      'form.visit.yes':              'Yes',
      'form.visit.no':               'No',
      'form.visit.open':             'Still open',
      'form.select.placeholder':     'Please select',
      'form.privacy':                'I have read the privacy policy and consent to my details being processed to respond to my enquiry. *',
      'form.privacy.link':           'Privacy policy',
      'form.submit':                 'Send enquiry',
      'form.sending':                'Sending …',
      'form.success':                'Thank you for your enquiry. We have received your details and will get back to you as soon as possible.',
      'form.error.fields':           'Please fill in all required fields correctly.',
      'form.error.contact':          'Please provide at least an email address or a phone number.',
      'form.error.send':             'Unfortunately your enquiry could not be sent. Please try again or contact us directly by phone on +41 78 255 88 25.',
      'form.mailOpened':             'Your mail application has opened. Please send the message to complete your enquiry.',
      'footer.tagline':              'Painting & plastering<br><br>Gebr. Sadriji Gipserarbeiten, Inhaber Skender Sadriji<br>Altwiesenstrasse 199, 8051 Zürich, Schweiz · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Legal',
      'footer.imprint':              'Imprint',
      'footer.agb':                  'T&Cs',
      'footer.privacy':              'Privacy policy',
      'footer.rights':               'All rights reserved.',
      'footer.cookieSettings':       'Cookie settings',
      'floatingBtn.text':            'Call now',
      'nav.menuOpen':                'Open menu',
      'nav.menuClose':               'Close menu',
      'meta.description':            'Gebrüder Sadriji – Zurich: painting, plastering, renovation, conversion, drywall and masonry work in Swiss quality. Skilled professionals with decades of experience. Request a free quote or call us any time.',
      'form.email.subject':          'New enquiry via the Gebrüder Sadriji website',
    },

    fr: {
      'a11y.skip':                   'Aller au contenu principal',
      'nav.start':                   'Accueil',
      'nav.about':                   'À propos',
      'nav.services':                'Prestations',
      'nav.process':                 'Déroulement',
      'nav.contact':                 'Contact',
      'nav.cta':                     'Demande gratuite',
      'hero.eyebrow':                'Peinture & Plâtrerie · Zurich',
      'hero.title':                  'Qualité suisse pour<br>constructions neuves, rénovations<br>et entretien',
      'hero.sub':                    'Gebrüder Sadriji accompagne les projets privés et commerciaux avec un savoir-faire précis, une communication fiable et une exécution dans les délais.',
      'hero.cta.primary':            'Demande gratuite',
      'hero.cta.call':               'Appeler maintenant',
      'hero.card.label':             'Votre entreprise en un coup d\'œil',
      'hero.card.fact1':             'En activité depuis 2006',
      'hero.card.fact2':             'Des professionnels qualifiés forts de décennies d\'expérience',
      'hero.card.fact3':             '8 collaborateurs',
      'trust.experience':            'Des décennies d\'expérience',
      'trust.quality':               'Qualité suisse',
      'trust.punctual':              'Dans les délais & propre',
      'trust.reachable':             'Disponible 24h/24 par téléphone',
      'about.eyebrow':               'À propos',
      'about.title':                 'Votre partenaire fiable pour la peinture et la plâtrerie à Zurich',
      'about.intro':                 'Gebrüder Sadriji est une entreprise spécialisée zurichoise pour les travaux de peinture, de plâtrerie, de rénovation et de transformation. Nous associons le savoir-faire artisanal à une méthode de travail bien organisée et prenons en charge des mandats, d\'une seule pièce jusqu\'à une rénovation complète.',
      'stats.experience':            'Années d\'expérience',
      'stats.founded':               'Années d\'existence',
      'stats.employees':             'Collaborateurs',
      'usp.eyebrow':                 'Nos atouts',
      'usp.title':                   'Pourquoi Gebrüder Sadriji ?',
      'usp.intro':                   'Ce qui nous distingue des autres entreprises – et pourquoi les clients choisissent Gebrüder Sadriji.',
      'usp.card1.title':             'Une équipe forte grâce à des compétences variées',
      'usp.card1.text':              'La qualité naît lorsque les compétences sont utilisées de manière ciblée. Notre équipe réunit des spécialistes expérimentés aux atouts variés, dotés d\'un solide savoir-faire et d\'une grande maîtrise artisanale. Nous réalisons ainsi chaque projet de manière efficace, précise et à un niveau de qualité élevé.',
      'usp.card2.title':             'Qualité suisse',
      'usp.card2.text':              'Nous travaillons exclusivement avec des matériaux de haute qualité et selon les normes suisses – visible dans chaque coup de pinceau et chaque surface.',
      'usp.card3.title':             'Domaines d\'expertise variés',
      'usp.card3.text':              'Nous couvrons différents travaux de peinture, de plâtrerie, de rénovation et de transformation – adaptés à chaque mandat.',
      'usp.card4.title':             'Vos demandes directement chez nous',
      'usp.card4.text':              'Les demandes par téléphone et par écrit sont reçues personnellement et transmises en interne au spécialiste compétent.',
      'services.eyebrow':            'Ce que nous proposons',
      'services.title':              'Nos prestations',
      'services.intro':              'Des solutions individuelles pour des projets résidentiels, commerciaux et de transformation à Zurich et dans les environs.',
      'services.onRequest':          'Autres travaux sur demande',
      'services.painting.title':     'Peinture',
      'services.painting.li1':       'Peintures intérieures pour espaces résidentiels et commerciaux',
      'services.painting.li2':       'Peintures de rénovation lors d\'assainissements',
      'services.painting.li3':       'Travaux de préparation, de protection et de finition soignés',
      'services.plaster.title':      'Plâtrerie',
      'services.plaster.li1':        'Travaux d\'enduit en intérieur et en extérieur',
      'services.plaster.li2':        'Travaux de lissage Q1–Q4 pour différentes exigences de qualité',
      'services.plaster.li3':        'Travaux préparatoires de plâtrerie pour cloisons sèches et plafonds',
      'services.plaster.li4':        'Réparation et remise en état de surfaces existantes',
      'services.renovation.title':   'Rénovation & entretien',
      'services.renovation.li1':     'Forfaits de rénovation coordonnés en une seule main',
      'services.renovation.li2':     'Travaux de protection et de masquage soignés',
      'services.renovation.li3':     'Exécution dans les délais avec une communication claire',
      'services.conversion.title':   'Transformation',
      'services.conversion.li1':     'Transformations complètes d\'espaces résidentiels et commerciaux',
      'services.conversion.li2':     'Changements d\'affectation avec planification claire',
      'services.conversion.li3':     'Assainissements en une seule main avec corps de métier coordonnés',
      'services.drywall.title':      'Construction sèche',
      'services.drywall.li1':        'Cloisons pour des concepts d\'espace flexibles',
      'services.drywall.li2':        'Plafonds suspendus pour la technique et l\'acoustique',
      'services.drywall.li3':        'Isolations thermiques, acoustiques et coupe-feu',
      'services.masonry.title':      'Construction humide',
      'services.masonry.li1':        'Maçonnerie et enduits en construction conventionnelle',
      'services.masonry.li2':        'Réalisation professionnelle de zones humides',
      'process.eyebrow':             'Notre déroulement',
      'process.title':               'Comment nous travaillons',
      'process.intro':               'Du premier contact jusqu\'à la remise soignée – transparent et fiable en quatre étapes.',
      'process.step1.title':         'Demande',
      'process.step1.text':          'Contactez-nous par formulaire, téléphone ou e-mail. Nous répondons dans les 24 heures.',
      'process.step2.title':         'Conseil & offre',
      'process.step2.text':          'Nous visitons le site, vous conseillons et établissons une offre transparente et contraignante.',
      'process.step3.title':         'Exécution',
      'process.step3.text':          'Notre équipe expérimentée réalise les travaux dans les délais, proprement et avec le plus grand soin.',
      'process.step4.title':         'Réception',
      'process.step4.text':          'Réception commune, contrôle qualité et remise soignée – seulement lorsque vous êtes entièrement satisfait.',
      'contact.eyebrow':             'Demande gratuite',
      'contact.title':               'Contact & demande',
      'contact.intro':               'Envoyez-nous votre demande – nous vous répondrons rapidement avec une solution adaptée.',
      'contact.direct':              'Contact direct',
      'contact.reachable':           'Disponible 24h/24 par téléphone',
      'contact.callBtn':             'Appeler maintenant : +41 78 255 88 25',
      'contact.whatsapp':            'Écrire via WhatsApp Business',
      'form.name':                   'Nom *',
      'form.name.placeholder':       'Votre nom complet',
      'form.email':                  'E-mail',
      'form.email.placeholder':      'votre@email.ch',
      'form.phone':                  'Téléphone',
      'form.contactHint':            'Veuillez indiquer au moins une adresse e-mail ou un numéro de téléphone afin que nous puissions vous joindre.',
      'form.subject':                'Objet / prestation *',
      'form.subject.placeholder':    'p. ex. peinture intérieure, travaux d\'enduit …',
      'form.message':                'Message *',
      'form.message.placeholder':    'Décrivez brièvement votre projet …',
      'form.location':               'Lieu / adresse de l\'objet',
      'form.location.placeholder':   'p. ex. Musterstrasse 1, 8000 Zürich',
      'form.period':                 'Période souhaitée',
      'form.period.placeholder':     'p. ex. dès août, flexible …',
      'form.customerType':           'Type de client',
      'form.customerType.private':   'Particulier',
      'form.customerType.management':'Gérance',
      'form.customerType.company':   'Entreprise',
      'form.objectType':             'Type d\'objet',
      'form.objectType.apartment':   'Appartement',
      'form.objectType.house':       'Maison',
      'form.objectType.office':      'Bureau',
      'form.objectType.commercial':  'Commercial',
      'form.objectType.construction':'Chantier',
      'form.objectType.other':       'Autre',
      'form.scope':                  'Ampleur approximative',
      'form.scope.placeholder':      'p. ex. appartement de 3.5 pièces, env. 80 m² …',
      'form.visit':                  'Visite sur place souhaitée',
      'form.visit.yes':              'Oui',
      'form.visit.no':               'Non',
      'form.visit.open':             'Encore ouvert',
      'form.select.placeholder':     'Veuillez choisir',
      'form.privacy':                'J\'ai lu la politique de confidentialité et j\'accepte le traitement de mes données pour répondre à ma demande. *',
      'form.privacy.link':           'Politique de confidentialité',
      'form.submit':                 'Envoyer la demande',
      'form.sending':                'Envoi en cours …',
      'form.success':                'Merci pour votre demande. Nous avons bien reçu vos informations et vous recontacterons dans les meilleurs délais.',
      'form.error.fields':           'Veuillez remplir correctement tous les champs obligatoires.',
      'form.error.contact':          'Veuillez indiquer au moins une adresse e-mail ou un numéro de téléphone.',
      'form.error.send':             'Votre demande n\'a malheureusement pas pu être envoyée. Veuillez réessayer ou nous contacter directement par téléphone au +41 78 255 88 25.',
      'form.mailOpened':             'Votre application de messagerie a été ouverte. Veuillez envoyer le message pour finaliser votre demande.',
      'footer.tagline':              'Peinture et plâtrerie<br><br>Gebr. Sadriji Gipserarbeiten, Inhaber Skender Sadriji<br>Altwiesenstrasse 199, 8051 Zürich, Schweiz · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Mentions légales',
      'footer.imprint':              'Mentions légales',
      'footer.agb':                  'CGV',
      'footer.privacy':              'Protection des données',
      'footer.rights':               'Tous droits réservés.',
      'footer.cookieSettings':       'Paramètres des cookies',
      'floatingBtn.text':            'Appeler maintenant',
      'nav.menuOpen':                'Ouvrir le menu',
      'nav.menuClose':               'Fermer le menu',
      'meta.description':            'Gebrüder Sadriji – Zurich : travaux de peinture, de plâtrerie, de rénovation, de transformation, de cloisons sèches et de maçonnerie en qualité suisse. Des professionnels qualifiés forts de décennies d\'expérience. Demandez une offre gratuite ou appelez-nous.',
      'form.email.subject':          'Nouvelle demande via le site web Gebrüder Sadriji',
    },

    it: {
      'a11y.skip':                   'Vai al contenuto principale',
      'nav.start':                   'Inizio',
      'nav.about':                   'Chi siamo',
      'nav.services':                'Servizi',
      'nav.process':                 'Procedura',
      'nav.contact':                 'Contatto',
      'nav.cta':                     'Richiesta gratuita',
      'hero.eyebrow':                'Pittura & Intonacatura · Zurigo',
      'hero.title':                  'Qualità svizzera per<br>nuove costruzioni, ristrutturazioni<br>e manutenzione',
      'hero.sub':                    'Gebrüder Sadriji accompagna progetti privati e commerciali con artigianato preciso, comunicazione affidabile ed esecuzione puntuale.',
      'hero.cta.primary':            'Richiesta gratuita',
      'hero.cta.call':               'Chiama ora',
      'hero.card.label':             'La vostra azienda in sintesi',
      'hero.card.fact1':             'Attività dal 2006',
      'hero.card.fact2':             'Professionisti qualificati con decenni di esperienza',
      'hero.card.fact3':             '8 collaboratori',
      'trust.experience':            'Decenni di esperienza',
      'trust.quality':               'Qualità svizzera',
      'trust.punctual':              'Puntuali & precisi',
      'trust.reachable':             'Raggiungibili 24h/24 per telefono',
      'about.eyebrow':               'Chi siamo',
      'about.title':                 'Il vostro partner affidabile per lavori di pittura e intonacatura a Zurigo',
      'about.intro':                 'Gebrüder Sadriji è un\'azienda specializzata di Zurigo per lavori di pittura, intonacatura, ristrutturazione e trasformazione. Uniamo il know-how artigianale a un metodo di lavoro ben organizzato e seguiamo incarichi dal singolo locale fino alla ristrutturazione completa.',
      'stats.experience':            'Anni di esperienza',
      'stats.founded':               'Anni di attività',
      'stats.employees':             'Collaboratori',
      'usp.eyebrow':                 'I nostri punti di forza',
      'usp.title':                   'Perché Gebrüder Sadriji?',
      'usp.intro':                   'Ciò che ci distingue dagli altri – e perché i clienti scelgono Gebrüder Sadriji.',
      'usp.card1.title':             'Un team forte grazie a competenze diverse',
      'usp.card1.text':              'La qualità nasce quando le competenze vengono impiegate in modo mirato. Il nostro team riunisce professionisti esperti con punti di forza diversi, solide conoscenze tecniche e abilità artigianale. Così realizziamo ogni progetto in modo efficiente, preciso e a un elevato livello di qualità.',
      'usp.card2.title':             'Qualità svizzera',
      'usp.card2.text':              'Lavoriamo esclusivamente con materiali di alta qualità e secondo gli standard svizzeri – visibile in ogni pennellata e ogni superficie.',
      'usp.card3.title':             'Settori specialistici versatili',
      'usp.card3.text':              'Copriamo diversi lavori di pittura, intonacatura, ristrutturazione e trasformazione – su misura per ogni incarico.',
      'usp.card4.title':             'Richieste direttamente da noi',
      'usp.card4.text':              'Le richieste telefoniche e scritte vengono ricevute personalmente e inoltrate internamente allo specialista competente.',
      'services.eyebrow':            'Cosa offriamo',
      'services.title':              'I nostri servizi',
      'services.intro':              'Soluzioni individuali per progetti residenziali, commerciali e di ristrutturazione a Zurigo e dintorni.',
      'services.onRequest':          'Ulteriori lavori su richiesta',
      'services.painting.title':     'Pittura',
      'services.painting.li1':       'Pitture interne per spazi residenziali e commerciali',
      'services.painting.li2':       'Pitture di ristrutturazione durante i risanamenti',
      'services.painting.li3':       'Lavori accurati di preparazione, mascheratura e finitura',
      'services.plaster.title':      'Intonacatura',
      'services.plaster.li1':        'Lavori di intonaco per interni ed esterni',
      'services.plaster.li2':        'Stuccature Q1–Q4 per diversi requisiti di qualità',
      'services.plaster.li3':        'Lavori di intonacatura preparatoria per sistemi a secco e controsoffitti',
      'services.plaster.li4':        'Riparazione e ripristino di superfici esistenti',
      'services.renovation.title':   'Ristrutturazione & manutenzione',
      'services.renovation.li1':     'Pacchetti di ristrutturazione coordinati da un\'unica fonte',
      'services.renovation.li2':     'Lavori accurati di protezione e mascheratura',
      'services.renovation.li3':     'Esecuzione puntuale con comunicazione chiara',
      'services.conversion.title':   'Trasformazione',
      'services.conversion.li1':     'Trasformazioni complete di spazi residenziali e commerciali',
      'services.conversion.li2':     'Cambi di destinazione d\'uso con pianificazione chiara',
      'services.conversion.li3':     'Risanamenti da un\'unica fonte con mestieri coordinati',
      'services.drywall.title':      'Costruzione a secco',
      'services.drywall.li1':        'Pareti divisorie per concetti spaziali flessibili',
      'services.drywall.li2':        'Controsoffitti per impianti e acustica',
      'services.drywall.li3':        'Isolamenti termici, acustici e antincendio',
      'services.masonry.title':      'Costruzione umida',
      'services.masonry.li1':        'Muratura e intonacatura nella costruzione convenzionale',
      'services.masonry.li2':        'Esecuzione professionale di aree bagnate',
      'process.eyebrow':             'Il nostro approccio',
      'process.title':               'Come lavoriamo',
      'process.intro':               'Dal primo contatto alla consegna accurata – trasparente e affidabile in quattro fasi.',
      'process.step1.title':         'Richiesta',
      'process.step1.text':          'Contattateci tramite modulo, telefono o e-mail. Vi risponderemo entro 24 ore.',
      'process.step2.title':         'Consulenza & offerta',
      'process.step2.text':          'Visitiamo il sito, vi consigliamo e predisponiamo un\'offerta trasparente e vincolante.',
      'process.step3.title':         'Esecuzione',
      'process.step3.text':          'Il nostro team esperto esegue i lavori puntualmente, in modo accurato e con la massima cura.',
      'process.step4.title':         'Collaudo',
      'process.step4.text':          'Collaudo congiunto, controllo qualità e consegna accurata – solo quando siete completamente soddisfatti.',
      'contact.eyebrow':             'Richiesta gratuita',
      'contact.title':               'Contatto & richiesta',
      'contact.intro':               'Inviateci la vostra richiesta – vi risponderemo tempestivamente con una soluzione adatta.',
      'contact.direct':              'Contatto diretto',
      'contact.reachable':           'Raggiungibili 24h/24 per telefono',
      'contact.callBtn':             'Chiama ora: +41 78 255 88 25',
      'contact.whatsapp':            'Scrivi via WhatsApp Business',
      'form.name':                   'Nome *',
      'form.name.placeholder':       'Il vostro nome completo',
      'form.email':                  'E-mail',
      'form.email.placeholder':      'vostro@email.ch',
      'form.phone':                  'Telefono',
      'form.contactHint':            'Indicate almeno un indirizzo e-mail o un numero di telefono così da potervi contattare.',
      'form.subject':                'Oggetto / servizio *',
      'form.subject.placeholder':    'es. pittura interna, lavori di intonaco …',
      'form.message':                'Messaggio *',
      'form.message.placeholder':    'Descrivete brevemente il vostro progetto …',
      'form.location':               'Luogo / indirizzo dell\'oggetto',
      'form.location.placeholder':   'es. Musterstrasse 1, 8000 Zürich',
      'form.period':                 'Periodo desiderato',
      'form.period.placeholder':     'es. da agosto, flessibile …',
      'form.customerType':           'Tipo di cliente',
      'form.customerType.private':   'Privato',
      'form.customerType.management':'Amministrazione',
      'form.customerType.company':   'Azienda',
      'form.objectType':             'Tipo di oggetto',
      'form.objectType.apartment':   'Appartamento',
      'form.objectType.house':       'Casa',
      'form.objectType.office':      'Ufficio',
      'form.objectType.commercial':  'Commerciale',
      'form.objectType.construction':'Cantiere',
      'form.objectType.other':       'Altro',
      'form.scope':                  'Entità approssimativa',
      'form.scope.placeholder':      'es. appartamento di 3.5 locali, ca. 80 m² …',
      'form.visit':                  'Sopralluogo desiderato',
      'form.visit.yes':              'Sì',
      'form.visit.no':               'No',
      'form.visit.open':             'Ancora da definire',
      'form.select.placeholder':     'Si prega di scegliere',
      'form.privacy':                'Ho letto l\'informativa sulla privacy e acconsento al trattamento dei miei dati per rispondere alla mia richiesta. *',
      'form.privacy.link':           'Informativa sulla privacy',
      'form.submit':                 'Invia richiesta',
      'form.sending':                'Invio in corso …',
      'form.success':                'Grazie per la vostra richiesta. Abbiamo ricevuto i vostri dati e vi contatteremo il prima possibile.',
      'form.error.fields':           'Si prega di compilare correttamente tutti i campi obbligatori.',
      'form.error.contact':          'Indicate almeno un indirizzo e-mail o un numero di telefono.',
      'form.error.send':             'Purtroppo non è stato possibile inviare la richiesta. Riprovate o contattateci direttamente per telefono al +41 78 255 88 25.',
      'form.mailOpened':             'La vostra applicazione di posta è stata aperta. Si prega di inviare il messaggio per completare la richiesta.',
      'footer.tagline':              'Pittura e intonacatura<br><br>Gebr. Sadriji Gipserarbeiten, Inhaber Skender Sadriji<br>Altwiesenstrasse 199, 8051 Zürich, Schweiz · UID CHE-113.308.264',
      'footer.navTitle':             'Navigazione',
      'footer.legalTitle':           'Note legali',
      'footer.imprint':              'Note legali',
      'footer.agb':                  'CGV',
      'footer.privacy':              'Protezione dei dati',
      'footer.rights':               'Tutti i diritti riservati.',
      'footer.cookieSettings':       'Impostazioni dei cookie',
      'floatingBtn.text':            'Chiama ora',
      'nav.menuOpen':                'Apri menu',
      'nav.menuClose':               'Chiudi menu',
      'meta.description':            'Gebrüder Sadriji – Zurigo: lavori di pittura, intonacatura, ristrutturazione, trasformazione, cartongesso e muratura in qualità svizzera. Professionisti qualificati con decenni di esperienza. Richiedete un\'offerta gratuita o chiamateci.',
      'form.email.subject':          'Nuova richiesta tramite il sito web Gebrüder Sadriji',
    },
  };

  /* ================================================================
     I18N CORE – Sprache setzen, DOM aktualisieren
  ================================================================ */
  const SUPPORTED_LANGS = ['de', 'en', 'fr', 'it'];
  const DEFAULT_LANG    = 'de';
  const LS_KEY          = 'gs-lang';

  let currentLang = DEFAULT_LANG;

  /**
   * Ermittelt die bevorzugte Sprache:
   * 1. localStorage-Einstellung
   * 2. Browser-Sprache (nur, wenn unterstützt)
   * 3. Fallback: Deutsch
   */
  const detectLang = () => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

    const browser = (navigator.language || '').toLowerCase().substring(0, 2);
    if (SUPPORTED_LANGS.includes(browser)) return browser;

    return DEFAULT_LANG;
  };

  /**
   * Übersetzt einen einzelnen Schlüssel; fällt auf Deutsch zurück.
   */
  const t = (key, lang) => {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    return dict[key] ?? translations[DEFAULT_LANG][key] ?? key;
  };

  /** Explizite Sprach-Code-Zuordnung für das <html lang="…"> Attribut */
  const LANG_CODES = { de: 'de-CH', en: 'en', fr: 'fr-CH', it: 'it-CH' };

  /**
   * Aktualisiert alle [data-i18n], [data-i18n-html] und [data-i18n-placeholder] Elemente.
   * data-i18n       → setzt textContent (XSS-sicher)
   * data-i18n-html  → setzt innerHTML nur für explizit markierte, vertrauenswürdige Elemente
   *                    (ausschliesslich eigene, statische Übersetzungsstrings, kein User-Input)
   */
  const applyTranslations = (lang) => {
    // Reiner Textinhalt – kein HTML-Parsing
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });

    // Explizit als HTML markierte Elemente.
    // Unterstützt nur <br> – wird sicher über DOM-Methoden gesetzt, kein innerHTML.
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const text  = t(el.getAttribute('data-i18n-html'), lang);
      const parts = text.split(/\s*<br\s*\/?\s*>\s*/i);
      el.textContent = '';
      parts.forEach((part, i) => {
        el.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) el.appendChild(document.createElement('br'));
      });
    });

    // Placeholder-Attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key, lang);
    });

    // <html lang="…"> aktualisieren
    document.documentElement.lang = LANG_CODES[lang] ?? lang;

    // Aktiver Zustand der Sprach-Buttons
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // Formular-Feedback-Text im dynamischen State aktualisieren
    currentLang = lang;

    // Nav-Toggle aria-label aktualisieren (sprachgerecht)
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-label', t(isOpen ? 'nav.menuClose' : 'nav.menuOpen', lang));
    }

    // Meta-Description aktualisieren (SEO für alle Sprachen)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description', lang));

    // Formspree-Betreff sprachgerecht setzen
    const subjectField = document.querySelector('input[name="_subject"]');
    if (subjectField) subjectField.value = t('form.email.subject', lang);
  };

  /**
   * Sprache setzen, speichern und anwenden.
   */
  const setLang = (lang) => {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    localStorage.setItem(LS_KEY, lang);
    applyTranslations(lang);
  };

  // Initialisierung
  const initLang = detectLang();
  applyTranslations(initLang);

  // Sprach-Buttons aktivieren
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  /* ================================================================
     BURGER-MENÜ (mobil)
  ================================================================ */
  const navToggle       = document.querySelector('.nav-toggle');
  const mainNav         = document.querySelector('.main-nav');
  const navLinks        = document.querySelectorAll('.main-nav a');
  const desktopNavMedia = window.matchMedia('(min-width: 48rem)');

  if (navToggle && mainNav) {
    const syncNavHeight = () => {
      if (desktopNavMedia.matches) { mainNav.style.maxHeight = ''; return; }
      mainNav.style.maxHeight = mainNav.classList.contains('open')
        ? `${mainNav.scrollHeight}px` : '0px';
    };

    const closeNav = () => {
      mainNav.classList.remove('open');
      mainNav.setAttribute('aria-hidden', desktopNavMedia.matches ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', t('nav.menuOpen', currentLang));
      syncNavHeight();
    };

    const openNav = () => {
      mainNav.classList.add('open');
      mainNav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', t('nav.menuClose', currentLang));
      syncNavHeight();
    };

    const toggleNav = () => mainNav.classList.contains('open') ? closeNav() : openNav();

    closeNav();
    syncNavHeight();

    navToggle.addEventListener('click', (event) => { event.stopPropagation(); toggleNav(); });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => { if (!desktopNavMedia.matches) closeNav(); });
    });

    document.addEventListener('click', (event) => {
      if (!mainNav.classList.contains('open') || desktopNavMedia.matches) return;
      if (mainNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });

    const handleDesktopChange = () => { closeNav(); syncNavHeight(); };
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
  if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());

  /* ================================================================
     STICKY-HEADER
  ================================================================ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const updateHeader = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ================================================================
     SCROLL-FORTSCHRITTSBALKEN
  ================================================================ */
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0).toFixed(2) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ================================================================
     SMOOTH-SCROLLING mit korrektem Offset
  ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const isTopAnchor = targetId === '#top' || (anchor.classList.contains('logo') && targetId === '#start');
      const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
      const targetPosition = isTopAnchor
        ? 0
        : targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      if (prefersReducedMotion()) {
        window.scrollTo({ top: targetPosition });
      } else {
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }

      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
      targetElement.addEventListener('blur', () => {
        targetElement.removeAttribute('tabindex');
      }, { once: true });
    });
  });

  /* ================================================================
     SCROLL-REVEAL (IntersectionObserver)
  ================================================================ */
  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ================================================================
     COUNT-UP ANIMATION
  ================================================================ */
  const countUpElements = document.querySelectorAll('.stat-value[data-count]');

  if (countUpElements.length && !prefersReducedMotion() && 'IntersectionObserver' in window) {
    const animateCount = (el, end, suffix, duration) => {
      const startTime = performance.now();
      const step = (currentTime) => {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.round(eased * end) + suffix;
        if (progress < 1) requestAnimationFrame(step);
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
     KONTAKTFORMULAR – Validierung und mailto-Fallback
  ================================================================ */
  const form     = document.getElementById('anfrageformular');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    const requiredFields       = Array.from(form.querySelectorAll('[required]'));
    const emailField           = form.querySelector('#email');
    const phoneField           = form.querySelector('#telefon');
    const submitButton         = form.querySelector('button[type="submit"]');
    const submitButtonLabel    = submitButton?.querySelector('.btn-label');

    const normalizeSingleLine = (value) =>
      String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

    const normalizeMultiLine = (value) =>
      String(value ?? '').replace(/\u0000/g, '').trim();

    const setInvalidState   = (field) => field.classList.add('is-invalid');
    const clearInvalidState = (field) => field.classList.remove('is-invalid');

    const setFeedback = (message, type = '') => {
      feedback.textContent = message;
      feedback.classList.remove('is-success', 'is-error');
      if (type) feedback.classList.add(type === 'success' ? 'is-success' : 'is-error');
    };

    const setSubmittingState = (isSubmitting) => {
      form.setAttribute('aria-busy', String(isSubmitting));
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.setAttribute('aria-disabled', String(isSubmitting));
      if (submitButtonLabel) {
        submitButtonLabel.textContent = isSubmitting
          ? t('form.sending', currentLang)
          : t('form.submit', currentLang);
      }
    };

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) clearInvalidState(field);
      });
    });

    // E-Mail/Telefon: Invalid-Markierung beim Tippen zurücksetzen
    [emailField, phoneField].forEach((field) => {
      if (!field) return;
      field.addEventListener('input', () => {
        const emailVal = emailField ? emailField.value.trim() : '';
        const phoneVal = phoneField ? phoneField.value.trim() : '';
        if (emailVal || phoneVal) {
          if (emailField && (!emailVal || emailField.checkValidity())) clearInvalidState(emailField);
          if (phoneField) clearInvalidState(phoneField);
        }
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback('');

      let formIsValid = true;
      requiredFields.forEach((field) => {
        if (!field.checkValidity()) { formIsValid = false; setInvalidState(field); }
        else clearInvalidState(field);
      });

      // Mindestens E-Mail oder Telefon, und gültiges E-Mail-Format, falls angegeben
      const emailValue = emailField ? emailField.value.trim() : '';
      const phoneValue = phoneField ? phoneField.value.trim() : '';
      let contactMissing = false;

      if (emailField && phoneField && !emailValue && !phoneValue) {
        formIsValid = false;
        contactMissing = true;
        setInvalidState(emailField);
        setInvalidState(phoneField);
      } else {
        if (emailField && phoneField) {
          if (phoneValue) clearInvalidState(phoneField);
          if (emailValue) clearInvalidState(emailField);
        }
        // E-Mail-Format nur prüfen, wenn eine E-Mail eingegeben wurde
        if (emailField && emailValue && !emailField.checkValidity()) {
          formIsValid = false;
          setInvalidState(emailField);
        }
      }

      if (!formIsValid) {
        setFeedback(
          contactMissing ? t('form.error.contact', currentLang) : t('form.error.fields', currentLang),
          'error'
        );
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formData  = new FormData(form);
      const endpoint  = form.getAttribute('action') || '';
      const hasPlaceholder = endpoint.includes('FORM_ID_PLATZHALTER');

      if (hasPlaceholder) {
        const contactEmail = 'kontakt@gebrueder-sadriji.ch';
        const name       = normalizeSingleLine(formData.get('name'));
        const email      = normalizeSingleLine(formData.get('email'));
        const phone      = normalizeSingleLine(formData.get('telefon'));
        const message    = normalizeMultiLine(formData.get('nachricht'));
        const subjectRaw = normalizeSingleLine(formData.get('betreff')) || 'Neue Anfrage';
        const bodyRaw    = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`;
        const params     = new URLSearchParams({ subject: `Anfrage: ${subjectRaw}`, body: bodyRaw });
        window.location.href = `mailto:${contactEmail}?${params.toString()}`;
        setFeedback(t('form.mailOpened', currentLang));
        form.reset();
        return;
      }

      try {
        setSubmittingState(true);
        const response = await fetch(endpoint, {
          method: 'POST', body: formData, headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          let errorMessage = t('form.error.send', currentLang);
          try {
            const data = await response.json();
            const formspreeErrors = Array.isArray(data?.errors)
              ? data.errors.map((e) => e?.message).filter(Boolean) : [];
            if (formspreeErrors.length) {
              errorMessage = `${formspreeErrors.join('. ')}. ${t('form.error.send', currentLang)}`;
            }
          } catch (_) { /* ignorieren */ }
          throw new Error(errorMessage);
        }

        setFeedback(t('form.success', currentLang), 'success');
        form.reset();
        if (typeof window.trackContactFormSubmit === 'function') {
          window.trackContactFormSubmit();
        }
      } catch (error) {
        setFeedback(
          error instanceof Error ? error.message : t('form.error.send', currentLang),
          'error'
        );
      } finally {
        setSubmittingState(false);
      }
    });
  }
})();
