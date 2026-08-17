# Breakfastball

An AI consultancy for serious legacy code — legacy modernization by custom agent fleet.

The site is a single-page landing page styled as a Wes Anderson theatrical one-sheet,
wrapped around an interactive hidden-object golf-course tableau: nine scored hotspots and the phone booth (the 19th hole), each
revealing a chapter of the story. Find the phone booth.

## Design language

The layout adapts conventions from Anderson's official theatrical posters
(studied from originals: The Grand Budapest Hotel, Moonrise Kingdom, The Royal
Tenenbaums, Asteroid City, The Life Aquatic, The Darjeeling Limited, The French
Dispatch, Fantastic Mr. Fox, Isle of Dogs, Rushmore):

- **Full-bleed sheet, no mat** — the page *is* the poster; type sits in a flat
  "sky" field color-sampled from the artwork's top edge (`#b7c4b2`).
- **Title on a cable arc** (Grand Budapest Hotel) — gold SVG `textPath` letters
  strung on a wire spanning the page.
- **Cast block in the sky** (GBH) — bold name pairs with italic character lines,
  alternating brick/ink.
- **Laurels flanking the presents line** (Darjeeling Limited).
- **Hard-cut billing band** below the still (Moonrise Kingdom JP) — cream field
  with tagline, ultra-condensed Oswald billing block, 3X rating box, release line.
- **Scorecard as engraved black plaque** (Moonrise Kingdom's "New Penzance Island"
  sign) — the game UI, fixed bottom-center.

## Stack

Plain static HTML/CSS/JS — no build step, no dependencies.

```
index.html              the whole site (markup, styles, script)
assets/course.avif      hero illustration, 1600×1600 AVIF (JPEG + 800px fallbacks alongside)
assets/og.jpg           1200×630 social share card (art + arc title lockup)
assets/favicon.svg      favicon (+ PNG / apple-touch-icon fallbacks)
vercel.json             caching + security headers
```

The hotspot copy lives in the `#transcript` section of `index.html` (a `<details>`
element in the billing band). The interactive cards read their text from that markup,
so it stays readable without JavaScript and indexable by crawlers — edit copy there,
in one place.

## Local development

Any static server works:

```sh
python3 -m http.server 8000
# or: npx serve
```

## Deploy

Hosted on Vercel as a static site (no framework preset, no build command).
Pushing to `main` auto-deploys via the connected GitHub repo
(`probedev/breakfastball` → breakfastball-tawny.vercel.app).

## TODO before launch

- Confirm the contact address — `hello@breakfastball.com` is a placeholder used in the
  `mailto:` links, footer, and JSON-LD.
- When a custom domain is added, update the `og:url`, `og:image`, `twitter:image`,
  canonical link, and JSON-LD `url` in `index.html` (currently `breakfastball-tawny.vercel.app`).
