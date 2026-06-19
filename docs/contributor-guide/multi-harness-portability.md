# Multi-Harness Portability

SAP skills in this repository are packaged for the Claude marketplace, but the
skill content must remain useful in Codex, OpenCode, and other AI coding
assistants that can read Markdown instructions.

## Portability Model

Treat every plugin as two layers:

- **Portable skill layer**: `SKILL.md`, README files, references, templates, and
  command body text. This layer must explain the SAP task, safety boundaries,
  verification status, and fallback workflow without assuming Claude-specific
  runtime features.
- **Claude activation layer**: `.claude-plugin/plugin.json`, command
  frontmatter, agents, hooks, `.mcp.json`, and `.lsp.json`. These files improve
  activation in Claude-compatible clients but must not be the only place where
  safety or usage rules are documented.

## Harness Behavior

| Component | Claude-compatible harness | Codex/OpenCode/other harness |
| --- | --- | --- |
| Skills | Auto-activated from metadata and descriptions | Read as Markdown instructions or imported skill content |
| Commands | Slash commands with `allowed-tools` preapproval | Prompt templates; body text must carry safety defaults |
| Agents | Specialized subagents when supported | Main-thread guidance or role descriptions |
| Hooks | Automatic PreToolUse/PostToolUse checks | Manual validators or optional scripts |
| MCP configs | Plugin MCP activation recipes | Connection recipes; user/client must configure MCP support |
| LSP configs | Plugin language server activation recipes | Manual LSP client configuration or direct launcher commands |

## Authoring Rules

- Put safety-critical behavior in prose, not only in frontmatter. Commands must
  state defaults such as "read-only", "snippet only", "ask before writing", and
  "tenant mutation requires explicit confirmation" in the command body.
- Do not claim live SAP tenant, runtime, or production validation unless the
  matching entry in `docs/project/source-verification-ledger.json` records live
  evidence.
- Describe MCP servers as optional live-tenant integrations until the user has
  configured credentials and verified tool availability in their harness.
- When a skill mentions agents or hooks, add a fallback sentence explaining that
  unsupported harnesses should use the same guidance in the main thread or run
  the validator script manually.
- Use `${CLAUDE_PLUGIN_ROOT}` only in Claude plugin activation files where the
  plugin format supports it. Shell and Node scripts should still resolve their
  own location or accept explicit paths so they can be run directly outside
  Claude.

## Review Checklist

- A reader can use the skill from Markdown alone.
- Command body text preserves safety boundaries even if `allowed-tools` is
  ignored.
- README and SKILL metadata distinguish docs/package evidence from live tenant
  evidence.
- MCP sections list command, arguments, required environment variables,
  operation safety, approved pins, and fallback behavior.
- Claude-specific activation files remain valid after portability edits.
