---
name: sac-test-onboard
description: Guided SAC test automation onboarding command for collecting policy/tooling answers, drafting dashboard profile and scenario artifacts, and optionally writing starter files after explicit confirmation.
allowed-tools:
  - Read
  - Grep
  - Glob
  - AskUserQuestion
argument-hint: "[profile-id] [story-url] [target-dir]"
arguments:
  - name: profile-id
    description: Optional dashboard profile ID, for example finance-executive.
    required: false
  - name: story-url
    description: Optional SAC story URL or redacted story URL pattern.
    required: false
  - name: target-dir
    description: Optional output directory. Defaults to profiles/<profile-id>.
    required: false
---

## Shell Snippet Notes

- Shell snippets assume Bash on Linux/macOS, WSL2, or Git Bash.
- Install command-specific tooling shown near each snippet before running it.
- Confirm before running commands that delete files, change ownership, deploy, publish, or affect remote systems.

## Output Contract

Return a SAC onboarding packet with answered intake, selected discovery backend, profile draft, scenario draft, missing evidence, and confirmation points. Default to draft-only output. Do not preapprove writes from this command. If the user explicitly asks the active coding harness to create files, require confirmation of the target directory and overwrite policy before any separate file-writing step.

# SAC Test Automation Onboarding

Use this command to onboard one SAC story/dashboard into a governed, profile-driven automation workflow.

## Default Target Layout

When file creation is explicitly confirmed in an active coding harness, use this layout:

```text
profiles/<profile-id>/
  intake.md
  dashboard.yaml
  scenarios/
    read-only-smoke.yaml
```

Use the supplied `target-dir` when present. If `profile-id` is missing, derive a lowercase hyphenated ID from the dashboard name after asking the Stage 1 questions.

## Stage 1 Intake

Ask these questions before drafting when the answer is missing from arguments or project files. Show the recommended answer in the options.

1. **Environment class**
   - Recommended: QA tenant or QA story copy.
   - Other options: public demo, production read-only, planning/writeback QA, permission-sensitive QA, private customer tenant.
2. **Allowed discovery backend**
   - Recommended: manual observation plus approved Chrome DevTools MCP or Edge/CDP when available; Playwright for reviewed execution.
   - Other options: manual only, Firecrawl public research only, Playwright exploration, agent-browser, enterprise browser lab.
3. **Restricted-company constraints**
   - Recommended: assume public npm, browser downloads, remote debugging, Firecrawl against private pages, and browser profile access may be blocked until proven allowed.
   - Capture Windows, proxy, custom CA, internal registry, Edge policy, and browser lab constraints.
4. **Auth and roles**
   - Recommended: dedicated SAC test users with one storage state per role.
   - Capture roles such as viewer, planner, admin, restricted, no-export, and MFA/manual refresh requirements.
5. **Writeback/comment scope**
   - Recommended: read-only smoke first; planning, comments, data actions, and multi actions only in controlled QA with explicit approval.
   - Capture whether public version publish, planning reset, comment cleanup, or data actions are in scope.
6. **Baseline ownership**
   - Recommended: dashboard owner approves visual baselines; data owner approves data baselines; SAC/security admin approves permission baselines.
   - Capture tolerance, masking, data snapshot, and approval workflow.

## Stage 2 Optional Deepening

After the first draft, offer a second pass for risky or deep areas:

- Planning/writeback: model, version strategy, reset command, serial policy, validation rules, publish approval.
- Comments: isolated story/page/widget scope, unique run ID prefix, cleanup expectations, notification risk.
- Permissions: role matrix, visible/hidden pages/components, allowed/denied actions, data restrictions.
- Visual/data baselines: masks, tolerance, expected data files, review workflow, drift policy.
- Custom widgets: owned-widget hooks, ARIA labels, public test contracts, Shadow DOM/canvas constraints.
- CI stages: auth-check, read-only smoke, nightly regression, controlled writeback, report publication.
- Failure evidence: trace, screenshot/video, visual diff, console/network summaries, root-cause categories.

## Template Use

Use these bundled templates as the source shape:

- `skills/sap-sac-test-automation/templates/intake.md`
- `skills/sap-sac-test-automation/templates/dashboard-profile.yaml`
- `skills/sap-sac-test-automation/templates/scenario-read-only-smoke.yaml`

Fill placeholders with known answers. Leave unknowns as `TODO(...)` rather than inventing tenant, user, credential, or business-value details.

## Backend Recommendation Rules

- Prefer manual observation when no approved browser tooling exists.
- Use Firecrawl only for public SAP, Microsoft, Playwright, Chrome DevTools MCP, GitHub, and browser documentation by default.
- Use Chrome DevTools MCP for read-only discovery only when installed, approved, pinned/internal, and configured with private-SAC safety controls.
- Use Edge/CDP only when `RemoteDebuggingAllowed` and enterprise policy allow loopback-only debugging with a dedicated automation profile.
- Use Playwright for deterministic regression once profile/scenario drafts are reviewed.
- Use agent-browser only when installed and approved; treat output as a draft.

## File Creation Confirmation

Before any separate file-writing step, ask for explicit confirmation that includes:

- target directory,
- profile ID,
- whether existing files may be overwritten,
- whether private tenant/customer data has been redacted or approved for local artifact storage.

If confirmation is not explicit, return draft content in the response and stop before file creation. This command does not preapprove `Write`; the active harness must apply its normal explicit-confirmation rules before creating files.

## Review Handoff

After drafting or writing, recommend running the `sac-test-profile-reviewer` agent on:

```text
profiles/<profile-id>/intake.md
profiles/<profile-id>/dashboard.yaml
profiles/<profile-id>/scenarios/read-only-smoke.yaml
```

Report remaining blockers as tenant-only validation items; do not claim live SAC, SSO, CI, planning, comments, or baseline behavior is validated without evidence.
