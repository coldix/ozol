<!--
    File: README.md
    Website: ozol.org — OZ On Line
    Version: v2.0.0 | Date: 24 Jun 2026 AEST
-->
# OZ On Line (ozol.org)

The historical record of Colin Dixon's 40+ year journey in Australian tech —
classrooms, the early web, OZ On Line, and the leap to drones and AI. Hosted at
`ozol.org` and part of the [oze.au](https://oze.au) project family.

## Design — OzeGlass V2 "Aurora" (v2.0.0)

Rebuilt on the shared **oze.au "Aurora"** brand system for visual consistency
across `oze.au`, `ozol.au`, and `ozol.org`:

- Animated aurora background field, grid, caustics and floating light motes.
- Frosted **glass cards** with specular sheen; extruded "ice" link cards.
- Scroll-reveal section animations.
- Full **light / dark** theme, persisted in `localStorage`.
- Signature **retro CRT terminal** hero animation — green phosphor, scanlines
  and flicker, typing a boot/journey log (`PDP-11 bootstrap … OK`,
  `56k dial-up … CARRIER`, `whoami`, `mission.txt`). Honours
  `prefers-reduced-motion` (renders the log statically instead of typing).

## 📁 Project Structure

- `index.html` — Hero (logo + CRT terminal), timeline, video, project links, footer.
- `remote-internet.html` — Companion page on remote internet setups.
- `css/style.css` — Aurora design system (glass, motes, CRT, light/dark).
- `js/script.js` — Theme toggle, scroll reveals, motes, card glow, image +
  enquiry modals, CRT typewriter.
- `images/` — Hero (`background2-3.webp` aurora bg, `colin-portrait`), timeline
  thumbs/full, logo icons.
- `robots.txt` & `sitemap.xml` — SEO files.

## Notes

- Theme state (light/dark) is saved locally.
- Enquiry form builds a `mailto:` link to `col@ozol.org` — no backend.
- This is the story-only site; the public **URL shortener** lives on
  [ozol.au](https://ozol.au).

## Deployment

Automated via GitHub Actions (`Deploy to Hostinger (SSH rsync)`) on every push
to `main`. To deploy:

```bash
./deploy.sh "Your commit message"
```
