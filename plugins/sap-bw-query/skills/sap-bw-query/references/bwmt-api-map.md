# BWMT 1.27.36 API Map

Signature-level inventory of the SAP BW Modeling Tools (BWMT) internal APIs that the
automation adapter binds to through reflection. Every signature below was extracted with
`javap` from the exact JARs inside the locally deployed bundle
(`%LOCALAPPDATA%\BWAutomationStudio\versions\<active>\eclipse\plugins\`, BWMT `1.27.36`).
No live SAP BW system was involved; runtime behavior notes marked **live-validation
required** are design assumptions until the live-validation runbook is executed.

These are SAP-internal, unpublished APIs. The capability probe must prove each class,
method, and EMF feature at runtime before any dependent tool is enabled. A failed probe
disables the feature with a diagnostic; it never falls back to guessed member names.

## Bundles inspected

| Bundle | Role |
| --- | --- |
| `com.sap.bw.connectivity` | Backend services over ADT REST; InfoProvider metadata |
| `com.sap.bw.qd.model` | EMF query model (`QueryPackage`) used by BW Query Designer |
| `com.sap.bw.qd.ui` | Query Designer editors (`QueryEditor`) and wizard |
| `com.sap.bw.editor.ui` | Editor base classes, editing domain, entity model manager |
| `com.sap.bw.model.core` | Shared `bwcore` model (`ComparisonOperator`, `BwElement`, …) |

## 1. InfoProvider metadata acquisition

### 1.1 Destination resolution — `com.sap.bw.connectivity.util.ProjectUtil`

```java
public static IProject   getProject(String name);
public static IProject[] getBwProjects();
public static boolean    isBwProject(IProject project);
public static String     getDestinationID(IProject project);   // project -> ADT destination
public static String     getSystemID(IProject project);
public static String     getClient(IProject project);
public static String     getUser(IProject project);
public static boolean    isBW4HANA(String destinationId);
```

### 1.2 Path A (primary) — `com.sap.bw.connectivity.xml.iprov.InfoProviderModelManager`

The same model the BWMT provider views load (`CDSProviderView` references it).

```java
public InfoProviderModelManager(String resourceType);            // arg semantics: live-validation required
public void setDestinationId(String destinationId) throws CommException;
public InfoProvider loadInfoProvider(String name, int version, boolean b1, boolean b2)
        throws CommException;                                    // int/boolean semantics: live-validation required
public InfoProvider getFromCache(String key1, String key2);
public static boolean isResourceSupported(String resourceType);
```

`com.sap.bw.connectivity.xml.iprov.InfoProvider` (extends `CommonBwObject`
→ `getName()`, `getDescription()`, `getTLOGO()`):

```java
public int numberOfDimensions();
public Iterator<Dimension> getDimensionIterator();     // Dimension: getName/getDescription/getPosition/getLevel
public int numberOfInfoObjects();
public Iterator<InfoObject> getInfoObjectIterator();
public String getInfoArea();
public boolean isPlanProvider();
```

`com.sap.bw.connectivity.xml.iprov.InfoObject` (extends `CommonBwObject`):

```java
public String getInfoObjectType();                     // CHA/KYF classification token
public String getTypeDescription();
public String getDimensionName();                      // owning dimension group
public Dimension getParentDimension();
public String getDataType();
public int getOutputLen();
public String getReferenceCharacteristic();
public Iterator<Hierarchy> getHierarchiesIterator();
public Iterator<Attribute> getAttributeIterator();
```

### 1.3 Path B (fallback) — `com.sap.bw.connectivity.services.IInfoProviderMDService`

Acquired via the factory singleton `com.sap.bw.connectivity.services.IServiceFactory`:

```java
public static final IServiceFactory INSTANCE;
IInfoProviderMDService getInfoProviderMDService(String destinationId);
IInfoProviderService   getInfoProviderService(String destinationId, boolean flag);
```

```java
public interface IInfoProviderMDService {
    int getMetadata(String provider, String type) throws CommException;  // 2nd arg: live-validation required
    boolean setDestinationID(String destinationId);
    List<InfoObjectDetails> getCharacteristics();
    List<InfoObjectDetails> getKeyFigures();
    void releaseBuffers();                                               // always call in finally
}
```

`com.sap.bw.connectivity.util.InfoObjectDetails` is a plain DTO with public fields:
`name`, `description`, `iobjType`, `charBasicName`, `dimension`,
`axisAssignment` (`BWObjectDetails`), and `boolean isKeyFigure()`.

`com.sap.bw.connectivity.util.CommException extends Exception` carries
`getLevel()` (`LEVEL_INFO|WARN|ERROR|CRITICAL`) and `getStatusCode()`.

### 1.4 Path C (editor context) — `com.sap.bw.editor.ui.ip.EntityModelManager`

Available when a query editor is open; used for future in-editor validation only.

```java
public EntityModelManager();
public Entity syncEntity(String name, String type, IProject project);
public static List<BwElement> getAllChaElements(Entity entity);
public static List<BwElement> getKyfElements(BwEntity entity);
```

## 2. EMF query model — `com.sap.bw.qd.model.query`

`QueryPackage` / `QueryPackageImpl` implement a standard EMF metamodel:
`QueryFactory.eINSTANCE` extends `org.eclipse.emf.ecore.EFactory`, so every object can be
created generically (`EcoreUtil`, `EClass`, `EStructuralFeature`) and every feature/enum
can be probed at runtime before use. The builder must look features up by name on the
live `QueryPackage` rather than compile against these interfaces.

### 2.1 `Query` (extends `Component`)

```java
EList<AbstractDimension> getRows();
EList<AbstractDimension> getColumns();
EList<AbstractDimension> getFree();
Filter getFilter();                    void setFilter(Filter f);
EList<Condition> getConditions();
EList<Exceptional> getExceptions();
CustomDimension getFirstCustomDimension();   void setFirstCustomDimension(CustomDimension d);
CustomDimension getSecondCustomDimension();  // derived; second structure lives on an axis list
ZeroSuppression getZeroSuppression();  void setZeroSuppression(ZeroSuppression z);
ZeroSuppressionMode getZeroSuppressionMode(); void setZeroSuppressionMode(ZeroSuppressionMode m);
boolean isSuppressRepeatedKeyValues(); void setSuppressRepeatedKeyValues(boolean b);
boolean isEasyQuery();                 void setEasyQuery(boolean b);
boolean isHanaView();                  void setHanaView(boolean b);
ResultPosition getResultPosition();    void setResultPosition(ResultPosition p);
SignPresentation getSignPresentation(); void setSignPresentation(SignPresentation s);
ZeroPresentation getZeroPresentation(); void setZeroPresentation(ZeroPresentation z);
DefaultableParameterizableValue getKeyDate(); void setKeyDate(DefaultableParameterizableValue v);
```

### 2.2 `Component` (extends `QueryElement`, `IBwModel`)

```java
String getTechnicalName();  void setTechnicalName(String name);
String getProviderName();   void setProviderName(String name);
boolean isModified();       void setModified(boolean modified);
boolean isReusable();       void setReusable(boolean reusable);
```

`QueryElement` adds `DefaultableString getDescription()/setDescription(...)`,
`String getId()/setId(...)`, `int getFlatPosition()/setFlatPosition(...)`.

### 2.3 Axis members and structures

- `AbstractDimension` (extends `EObject`): `getInfoObjectName()/setInfoObjectName(String)`.
  Rows/columns/free hold `AbstractDimension` instances.
- `Dimension` (characteristic on an axis; extends `QueryElement`, `AbstractDimension`):
  hierarchy (`getHierarchy()/setHierarchy(Hierarchy)`), `DisplayLevel`, sorting,
  `ValuePresentation`, `ResultPresentation`, `AttributeSelection`, read mode, top/skip.
- **Structures are `CustomDimension`** (extends `Component`, `AbstractDimension`) placed
  on an axis list: `EList<Member> getMembers()`, `setVariable(Variable)`,
  `isSuppressZeros()/setSuppressZeros(boolean)`. A query supports at most two
  (key-figure structure + optional characteristic structure).
- `Member` (extends `QueryElement`): tree via `getChildMembers()`, display via
  `setEmphasize(Emphasize)`, `setScaling(Scaling)`, `setDecimals(Decimals)`,
  `setHidden(HideMember)`, conversions via `setCurrencyConversion/setUnitConversion`.
- `MemberSelection` (extends `Selection`, `Member`): restricted member; selection groups
  via `getGroups()`, `isConstSelection()/setConstSelection(boolean)`.
- `RestrictedMeasure` (extends `Measure` extends `Component`):
  `getMember()/setMember(MemberSelection)`.
- `CalculatedMeasure` (extends `Measure`): `getMember()/setMember(MemberFormula)`.
- `Formula` (extends `QueryElement`): `setFormulaDefinitionString(String)`,
  `setFormulaDefinition(FormulaDefinition)`, `setExceptionAggregation(ExceptionAggregationInfo)`.
- Selections: `Selection.getConstantSelection(): EList<String>`;
  `AbstractSelectionRange` carries `ParameterizableValue` from/to + shifts;
  `SelectionRange` adds `ComparisonOperator` + hierarchy fields;
  `SelectionVariable` binds `Variable` + `ComparisonOperator`.
- Selection-token hierarchy (read side, consumed by `QueryModelReader`): base
  `SelectionToken` (`SelectionUsage getUsageType()`); `SelectionSet extends SelectionToken`
  adds `boolean isExclude()` + `SelectionType getSelectionType()`;
  `AbstractSelectionRange extends SelectionSet` adds
  `ParameterizableValue getFromValue()/getToValue()`; `SelectionRange extends
  AbstractSelectionRange` adds `ComparisonOperator getOperator()`; `SelectionVariable
  extends SelectionSet` exposes `Variable getVariable()` + `ComparisonOperator
  getOperator()`; `SelectionOperation` is the operation token. `SelectionType` literals:
  `NONE, AREA_SELECTION, NODES, COMPOUNDED_VALUE, SELECTION_OPTION, CALC_KEY_FIGURE,
  KEY_FIGURE, RESTR_KEY_FIGURE, QUERY_VARIABLE, TABLE`.
- `ParameterizableValue`: `String getValue()`, `ValueTypeFlag getType()`,
  `Variable getVariable()`. `SelectionGroup`: `String getInfoObject()`,
  `EList<SelectionToken> getTokens()`. `MemberSelection.getGroups(): EList<SelectionGroup>`.
- `Member` display (read side): `Decimals getDecimals()` (`int getNumber()`),
  `Scaling getScaling()` (`int getNumber()`), `Emphasize getEmphasize()`
  (`boolean isEmphasize()`), `HideMember getHidden()` (`HideMemberType getType()`).
  `Dimension.getHierarchy(): Hierarchy` (`ParameterizableValue getName()`),
  `Dimension.getDisplayLevel(): DisplayLevel` (`DisplayLevelType getType()`). Enum values
  are read generically through `org.eclipse.emf.common.util.Enumerator#getName()`.
  `MemberFormula.formulaDefinitionString` is read via the EMF feature lookup
  (`eClass().getEStructuralFeature("formulaDefinitionString")` + `eGet`), never a typed
  getter.

### 2.4 Filters and variables

- `Filter` (extends `Component`): `EList<FilterSelection> getSelections()`, nested
  `getFilter()/setFilter(Filter)`.
- `FilterSelection` (extends `Selection`): `getInfoObject()/setInfoObject(String)`,
  `getTokens(): EList<SelectionToken>`, `setDimension(AbstractDimension)`,
  `SelectionUsage getUsageType()`. Concrete subtypes: `StandardFilterSelection`,
  `KeyFigureFilterSelection`.
- `Variable` (extends `Component`): `VariableType getType()`, `VariableProcType
  getProcType()`, `VariableRepresents getRepresents()`, `VariableInputType getInputType()`
  (all from `com.sap.bw.model.bwcore`), `isReadyForInput()`, `getInfoObject()`,
  `VariableSelection getDefaultValues()`, `VariableReplacement getReplacementPath()`.

### 2.5 Conditions and exceptions

- `Condition` (extends `FilterSelection`): `setAssignment(ConditionChaAssignment)`,
  `getAssignedCharacteristics(): EList<String>`, `isActive()/setActive(boolean)`,
  `isIgnoreNulls()`. Threshold values ride on the inherited selection tokens
  (`SelectionTokenForCondition`).
- `Exceptional` (extends `FilterSelection`): `isActive()/setActive(boolean)`,
  `isAffectsDataCells()`, `isAffectsChaCells()`, `getCellRestrictions():
  EList<CellRestriction>`, data-cell modes per structure
  (`setDataCellFirstStruc(DataCellModeDefinition)`, …). Alert levels ride on
  `SelectionTokenForException`/`AlertLevel`.
- `ZeroSuppression` (extends `EObject`): `isRows()/setRows(boolean)`,
  `isColumns()/setColumns(boolean)`, `getMode()/setMode(ZeroSuppressionMode)`.

### 2.6 `QueryFactory.eINSTANCE` creators (subset used by the builder)

`createQuery`, `createDimension`, `createCustomDimension`, `createRestrictedMeasure`,
`createCalculatedMeasure`, `createMemberSelection`, `createMemberFormula`,
`createSelectionRange`, `createSelectionVariable`, `createStandardFilterSelection`,
`createKeyFigureFilterSelection`, `createFilter`, `createVariable`, `createCondition`,
`createExceptional`, `createZeroSuppression`, `createDecimals`, `createScaling`,
`createEmphasize`, `createGeneralSorting`, `createDimensionSorting`, `createHierarchy`,
`createDisplayLevel`, `createFormulaDefinition`, `createExceptionAggregationInfo`,
`createDefaultableString`, `createParameterizableValue`.

## 3. EEnum literals (Java constant names)

| EEnum | Literals |
| --- | --- |
| `ZeroSuppressionMode` | `FOR_RESULTS_ONLY`, `FOR_ALL_VALUES` |
| `ConditionOperator` | `EQUAL`, `NOT_EQUAL_TO`, `LESS_THAN`, `GREATER_THAN`, `LESS_EQUAL`, `GREATER_EQUAL`, `BETWEEN`, `NOT_BETWEEN`, `TOP_N`, `BOTTOM_N`, `TOP`, `BOTTOM`, `TOP_SUM`, `BOTTOM_SUM` |
| `ExceptionOperator` | `EQUAL`, `NOT_EQUAL_TO`, `LESS_THAN`, `GREATER_THAN`, `LESS_EQUAL`, `GREATER_EQUAL`, `BETWEEN`, `NOT_BETWEEN` |
| `AlertLevel` | `GOOD1`, `GOOD2`, `GOOD3`, `CRITICAL1`, `CRITICAL2`, `CRITICAL3`, `BAD1`, `BAD2`, `BAD3` |
| `bwcore.ComparisonOperator` | `EQUAL`, `NOT_EQUAL`, `LESS_THAN`, `GREATER_THAN`, `LESS_EQUAL`, `GREATER_EQUAL`, `BETWEEN`, `NOT_BETWEEN`, `CONTAINS_PATTERN`, `NOT_PATTERN` |

All are EMF `Enumerator` enums exposing `get(String)`, `getByName(String)`,
`getLiteral()`. QuerySpec enum values map through `getByName` and must be re-verified
against the live `QueryPackage` EEnum before each apply.

## 4. Query Designer editor surface — `com.sap.bw.qd.ui.editor`

Class hierarchy: `QueryEditor` → `ComponentEditorWithInfoProv` → `ComponentEditor`
→ `com.sap.bw.editor.ui.editor.BwMultiPageEditor` (implements
`IEditingDomainProvider`).

```java
// QueryEditor
public Query getQuery();                            // the live EMF model (may be null while loading)

// BwMultiPageEditor
public String getTechnicalName();
public boolean isDirty();
public boolean isReadOnly();
public boolean isLoggedOn();
public String getDestinationId();                   // editor-scoped ADT destination
public org.eclipse.emf.edit.domain.EditingDomain getEditingDomain();
public IBwModel getModelObject();

// ComponentEditor / ComponentEditorWithInfoProv
public ModelManager<Component> getModelManager();   // getEditingDomain(): TransactionalEditingDomain
public EntityModelManager getEntityModelManager();
public void doSave(IProgressMonitor monitor);       // NEVER invoked by the automation
```

Model mutations must run on the SWT display thread inside a command on the editor's
`TransactionalEditingDomain` (via `RecordingCommand` or equivalent) so the editor
becomes dirty, refreshes, and stays undoable. `doSave` stays outside the automation
surface — the human presses Save.

The provider-name accessors used by the adapter (`getTechnicalName`, `getProviderName`,
`isModified`, `getRows`, `getColumns`, `getFree`) live on the `Query`/`Component` model
object returned by `getQuery()`, not on the editor part.

### New-query wizard

Wizard registry id `com.sap.bw.qd.QueryNewWizard` (probed by `CapabilityProbe`). The
wizard's Finish action creates the backend object and opens the editor; the automation
never presses Finish. After the human finishes, the new query surfaces as a
`QueryEditor` whose `getQuery().getTechnicalName()` equals the confirmed draft binding.

## 5. Items requiring live validation

- `InfoProviderModelManager(String)` constructor argument and
  `loadInfoProvider(String,int,boolean,boolean)` parameter semantics.
- `IInfoProviderMDService.getMetadata(String provider, String type)` second argument
  (expected: provider TLOGO/type token) and required logon preconditions.
- Whether wizard-created editors expose a non-null `getQuery()` before first save, and
  the exact `TransactionalEditingDomain` command pattern the editor accepts.
- `InfoObject.getInfoObjectType()` token values used to split characteristics from key
  figures (fallback: `InfoObjectDetails.isKeyFigure()`).

Execution of these checks is scripted in
`docs/project/sap-bw-query-live-validation-runbook.md`; until it runs, all dependent
tools stay behind capability gates and the verification ledger keeps live validation
marked pending.

## Sources

- Signature-level `javap -classpath <bundle-jar> <class>` inspection of the locally
  deployed BWMT `1.27.36` JARs listed above (SapMachine JDK 21.0.11 `javap`), performed
  2026-07-17 against bundle version `0.1.0`. No decompiled method bodies are reproduced.
- Read-side accessors for the deep query model reader (`Query.isEasyQuery()/isHanaView()`,
  the `SelectionToken`/`SelectionSet`/`AbstractSelectionRange`/`SelectionRange`/
  `SelectionVariable`/`SelectionOperation` hierarchy, `ParameterizableValue.getVariable()`,
  and the `Member`/`Dimension` display getters) were confirmed with the same `javap`
  procedure on 2026-07-18 against bundle `0.1.0`.
- Bundle identities and versions per `bundle/bundle-source-lock.json` (BWMT update-site
  artifacts pinned by hash).
- No live SAP BW tenant, logon, or backend call was used; runtime-behavior notes are
  marked live-validation required above.
