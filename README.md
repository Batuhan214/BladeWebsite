# Blade – Subscription Slayer · Landingpage

Produktionsreife, statische Marketing-Landingpage für die App **Blade – Subscription Slayer**.
„Slay your subscriptions." – Dark-Mode, Glassmorphism, premium & minimalistisch.

## Tech-Stack

- **Statisches HTML** – kein Build-Schritt, kein Framework
- **Tailwind CSS** via CDN (Design-Tokens in `tailwind.config` inline)
- **Vanilla JavaScript** (`script.js`) – progressive enhancement, funktioniert auch ohne JS
- **Google Fonts** (Inter) – einzige externe Abhängigkeit

Einfach `index.html` im Browser öffnen oder den Ordner per Drag-and-drop auf
**Netlify / Vercel / Cloudflare Pages** ziehen – läuft sofort.

## Dateien

| Datei | Inhalt |
|-------|--------|
| `index.html` | Komplette Seite (Markup, Tailwind-Config, Custom-CSS im `<style>`) |
| `script.js` | Mobile-Menü, Scroll-Reveal, FAQ-Accordion, DE/EN-Sprachumschalter |
| `README.md` | Diese Datei |

## Seitenstruktur

1. Sticky Header (Logo, Nav, Sprach-Umschalter DE/EN, CTA)
2. Hero mit schwebendem iPhone-Mockup
3. Vertrauens-/Kennzahlen-Zeile
4. Feature-Sektionen (Tiefenscan, Inbox Slayer, KI-Import, Kündigen & Reaktivieren, Dashboard, Haushalt teilen)
5. So funktioniert's (3 Schritte)
6. Datenschutz-Block (on-device, DSGVO)
7. Preise (Free vs. Pro)
8. FAQ (Accordion)
9. Finaler CTA-Banner
10. Footer

## Anpassen

- **Echte Screenshots:** Die Dummy-Mockups sind reine HTML/CSS-Platzhalter. Zum Ersetzen
  in `screens/` liegen echte App-Screenshots (Übersicht, Abos, Kündigen, Inbox,
  Zuhause) und stecken bereits in iPhone-Rahmen. Zum Aktualisieren einfach die
  PNGs in `screens/` ersetzen (Hochformat ~9:19,5, z. B. 570×1240).
- **Store-Links:** Alle App-Store-/Google-Play-Buttons verlinken aktuell auf `#cta`
  bzw. `#`. Die echten Store-URLs dort eintragen (Suche nach `App Store` / `Google Play`).
- **Rechtliches:** Impressum-, Datenschutz- und Social-Links im Footer sind Platzhalter (`#`).
- **Übersetzungen:** Deutscher Text steht direkt im HTML, die englischen Strings im
  `EN`-Objekt in `script.js` (gekoppelt über `data-i18n`-Keys).

## Barrierefreiheit & Performance

- Semantisches HTML, Alt-Texte, sichtbare Fokus-States, Skip-Link
- `prefers-reduced-motion` wird respektiert
- Lazy-freundlich, keine schweren Libraries, SEO- & Open-Graph-Tags gesetzt
