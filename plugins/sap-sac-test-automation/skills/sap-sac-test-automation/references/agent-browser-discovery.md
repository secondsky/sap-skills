# Optional agent-browser Discovery Workflow

Source: Derived summary from incorporated SAC automated-suite planning content and local agent-browser skill behavior.

Load the `agent-browser` skill only when the CLI is installed and approved. Use `tool-availability-and-deployment.md` first in restricted environments, because agent-browser may be unavailable on managed Windows desktops, locked-down CI images, or networks that block tool installation.

## Discovery Rules

- Keep discovery read-only unless the user explicitly approves the action and target environment.
- Use agent-browser output as a draft. Require human review before selectors, profiles, scenarios, baselines, or expected values become CI inputs.
- Capture discovery artifacts in the dashboard profile directory, not as loose top-level files.
- Prefer accessibility snapshots, annotated screenshots, visible labels, text, roles, and SAC widget names over private DOM selectors.
- Re-run snapshots after tab changes, filter dialogs, prompts, overlays, or any UI state change.
- If agent-browser is missing, use manual discovery, Chrome DevTools MCP with supported Chrome, Edge/CDP discovery, Chrome DevTools MCP with Edge best-effort, or Playwright exploration according to the capability gate.

## Typical Commands

Use the local agent-browser skill for current CLI syntax. A typical SAC discovery session follows this shape only after the tool and data policy are approved:

```bash
agent-browser open "$SAC_STORY_URL"

agent-browser snapshot > profiles/finance-executive/discovery/agent-browser/snapshots/overview.txt

agent-browser screenshot \
  --annotate \
  --screenshot-dir profiles/finance-executive/discovery/agent-browser/screenshots

agent-browser console --json \
  > profiles/finance-executive/discovery/agent-browser/console.json

agent-browser errors \
  > profiles/finance-executive/discovery/agent-browser/page-errors.txt

agent-browser network har start

# Explore only approved read-only flows:
# - open tabs
# - inspect filters/prompts
# - inspect tables/charts
# - test read-only buttons/download affordances when allowed

agent-browser network har stop \
  profiles/finance-executive/discovery/agent-browser/network.har
```

If the installed CLI uses ref-based snapshots, follow the snapshot/ref loop: open, snapshot, interact with current refs, then snapshot again.

## Discovery Output

Store:

```text
profiles/<dashboard>/discovery/agent-browser/
  snapshots/
    overview.txt
    detail.txt
    planning.txt
  screenshots/
    overview-annotated.png
    detail-annotated.png
    planning-annotated.png
  proposed-profile.yaml
  proposed-scenarios.yaml
  console.json
  page-errors.txt
  network.har
  review-notes.md
```

Do not commit secrets, cookies, auth state, private browser profiles, or tenant-local credential files.

## Human Review Checklist

Confirm:

- Story ID, tenant/environment, open mode, bookmark, and optimized-story status.
- Every page/tab, including overflow/role-hidden tabs.
- Business-critical widgets and components to ignore.
- SAC widget names from the story outline where possible.
- Candidate selectors and any reviewed CSS/XPath fallbacks.
- Page-ready markers and widget-specific readiness expectations.
- Expected values, tolerances, data snapshot, and visual baseline stability.
- Role expectations for visible, hidden, allowed, denied, and data-restricted behavior.
- Planning reset strategy, private/public version policy, comment isolation, and cleanup.
- Unsupported or restricted SAC features for the story/tenant.
