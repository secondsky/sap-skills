# Plan 008: Create a promotional website for SAP Skills

> **Executor instructions**: Follow this plan phase by phase. Each phase has
> clear deliverables and verification steps. Do not skip phases. When done,
> update the status row in `plans/README.md`.
>
> **Critical**: This plan creates a SEPARATE Next.js application in a `website/`
> directory at the repo root. It does NOT modify any existing skill content,
> manifests, or validation scripts. The only shared integration point is reading
> `marketplace.json` at build time.

## Status

- **Priority**: P2
- **Effort**: XL (new application)
- **Risk**: MEDIUM (new codebase, design iteration needed)
- **Depends on**: none
- **Category**: direction (marketing/website)
- **Planned at**: 2026-06-12

## Decisions resolved (interview)

| Decision | Choice |
|----------|--------|
| Target audience | SAP developers using AI coding assistants |
| Domain | `sap-skills.pages.dev` (Cloudflare Pages subdomain) |
| Data source | Static at build time from marketplace.json |
| CF services | Cloudflare Pages + R2 (for stats JSON + any future assets) |
| Animations | Framer Motion (motion) |
| Visual style | Clean light theme (design exploration phase before implementation) |
| Site structure | Multi-page: Home, Skills list, Skill detail pages, About |
| Skill detail depth | Rich parsed metadata: description, feature badges, keyword pills, related skills, install command, GitHub link |
| Search | Client-side fuzzy search (fuse.js) |
| Filter | Category pills (8 categories from marketplace.json) |
| Primary CTA | Copy install command with toast confirmation |
| Hero | Bold headline + dual CTAs (npx skills add + Claude Code command) |
| Install guide | Multi-tool tabs: Claude Code, Cursor, Windsurf, Copilot |
| Social proof | Animated stat counters (35 plugins, 24 agents, etc.) + GitHub stars + total installs |
| Live stats | GitHub Actions cron → scrape skills.sh + GitHub API → write to R2 → read at build time |
| Color palette | Design exploration via playground skill (10 mockups, pick one) |
| Typography | Inter (body) + JetBrains Mono (code) |
| Footer | GitHub link, GPL-3.0 license, author (E.J.), last updated date. NO Next.js/CF credit |

---

## Why this matters

The repo has 35 production-tested SAP skills with 4,300+ installs and 336 GitHub
stars, but discovery is limited to the GitHub README and skills.sh listing. A
dedicated promotional website with search, filtering, rich skill details, and
install guides will significantly increase visibility and adoption. It positions
the project as a first-class ecosystem rather than a GitHub README.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                      │
│              (Next.js static export @edge)                │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │ Homepage  │  │ Skills   │  │ /skills/[slug]        │  │
│  │           │  │ list     │  │ (per-skill detail)     │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
│                                                          │
│  Build-time data: marketplace.json → static JSON          │
│  Runtime data: R2 stats.json (GitHub stars, installs)     │
└─────────────────────────────────────────────────────────┘
         │
         │ (build time reads)
         ▼
┌─────────────────────────────────────────────────────────┐
│                    R2 Bucket                             │
│  stats.json — { stars, totalInstalls, skillInstalls }    │
│  Updated by GitHub Actions cron (every 6 hours)          │
└─────────────────────────────────────────────────────────┘
         ▲
         │ (writes)
┌─────────────────────────────────────────────────────────┐
│                GitHub Actions Workflow                    │
│  schedule: every 6 hours + on push to main                │
│  1. Fetch GitHub stars via API                            │
│  2. Scrape skills.sh for install counts                   │
│  3. Write stats.json to R2                                │
│  4. Trigger Pages rebuild (dispatch-build)                │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 0: Design exploration

**Goal**: Generate 10 distinct design mockups using the playground skill, pick one direction.

### Steps

1. **Generate mockups** — Use the playground skill to create 10 different homepage mockups:
   - Provide it with: skill data (marketplace.json excerpt), category list, stat numbers, install commands
   - Vary: hero treatments, card layouts, color palettes, animation styles
   - Each mockup should be a single HTML file that can be opened in a browser

2. **Review and select** — Present all 10 to the maintainer for selection

3. **Refine the winner** — Iterate on the chosen design with 2-3 refinement rounds:
   - Finalize color palette (primary, secondary, accent, background, foreground)
   - Finalize card design (skill card in grid, skill detail page layout)
   - Finalize hero section layout and animation choreography
   - Document the chosen design tokens as CSS variables / Tailwind config

### Deliverables

- [ ] 10 mockup HTML files in `website/mockups/` (untracked in .gitignore)
- [ ] Chosen design documented as `website/DESIGN.md` with color tokens, typography, spacing
- [ ] Maintainer sign-off on final design direction

### Verify

- Maintainer confirms design direction before any implementation begins

---

## Phase 1: Project scaffolding

**Goal**: Set up the Next.js project with all tooling configured.

### Steps

1. **Create Next.js app** in `website/` at repo root:

   ```bash
   npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. **Install dependencies**:

   ```bash
   cd website
   npm install framer-motion fuse.js
   npm install -D @cloudflare/next-on-pages wrangler
   npm install shadcn
   ```

3. **Initialize shadcn** — configure with clean light theme, Inter + JetBrains Mono fonts:

   ```bash
   npx shadcn@latest init
   ```

   - Style: Default (clean)
   - Base color: neutral
   - CSS variables: yes

4. **Add shadcn components** (all needed for the site):

   ```bash
   npx shadcn@latest add button card badge input tabs dialog command tooltip separator scroll-area
   ```

5. **Configure Tailwind** — extend with design tokens from Phase 0:

   - Custom colors based on chosen design
   - Font families: Inter (sans), JetBrains Mono (mono)
   - Animation keyframes for stat counters, card reveals, page transitions

6. **Configure `@cloudflare/next-on-pages`**:

   - Add `wrangler.toml` for local dev with R2 bindings
   - Configure `next.config.js` for static export compatibility with CF Pages
   - Add R2 binding config for stats reading

7. **Add `.gitignore` entries** — the `website/` directory should be independently managed but live in the monorepo

8. **Create build script** that reads marketplace.json and generates static data:

   - `website/scripts/build-data.ts` — reads `../.claude-plugin/marketplace.json`, transforms into typed JSON files
   - Output: `website/src/data/skills.json`, `website/src/data/categories.json`, `website/src/data/stats.json` (from R2 or fallback)

### Deliverables

- [ ] `website/` directory with working Next.js + shadcn + Tailwind + Framer Motion
- [ ] `wrangler.toml` with R2 binding
- [ ] Build data script that reads marketplace.json
- [ ] Dev server runs: `npm run dev` works in `website/`
- [ ] CF Pages build works: `npx @cloudflare/next-on-pages`

### Verify

```bash
cd website
npm run dev          # loads at localhost:3000
npm run build        # builds without errors
npx wrangler pages dev .vercel/output/static  # CF Pages local dev works
```

---

## Phase 2: Data layer

**Goal**: Parse marketplace.json into rich, typed data structures for the site.

### Data model

```typescript
interface Skill {
  slug: string;              // "sap-abap", "sap-cap-capire", etc.
  name: string;              // from marketplace.json
  description: string;       // from marketplace.json
  category: Category;        // enum of 8 categories
  keywords: string[];        // from marketplace.json
  hasAgents: boolean;        // derived from agents array
  hasCommands: boolean;      // derived from commands array
  hasMcp: boolean;           // derived from mcpServers in plugin.json
  hasHooks: boolean;         // derived from hooks presence
  hasLsp: boolean;           // derived from lsp config
  agentCount: number;
  commandCount: number;
  referenceFileCount: number; // counted from references/ dir
  templateCount: number;      // counted from templates/ dir
  version: string;           // from metadata
  lastVerified: string;      // from metadata
  relatedSkills: string[];   // parsed from SKILL.md "Related Skills" section
  githubUrl: string;         // constructed: github.com/secondsky/sap-skills/tree/main/plugins/{slug}
  installCount?: number;     // from skills.sh stats (R2)
  categoryLabel: string;     // human-readable: "SAP BTP Platform", "Data & Analytics", etc.
  categoryIcon: string;      // icon name for the category
}

interface Category {
  id: string;                // "abap", "ai", "btp", etc.
  label: string;             // "ABAP", "AI & Machine Learning", etc.
  description: string;       // one-line description
  icon: string;              // lucide icon name
  count: number;             // number of skills in category
}

interface SiteStats {
  totalSkills: number;
  totalAgents: number;
  totalCommands: number;
  totalMcpServers: number;
  categories: number;
  githubStars: number;
  totalInstalls: number;
  skillInstalls: Record<string, number>;  // slug → install count
  lastUpdated: string;
}
```

### Category metadata (static)

| id | label | description | icon |
|---|---|---|---|
| abap | ABAP | Core ABAP development patterns and CDS views | code-2 |
| ai | AI & Machine Learning | SAP AI Core, Cloud SDK for AI, GenAI Hub | brain |
| btp | SAP BTP Platform | Business Technology Platform services and tools | cloud |
| cap | CAP | Cloud Application Programming Model | layers |
| data-analytics | Data & Analytics | Datasphere, Analytics Cloud, SQLScript | bar-chart-3 |
| hana | SAP HANA | HANA Cloud, ML, CLI, Data Intelligence | database |
| tooling | Tooling | Development tools, API standards, dependency management | wrench |
| ui-development | UI Development | SAPUI5, Fiori Tools, linters | monitor |

### Steps

1. **Create `website/scripts/build-data.ts`** — Node.js script that:
   - Reads `../.claude-plugin/marketplace.json`
   - For each plugin, reads its `plugin.json` for agent/command/mcp/hook counts
   - Reads the SKILL.md frontmatter for metadata, version, related skills
   - Counts reference and template files via filesystem
   - Optionally reads stats from R2 (or falls back to hardcoded)
   - Writes typed JSON to `website/src/data/`

2. **Generate static params** for all 35 skill detail pages

3. **Create a search index** for fuse.js — pre-computed at build time:
   - Fields: name, description, keywords, category label
   - Weights: name (2x), keywords (1.5x), description (1x)

### Deliverables

- [ ] `website/scripts/build-data.ts` reads marketplace.json and generates all data files
- [ ] `website/src/data/skills.json` — array of 35 Skill objects
- [ ] `website/src/data/categories.json` — array of 8 Category objects with counts
- [ ] `website/src/data/search-index.json` — fuse.js optimized index
- [ ] TypeScript types in `website/src/types/`

### Verify

```bash
cd website
npx tsx scripts/build-data.ts   # generates all data files
cat src/data/skills.json | python3 -c "import json,sys; skills=json.load(sys.stdin); print(f'{len(skills)} skills'); print([s['slug'] for s in skills[:3]])"
# Expected: 35 skills, first 3 slugs printed
```

---

## Phase 3: Shared layout and components

**Goal**: Build the reusable layout shell and core UI components.

### Components to build

#### Layout components

1. **`<SiteHeader>`** — sticky top navigation
   - Logo/text: "SAP Skills" wordmark
   - Nav links: Home, Skills, About
   - GitHub icon link (opens repo)
   - Mobile: hamburger menu with slide-out nav
   - Framer Motion: subtle backdrop blur on scroll

2. **`<SiteFooter>`** — simple footer
   - Left: "© 2026 E.J. · GPL-3.0 License"
   - Center: "Last updated: {date}"
   - Right: GitHub link icon
   - No Next.js or Cloudflare credits

3. **`<PageTransition>`** — Framer Motion wrapper
   - Fade + slight slide-up on page enter
   - Fade-out on page exit
   - Wraps all page content

#### Feature components

4. **`<SkillCard>`** — card for the skills grid
   - Category badge (colored)
   - Skill name
   - Short description (truncated to 2 lines)
   - Feature pills: Agents (x), Commands (x), MCP, Hooks, LSP
   - Install count badge (if available)
   - Hover: subtle lift + shadow animation (Framer Motion)
   - Click: navigates to `/skills/{slug}`

5. **`<CategoryPill>`** — filter button
   - Icon + label + count
   - Active state: filled with category color
   - Inactive: outlined
   - "All" pill as default

6. **`<SearchBar>`** — fuse.js powered search
   - Input with search icon
   - Debounced search (200ms)
   - Results update the skills grid in real-time
   - Clear button (x)
   - Keyboard shortcut: Cmd/Ctrl + K to focus

7. **`<CopyButton>`** — copy-to-clipboard with toast
   - Shows command text (monospace)
   - Click copies to clipboard
   - Shows checkmark for 2 seconds (animated)
   - Toast: "Command copied!"

8. **`<StatCounter>`** — animated number counter
   - Props: value, label, icon, suffix ("+", "K")
   - Framer Motion: count-up animation on scroll into view (useInView)
   - Duration: 1.5s, ease-out

9. **`<FeatureBadge>`** — small pill for agents/commands/etc.
   - Variants: agent (blue), command (green), mcp (purple), hook (orange), lsp (pink)
   - Shows count if > 1
   - Small, chip-like appearance

10. **`<InstallTabs>`** — tabbed install guide
    - Tabs: Claude Code, Cursor, Windsurf, Copilot
    - Each tab shows:
      - Step-by-step instructions
      - Copy-able install command
      - Brief description of how skills work in that tool
    - Animated tab content transitions

11. **`<SkillsGrid>`** — the main grid/list
    - Props: skills array, categories for filter
    - Layout: responsive grid (1 col mobile, 2 tablet, 3 desktop)
    - Staggered entrance animation (Framer Motion: 50ms delay per card)
    - Integrates search bar + category pills + grid
    - Empty state: "No skills match your search"

### Deliverables

- [ ] All 11 components implemented in `website/src/components/`
- [ ] Root layout with header + footer + page transitions
- [ ] Mobile responsive at all breakpoints (320px, 768px, 1024px, 1440px)

### Verify

```bash
cd website
npm run dev
# Manually verify: header sticky, footer renders, mobile menu works
npm run build  # no errors
```

---

## Phase 4: Pages

### 4.1 Homepage (`/`)

**Sections in order**:

1. **Hero section**
   - H1: "35 Production-Ready SAP Skills for AI Coding Assistants"
   - Subtitle: "Auto-activating skills for BTP, CAP, Fiori, ABAP, Analytics, and more. Install once, works everywhere."
   - Two CTAs in a row:
     - Primary: `npx skills add secondsky/sap-skills` with CopyButton
     - Secondary: "Install for Claude Code" with CopyButton showing `claude skills add secondsky/sap-skills`
   - Framer Motion: headline fades in + slides up, CTAs fade in with 300ms delay

2. **Stats bar**
   - Horizontal row of StatCounters:
     - 35 Plugins | 24 Agents | 29 Commands | 6 MCP Servers | 8 Categories | {stars} GitHub Stars | {4.3K} Total Installs
   - Light background band to separate from hero
   - Counters animate when scrolled into view

3. **How it works section**
   - 3-step visual: "Browse" → "Install" → "Auto-activate"
   - Each step: icon + title + short description
   - Code example showing auto-activation (e.g., user mentions CAP → skill loads)
   - Framer Motion: staggered reveal

4. **Install guide tabs**
   - Tabs component with 4 tools: Claude Code, Cursor, Windsurf, GitHub Copilot
   - Each tab shows:
     - Tool name + logo/icon
     - Install command (copyable)
     - 2-3 sentence explanation
   - Claude Code tab (default):
     - `claude skills add secondsky/sap-skills`
     - "Native skills marketplace integration. Skills auto-activate when you mention SAP topics."
   - Cursor tab:
     - MCP server setup for sap-cap-capire, sapui5, sap-datasphere, sap-sac-scripting, sap-hana-cli, sap-fiori-tools
     - "Add MCP servers from individual plugins that offer them. Configure in Cursor's MCP settings."
   - Windsurf tab:
     - Similar to Cursor — MCP-based
     - "Configure MCP servers in your Windsurf settings for SAP-aware AI assistance."
   - GitHub Copilot tab:
     - "Use individual skill markdown files as custom instructions in your Copilot configuration."
     - Link to GitHub repo for manual file access

5. **Skills grid section**
   - Heading: "Browse All Skills"
   - SearchBar (full-width)
   - CategoryPills row (horizontal scroll on mobile)
   - SkillsGrid: all 35 skills as SkillCards
   - Framer Motion: staggered card entrance (50ms per card)

6. **Footer**
   - GitHub link | GPL-3.0 License | © 2026 E.J. | Last updated: {date}

### 4.2 Skills list page (`/skills`)

- Same grid section from homepage but as a dedicated full-page experience
- URL-shareable with search params: `/skills?q=cap&category=btp`
- Breadcrumb: Home > Skills
- All skills shown, filterable and searchable

### 4.3 Skill detail page (`/skills/[slug]`)

**Layout**: header → back link → main content → related skills → footer

**Sections**:

1. **Back navigation** — "← Back to Skills" link

2. **Hero area**
   - Category badge (colored)
   - Skill name (H1)
   - Full description
   - Feature badges row: Agents (x), Commands (x), MCP ✓, Hooks ✓, LSP ✓
   - Install command with CopyButton: `npx skills add secondsky/sap-skills --skill {slug}`
   - GitHub link button: "View on GitHub →"

3. **Details grid** (2-column on desktop)
   - Left column:
     - "About" — full description (longer than hero)
     - "Keywords" — keyword pills
   - Right column:
     - "Quick Stats" card: version, last verified, reference files, templates
     - "Install count" (if available from skills.sh data)

4. **Related skills** — horizontal scroll of SkillCards for related skills
   - Parsed from SKILL.md "Related Skills" section

5. **Footer**

### 4.4 About page (`/about`)

- Brief: what this project is, who maintains it, license
- Link to GitHub, contributing guidelines
- Link to skills.sh page

### Deliverables

- [ ] Homepage with all 6 sections, fully responsive
- [ ] Skills list page at `/skills` with URL params
- [ ] 35 skill detail pages at `/skills/[slug]` (statically generated)
- [ ] About page at `/about`
- [ ] All pages have page transitions (Framer Motion)
- [ ] All CTAs functional (copy to clipboard)

### Verify

```bash
cd website
npm run build  # should generate 35+1+1+1 static pages
npx wrangler pages dev .vercel/output/static
# Visit every route:
# /              — homepage with all sections
# /skills        — skills grid with search/filter
# /skills/sap-cap-capire  — detail page
# /skills/sap-abap        — detail page (no agents/commands variant)
# /about         — about page
# Test: Cmd+K search, category pills, copy buttons, mobile responsive
```

---

## Phase 5: Live stats pipeline

**Goal**: GitHub Actions workflow that keeps stats fresh in R2.

### Architecture

```
GitHub Actions (cron every 6h + on push to main)
    │
    ├── 1. Fetch GitHub stars
    │     curl api.github.com/repos/secondsky/sap-skills
    │     → stargazers_count
    │
    ├── 2. Scrape skills.sh install counts
    │     Fetch https://www.skills.sh/secondsky/sap-skills
    │     Parse HTML for per-skill install numbers + total
    │     (skills.sh has no public API — scrape the page)
    │
    ├── 3. Write stats.json to R2
    │     wrangler r2 object put sap-skills-assets/stats.json
    │
    └── 4. Trigger Pages rebuild
          curl -X POST Cloudflare Pages dispatch-build endpoint
```

### stats.json schema

```json
{
  "githubStars": 336,
  "totalInstalls": 4300,
  "skillInstalls": {
    "sap-abap": 375,
    "sap-fiori-tools": 309,
    "sap-cap-capire": 299,
    "sap-btp-developer-guide": 281,
    "sap-btp-best-practices": 250,
    "sap-abap-cds": 209,
    "sap-btp-connectivity": 193,
    "sapui5-cli": 168,
    "sap-btp-cloud-logging": 154,
    "sap-api-style": 137,
    "sap-ai-core": 122,
    "sap-hana-cli": 120,
    "sap-sqlscript": 117,
    "sap-datasphere": 116,
    "sap-cloud-sdk-ai": 114,
    "sap-btp-business-application-studio": 108,
    "sap-btp-master-data-integration": 104,
    "sap-btp-build-work-zone-advanced": 104,
    "sap-btp-job-scheduling": 103,
    "sap-btp-intelligent-situation-automation": 95,
    "sap-hana-ml": 92,
    "sap-hana-cloud-data-intelligence": 91,
    "sap-sac-scripting": 90,
    "sap-btp-service-manager": 90,
    "sap-btp-cloud-transport-management": 88,
    "sap-btp-cias": 87,
    "sap-sac-planning": 79,
    "sap-sac-custom-widget": 77,
    "sapui5-linter": 76,
    "dependency-upgrade": 8
  },
  "updatedAt": "2026-06-12T10:00:00Z"
}
```

### Steps

1. **Create R2 bucket**: `sap-skills-website-stats`

2. **Create GitHub Actions workflow** at `.github/workflows/update-stats.yml`:
   - `schedule: cron: '0 */6 * * *'` (every 6 hours)
   - Also triggers on `push` to `main` (for initial setup + testing)
   - Steps:
     - Checkout repo
     - Install wrangler
     - Fetch GitHub stars via `gh api repos/secondsky/sap-skills`
     - Scrape skills.sh page, parse install counts (use Node.js script)
     - Write `stats.json` to R2 via `wrangler r2 object put`
     - Trigger Cloudflare Pages rebuild via `curl` to dispatch-build webhook
   - Uses `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets

3. **Create scraping script** at `website/scripts/scrape-stats.ts`:
   - Fetches `https://www.skills.sh/secondsky/sap-skills`
   - Parses HTML to extract per-skill install counts
   - Outputs JSON matching stats.json schema
   - Handles errors gracefully (returns last known good data if scrape fails)

4. **Update build-data.ts** to optionally read from R2:
   - At build time, fetch `stats.json` from R2 public URL
   - If R2 is empty or fetch fails, use fallback hardcoded stats
   - Merge stats into skill data

### Deliverables

- [ ] R2 bucket created
- [ ] `.github/workflows/update-stats.yml` workflow
- [ ] `website/scripts/scrape-stats.ts` scraping script
- [ ] Build process reads stats from R2 with fallback
- [ ] stats.json updates every 6 hours automatically

### Verify

```bash
# Manual test of scraping script
cd website
npx tsx scripts/scrape-stats.ts
# Should print JSON with githubStars, totalInstalls, skillInstalls

# Manual test of R2 write
echo '{"test": true}' | npx wrangler r2 object put sap-skills-website-stats/test.json

# Verify workflow triggers
gh workflow run update-stats.yml
```

---

## Phase 6: Deployment

**Goal**: Deploy to Cloudflare Pages with R2 binding.

### Steps

1. **Create Cloudflare Pages project**:
   - Connect to GitHub repo `secondsky/sap-skills`
   - Build command: `cd website && npm run build`
   - Build output: `website/.vercel/output/static`
   - Root directory: `/` (monorepo root)

2. **Configure R2 binding** in Pages settings:
   - Bucket: `sap-skills-website-stats`
   - Variable name: `STATS_BUCKET`

3. **Set environment secrets**:
   - `CLOUDFLARE_API_TOKEN` (for GitHub Actions)
   - `CLOUDFLARE_ACCOUNT_ID` (for GitHub Actions)

4. **Configure custom headers** in `_headers` file:
   ```
   /skills/*
     Cache-Control: public, max-age=3600
   /*
     X-Content-Type-Options: nosniff
   ```

5. **Verify deployment**:
   - Site loads at `sap-skills.pages.dev`
   - All 35 skill pages render
   - Search works
   - Copy buttons work
   - Mobile responsive
   - Stats counters animate
   - Lighthouse score > 90 for performance

### Deliverables

- [ ] Live site at `sap-skills.pages.dev`
- [ ] R2 binding configured
- [ ] GitHub Actions workflow deployed and running
- [ ] Lighthouse audit > 90 performance

### Verify

```bash
# Deploy preview
cd website
npx wrangler pages deploy .vercel/output/static --project-name=sap-skills

# Check live site
curl -s https://sap-skills.pages.dev | head -20

# Lighthouse
npx lighthouse https://sap-skills.pages.dev --output=json --chrome-flags="--headless" | python3 -c "import json,sys; r=json.load(sys.stdin); print(f'Performance: {r[\"categories\"][\"performance\"][\"score\"]*100:.0f}')"
```

---

## Phase 7: Polish and QA

**Goal**: Final quality pass before considering the site "launched".

### Steps

1. **SEO**:
   - Meta tags per page (title, description, og:image)
   - Generate `sitemap.xml` with all routes
   - Add `robots.txt`
   - Structured data (JSON-LD) for the software project

2. **Accessibility**:
   - All interactive elements keyboard-navigable
   - ARIA labels on icon-only buttons
   - Color contrast WCAG AA compliant
   - Focus visible states

3. **Performance**:
   - Lazy-load Framer Motion animations (use `React.lazy` where possible)
   - Optimize fuse.js search (only load on search interaction)
   - Image optimization (Next.js Image component for any assets)
   - Preload critical fonts

4. **Cross-browser testing**:
   - Chrome, Firefox, Safari, Edge (latest)
   - iOS Safari, Android Chrome

5. **Error states**:
   - 404 page with link back to home
   - Skill not found → redirect to skills list
   - Stats unavailable → show hardcoded fallback numbers

6. **Analytics** (optional, if free):
   - Cloudflare Web Analytics (free, privacy-respecting)
   - Track: page views, skill page visits, install button clicks

### Deliverables

- [ ] sitemap.xml and robots.txt
- [ ] All pages have proper meta tags
- [ ] Lighthouse: Performance > 90, Accessibility > 90, SEO > 90
- [ ] 404 page implemented
- [ ] Cross-browser verified

---

## Critical review notes

### Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| skills.sh scraping breaks if they change HTML | Medium | Graceful fallback to last known stats; scraping script has error handling |
| Design exploration takes too long | Low | Cap at 10 mockups + 3 refinement rounds; fall back to shadcn defaults |
| 35 static pages = slower builds | Low | Next.js static generation is fast; < 30s for 35 pages |
| R2 stats pipeline complexity | Medium | Stats are optional enhancement; site works without them (hardcoded fallback) |
| Mobile performance with Framer Motion | Medium | Lazy-load animation library; use CSS animations for mobile if needed |

### What this plan does NOT do

- Does NOT modify any existing skill content, manifests, or scripts
- Does NOT add a `website/` reference to CLAUDE.md or README.md (maintainer decides)
- Does NOT set up a custom domain (uses pages.dev subdomain)
- Does NOT implement dark mode (light theme only per decision)
- Does NOT render full SKILL.md content (parsed metadata only)
- Does NOT use D1, Durable Objects, Workers, Queues, or Analytics Engine (not needed for this scope)

### Data freshness

- Skill data: updates on every git push (via Pages rebuild)
- GitHub stars: updates every 6 hours (via GitHub Actions)
- Install counts: updates every 6 hours (via GitHub Actions + skills.sh scrape)
- Site content: static, cached at CDN edge

### Current live stats (hardcoded fallback)

- GitHub stars: 336
- Forks: 88
- Total installs: ~4,300
- Top skills by installs: sap-abap (375), sap-fiori-tools (309), sap-cap-capire (299)
- skills.sh shows 30 of 35 skills (5 newer skills not yet listed there)

---

## Directory structure (website/)

```
website/
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── wrangler.toml
├── public/
│   ├── _headers
│   ├── _redirects
│   ├── robots.txt
│   └── sitemap.xml (generated at build)
├── scripts/
│   ├── build-data.ts          # Reads marketplace.json → static JSON
│   └── scrape-stats.ts        # Scrapes skills.sh → stats JSON
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (header + footer + fonts)
│   │   ├── page.tsx           # Homepage
│   │   ├── about/
│   │   │   └── page.tsx       # About page
│   │   ├── skills/
│   │   │   ├── page.tsx       # Skills list page
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Skill detail page (35 static pages)
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── page-transition.tsx
│   │   ├── skill-card.tsx
│   │   ├── category-pill.tsx
│   │   ├── search-bar.tsx
│   │   ├── copy-button.tsx
│   │   ├── stat-counter.tsx
│   │   ├── feature-badge.tsx
│   │   ├── install-tabs.tsx
│   │   └── skills-grid.tsx
│   ├── data/
│   │   ├── skills.json        # Generated by build-data.ts
│   │   ├── categories.json    # Generated by build-data.ts
│   │   └── search-index.json  # Generated by build-data.ts
│   ├── lib/
│   │   ├── search.ts          # fuse.js wrapper
│   │   └── utils.ts           # shadcn cn() helper
│   └── types/
│       └── index.ts           # Skill, Category, SiteStats types
```

---

## Execution order

Phases must be executed sequentially:

```
Phase 0 (Design) → Phase 1 (Scaffolding) → Phase 2 (Data) → Phase 3 (Components) → Phase 4 (Pages) → Phase 5 (Stats) → Phase 6 (Deploy) → Phase 7 (Polish)
```

Phase 5 (Stats pipeline) can be developed in parallel with Phases 3-4 since it's independent infrastructure.

---

## Done criteria

ALL must hold:

- [ ] `website/` contains a complete Next.js + shadcn application
- [ ] `npm run build` succeeds in `website/`
- [ ] All 35 skill pages render at `/skills/{slug}` with correct data
- [ ] Homepage has all 6 sections (hero, stats, how-it-works, install tabs, skills grid, footer)
- [ ] Search works with fuzzy matching across skill names, descriptions, keywords
- [ ] Category filter pills work
- [ ] Copy-to-clipboard works for all install commands
- [ ] All pages mobile responsive (320px → 1440px)
- [ ] Page transitions animate smoothly
- [ ] Stat counters animate on scroll
- [ ] Live stats pipeline runs every 6 hours
- [ ] Deployed to `sap-skills.pages.dev`
- [ ] Lighthouse Performance > 90
- [ ] No modifications to existing repo files outside `website/` and `.github/workflows/`
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- `@cloudflare/next-on-pages` does not support the required Next.js features (App Router, static generation)
- The chosen design direction from Phase 0 is fundamentally incompatible with shadcn component structure
- skills.sh aggressively blocks scraping (returns 403/captcha) — stats pipeline needs redesign
- R2 free tier limits are exceeded (unlikely: single JSON file, < 1MB)
- Build time exceeds 5 minutes (CF Pages limit)
