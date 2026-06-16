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
      'hero.card.fact1':             '19 Jahre Firmenbestehen',
      'hero.card.fact2':             'Über 40 Jahre Erfahrung',
      'hero.card.fact3':             '8 Mitarbeitende',
      'trust.experience':            'Über 40 Jahre Erfahrung',
      'trust.quality':               'Schweizer Qualität',
      'trust.punctual':              'Termingerecht & sauber',
      'trust.reachable':             '24/7 telefonisch erreichbar',
      'about.eyebrow':               'Über uns',
      'about.title':                 'Seit 19 Jahren Ihr verlässlicher<br>Partner in Zürich',
      'about.intro':                 'Gebrüder Sadriji steht in Zürich für hochwertige Maler- und Gipserarbeiten. Mit über 40 Jahren Erfahrung im Team setzen wir Projekte sauber, effizient und in Schweizer Qualität um – von der Erstberatung bis zur Endabnahme.',
      'stats.experience':            'Jahre Erfahrung',
      'stats.founded':               'Jahre Firmenbestehen',
      'stats.employees':             'Mitarbeitende',
      'usp.eyebrow':                 'Unsere Stärken',
      'usp.title':                   'Warum Gebrüder Sadriji?',
      'usp.intro':                   'Was uns von anderen Betrieben unterscheidet – und warum Kunden seit Jahren auf uns zählen.',
      'usp.card1.title':             '40+ Jahre Erfahrung',
      'usp.card1.text':              'Unser Team bringt über 40 Jahre kumuliertes Fachwissen in Maler- und Gipserarbeiten mit – für jedes Projekt die optimale Lösung.',
      'usp.card2.title':             'Schweizer Qualität',
      'usp.card2.text':              'Wir arbeiten ausschliesslich mit hochwertigen Materialien und nach Schweizer Standards – sichtbar in jedem Pinselstrich und jeder Oberfläche.',
      'usp.card3.title':             'Zuverlässig & termingerecht',
      'usp.card3.text':              'Klare Absprachen, pünktliche Ausführung und transparente Kommunikation vom ersten Kontakt bis zur Übergabe.',
      'usp.card4.title':             'Persönlicher Service',
      'usp.card4.text':              'Familienbetrieb mit direktem Kontakt – kein Callcenter, kein Weitervermitteln. Sie sprechen immer mit den Menschen, die Ihre Arbeit ausführen.',
      'services.eyebrow':            'Was wir anbieten',
      'services.title':              'Unsere Leistungen',
      'services.intro':              'Individuelle Lösungen für Wohn-, Gewerbe- und Umbauprojekte in Zürich und Umgebung.',
      'services.onRequest':          'Weitere Arbeiten auf Anfrage',
      'services.painting.title':     'Malerarbeiten',
      'services.painting.li1':       'Innenanstriche für Wohn- und Geschäftsflächen',
      'services.painting.li2':       'Renovationsanstriche bei Sanierungen',
      'services.painting.li3':       'Saubere Vorbereitungs-, Abdeck- und Abschlussarbeiten',
      'services.plaster.title':      'Gipserarbeiten',
      'services.plaster.li1':        'Verputzarbeiten im Innen- und Aussenbereich',
      'services.plaster.li2':        'Q1–Q4 Spachtelarbeiten für unterschiedliche Qualitätsanforderungen',
      'services.plaster.li3':        'Vorbereitende Gipserarbeiten für Trockenbau- und Deckensysteme',
      'services.plaster.li4':        'Reparatur und Instandsetzung bestehender Flächen',
      'services.renovation.title':   'Renovation & Unterhalt',
      'services.renovation.li1':     'Koordinierte Renovationspakete aus einer Hand',
      'services.renovation.li2':     'Saubere Abdeck- und Schutzarbeiten',
      'services.renovation.li3':     'Termingerechte Umsetzung mit klarer Kommunikation',
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
      'process.intro':               'Von der ersten Kontaktaufnahme bis zur sauberen Übergabe – transparent und verlässlich in vier Schritten.',
      'process.step1.title':         'Anfrage',
      'process.step1.text':          'Sie kontaktieren uns per Formular, Telefon oder E-Mail. Wir melden uns innert 24 Stunden zurück.',
      'process.step2.title':         'Beratung & Offerte',
      'process.step2.text':          'Wir besichtigen das Objekt, beraten Sie und erstellen eine transparente, verbindliche Offerte.',
      'process.step3.title':         'Ausführung',
      'process.step3.text':          'Unser erfahrenes Team führt die Arbeiten termingerecht, sauber und mit höchster Sorgfalt aus.',
      'process.step4.title':         'Abnahme',
      'process.step4.text':          'Gemeinsame Abnahme, Qualitätskontrolle und saubere Übergabe – erst wenn Sie vollständig zufrieden sind.',
      'contact.eyebrow':             'Kostenlose Anfrage',
      'contact.title':               'Kontakt & Anfrage',
      'contact.intro':               'Senden Sie uns Ihre Anfrage – wir melden uns zeitnah mit einer passenden Lösung.',
      'contact.direct':              'Direktkontakt',
      'contact.reachable':           '24/7 telefonisch erreichbar',
      'contact.callBtn':             'Jetzt anrufen: +41 78 255 88 25',
      'contact.whatsapp':            'WhatsApp Business schreiben',
      'form.name':                   'Name *',
      'form.name.placeholder':       'Ihr vollständiger Name',
      'form.email':                  'E-Mail *',
      'form.email.placeholder':      'ihre@email.ch',
      'form.phone':                  'Telefon *',
      'form.subject':                'Betreff / Leistung *',
      'form.subject.placeholder':    'z. B. Innenanstrich, Verputzarbeiten …',
      'form.message':                'Nachricht *',
      'form.message.placeholder':    'Beschreiben Sie kurz Ihr Vorhaben …',
      'form.submit':                 'Anfrage senden',
      'form.sending':                'Wird gesendet …',
      'form.success':                'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.',
      'form.error.fields':           'Bitte füllen Sie alle Pflichtfelder korrekt aus.',
      'form.error.send':             'Senden aktuell nicht möglich. Bitte kontaktieren Sie uns alternativ telefonisch unter +41 78 255 88 25.',
      'form.mailOpened':             'Ihr Mailprogramm wurde geöffnet. Bitte Nachricht senden, um die Anfrage abzuschliessen.',
      'footer.tagline':              'Maler- und Gipserarbeiten<br>Altwiesenstrasse 199, 8051 Zürich, Schweiz · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Rechtliches',
      'footer.imprint':              'Impressum',
      'footer.agb':                  'AGB',
      'footer.privacy':              'Datenschutz',
      'footer.rights':               'Alle Rechte vorbehalten.',
      'floatingBtn.text':            'Jetzt anrufen',
      'nav.menuOpen':                'Menü öffnen',
      'nav.menuClose':               'Menü schliessen',
      'meta.description':            'Gebrüder Sadriji aus Zürich: Maler- und Gipserarbeiten in Schweizer Qualität. 40+ Jahre Erfahrung. Kostenlose Anfrage senden oder telefonisch kontaktieren.',
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
      'hero.card.fact1':             '19 years in business',
      'hero.card.fact2':             'Over 40 years of experience',
      'hero.card.fact3':             '8 employees',
      'trust.experience':            'Over 40 years of experience',
      'trust.quality':               'Swiss quality',
      'trust.punctual':              'On time & clean',
      'trust.reachable':             'Available 24/7 by phone',
      'about.eyebrow':               'About us',
      'about.title':                 '19 years as your reliable<br>partner in Zurich',
      'about.intro':                 'Gebrüder Sadriji stands for high-quality painting and plastering work in Zurich. With over 40 years of team experience, we deliver projects cleanly, efficiently and to Swiss standards – from initial consultation to final handover.',
      'stats.experience':            'Years of experience',
      'stats.founded':               'Years in business',
      'stats.employees':             'Employees',
      'usp.eyebrow':                 'Our strengths',
      'usp.title':                   'Why Gebrüder Sadriji?',
      'usp.intro':                   'What sets us apart from other companies – and why clients have relied on us for years.',
      'usp.card1.title':             '40+ years of experience',
      'usp.card1.text':              'Our team brings over 40 years of accumulated expertise in painting and plastering – delivering the optimal solution for every project.',
      'usp.card2.title':             'Swiss quality',
      'usp.card2.text':              'We work exclusively with premium materials and to Swiss standards – visible in every brushstroke and every surface.',
      'usp.card3.title':             'Reliable & on schedule',
      'usp.card3.text':              'Clear agreements, punctual execution and transparent communication from first contact to handover.',
      'usp.card4.title':             'Personal service',
      'usp.card4.text':              'A family business with direct contact – no call centre, no transfers. You always speak with the people doing your work.',
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
      'form.email':                  'Email *',
      'form.email.placeholder':      'your@email.ch',
      'form.phone':                  'Phone *',
      'form.subject':                'Subject / service *',
      'form.subject.placeholder':    'e.g. interior painting, plastering …',
      'form.message':                'Message *',
      'form.message.placeholder':    'Please describe your project briefly …',
      'form.submit':                 'Send enquiry',
      'form.sending':                'Sending …',
      'form.success':                'Thank you! Your enquiry has been submitted successfully. We will be in touch shortly.',
      'form.error.fields':           'Please fill in all required fields correctly.',
      'form.error.send':             'Sending is currently unavailable. Please contact us by phone on +41 78 255 88 25.',
      'form.mailOpened':             'Your mail application has opened. Please send the message to complete your enquiry.',
      'footer.tagline':              'Painting & Plastering<br>Altwiesenstrasse 199, 8051 Zurich, Switzerland · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Legal',
      'footer.imprint':              'Imprint',
      'footer.agb':                  'T&Cs',
      'footer.privacy':              'Privacy policy',
      'footer.rights':               'All rights reserved.',
      'floatingBtn.text':            'Call now',
      'nav.menuOpen':                'Open menu',
      'nav.menuClose':               'Close menu',
      'meta.description':            'Gebrüder Sadriji – Zürich: Painting and plastering in Swiss quality. 40+ years of experience. Request a free quote or call us any time.',
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
      'hero.card.fact1':             '19 ans d\'existence',
      'hero.card.fact2':             'Plus de 40 ans d\'expérience',
      'hero.card.fact3':             '8 collaborateurs',
      'trust.experience':            'Plus de 40 ans d\'expérience',
      'trust.quality':               'Qualité suisse',
      'trust.punctual':              'Dans les délais & propre',
      'trust.reachable':             'Disponible 24h/24 par téléphone',
      'about.eyebrow':               'À propos',
      'about.title':                 '19 ans à vos côtés comme<br>partenaire fiable à Zurich',
      'about.intro':                 'Gebrüder Sadriji est synonyme de travaux de peinture et de plâtrerie de haute qualité à Zurich. Avec plus de 40 ans d\'expérience au sein de l\'équipe, nous réalisons vos projets avec soin, efficacité et selon les standards suisses – de la première consultation jusqu\'à la réception finale.',
      'stats.experience':            'Années d\'expérience',
      'stats.founded':               'Années d\'existence',
      'stats.employees':             'Collaborateurs',
      'usp.eyebrow':                 'Nos atouts',
      'usp.title':                   'Pourquoi Gebrüder Sadriji ?',
      'usp.intro':                   'Ce qui nous distingue des autres entreprises – et pourquoi nos clients nous font confiance depuis des années.',
      'usp.card1.title':             'Plus de 40 ans d\'expérience',
      'usp.card1.text':              'Notre équipe cumule plus de 40 ans de savoir-faire en peinture et plâtrerie – pour trouver la solution optimale à chaque projet.',
      'usp.card2.title':             'Qualité suisse',
      'usp.card2.text':              'Nous travaillons exclusivement avec des matériaux de haute qualité et selon les normes suisses – visible dans chaque coup de pinceau et chaque surface.',
      'usp.card3.title':             'Fiable & dans les délais',
      'usp.card3.text':              'Des accords clairs, une exécution ponctuelle et une communication transparente du premier contact jusqu\'à la livraison.',
      'usp.card4.title':             'Service personnalisé',
      'usp.card4.text':              'Une entreprise familiale avec un contact direct – pas de centre d\'appels, pas de transfert. Vous parlez toujours avec les personnes qui réalisent vos travaux.',
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
      'form.email':                  'E-mail *',
      'form.email.placeholder':      'votre@email.ch',
      'form.phone':                  'Téléphone *',
      'form.subject':                'Objet / prestation *',
      'form.subject.placeholder':    'p. ex. peinture intérieure, travaux d\'enduit …',
      'form.message':                'Message *',
      'form.message.placeholder':    'Décrivez brièvement votre projet …',
      'form.submit':                 'Envoyer la demande',
      'form.sending':                'Envoi en cours …',
      'form.success':                'Merci ! Votre demande a été transmise avec succès. Nous vous contacterons rapidement.',
      'form.error.fields':           'Veuillez remplir correctement tous les champs obligatoires.',
      'form.error.send':             'Envoi actuellement impossible. Veuillez nous contacter par téléphone au +41 78 255 88 25.',
      'form.mailOpened':             'Votre application de messagerie a été ouverte. Veuillez envoyer le message pour finaliser votre demande.',
      'footer.tagline':              'Peinture & Plâtrerie<br>Altwiesenstrasse 199, 8051 Zurich, Suisse · UID CHE-113.308.264',
      'footer.navTitle':             'Navigation',
      'footer.legalTitle':           'Mentions légales',
      'footer.imprint':              'Mentions légales',
      'footer.agb':                  'CGV',
      'footer.privacy':              'Protection des données',
      'footer.rights':               'Tous droits réservés.',
      'floatingBtn.text':            'Appeler maintenant',
      'nav.menuOpen':                'Ouvrir le menu',
      'nav.menuClose':               'Fermer le menu',
      'meta.description':            'Gebrüder Sadriji – Zurich : Travaux de peinture et de plâtrerie en qualité suisse. Plus de 40 ans d\'expérience. Demande gratuite ou contact téléphonique.',
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
      'hero.card.fact1':             '19 anni di attività',
      'hero.card.fact2':             'Oltre 40 anni di esperienza',
      'hero.card.fact3':             '8 collaboratori',
      'trust.experience':            'Oltre 40 anni di esperienza',
      'trust.quality':               'Qualità svizzera',
      'trust.punctual':              'Puntuali & precisi',
      'trust.reachable':             'Raggiungibili 24h/24 per telefono',
      'about.eyebrow':               'Chi siamo',
      'about.title':                 '19 anni come partner affidabile<br>a Zurigo',
      'about.intro':                 'Gebrüder Sadriji è sinonimo di lavori di pittura e intonacatura di alta qualità a Zurigo. Con oltre 40 anni di esperienza nel team, realizziamo i progetti in modo accurato, efficiente e secondo gli standard svizzeri – dalla prima consulenza al collaudo finale.',
      'stats.experience':            'Anni di esperienza',
      'stats.founded':               'Anni di attività',
      'stats.employees':             'Collaboratori',
      'usp.eyebrow':                 'I nostri punti di forza',
      'usp.title':                   'Perché Gebrüder Sadriji?',
      'usp.intro':                   'Ciò che ci distingue dagli altri – e perché i clienti si affidano a noi da anni.',
      'usp.card1.title':             'Oltre 40 anni di esperienza',
      'usp.card1.text':              'Il nostro team apporta oltre 40 anni di competenza accumulata in pittura e intonacatura – per trovare la soluzione ottimale per ogni progetto.',
      'usp.card2.title':             'Qualità svizzera',
      'usp.card2.text':              'Lavoriamo esclusivamente con materiali di alta qualità e secondo gli standard svizzeri – visibile in ogni pennellata e ogni superficie.',
      'usp.card3.title':             'Affidabili & puntuali',
      'usp.card3.text':              'Accordi chiari, esecuzione puntuale e comunicazione trasparente dal primo contatto alla consegna.',
      'usp.card4.title':             'Servizio personale',
      'usp.card4.text':              'Un\'azienda familiare con contatto diretto – nessun call center, nessun trasferimento. Parlerete sempre con le persone che eseguono il vostro lavoro.',
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
      'form.email':                  'E-mail *',
      'form.email.placeholder':      'vostro@email.ch',
      'form.phone':                  'Telefono *',
      'form.subject':                'Oggetto / servizio *',
      'form.subject.placeholder':    'es. pittura interna, lavori di intonaco …',
      'form.message':                'Messaggio *',
      'form.message.placeholder':    'Descrivete brevemente il vostro progetto …',
      'form.submit':                 'Invia richiesta',
      'form.sending':                'Invio in corso …',
      'form.success':                'Grazie! La vostra richiesta è stata inviata con successo. Vi contatteremo a breve.',
      'form.error.fields':           'Si prega di compilare correttamente tutti i campi obbligatori.',
      'form.error.send':             'Invio attualmente non disponibile. Contattateci telefonicamente al +41 78 255 88 25.',
      'form.mailOpened':             'La vostra applicazione di posta è stata aperta. Si prega di inviare il messaggio per completare la richiesta.',
      'footer.tagline':              'Pittura & Intonacatura<br>Altwiesenstrasse 199, 8051 Zurigo, Svizzera · UID CHE-113.308.264',
      'footer.navTitle':             'Navigazione',
      'footer.legalTitle':           'Note legali',
      'footer.imprint':              'Note legali',
      'footer.agb':                  'CGV',
      'footer.privacy':              'Protezione dei dati',
      'footer.rights':               'Tutti i diritti riservati.',
      'floatingBtn.text':            'Chiama ora',
      'nav.menuOpen':                'Apri menu',
      'nav.menuClose':               'Chiudi menu',
      'meta.description':            'Gebrüder Sadriji – Zurigo: Lavori di pittura e stucco in qualità svizzera. Oltre 40 anni di esperienza. Richiesta gratuita o contatto telefonico.',
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

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback('');

      let formIsValid = true;
      requiredFields.forEach((field) => {
        if (!field.checkValidity()) { formIsValid = false; setInvalidState(field); }
        else clearInvalidState(field);
      });

      if (!formIsValid) {
        setFeedback(t('form.error.fields', currentLang), 'error');
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
