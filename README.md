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

1. Repository → **Settings → Pages**
2. Source: `Deploy from a branch`, Branch: `main`, Ordner: `/ (root)`
3. Speichern – fertig.

---

## Wichtige Anpassungspunkte (Platzhalter ersetzen)

### 1) Akzentfarbe ändern
- **Datei:** `css/style.css`
- **Variable:** `--color-accent: #e8650a;` in `:root` ändern
- Alle abgeleiteten Farben (Hover, Glow, Badge-Tints) passen sich automatisch an

### 2) Logo ersetzen
- **Datei:** `assets/logo-placeholder.svg` durch finale Logo-Datei ersetzen
- **Einbindung:** `index.html` – `<img src="assets/logo-placeholder.svg" ...>` im Header (Pfad anpassen)

### 3) Telefonnummer ändern
- Aktuell überall gesetzt auf: **`+41 76 462 50 38`** (`tel:+41764625038`)
- Bei Bedarf global in `index.html` die sichtbaren Nummern sowie `tel:`-Links anpassen:
  - Hero-Sekundär-CTA (`.btn-hero-emergency`)
  - Kontaktbereich (`.contact-info-list`)
  - Notfall-CTA-Box (`.btn-emergency-large`)
  - Footer-Telefon (`.footer-phone`)
  - Floating-Notfall-Button (`.floating-emergency`)

### 4) Adresse & E-Mail ergänzen
- **Datei:** `index.html`, Sektion `#kontakt`
- Suchen nach `Adress-Platzhalter` und `kontakt@gebrueder-sadriji.ch (Platzhalter)`

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

### 8) Anfrageformular (E-Mail an Manager) aktivieren
- **Datei:** `index.html` (Formular `#anfrageformular`)
- **Schritt 1:** Bei [formspree.io](https://formspree.io) kostenlos registrieren und neues Formular erstellen
- **Schritt 2:** Endpoint `https://formspree.io/f/XXXXXX` im `action`-Attribut eintragen (statt `FORM_ID_PLATZHALTER`)
- **Schritt 3:** Empfängeradresse des Managers im Formspree-Dashboard hinterlegen
- Versand erfolgt dann per `fetch` im Hintergrund (kein Mailprogramm beim Besucher)
- Solange `FORM_ID_PLATZHALTER` gesetzt ist, greift automatisch der `mailto:`-Fallback
- Die Fallback-Empfängeradresse steht in `js/main.js` als `fallbackManagerMailPlaceholder` und ist aktuell ein Platzhalter
  (`kontakt@gebrueder-sadriji.ch`) – für den Produktivbetrieb auf die echte Manager-E-Mail anpassen

### 9) Kennzahl «350+ Projekte» verifizieren
- **Datei:** `index.html`, Sektion `#ueber-uns`
- Kommentar: `<!-- PLATZHALTER-KENNZAHL -->`

### 10) Aktuelle Inhaltsstände
- Mitarbeitende: **19** (Hero + Über-uns-Statistik)
- Leistungen erweitert um: **Umbau, Trockenbau, Nassbau**
- Anfrage-CTAs im UI vereinheitlicht auf: **«Kostenlose Anfrage»**

---

## Technische Eckpunkte

- **HTML5, CSS3, Vanilla JavaScript** – keine Frameworks, keine Build-Tools
- CSS-Variablen in `:root` für zentrale Designsteuerung (Farben, Abstände, Schatten, Radien, Übergänge)
- Animationen ausschliesslich via `transform` / `opacity` (kein Layout-Shift, kein Ruckeln)
- `prefers-reduced-motion`: alle Animationen werden bei entsprechender Systemeinstellung deaktiviert
- Semantisches HTML, Skip-Link, ARIA-Labels, ausreichende Kontraste, `alt`-Texte
- Inline-SVG-Icons (kein externes Icon-Framework), einheitlicher Stroke-Stil
