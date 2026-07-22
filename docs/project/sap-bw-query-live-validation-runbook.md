# sap-bw-query live validation runbook

**Status: PENDING — no step below has been executed against a live SAP BW system.**
The metadata-read and editor-population capabilities were implemented offline against
javap-verified BWMT 1.27.36 signatures (`plugins/sap-bw-query/skills/sap-bw-query/references/bwmt-api-map.md`)
and stay behind capability gates until this runbook has been executed and its results
recorded in `docs/project/source-verification-ledger.json`.

## Preconditions

- Windows workstation with the portable bundle built at the current `bundleVersion` from
  `bundle/bundle-source-lock.json` (`bundle/Build-BwStudio.ps1`) and deployed
  (`scripts/BwStudio.ps1 -Action Deploy`); `bw_studio_status` reports the active version.
- A **development/sandbox** BW or BW/4HANA system reachable from the workstation, with a
  user authorized for query display and query creation on a test InfoProvider. Never run
  this runbook against production.
- Password-free connection metadata prepared (`bw_connection_prepare` or landscape
  import). Credentials are typed only into the native SAP login dialog.

## Headless smoke (offline pre-flight, no BW connection)

Before the live steps, confirm the reflective builder/reader round-trip still works against the
deployed bundle. This is fully offline: it builds an in-memory query with `QueryModelBuilder`,
reads it back with `QueryModelReader`, and asserts the model round-tripped. It never touches the
workbench, never opens a BW connection, and never saves. CI runs the same check after every
bundle build; this is the local equivalent for troubleshooting a freshly deployed home.

1. Deploy the bundle so `bw_studio_status` reports the active `<version>` (see Preconditions).
2. Run the round-trip as plain Java (`StandaloneSmoke`) against a curated classpath of the
   deployed BWMT model jars. This is the same harness CI runs; it needs only the EMF + BWMT
   model bundles, not the full Eclipse product (the console `eclipsec -application` launch of
   the full modeling product is slow and environment-sensitive headless, so it is not used).
   From `<home> = %LOCALAPPDATA%\BWAutomationStudio\versions\<version>`, build the classpath
   from these bundle prefixes under `<home>\eclipse\plugins\` (one jar each, patch-version
   robust): `com.sap.bw.automation`, `com.sap.bw.qd.model`, `com.sap.bw.model.core`,
   `com.sap.bw.connectivity`, `com.sap.adt.tools.core.base`, `com.sap.ndb.studio.model.base`,
   `com.sap.ndb.studio.model.data`, `com.sap.ndb.studio.repository.model.resource`,
   `com.sap.ndb.studio.view.model`, `com.sap.ndb.studio.sdk.base`,
   `com.sap.ndb.studio.search.model`, `org.eclipse.emf.common`, `org.eclipse.emf.ecore`,
   `org.eclipse.emf.ecore.xmi`, `com.google.gson`, `org.eclipse.core.runtime`,
   `org.eclipse.core.jobs`, `org.eclipse.core.resources`, `org.eclipse.core.contenttype`,
   `org.eclipse.equinox.common`, `org.eclipse.equinox.registry`,
   `org.eclipse.equinox.preferences`, `org.eclipse.osgi`. Then run:

   ```bat
   <home>\jre\bin\java.exe -cp "<curated-jars-joined-by-semicolons>" ^
     com.sap.bw.automation.core.StandaloneSmoke
   ```

3. Expect a single JSON line `{"smoke":"PASS", ...}` and exit code `0`. `{"smoke":"SKIPPED", ...}`
   (exit `0`) means the BWMT 1.27.36 model surface is not present — the smoke is only meaningful
   in the full bundle. `{"smoke":"FAIL", ...}` (exit `1`) lists the failing assertions in its
   `failures` array; treat it as a regression in the reflective model surface and stop before
   the live steps below. (An `com.sap.bw.automation.smoke` Eclipse application also exists for
   in-OSGi use, but the standalone class above is the supported, reliable harness.)

This runbook documents the command only; do not run it as part of recording live-system evidence.

## Step 1 — Studio and capability baseline

1. `bw_studio_launch`, then log on to the BW project in Eclipse (native dialog/SSO).
2. Run `bw_inspect_capabilities` and record the full JSON:
   - expected: `bwmtAvailable`, `queryWizardAvailable`, `providerMetadataSupported`,
     `populateSupported` all `true` with an empty `issues` array.
   - any `false` gate: record the issue text; the corresponding steps below are blocked
     by design and the API map's assumptions must be revisited.

## Step 2 — InfoProvider metadata read (read-only)

1. Run `bw_describe_provider` with the alias, project, and a known test provider.
2. Record: `metadata.available`, `metadata.source` (`mdservice` or `iprov`), the
   `attempts` array, and counts of `characteristics`/`keyFigures`.
3. Cross-check at least five characteristics and three key figures (names, descriptions,
   dimension groups) against the provider display in BWMT.
4. Open items to resolve and note in the API map:
   - which acquisition path served the call and whether the other one failed,
   - the meaning of `InfoProviderModelManager(String)`'s constructor argument and
     `loadInfoProvider` parameters if the iprov path was used,
   - the `getMetadata` second argument (provider type token) if the mdservice path was used,
   - the `InfoObject.getInfoObjectType()` tokens actually returned (KYF classification).

## Step 3 — Metadata-verified spec validation

1. Run `bw_resolve_and_validate_spec` with `alias` set and a spec referencing one known
   characteristic, one known key figure, one misspelled characteristic, and one
   misspelled key figure.
2. Expected: `metadataChecked: true`; blocking `UNKNOWN_CHARACTERISTIC` and
   `UNKNOWN_KEY_FIGURE` gaps exactly for the misspelled names; `readyForDraft: false`.
3. Correct the names and confirm `readyForDraft: true`.

## Step 4 — Draft, wizard, and human-confirmed population

1. `bw_create_local_draft` with a spec containing: two characteristics on rows, a
   key-figure structure with one basic and one restricted key figure, one filter, zero
   suppression, and one condition.
2. `bw_prepare_new_query_save`; confirm in the Eclipse dialog. **A human presses Finish**
   in the native wizard (brand-new technical name on the test provider).
3. Run `bw_populate_query_editor` with the draft id and record the full `applyReport`.
4. In the editor verify, element by element: rows, structure members (including the
   restriction), filter, zero suppression, condition. Record per element whether the
   model matches the spec (this validates the `1KYFNM`-free member-selection layout,
   `SelectionType.KEY_FIGURE` usage, and token feature names assumed offline).
5. Verify Undo (Ctrl+Z) rolls the population back in one step (editing-domain command).
6. Verify the automation did NOT save: close the editor without saving, reopen the
   provider's query list, and confirm the query does not exist in the backend.
7. Repeat steps 2–4 and let **the human** press Save; confirm SAP's own validation
   passes and the query executes (e.g., BWMT data preview or RSRT on the test system).
8. Negative checks:
   - run `bw_populate_query_editor` against an OPEN EXISTING query with matching name —
     expected: refusal with "already has content";
   - run it with no matching editor open — expected: `userActionRequired` instruction.

## Step 5 — Record results

1. Update `references/bwmt-api-map.md`: resolve every "live-validation required" item
   with what was observed (or correct the assumptions and re-run).
2. Update `docs/project/source-verification-ledger.json`: only after all steps pass may
   the scope text drop the corresponding "remain pending" clauses; keep pending anything
   not exercised (e.g., transport, authorization variants, SNC).
3. Attach evidence (journal excerpts from the BW Automation sidebar, `applyReport` JSON,
   screenshots) to a dated `docs/project/sap-bw-query-live-validation-<date>.md` report.

## Safety reminders

- Passwords are never typed anywhere except the native SAP dialog.
- Existing queries stay read-only; population refuses non-empty models.
- The automation never presses Finish or Save; both remain human actions.
- No cleanup automation: leave failed artifacts in place for inspection.
