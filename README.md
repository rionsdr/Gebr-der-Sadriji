# Gebrüder Sadriji – Website (statische Erstversion)

Professionelle, moderne und responsive Website für **Gebrüder Sadriji** (Maler- und Gipserarbeiten, Zürich, Schweiz) mit Fokus auf:
- klare Nutzerführung
- schnelle Anfragewege
- gut sichtbare **24/7-Notfallnummer**

## Warum Single-Page-Struktur?
Für den Erstaufbau wurde bewusst eine **Single-Page mit klaren Sektionen und Anker-Navigation** gewählt. So bleiben Inhalte auf Mobile und Desktop besonders übersichtlich, Kunden erreichen Leistungen und Kontakt mit minimalen Klicks, und die Wartung für den Start bleibt einfach.

## Projektstruktur

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── logo-placeholder.svg
│   └── images/
│       └── reference-placeholder.svg
└── README.md
```

## Lokale Vorschau

Da es eine statische Website ohne Build-Tools ist, genügt ein lokaler Webserver:

```bash
cd Gebr-der-Sadriji
python3 -m http.server 8000
```

Danach im Browser öffnen:
- `http://localhost:8000`

## Deployment mit GitHub Pages

1. Repository auf GitHub öffnen.
2. **Settings → Pages** öffnen.
3. Unter **Build and deployment** bei **Source**: `Deploy from a branch` wählen.
4. Branch auswählen (z. B. `main`) und Ordner `/ (root)` setzen.
5. Speichern – GitHub Pages veröffentlicht danach die statische Website.

## Wichtige Anpassungspunkte (Platzhalter)

### 1) Logo ersetzen
- Datei: `assets/logo-placeholder.svg`
- Einbindung: `index.html` im Header (`<img src="assets/logo-placeholder.svg" ...>`)

### 2) Farben / Design-Tokens anpassen
- Datei: `css/style.css`
- Bereich: `:root` (CSS-Variablen wie `--color-primary`, `--color-accent`, etc.)

### 3) Telefonnummern aktualisieren
- Datei: `index.html`
- Suchen nach: `+41 XX XXX XX XX` und `tel:+41XXXXXXXXX`
- Betroffene Stellen:
  - Header-Notfallbutton
  - Hero-Sekundär-CTA
  - Kontaktbereich
  - Floating-Notfallbutton (24/7)

### 4) Kontaktdaten ergänzen
- Datei: `index.html`
- Platzhalter für:
  - Adresse in Zürich
  - E-Mail (`kontakt@gebrueder-sadriji.ch` aktuell als Platzhalter)

### 5) Anfrageformular-Backend anbinden
- Datei: `index.html`
- Formular-`action` aktuell: `https://formspree.io/f/FORM_ID_PLATZHALTER`
- Solange `FORM_ID_PLATZHALTER` gesetzt ist, verwendet `js/main.js` automatisch einen `mailto:`-Fallback.
- Für Live-Betrieb Formspree-ID oder eigenen Endpoint eintragen.

## Technische Eckpunkte

- HTML5, modernes CSS3, Vanilla JavaScript
- Mobile-First, responsive Layouts (Flex/Grid)
- Sticky Header + mobiles Burger-Menü
- Semantischer, barrierearmer Aufbau (u. a. Skip-Link, ARIA, Kontrast)
- Keine Build-Tools, direkt GitHub-Pages-fähig
