# Manual MCP Connections

Codex plugin manifests in this repository do not activate MCP servers
automatically. The Claude `.mcp.json` files remain the source recipes until a
Codex-specific smoke test verifies the client format, executable paths, and
tool safety.

## Available recipes

| Plugin | Recipe | Server key |
| --- | --- | --- |
| `sap-bw-query` | [`plugins/sap-bw-query/.mcp.json`](../../plugins/sap-bw-query/.mcp.json) | `bw-automation-studio` |
| `sap-cap-capire` | [`plugins/sap-cap-capire/.mcp.json`](../../plugins/sap-cap-capire/.mcp.json) | `sap-cap-capire` |
| `sap-datasphere` | [`plugins/sap-datasphere/.mcp.json`](../../plugins/sap-datasphere/.mcp.json) | `sap-datasphere` |
| `sap-fiori-tools` | [`plugins/sap-fiori-tools/.mcp.json`](../../plugins/sap-fiori-tools/.mcp.json) | `fiori-tools` |
| `sap-hana-cli` | [`plugins/sap-hana-cli/.mcp.json`](../../plugins/sap-hana-cli/.mcp.json) | `hana-mcp-server` |
| `sap-sac-scripting` | [`plugins/sap-sac-scripting/.mcp.json`](../../plugins/sap-sac-scripting/.mcp.json) | `sac-mcp` |
| `sapui5` | [`plugins/sapui5/.mcp.json`](../../plugins/sapui5/.mcp.json) | `ui5-tooling` |

## Safe manual setup

1. Read the recipe and confirm that the command, package version, and
   arguments are approved for the target project.
2. Resolve `${CLAUDE_PLUGIN_ROOT}` to the checked-out plugin directory when a
   recipe uses it. Do not copy the Claude placeholder into another client.
3. Provide environment variables through the client or shell secret store.
   Never add credentials, tenant URLs, or tokens to the repository.
4. Start with metadata or read-only operations and confirm the server exposes
   only the expected tools.
5. Require explicit confirmation before tenant mutation, deployment, or data
   deletion.

The files use direct server maps and are Claude activation resources, not a
portable Codex manifest contract. Any future Codex MCP declaration must add a
Codex-specific schema, a smoke test, and a reviewed security contract first.
