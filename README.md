# Gebrüder Sadriji – Website

Professionelle, moderne und responsive Website für **Gebrüder Sadriji** (Maler- und Gipserarbeiten, Zürich, Schweiz).

## Features

- **Modernes UI** inspiriert an zeitgemässen Schweizer Handwerksbetrieben
- **Scroll-Reveal-Animationen** (Fade-in / Slide-up) via `IntersectionObserver`
- **Count-up-Animation** für Kennzahlen (startet beim Sichtbarwerden)
- **Flüssiges mobiles Burger-Menü** (sauberes Auf-/Zuklappen ohne Glitches)
- **Puls-/Glow-Effekt** auf dem 24/7-Notfall-Button
- **Sticky Header** mit Scroll-Verhalten (kompakter bei Scroll)
- **Scroll-Fortschrittsbalken** ganz oben
- **Hover-Effekte** auf allen Karten (translateY + Schatten, Galerie-Zoom)
- Vollständig **responsive** (Mobile, Tablet, Desktop)
- `prefers-reduced-motion` wird überall respektiert
- Keine Build-Tools, direkt **GitHub-Pages-tauglich**
- Alle Platzhalter klar markiert und leicht austauschbar

## Projektstruktur

```text
.
├── index.html              ← Haupt-HTML (Single-Page)
├── css/
│   └── style.css           ← Alle Styles (CSS-Variablen, Animationen, Layout)
├── js/
│   └── main.js             ← Burger-Menü, Animationen, Formular
├── assets/
│   ├── logo.png            ← Eingebundenes Firmenlogo im Header
│   ├── gebrüder sadriji logo transparent.png   ← Originaldatei aus dem Kunden-Upload
│   ├── logo-placeholder.svg
│   └── images/
│       └── reference-placeholder.svg
└── README.md
```

## Sektionen (Reihenfolge)

| Sektion            | ID              | Beschreibung                                              |
|--------------------|-----------------|-----------------------------------------------------------|
| Header/Nav         | –               | Sticky, Burger-Menü, CTA «Kostenlose Anfrage»            |
| Hero               | `#start`        | Grosser Hero, 2 CTAs, Kurzprofil-Karte                   |
| Trust-Strip        | –               | 4 Trust-Badges direkt unter dem Hero                      |
| Über uns           | `#ueber-uns`    | Einleitungstext + Count-up-Kennzahlen                     |
| Warum wir          | `#warum-wir`    | USP-Karten mit SVG-Icons (dunkler Hintergrund)            |
| Leistungen         | `#leistungen`   | 6 Leistungskarten inkl. Umbau, Trockenbau, Nassbau       |
| Ablauf             | `#ablauf`       | 4 Prozessschritte nummeriert                              |
| Referenzen         | `#referenzen`   | Bildergalerie (Platzhalter, zoom on hover)                |
| Kundenstimmen      | `#kundenstimmen`| 3 Testimonial-Karten (Platzhalter, Sternebewertung)       |
| Kontakt            | `#kontakt`      | Formular + Kontaktdaten + Notfall-CTA (dunkler HG)        |
| Footer             | –               | 3-spaltig: Firma, Navigation, Rechtliches                 |
| Floating-Button    | –               | Fixierter 24/7-Notfall-Button mit Puls-Animation          |

## Lokale Vorschau

```bash
cd <repository-ordner>
python3 -m http.server 8000
# Browser: http://localhost:8000
```

## Deployment mit GitHub Pages

Das Deployment erfolgt deterministisch über den GitHub-Actions-Workflow
`.github/workflows/deploy-pages.yml`. Dieser baut bei jedem Push auf `main`
(oder manuell via *Run workflow*) den kompletten Repo-Root inkl. `CNAME` und
`.nojekyll` und veröffentlicht ihn auf GitHub Pages. So liefert die Live-Seite
immer exakt den aktuellen `main`-Stand aus.

**Einmalige Einstellung:** Repository → **Settings → Pages** → *Build and
deployment* → **Source: `GitHub Actions`** auswählen. Damit übernimmt der obige
Workflow das Deployment (statt der älteren Branch-Quelle).

### Custom Domain (`www.gebrueder-sadriji.ch`)

- Die Datei `CNAME` im Repo-Root bindet die Custom-Domain dauerhaft an das GitHub-Pages-Deployment aus `main`. Sie muss erhalten bleiben, sonst kann die Domain-Bindung bei einem Redeploy verloren gehen und die Live-Seite über DNS (GoDaddy) eine alte/fremde Version ausliefern.
- Die leere Datei `.nojekyll` deaktiviert die Jekyll-Verarbeitung, sodass GitHub Pages alle Dateien exakt wie im `main`-Branch ausliefert.
- DNS (GoDaddy): `www` als `CNAME` auf `<user>.github.io`, Apex-Domain via `A`-Records auf die GitHub-Pages-IPs. Nach Deployments kann der Fastly-CDN-/Browser-Cache kurzzeitig alte Inhalte zeigen (Hard-Reload bzw. wenige Minuten warten).

---

## Wichtige Anpassungspunkte (Platzhalter ersetzen)

### 1) Akzentfarbe ändern
- **Datei:** `css/style.css`
- **Variable:** `--color-accent: #e8650a;` in `:root` ändern
- Alle abgeleiteten Farben (Hover, Glow, Badge-Tints) passen sich automatisch an

### 2) Logo ersetzen
- **Aktuelle Einbindung:** `assets/logo.png` als sauber benannte, web-taugliche Logo-Kopie im Header (`index.html`)
- **Künftiger Austausch:** Datei `assets/logo.png` mit einem neuen Export **unter gleichem Dateinamen** ersetzen
- **Anzeigegrösse:** via `.logo img` in `css/style.css` anpassen
- **Hinweis:** Die ursprüngliche Upload-Datei `assets/gebrüder sadriji logo transparent.png` bleibt im Repo, wird aber bewusst **nicht** direkt referenziert

### 3) Telefonnummer ändern
- Aktuell überall gesetzt auf: **`+41 78 255 88 25`** (`tel:+41782558825`)
- Bei Bedarf global in `index.html` die sichtbaren Nummern sowie `tel:`-Links anpassen:
  - Hero-Sekundär-CTA (`.btn-hero-emergency`)
  - Kontaktbereich (`.contact-info-list`)
  - Notfall-CTA-Box (`.btn-emergency-large`)
  - Footer-Telefon (`.footer-phone`)
  - Floating-Notfall-Button (`.floating-emergency`)

### 4) Adresse & E-Mail ergänzen
- **Datei:** `index.html`, Sektion `#kontakt`
- Adresse: **Altwiesenstrasse 199, 8051 Zürich** ist im Direktkontakt (`.contact-info-list`) sowie im Footer (`.footer-tagline`) hinterlegt
- E-Mail **`kontakt@gebrueder-sadriji.ch`** ist im Direktkontakt (`.contact-info-list`) als echter `mailto:`-Link gesetzt
- WhatsApp Business: sichtbarer Eintrag in `.contact-info-list` sowie CTA-Button `.btn-whatsapp-large`, beide verlinken auf **`https://wa.me/41782558825`** (`+41 78 255 88 25`)

### 5) Hero-Hintergrundbild einsetzen
- **Datei:** `css/style.css`, Klasse `.hero-bg`
- Kommentar: `/* PLATZHALTER-HERO-HINTERGRUND */`
- `background-image: url('../assets/images/hero.jpg');` hinzufügen
- `background-size: cover; background-position: center;` setzen

### 6) Referenzbilder ersetzen
- **Ordner:** `assets/images/`
- `reference-placeholder.svg` durch echte Projektfotos ersetzen
- Pfade in `index.html` (`#referenzen`) anpassen

### 7) Kundenstimmen eintragen
- **Datei:** `index.html`, Sektion `#kundenstimmen`
- Platzhaltertexte durch echte Kundenbewertungen ersetzen
- Markierung: Kommentar `<!-- PLATZHALTER-TESTIMONIALS -->`

### 8) Anfrageformular (E-Mail an Manager)
- **Datei:** `index.html` (Formular `#anfrageformular`)
- Bereits aktiv mit dem echten Formspree-Endpoint: **`https://formspree.io/f/xpqekneb`**
- Die Website nutzt den vorhandenen **Vanilla-JS-AJAX-Flow** (`fetch` + `Accept: application/json`) – **keine zusätzliche Formspree-Bibliothek nötig**
- Nach erfolgreichem Versand sieht der Besucher nur die Bestätigung im Formular; **es öffnet sich kein Mailprogramm**
- Die **Empfänger-E-Mail des Managers wird nicht im Code**, sondern im **Formspree-Dashboard** für das Formular **`xpqekneb`** hinterlegt bzw. geändert – dorthin gehen alle Anfragen automatisch per E-Mail
- Das versteckte Feld `_subject` setzt den Mail-Betreff auf `Neue Anfrage über die Website Gebrüder Sadriji`
- Ein Honeypot-Feld (`_gotcha`) ist als einfacher Spam-Schutz ergänzt
- Falls künftig wieder ein Platzhalter-Endpoint wie `FORM_ID_PLATZHALTER` eingetragen wird, greift automatisch der bestehende `mailto:`-Fallback in `js/main.js`
- Die dort verwendete Fallback-Adresse **`kontakt@gebrueder-sadriji.ch`** bleibt bewusst ein kommentierter Platzhalter und ist im Normalbetrieb mit Formspree **inaktiv**

### 9) Kennzahl «350+ Projekte» verifizieren
- **Datei:** `index.html`, Sektion `#ueber-uns`
- Kommentar: `<!-- PLATZHALTER-KENNZAHL -->`

### 10) Aktuelle Inhaltsstände
- Mitarbeitende: **19** (Hero + Über-uns-Statistik)
- Leistungen erweitert um: **Umbau, Trockenbau, Nassbau**
- Telefonnummer überall gesetzt auf: **`+41 78 255 88 25`** (`tel:+41782558825`)
- Anfrage-CTAs im UI vereinheitlicht auf: **«Kostenlose Anfrage»**
- Firmenlogo im Header eingebunden über **`assets/logo.png`** (sauberer Dateiname ohne Leerzeichen/Umlaute in der Referenz)

### 11) Performance-Hinweis zum Logo
- Die eingebundene PNG `assets/logo.png` ist bereits als verkleinerte Web-Kopie abgelegt. Für noch schnellere Ladezeiten kann sie bei Bedarf später weiter verlustarm optimiert werden, ohne den Dateinamen zu ändern.

---

## Technische Eckpunkte

- **HTML5, CSS3, Vanilla JavaScript** – keine Frameworks, keine Build-Tools
- CSS-Variablen in `:root` für zentrale Designsteuerung (Farben, Abstände, Schatten, Radien, Übergänge)
- Animationen ausschliesslich via `transform` / `opacity` (kein Layout-Shift, kein Ruckeln)
- `prefers-reduced-motion`: alle Animationen werden bei entsprechender Systemeinstellung deaktiviert
- Semantisches HTML, Skip-Link, ARIA-Labels, ausreichende Kontraste, `alt`-Texte
- Inline-SVG-Icons (kein externes Icon-Framework), einheitlicher Stroke-Stil
