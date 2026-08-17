# Breakfastball

An AI consultancy for serious legacy code — legacy modernization by custom agent fleet.

The site is a single-page, hidden-object landing page: a storybook golf-course tableau with
ten hotspots, each revealing a chapter of the story. Find the phone booth.

## Stack

Plain static HTML/CSS/JS — no build step, no dependencies.

```
index.html              the site (markup, styles, script) — interactive "proscenium" design
poster.html             alternate design: vintage movie one-sheet (served at /poster, noindexed)
assets/course.avif      hero illustration, 1600×1600 AVIF (JPEG + 800px fallbacks alongside)
assets/og.jpg           1200×630 social share image
assets/favicon.svg      favicon (+ PNG / apple-touch-icon fallbacks)
vercel.json             caching + security headers
```

Two design variants are deployed for comparison. To promote the one-sheet to the
homepage, swap the two files' names (and move the meta description / OG tags /
`robots` noindex accordingly).

The hotspot copy lives in the `#transcript` section of `index.html` (a `<details>` element
below the stage). The interactive cards read their text from that markup, so it stays
readable without JavaScript and indexable by crawlers — edit copy there, in one place.

## Local development

Any static server works:

```sh
python3 -m http.server 8000
# or: npx serve
```

## Deploy

Hosted on Vercel as a static site (no framework preset, no build command).

```sh
vercel link   # first time: link this folder to the Vercel project
vercel        # preview deploy
vercel --prod # production deploy
```

Pushing to `main` deploys automatically once the GitHub repo is connected to the
Vercel project (Vercel dashboard → Add New Project → Import `probedev/breakfastball`).

## TODO before launch

- Confirm the contact address — `hello@breakfastball.com` is a placeholder used in the
  `mailto:` links, footer, and JSON-LD.
- When a custom domain is added, update the `og:url`, `og:image`, `twitter:image`,
  canonical link, and JSON-LD `url` in `index.html` (currently `breakfastball.vercel.app`).
