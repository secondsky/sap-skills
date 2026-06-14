# Plan 008: Build the SAP Skills website

> **Executor instructions**: Follow this plan phase by phase. Each phase has
> concrete deliverables and verification steps. Do not reintroduce runtime
> Cloudflare bindings, paid services, or a server API unless a STOP condition is
> reached and the maintainer explicitly approves a redesign. When done, update
> the status row in `plans/README.md`.
>
> **Critical**: This plan creates a separate static Next.js application in a
> root-level `website/` directory. Existing skill content, plugin manifests, and
> validation scripts remain the source of truth and must not be changed for the
> website, except for launch documentation links called out in Phase 8.

## Status

- **Priority**: P2
- **Effort**: XL (new static website and data pipeline)
- **Risk**: MEDIUM (new app, generated data, deployment workflow)
- **Depends on**: none
- **Category**: direction (website/catalog)
- **Planned at**: 2026-06-13

## Decisions resolved

| Decision | Choice |
|----------|--------|
| Primary product role | Polished SAP Skills catalog, not a guided advisor |
| Target audience | SAP developers, SAP consultants, BTP architects, and AI coding assistant users |
| Domain | `sap-skills.pages.dev` for v1 |
| Framework | Next.js App Router + TypeScript + Tailwind + shadcn/ui |
| Hosting | Cloudflare Pages static export |
| Build output | `website/out` |
| Runtime model | Static pages only; no Pages Functions, no Workers runtime, no R2 binding in app code |
| Stats delivery | Public R2 `stats.json` fetched client-side with generated fallback |
| Analytics | Free Cloudflare Web Analytics plus optional free Zaraz `zaraz.track()` events |
| Data source | Generated from `.claude-plugin/marketplace.json`, plugin manifests, `.mcp.json`, and `SKILL.md` frontmatter/sections |
| Generated data | Produced by `website/scripts/build-data.ts` during `predev`, `prebuild`, and test setup |
| Related skills | Parse explicit `## Related Skills`; infer missing relations deterministically |
| Install story | Universal `npx skills add secondsky/sap-skills` first |
| Per-skill install | `npx skills add secondsky/sap-skills --skill <slug>` |
| Bundle install | Repeat `--skill` once per bundle skill |
| Detail depth | Rich metadata profile, not a full SKILL.md docs mirror |
| Search | Inline search/filter plus Cmd/Ctrl+K focus or compact command dialog |
| Motion | Restrained Framer Motion only where it clarifies hierarchy |
| Visual style | Product-system visuals, clean light theme, no dark mode in v1 |
| OG strategy | Static branded OG image with a provided Nano Banana prompt |
| QA level | Unit tests + Playwright E2E + build/lint/typecheck + Lighthouse |
| Docs scope | Full launch docs refresh after the site ships |

## Why this matters

The repository contains 35 production-ready SAP plugins, 24 agents, 29 commands,
6 MCP integrations, and more than 4,300 installs on skills.sh. Discovery is
currently split between the GitHub README and the skills.sh listing. A dedicated
website should make the ecosystem feel credible, searchable, and easy to adopt
without copying the full documentation set into another surface.

The site should answer four user questions quickly:

1. What is SAP Skills?
2. Which SAP capability or bundle fits my work?
3. How do I install it for my AI coding assistant?
4. Where is the authoritative source on GitHub?

## Architecture

```text
Git repository
  .claude-plugin/marketplace.json
  plugins/*/.claude-plugin/plugin.json
  plugins/*/.mcp.json
  plugins/*/skills/*/SKILL.md
        |
        | website/scripts/build-data.ts
        v
website/src/generated/*.json
        |
        | next build with output: "export"
        v
website/out
        |
        | Cloudflare Pages static hosting
        v
https://sap-skills.pages.dev

Scheduled GitHub Actions
  GitHub API + skills.sh HTML
        |
        | website/scripts/scrape-stats.ts
        v
public R2 stats.json
        |
        | client-side fetch with generated fallback
        v
stats counters and best-effort per-skill install counts
```

Do **not** use `@cloudflare/next-on-pages`, OpenNext, Pages Functions, runtime
R2 bindings, D1, KV, Durable Objects, Queues, Workers Analytics Engine, or a
custom runtime API for v1.

## Phase 0: Design exploration

**Goal**: Create 10 real homepage mockups, choose one direction, and document
the selected design system before implementation.

### Requirements

- Create `website/mockups/` with 10 standalone HTML mockups.
- Each mockup must be a complete first-pass homepage concept, not only a hero.
- Each mockup must include:
  - Hero with universal install command.
  - Stats/social proof band.
  - Six consultant bundle previews.
  - Skills catalog preview with search/filter treatment.
  - Install guide treatment.
  - Footer treatment.
- Use product-system visuals:
  - Code-native UI previews.
  - Category icons.
  - Skill cards and metadata badges.
  - Generated branded OG/hero art where useful.
- Avoid:
  - Generic enterprise stock imagery.
  - Official SAP logos or marks.
  - Decorative blobs/orbs.
  - Dark mode.
  - Marketing-only pages with no catalog signal.

### Nano Banana OG prompt

Use this prompt manually to generate the static Open Graph image:

```text
Create a polished 1200x630 Open Graph image for "SAP Skills", a developer catalog of AI coding assistant skills for SAP. Clean light enterprise design, crisp product-system aesthetic, white background, subtle SAP-inspired blue accents without using the official SAP logo, elegant grid of skill cards, small terminal/install command motif, hints of BTP, CAP, Fiori, ABAP, Analytics, and AI as abstract product UI elements. Include only the text: "SAP Skills" and "35 production-ready plugins for AI coding assistants". High contrast, readable at small size, modern developer-tool branding, no people, no stock-photo look, no official corporate marks.
```

### Deliverables

- [ ] `website/mockups/` with 10 HTML mockups.
- [ ] Maintainer-selected winning direction.
- [ ] `website/DESIGN.md` with:
  - Chosen mockup reference.
  - Color tokens.
  - Typography tokens.
  - Spacing/radius/elevation rules.
  - Motion rules.
  - Component inventory.
  - OG image prompt and final asset location.

### Verify

- Maintainer signs off on the chosen design before Phase 1 implementation.
- The selected design can support all required pages and responsive states.

## Phase 1: Project scaffolding

**Goal**: Create a static Next.js website project that can build to `out/` and
run locally via Cloudflare Pages static preview.

### Steps

1. Create the app:

   ```bash
   npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. Install runtime dependencies:

   ```bash
   cd website
   npm install framer-motion fuse.js zod gray-matter lucide-react sonner
   ```

3. Install development dependencies:

   ```bash
   npm install -D tsx vitest @vitest/coverage-v8 @playwright/test wrangler @types/node
   ```

4. Initialize shadcn/ui:

   ```bash
   npx shadcn@latest init
   ```

   Use:
   - Style: default or the closest match to `website/DESIGN.md`.
   - Base color: neutral.
   - CSS variables: yes.
   - Icon library: lucide.

5. Add shadcn components:

   ```bash
   npx shadcn@latest add button card badge input tabs dialog command tooltip separator scroll-area sheet sonner breadcrumb toggle-group alert skeleton
   ```

6. Configure `next.config.ts` for static export:

   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: "export",
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };

   export default nextConfig;
   ```

7. Add package scripts:

   ```json
   {
     "predev": "tsx scripts/build-data.ts",
     "dev": "next dev",
     "prebuild": "tsx scripts/build-data.ts",
     "build": "next build",
     "typecheck": "tsc --noEmit",
     "test": "vitest run",
     "test:watch": "vitest",
     "e2e": "playwright test",
     "preview:pages": "wrangler pages dev out"
   }
   ```

   Keep the lint command produced by `create-next-app`. If the generated project
   uses `eslint` directly rather than `next lint`, keep that generated command.

8. Add static hosting files:
   - `website/public/_headers`
   - `website/public/robots.txt`
   - `website/public/og/sap-skills.png` after the generated asset exists.

9. Add `.gitignore` rules only for build outputs and local artifacts:
   - `website/.next/`
   - `website/out/`
   - `website/test-results/`
   - `website/playwright-report/`

### Deliverables

- [ ] Static Next.js app in `website/`.
- [ ] shadcn/ui installed and verified.
- [ ] `next.config.ts` uses `output: "export"` and `trailingSlash: true`.
- [ ] No `@cloudflare/next-on-pages`.
- [ ] `npm run build` emits `website/out`.
- [ ] `npm run preview:pages` serves `out/`.

### Verify

```bash
cd website
npm run typecheck
npm test
npm run build
npx wrangler pages dev out
```

## Phase 2: Data layer

**Goal**: Generate validated, typed website data from existing repo sources.

### Types to add

Create `website/src/types/index.ts` with at least:

```ts
export type CategoryId =
  | "abap"
  | "ai"
  | "btp"
  | "cap"
  | "data-analytics"
  | "hana"
  | "tooling"
  | "ui-development";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  categoryLabel: string;
  categoryIcon: string;
  keywords: string[];
  featureSummary: {
    hasAgents: boolean;
    hasCommands: boolean;
    hasMcp: boolean;
    hasHooks: boolean;
    hasLsp: boolean;
    agentCount: number;
    commandCount: number;
    mcpServerCount: number;
  };
  counts: {
    references: number;
    templates: number;
  };
  metadata: {
    version?: string;
    lastVerified?: string;
    frameworkVersion?: string;
    sdkVersion?: string;
  };
  relatedSkills: string[];
  inferredRelatedSkills: boolean;
  installCommand: string;
  githubUrl: string;
  skillsShUrl?: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  count: number;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  consultantUseCase: string;
  skillSlugs: string[];
  installCommand: string;
}

export interface SiteStats {
  githubStars: number;
  forks: number;
  totalInstalls: number;
  skillInstalls: Record<string, number>;
  skillsListed: number;
  updatedAt: string;
  source: {
    github: string;
    skillsSh: string;
  };
}

export interface AnalyticsEvent {
  name: "install_copy" | "bundle_copy" | "github_click" | "skill_card_open";
  skillSlug?: string;
  bundleId?: string;
  source: string;
}
```

### Category metadata

Use exactly these category labels unless the maintainer changes them in
`website/DESIGN.md`:

| id | label | description | icon |
|----|-------|-------------|------|
| `abap` | ABAP | ABAP development, CDS views, and backend extension patterns | `Code2` |
| `ai` | AI & Machine Learning | SAP AI Core, Generative AI Hub, and SAP Cloud SDK for AI | `Brain` |
| `btp` | SAP BTP Platform | Platform services, operations, connectivity, identity, and transport | `Cloud` |
| `cap` | CAP | Cloud Application Programming Model services and full-stack apps | `Layers` |
| `data-analytics` | Data & Analytics | Datasphere, Analytics Cloud, planning, widgets, and SQLScript | `BarChart3` |
| `hana` | SAP HANA | HANA Cloud, CLI, machine learning, and data intelligence | `Database` |
| `tooling` | Tooling | API standards, dependency automation, and development utilities | `Wrench` |
| `ui-development` | UI Development | SAPUI5, Fiori tools, UI5 CLI, and linting | `Monitor` |

### Consultant bundles

Create these six bundles in generated data. The build must fail if any slug is
missing from the marketplace.

| id | title | skill slugs |
|----|-------|-------------|
| `cap-fiori` | CAP + Fiori Delivery | `sap-cap-capire`, `sap-fiori-tools`, `sapui5`, `sapui5-cli`, `sap-api-style`, `sap-btp-cloud-platform` |
| `btp-operations` | BTP Operations | `sap-btp-cloud-platform`, `sap-btp-best-practices`, `sap-btp-connectivity`, `sap-btp-service-manager`, `sap-btp-cloud-logging`, `sap-btp-cloud-transport-management`, `sap-btp-job-scheduling`, `sap-btp-cias`, `sap-btp-cloud-identity-services` |
| `data-platform` | Data Platform | `sap-datasphere`, `sap-hana-cli`, `sap-hana-cloud-data-intelligence`, `sap-hana-ml`, `sap-sqlscript`, `sap-btp-master-data-integration` |
| `sac-planning` | SAC Planning | `sap-sac-planning`, `sap-sac-scripting`, `sap-sac-custom-widget`, `sap-datasphere` |
| `hana-sql` | HANA + SQLScript | `sap-hana-cli`, `sap-sqlscript`, `sap-hana-ml`, `sap-hana-cloud-data-intelligence`, `sap-cap-capire` |
| `ai-on-btp` | AI on SAP BTP | `sap-ai-core`, `sap-cloud-sdk-ai`, `sap-cloud-sdk-ai-python`, `sap-cap-capire`, `sap-btp-cloud-platform`, `sap-api-style` |

Bundle install command format:

```bash
npx skills add secondsky/sap-skills --skill sap-cap-capire --skill sap-fiori-tools
```

### Data generation rules

Create `website/scripts/build-data.ts`:

- Read root `.claude-plugin/marketplace.json`.
- For each plugin:
  - Use `name`, `description`, `category`, `keywords`, `version`, and `source`.
  - Read `plugins/<slug>/.claude-plugin/plugin.json` for agents and commands.
  - Detect MCP with `plugins/<slug>/.mcp.json`.
  - Detect hooks with `plugins/<slug>/hooks`.
  - Detect LSP from SKILL frontmatter metadata keys containing `lsp` or from
    known plugin metadata such as CAP and SQLScript.
  - Read `plugins/<slug>/skills/<slug>/SKILL.md` frontmatter with `gray-matter`.
  - Count Markdown files under `references/`.
  - Count files under `templates/`.
  - Parse explicit related skills from a `## Related Skills` section when
    present.
  - Infer 3-6 related skills when no explicit section exists.
- Related inference order:
  1. Same category, highest feature overlap.
  2. Known SAP journey adjacency from bundle membership.
  3. Keyword overlap.
  4. Fill from same category alphabetically.
- Write generated JSON to `website/src/generated/`:
  - `skills.json`
  - `categories.json`
  - `bundles.json`
  - `site-stats-fallback.json`
  - `search-index.json`
- Generated JSON is build output. It is produced by scripts and should not be
  hand-edited.

### Validation rules

Use Zod in `website/scripts/build-data.ts` or `website/src/lib/schema.ts`.

Build must fail on:

- Duplicate skill slugs.
- Unknown categories.
- Bundle slug references that do not exist.
- Related skill references that do not exist.
- Invalid stat shape.
- Empty install commands.
- Missing `githubUrl`.

### Deliverables

- [ ] `website/scripts/build-data.ts`
- [ ] `website/src/types/index.ts`
- [ ] `website/src/generated/*.json`
- [ ] `website/src/lib/schema.ts`
- [ ] Unit tests for parser, relation inference, bundle commands, and schema failures.

### Verify

```bash
cd website
npm run prebuild
npm test
node -e "const s=require('./src/generated/skills.json'); console.log(s.length)"
# Expected: 35
```

## Phase 3: Stats pipeline

**Goal**: Publish fresh public stats JSON without introducing a runtime app.

### Stats script

Create `website/scripts/scrape-stats.ts`:

- Fetch GitHub stats from `https://api.github.com/repos/secondsky/sap-skills`.
- Fetch `https://www.skills.sh/secondsky/sap-skills`.
- Parse:
  - GitHub stars.
  - GitHub forks.
  - Total installs.
  - Per-skill install counts where skills.sh lists them.
  - Number of skills listed on skills.sh.
- Output `SiteStats` JSON.
- If skills.sh parsing fails:
  - Preserve GitHub stats if available.
  - Use generated fallback install stats.
  - Set source metadata so the UI can indicate stale/fallback data if needed.

Current expected reality at planning time:

- Repo skills: 35.
- skills.sh listed skills: 30.
- GitHub stars: 336.
- Forks: 88.
- Total installs: about 4.3K.

Do not require skills.sh to list all 35 skills. For unlisted skills, the UI
shows "New" or omits the install badge.

### GitHub Actions workflow

Create `.github/workflows/update-website-stats.yml`:

- Trigger:
  - `workflow_dispatch`
  - `schedule: "0 */6 * * *"`
- Steps:
  - Checkout.
  - Setup Node.
  - Install website dependencies.
  - Run `npx tsx website/scripts/scrape-stats.ts > stats.json`.
  - Validate JSON shape.
  - Upload to R2:

    ```bash
    npx wrangler r2 object put sap-skills-website-stats/stats.json --file stats.json --content-type application/json
    ```

- Required secrets:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

### Public R2 configuration

Configure the R2 bucket with a public URL or public custom domain. Add that URL
to the Pages environment as:

```text
NEXT_PUBLIC_STATS_URL=https://<public-r2-host>/stats.json
```

The website must function without this environment variable by using
`site-stats-fallback.json`.

### Deliverables

- [ ] `website/scripts/scrape-stats.ts`
- [ ] `.github/workflows/update-website-stats.yml`
- [ ] Public R2 URL documented in `website/README.md`
- [ ] Client-side stats loader with fallback behavior

### Verify

```bash
cd website
npx tsx scripts/scrape-stats.ts
npm test
```

Manually verify workflow:

```bash
gh workflow run update-website-stats.yml
```

## Phase 4: Shared UI and interactions

**Goal**: Build reusable components that match `website/DESIGN.md`.

### Component inventory

Create focused components under `website/src/components/`:

- `site-header.tsx`
- `site-footer.tsx`
- `skill-card.tsx`
- `skills-grid.tsx`
- `category-filter.tsx`
- `search-box.tsx`
- `copy-button.tsx`
- `feature-badge.tsx`
- `stat-counter.tsx`
- `install-tabs.tsx`
- `bundle-card.tsx`
- `command-palette.tsx` or Cmd/Ctrl+K search focus behavior
- `stats-provider.tsx`

Use shadcn components where appropriate. Follow shadcn composition rules:

- Use `Badge` for status/feature chips.
- Use `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and
  `CardFooter` for cards.
- Use `TabsTrigger` only inside `TabsList`.
- Use `Sheet` for mobile navigation.
- Use `sonner` for copy confirmations.
- Use `gap-*`, not `space-x-*` or `space-y-*`.
- Use semantic theme tokens for colors.

### Analytics helper

Create `website/src/lib/analytics.ts`:

```ts
import type { AnalyticsEvent } from "@/types";

declare global {
  interface Window {
    zaraz?: {
      track?: (name: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.zaraz?.track?.(event.name, event);
}
```

Call this helper on:

- Install command copy.
- Bundle command copy.
- GitHub link click.
- Skill card open.

No event call may throw if Zaraz is not configured.

### Deliverables

- [ ] Shared components implemented.
- [ ] All copy buttons work.
- [ ] Cmd/Ctrl+K focuses search or opens compact command dialog.
- [ ] Mobile navigation works.
- [ ] Zaraz calls are guarded and no-op locally.

### Verify

```bash
cd website
npm run typecheck
npm test
npm run build
```

## Phase 5: Pages

**Goal**: Build the complete static catalog experience.

### Homepage (`/`)

Sections in order:

1. Hero:
   - H1: `SAP Skills for AI Coding Assistants`
   - Supporting copy focused on 35 production-ready SAP plugins.
   - Primary copy command: `npx skills add secondsky/sap-skills`
   - Secondary link to `/skills`.
2. Stats band:
   - 35 plugins.
   - 24 agents.
   - 29 commands.
   - 6 MCP integrations.
   - 8 categories.
   - GitHub stars.
   - Total installs.
3. Consultant bundles:
   - Six bundle cards.
   - Copyable bundle install command.
4. Install guide:
   - Universal CLI tab first.
   - Claude Code marketplace/plugin commands from README.
   - Cursor/Windsurf MCP guidance.
   - GitHub Copilot custom-instructions guidance.
5. Catalog preview:
   - Search.
   - Category filters.
   - Skill grid.
6. Footer:
   - GitHub.
   - GPL-3.0.
   - E.J.
   - Last updated.
   - No Next.js or Cloudflare promotional credit.

### Skills list (`/skills`)

- Full catalog.
- URL-searchable:
  - `/skills?q=cap`
  - `/skills?category=btp`
  - `/skills?q=planning&category=data-analytics`
- Search and category filters preserve URL state.
- Empty state uses shadcn `Alert` or `Card`, not custom loose markup.

### Skill detail (`/skills/[slug]`)

Use `generateStaticParams()` for all 35 slugs.

Sections:

1. Breadcrumb/back link.
2. Skill hero:
   - Category.
   - Name.
   - Description.
   - Feature badges.
   - Install command.
   - GitHub link.
3. Metadata:
   - Version.
   - Last verified.
   - Agents.
   - Commands.
   - MCP integration.
   - Hooks.
   - LSP.
   - Reference/template counts.
   - Skills.sh install count if available.
4. Keywords.
5. Related skills:
   - Show whether relations were inferred only in non-prominent metadata, not as a scary user-facing warning.
6. Bundle membership:
   - List bundles that include the skill.

### About (`/about`)

Include:

- What SAP Skills is.
- Maintainer.
- GPL-3.0 license.
- Links to GitHub, contributing guide, README, skills.sh.
- Short explanation that content remains sourced from the repository.

### Not found

Create `not-found.tsx` with a link back to `/skills`.

### Deliverables

- [ ] `/`
- [ ] `/skills`
- [ ] `/skills/[slug]/` for all 35 skills.
- [ ] `/about`
- [ ] 404 page.
- [ ] Static metadata for each route.
- [ ] Sitemap and robots.

### Verify

```bash
cd website
npm run build
npx wrangler pages dev out
```

Manually visit:

- `/`
- `/skills/`
- `/skills/sap-cap-capire/`
- `/skills/sap-abap/`
- `/skills/sap-sac-planning/`
- `/about/`

## Phase 6: SEO, assets, and static hosting

**Goal**: Make the static site shareable, indexable, and Cloudflare Pages ready.

### SEO

- Use route-level metadata:
  - Home title and description.
  - Skills list title and description.
  - Per-skill title and description.
  - About title and description.
- Add static OG image:
  - `website/public/og/sap-skills.png`
  - Referenced from all core routes.
- Generate `sitemap.xml` at build time or commit a static sitemap generator.
- Add `robots.txt`.
- Add JSON-LD:
  - `WebSite`
  - `SoftwareSourceCode` or `CollectionPage` for the catalog.
  - `SoftwareApplication` where appropriate for skill detail pages.

### Cloudflare Pages settings

Use:

```text
Framework preset: Next.js (Static HTML Export)
Build command: cd website && npm ci && npm run build
Build output directory: website/out
Root directory: /
```

Do not use:

```text
npx @cloudflare/next-on-pages
.vercel/output/static
Workers/OpenNext deployment
```

### Free-tier guardrails

STOP and report if any requirement appears to need:

- Paid Cloudflare plan.
- Paid Zaraz usage.
- Paid analytics provider.
- Pages Functions.
- Worker runtime.
- Private R2 reads from app code.
- Build output over Cloudflare Pages Free limits.

### Deliverables

- [ ] Static OG image.
- [ ] Metadata and JSON-LD.
- [ ] Sitemap and robots.
- [ ] `_headers` file.
- [ ] `website/README.md` with build/deploy/stats environment notes.

### Verify

```bash
cd website
npm run build
npx wrangler pages dev out
```

Run Lighthouse against the local or deployed site. Targets:

- Performance > 90.
- Accessibility > 90.
- Best Practices > 90.
- SEO > 90.

## Phase 7: Tests and QA

**Goal**: Make the website safe to maintain as repo metadata changes.

### Unit tests

Use Vitest for:

- Marketplace parsing.
- SKILL.md frontmatter parsing.
- Explicit related skill parsing.
- Inferred related skill fallback.
- Bundle install command generation.
- Zod validation failures.
- Stats fallback behavior.
- Zaraz no-op behavior.

### Playwright E2E

Cover:

- Home renders hero, stats, bundles, install guide, and catalog preview.
- Skills page search works.
- Category filter works.
- Search params are read and updated.
- Detail pages render for:
  - `sap-cap-capire` (agents, commands, MCP, LSP).
  - `sap-abap` (minimal-feature variant).
  - `sap-sac-planning` (planning/data-analytics variant).
- Copy buttons write to clipboard.
- Cmd/Ctrl+K behavior works.
- Mobile nav opens and closes.
- Stats fetch failure uses fallback.
- Zaraz absent does not throw.

### Visual QA

After implementation:

- Start the local site.
- Capture desktop and mobile screenshots.
- Compare against the accepted design direction in `website/DESIGN.md`.
- Fix visible drift in layout, copy, typography, palette, card anatomy, spacing,
  and responsive behavior before marking the plan done.

### Required checks

```bash
cd website
npm run lint
npm run typecheck
npm test
npm run build
npm run e2e
npx wrangler pages dev out
```

## Phase 8: Launch and docs refresh

**Goal**: Launch the website and make it discoverable from the repo.

### Deployment

1. Create Cloudflare Pages project for `sap-skills`.
2. Configure build command and output exactly as in Phase 6.
3. Configure `NEXT_PUBLIC_STATS_URL` when public R2 URL is ready.
4. Configure Cloudflare Web Analytics.
5. Configure Zaraz only if it stays within the free allocation.
6. Deploy preview.
7. Validate all key routes.
8. Promote to production at `sap-skills.pages.dev`.

### Docs to update after launch

Update:

- `README.md`
- `docs/getting-started/installation.md`
- `docs/getting-started/quick-reference.md`
- `docs/architecture/project-structure.md` or its generated successor if the
  repo uses codemap regeneration.
- `plans/README.md` status row.

Docs must mention:

- Website URL.
- Universal install command.
- Skills catalog/search.
- GitHub as source of truth.
- Stats are best-effort and may omit newer skills until skills.sh lists them.

### Done criteria

All must hold:

- [ ] `website/` contains a complete static Next.js + shadcn application.
- [ ] `npm run build` succeeds in `website/`.
- [ ] `website/out` is generated.
- [ ] All 35 skill detail pages render.
- [ ] Search and category filters work.
- [ ] Six consultant bundles render with valid install commands.
- [ ] Copy-to-clipboard works.
- [ ] Stats load from public URL or generated fallback.
- [ ] Unlisted skills do not show misleading install counts.
- [ ] Zaraz tracking no-ops when absent.
- [ ] Playwright E2E passes.
- [ ] Lighthouse targets pass.
- [ ] Site is deployed to `sap-skills.pages.dev`.
- [ ] Launch docs are refreshed.
- [ ] `plans/README.md` status row is updated.

## Explicit non-goals

- No dark mode in v1.
- No full SKILL.md docs mirror.
- No custom domain beyond `pages.dev`.
- No paid Cloudflare or third-party services.
- No runtime database.
- No server-rendered runtime pages.
- No edits to existing skill content to improve website data.
- No replacement of GitHub as the source of truth.

## Source references checked during planning

- Cloudflare Pages static Next.js guide: static export builds to `out`.
- Next.js static export guide: use `output: "export"`; unsupported dynamic
  server features remain out of scope.
- Cloudflare Zaraz pricing: free allocation exists; do not enable paid usage.
- vercel-labs `skills` README: `npx skills add <repo> --skill <name>` is valid.

## STOP conditions

Stop and report before proceeding if:

- Static export cannot support the accepted design or route structure.
- Any required feature needs Pages Functions, Workers, OpenNext, or runtime R2
  bindings.
- Public R2 stats delivery cannot be made free and public.
- skills.sh blocks scraping with 403/captcha or unstable markup that cannot be
  parsed reliably.
- Generated data validation reveals stale or inconsistent repo metadata that
  would mislead users.
- Lighthouse targets cannot be met without removing core design or functionality.
- Cloudflare Pages Free limits are exceeded.
