# AI Agent Instructions: Applied AI Club

**Project:** Applied AI Club at Penn State -- the official website for the Applied AI Club, a student organization at Penn State.

**Site:** https://andysalvo.github.io/appliedai/

**Repo:** https://github.com/andysalvo/appliedai

**Local dev:** `cd ~/Documents/GitHub/appliedai && npm run dev`

---

## Current State (2026-03-25)

The site is a startup-style single-page scroll site with one standalone page (Explore AI), deployed to GitHub Pages. It connects to a Google Sheets mailing list via a Google Apps Script web app. The repo is agentic -- every architectural decision is documented so AI agents can maintain and extend it.

**Branch protection:** Main branch requires 1 PR review. No direct pushes.

---

## Commands

| Command                | What it does                           | Duration |
| ---------------------- | -------------------------------------- | -------- |
| `npm run dev`          | Start dev server (Turbopack)           | ~3s      |
| `npm run build`        | Production static export to `out/`     | ~15s     |
| `npm run preview`      | Serve static build locally on :3000    | instant  |
| `npm run lint`         | ESLint                                 | ~5s      |
| `npm run format`       | Prettier fix                           | ~3s      |
| `npm run format:check` | Prettier check                         | ~3s      |
| `npm run test`         | Jest unit tests                        | ~5s      |
| `npm run test:e2e`     | Playwright E2E tests                   | ~30s     |
| `npm run check-links`  | Linkinator broken link check on `out/` | ~15s     |

**Before committing:** Run `npm run build` to verify the static export succeeds.

---

## Project Structure

```
appliedai/
  src/
    app/
      globals.css               # Tailwind v4 @theme with Penn State tokens
      layout.tsx                # Root layout (fonts, metadata)
      page.tsx                  # Home (single scroll, 6 sections)
      explore/
        page.tsx                # Explore AI tool registry
      not-found.tsx             # Custom 404 (brand colors, link home)
    components/
      header/
        index.tsx               # Glass nav bar
      footer/
        index.tsx               # Navy footer
      MailingListForm.tsx       # Google Sheets form (client component)
      ui/
        FadeIn.tsx              # Scroll-triggered fade
        StaggerGrid.tsx         # Staggered grid reveal
        ParallaxText.tsx        # Scroll-driven text parallax
        SlideIn.tsx             # Horizontal slide entrance
        RevealText.tsx          # Text reveal animation
    data/
      team.ts                   # Officer roster
      tools.ts                  # Explore AI registry
      navigation.ts             # Nav items
      pillars.ts                # What We Do content
    lib/
      fonts.ts                  # Inter + Roboto Slab
      siteMetadata.ts           # SEO metadata
      assetPath.ts              # GitHub Pages basePath helper
  content/
    VOICE_BRIEF.md              # Writing style contract
  public/
    images/
      team/                     # Officer headshots
    .nojekyll
  scripts/
    google/
      mailing-list.gs           # Version-controlled Apps Script source
  docs/
    decisions/                  # Architecture Decision Records (ADRs)
    corpus/                     # Research (carried from smealstudentaihub where relevant)
  .github/
    workflows/
      ci.yml
      deploy.yml
      lighthouse.yml
      codeql.yml
    copilot-instructions.md
  .claude/
    settings.json               # Bash security boundaries
  .husky/
    pre-commit                  # Format + lint
    commit-msg                  # Commitlint
  AGENTS.md                     # Canonical agent instructions (this file)
  CLAUDE.md                     # Claude thin layer
  GEMINI.md                     # Gemini thin layer
  NOTICE                        # FFC attribution
  CONTRIBUTORS.md
  GOVERNANCE.md
  package.json
  tsconfig.json
  next.config.ts
  jest.config.js
  playwright.config.ts
  .prettierrc.json
  .prettierignore
  .gitignore
  .editorconfig
  postcss.config.mjs
  commitlint.config.js
  eslint.config.mjs
  lighthouserc.json
  .linkinatorrc.json
```

**Tech stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, framer-motion (Motion), Playwright, Jest, GitHub Pages

---

## Code Style

**TypeScript:**

```ts
// Use named exports, not default exports (except pages)
export function ComponentName() { ... }

// Use @/ path alias for all imports from src/
import { assetPath } from '@/lib/assetPath'

// Props as inline types for simple components
export function Card({ title, children }: { title: string; children: React.ReactNode }) {
```

**Tailwind:**

Brand tokens are locked in `globals.css` via Tailwind v4 `@theme` with `--color-*: initial`. Never use arbitrary values. Always use the defined tokens.

```tsx
// Correct -- use brand tokens
<div className="bg-navy text-white">

// WRONG -- never use arbitrary values
<div className="bg-[#001E44] text-white">
```

**Components:**

- Named exports for all components (default exports only for page files)
- Use `<Link>` from `next/link` for all internal links, never raw `<a>` tags. This is critical because GitHub Pages deployment uses `basePath: /appliedai` and raw `<a>` tags won't include the base path, causing 404s in production.
- Client components (`'use client'`) only where needed (interactivity, hooks, motion)
- Content lives in `src/data/` as typed arrays/objects, not hardcoded in JSX
- Animation components respect `prefers-reduced-motion` via `useReducedMotion()` from framer-motion

---

## Git Workflow

- **Branch:** Create a feature branch for any change. Never commit directly to `main`.
- **Branch naming:** `feat/short-description`, `fix/short-description`, `docs/short-description`
- **Commits:** Conventional commits enforced by commitlint.
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `style:` formatting, CSS
  - `chore:` maintenance
  - `ci:` CI/CD changes
  - `test:` test changes
- **PRs:** Every change goes through a PR. CI must pass. At least one human review required.

---

## Boundaries

### Always Do

- Run `npm run build` before committing to verify static export works
- Run `node scripts/review.mjs <file>` on any document in `docs/` before committing. Read the review output. If the student lens scores below 7 or the voice lens flags AI-detected sentences, revise before shipping. Do not claim a document was reviewed if the script has not actually been run.
- Use brand tokens from `globals.css` (never hardcode colors)
- Screenshot pages after visual changes to verify
- Write accessible HTML (semantic elements, alt text, ARIA labels, keyboard navigation)
- Use `<Link>` from `next/link` for all internal navigation
- Keep commits atomic -- one logical change per commit
- Follow VOICE_BRIEF.md for all public-facing copy (rule 8: say what we are, define by presence)

### Ask First

- Adding new dependencies (check if existing deps cover the need)
- Changing the Tailwind `@theme` tokens (brand colors are locked)
- Modifying CI/CD workflows

### Never Do

- Commit secrets, API keys, or credentials
- Push directly to `main` without a PR
- Use Penn State marks (Lion Shield, athletic logos, mascot, seal) in any design
- Use arbitrary Tailwind values (e.g., `bg-[#ff0000]`) -- use brand tokens only
- Use em dashes in any content or copy
- Delete or modify the NOTICE file or CONTRIBUTORS.md without discussion

---

## Google Integration

### Mailing List (Google Apps Script)

The mailing list form POSTs to a Google Apps Script web app that writes rows to a Google Sheet. This is the only external integration at launch.

**Endpoint:** Stored in `NEXT_PUBLIC_MAILING_LIST_ENDPOINT` environment variable. Set in `.env.local` for local dev, and in GitHub repository secrets for CI/deploy.

**CORS workaround:** Google Apps Script does not support OPTIONS preflight requests. The form component POSTs with `Content-Type: text/plain` (not `application/json`) to avoid triggering a preflight. The Apps Script parses the body as JSON server-side via `JSON.parse(e.postData.contents)`. This is the proven pattern for static-site-to-Apps-Script communication.

**Sheet structure:**

| Column A  | Column B   | Column C | Column D |
| --------- | ---------- | -------- | -------- |
| Timestamp | First Name | Email    | Source   |

The "Source" column distinguishes website submissions (`"website"`) from other sources (manual adds, future integrations). The Apps Script checks for duplicate emails before appending.

**Source of truth:** `scripts/google/mailing-list.gs` is the version-controlled copy of the Apps Script code.

**Deploying changes to Apps Script:**

1. Edit `scripts/google/mailing-list.gs` in this repo
2. Open the Apps Script project in the Google Apps Script editor
3. Replace the code with the updated version from the repo
4. Deploy as a new version: Deploy > New deployment > Web app
5. Set "Execute as: Me" and "Who has access: Anyone"
6. Copy the new deployment URL into `NEXT_PUBLIC_MAILING_LIST_ENDPOINT`

---

## Penn State Branding

- **Penn State Discover:** "Applied AI Club at Penn State"
- **General use:** "Applied AI"
- **Never:** "Penn State Applied AI" (violates AD07 -- institution name cannot precede org name)

### Colors

| Token                 | Hex       | Usage                           |
| --------------------- | --------- | ------------------------------- |
| `--color-navy`        | `#001E44` | Primary dark, headlines, footer |
| `--color-beaver-blue` | `#1E407C` | Buttons, links, interactive     |
| `--color-pugh-blue`   | `#96BEE6` | Accents, secondary backgrounds  |
| `--color-pa-sky`      | `#009CDE` | Link hover, active indicators   |

### Fonts

- **Body:** Inter (via next/font)
- **Display:** Roboto Slab (via next/font)

### Cannot Use

- Penn State Lion Shield, athletics logos, Block S, mascot, seal, building images
- Can use: Paw print (unaltered), University-Recognized Student Organization Shield Mark (if requested)

### Footer Disclaimer (required)

"This is a student organization website and does not represent official Penn State positions."

---

## Attribution

This project's infrastructure was built by Clarke Moyer (@clarkemoyer) as part of Free For Charity. See `NOTICE` and `CONTRIBUTORS.md` for details.
