# AI for Planning & Analytics (SAC 2026.8)

Source: 002-ai-planning-analytics.md.

## Key capabilities
- **Just Ask / Search to Insight**: natural language queries; use for quick checks and to seed stories.
- **Smart Predict / Predictive Planning**: time-series forecasts feeding planning versions; pair with predictive steps in multi actions.
- **Smart Insights / Smart Discovery**: driver analysis to explain variances; useful before setting allocations.
- **AI-Assisted Data Actions** (QRC1 2026 / 2026.3+): generate advanced formula scripts from natural-language comments, or generate explanatory comments from existing scripts. Requires Execute permission for the Generative AI privilege.

## When to apply in planning
- Pre-allocations: use Smart Insights to find drivers, then set allocation drivers accordingly.
- Forecast cycles: run predictive forecasts into private versions, validate, then publish.
- Ad-hoc questions during planning meetings with Just Ask to reduce manual slice-and-dice.
- Data action development: use AI-assisted script generation to accelerate formula creation in advanced formula steps.

## Just Ask enhancements (QRC2 2026 / 2026.8+)
- **Mixing Advanced Filters**: excluded date members can now be combined with date range filters (e.g., `Show me taxes by product for 2013–2017 excluding Q3 2015`). The exclusion is preserved via an Advanced Filter.
- **Compound Growth Rate queries**: visualize growth over time with queries like `Show me the compound growth rate of sales from 2024 to 2025`.
- **Percentage contribution queries**: ask `How much does California contribute to total USA sales?` to get percentage breakdowns.
- **Dimension members in Datasphere models**: dimension members are now included in SAP Datasphere model suggestions.

## Smart Insights enhancements (QRC2 2026 / 2026.8+)
- **Automatic Loading Top Contributors**: for SAP Datasphere and Seamless Planning models, progressive loading of Top Contributors is enabled automatically when dimensions or hierarchy levels exceed 20. Not supported for non-additive measures (ratios, exception aggregations).
- **Lite Viewer support**: Smart Insights are now available in Lite Viewer mode.

## Guardrails
- Validate AI outputs before publish; keep in private versions for review.
- Ensure model permissions align; AI respects data access control.
- For AI-assisted data actions, always verify generated scripts before accepting.
