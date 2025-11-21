# SAPUI5 Testing Guide

**Source**: Official SAP SAPUI5 Documentation
**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials
**Last Updated**: 2025-11-21

---

## Testing Strategy

SAPUI5 applications should include:

1. **Unit Tests** (QUnit): Test individual functions and modules
2. **Integration Tests** (OPA5): Test user interactions and flows
3. **Mock Server**: Simulate backend for testing without real services

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: testing, qunit, opa)

---

## QUnit Testing

Unit testing framework for JavaScript code.

### Setup

**test/unit/unitTests.qunit.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Unit Tests</title>

    <script
        id="sap-ui-bootstrap"
        src="../../resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-resourceroots='{
            "com.mycompany.myapp": "../../"
        }'
        data-sap-ui-async="true">
    </script>

    <link rel="stylesheet" type="text/css" href="../../resources/sap/ui/thirdparty/qunit-2.css">
    <script src="../../resources/sap/ui/thirdparty/qunit-2.js"></script>
    <script src="../../resources/sap/ui/qunit/qunit-junit.js"></script>
    <script src="../../resources/sap/ui/qunit/qunit-coverage.js"></script>

    <script src="unitTests.qunit.js"></script>
</head>
<body>
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>
</body>
</html>
```

**test/unit/unitTests.qunit.js**:
```javascript
QUnit.config.autostart = false;

sap.ui.require([
    "com/mycompany/myapp/test/unit/model/formatter"
], function() {
    "use strict";
    QUnit.start();
});
```

### Writing Unit Tests

**test/unit/model/formatter.js**:
```javascript
sap.ui.define([
    "com/mycompany/myapp/model/formatter",
    "sap/ui/model/resource/ResourceModel"
], function(formatter, ResourceModel) {
    "use strict";

    QUnit.module("Formatter Tests");

    QUnit.test("Should format price correctly", function(assert) {
        // Arrange
        var fPrice = 123.456;

        // Act
        var sResult = formatter.formatPrice(fPrice);

        // Assert
        assert.strictEqual(sResult, "123.46 EUR", "Price formatted correctly");
    });

    QUnit.test("Should return empty string for null price", function(assert) {
        // Arrange & Act
        var sResult = formatter.formatPrice(null);

        // Assert
        assert.strictEqual(sResult, "", "Empty string for null");
    });

    QUnit.test("Should format status text", function(assert) {
        // Arrange
        var sStatus = "A";

        // Act
        var sResult = formatter.formatStatus(sStatus);

        // Assert
        assert.strictEqual(sResult, "Approved", "Status formatted correctly");
    });

    QUnit.test("Should calculate total", function(assert) {
        // Arrange
        var iQuantity = 5;
        var fPrice = 10.5;

        // Act
        var fTotal = formatter.calculateTotal(iQuantity, fPrice);

        // Assert
        assert.strictEqual(fTotal, 52.5, "Total calculated correctly");
    });
});
```

### Async Tests

```javascript
QUnit.test("Should load data asynchronously", function(assert) {
    // Indicate async test
    var done = assert.async();

    // Arrange
    var oModel = new JSONModel();

    // Act
    oModel.loadData("test/data/products.json");

    // Assert after data loaded
    oModel.attachRequestCompleted(function() {
        var aProducts = oModel.getProperty("/products");
        assert.ok(aProducts.length > 0, "Data loaded successfully");
        done(); // Mark test complete
    });
});
```

### Testing Controllers

```javascript
sap.ui.define([
    "com/mycompany/myapp/controller/Main.controller",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function(MainController) {
    "use strict";

    QUnit.module("Main Controller", {
        beforeEach: function() {
            this.oController = new MainController();
        },
        afterEach: function() {
            this.oController.destroy();
        }
    });

    QUnit.test("Should initialize correctly", function(assert) {
        // Arrange - spy on method
        var oSpy = sinon.spy(this.oController, "_loadData");

        // Act
        this.oController.onInit();

        // Assert
        assert.ok(oSpy.calledOnce, "Load data called on init");
    });
});
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: qunit)

---

## OPA5 Testing

One Page Acceptance testing for integration tests.

### Setup

**test/integration/opaTests.qunit.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Integration Tests</title>

    <script
        id="sap-ui-bootstrap"
        src="../../resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-resourceroots='{
            "com.mycompany.myapp": "../../"
        }'
        data-sap-ui-async="true">
    </script>

    <link rel="stylesheet" type="text/css" href="../../resources/sap/ui/thirdparty/qunit-2.css">
    <script src="../../resources/sap/ui/thirdparty/qunit-2.js"></script>
    <script src="../../resources/sap/ui/qunit/qunit-junit.js"></script>

    <script src="opaTests.qunit.js"></script>
</head>
<body>
    <div id="qunit"></div>
    <div id="qunit-fixture"></div>
</body>
</html>
```

**test/integration/opaTests.qunit.js**:
```javascript
QUnit.config.autostart = false;

sap.ui.require([
    "sap/ui/test/Opa5",
    "com/mycompany/myapp/test/integration/arrangements/Startup",
    "com/mycompany/myapp/test/integration/WorklistJourney"
], function(Opa5, Startup) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "com.mycompany.myapp.view.",
        autoWait: true
    });

    QUnit.start();
});
```

### Page Objects

**test/integration/pages/Worklist.js**:
```javascript
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/PropertyStrictEquals"
], function(Opa5, Press, EnterText, AggregationLengthEquals, PropertyStrictEquals) {
    "use strict";

    var sViewName = "Worklist";

    Opa5.createPageObjects({
        onTheWorklistPage: {
            actions: {
                iPressOnTheFirstListItem: function() {
                    return this.waitFor({
                        id: "table",
                        viewName: sViewName,
                        actions: new Press(),
                        errorMessage: "The table is not visible"
                    });
                },

                iEnterSearchTerm: function(sSearchTerm) {
                    return this.waitFor({
                        id: "searchField",
                        viewName: sViewName,
                        actions: new EnterText({ text: sSearchTerm }),
                        errorMessage: "Search field not found"
                    });
                },

                iPressTheAddButton: function() {
                    return this.waitFor({
                        id: "addButton",
                        viewName: sViewName,
                        actions: new Press(),
                        errorMessage: "Add button not found"
                    });
                }
            },

            assertions: {
                theTableShouldHaveAllEntries: function() {
                    return this.waitFor({
                        id: "table",
                        viewName: sViewName,
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: 10
                        }),
                        success: function() {
                            Opa5.assert.ok(true, "Table has 10 entries");
                        },
                        errorMessage: "Table does not have expected entries"
                    });
                },

                theTableShouldBeVisible: function() {
                    return this.waitFor({
                        id: "table",
                        viewName: sViewName,
                        success: function(oTable) {
                            Opa5.assert.ok(oTable.getVisible(), "Table is visible");
                        },
                        errorMessage: "Table is not visible"
                    });
                },

                iShouldSeeTheCorrectTitle: function() {
                    return this.waitFor({
                        id: "page",
                        viewName: sViewName,
                        matchers: new PropertyStrictEquals({
                            name: "title",
                            value: "Worklist"
                        }),
                        success: function() {
                            Opa5.assert.ok(true, "Page title is correct");
                        },
                        errorMessage: "Page title is incorrect"
                    });
                }
            }
        }
    });
});
```

### Journeys (Test Scenarios)

**test/integration/WorklistJourney.js**:
```javascript
sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/Worklist",
    "./pages/Object"
], function(opaTest) {
    "use strict";

    QUnit.module("Worklist Journey");

    opaTest("Should see the table with all entries", function(Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Actions
        // (none - just checking initial state)

        // Assertions
        Then.onTheWorklistPage.theTableShouldBeVisible();
        Then.onTheWorklistPage.theTableShouldHaveAllEntries();

        // Cleanup
        Then.iTeardownMyApp();
    });

    opaTest("Should be able to search for items", function(Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Actions
        When.onTheWorklistPage.iEnterSearchTerm("Product");

        // Assertions
        Then.onTheWorklistPage.theTableShouldHaveAllEntries();

        // Cleanup
        Then.iTeardownMyApp();
    });

    opaTest("Should navigate to object page when item is pressed", function(Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Actions
        When.onTheWorklistPage.iPressOnTheFirstListItem();

        // Assertions
        Then.onTheObjectPage.iShouldSeeTheObjectPage();

        // Cleanup
        Then.iTeardownMyApp();
    });
});
```

### Startup Arrangements

**test/integration/arrangements/Startup.js**:
```javascript
sap.ui.define([
    "sap/ui/test/Opa5"
], function(Opa5) {
    "use strict";

    return Opa5.extend("com.mycompany.myapp.test.integration.arrangements.Startup", {
        iStartMyApp: function() {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.mycompany.myapp",
                    async: true,
                    manifest: true
                },
                hash: "",
                autoWait: true
            });
        }
    });
});
```

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: opa5, integration-testing)

---

## Mock Server

Simulate OData backend for testing.

### Setup

**localService/metadata.xml**:
Copy metadata from real service or create manually.

**localService/mockdata/Products.json**:
```json
[
    {
        "ProductID": 1,
        "Name": "Product 1",
        "Price": "100.00",
        "CategoryID": 1
    },
    {
        "ProductID": 2,
        "Name": "Product 2",
        "Price": "200.00",
        "CategoryID": 2
    }
]
```

**localService/mockserver.js**:
```javascript
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/util/UriParameters"
], function(MockServer, UriParameters) {
    "use strict";

    return {
        init: function() {
            // Create mock server
            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/sap/SERVICE_SRV/"
            });

            // Configure mock server
            var sPath = sap.ui.require.toUrl("com/mycompany/myapp/localService");

            MockServer.config({
                autoRespond: true,
                autoRespondAfter: 1000 // 1 second delay
            });

            // Simulate backend
            oMockServer.simulate(sPath + "/metadata.xml", {
                sMockdataBaseUrl: sPath + "/mockdata",
                bGenerateMissingMockData: true
            });

            // Custom request handling
            var aRequests = oMockServer.getRequests();

            // Add custom response for specific request
            aRequests.push({
                method: "GET",
                path: new RegExp("Products\\?.*"),
                response: function(oXhr) {
                    oXhr.respondJSON(200, {}, JSON.stringify({
                        d: {
                            results: [
                                // Custom data
                            ]
                        }
                    }));
                    return true;
                }
            });

            oMockServer.setRequests(aRequests);

            // Start mock server
            oMockServer.start();

            return oMockServer;
        }
    };
});
```

**test/initMockServer.js**:
```javascript
sap.ui.define([
    "com/mycompany/myapp/localService/mockserver"
], function(mockserver) {
    "use strict";

    // Initialize mock server
    mockserver.init();

    // Initialize application
    sap.ui.require([
        "sap/ui/core/ComponentSupport"
    ]);
});
```

**Start with Mock Server**:
```html
<!-- In test HTML file -->
<script src="test/initMockServer.js"></script>
```

**Conditional Mock Server** (development only):
```javascript
sap.ui.define([
    "sap/base/util/UriParameters"
], function(UriParameters) {
    "use strict";

    var oUriParameters = new UriParameters(window.location.href);
    var bUseMockServer = oUriParameters.get("useMockServer") === "true";

    if (bUseMockServer) {
        sap.ui.require([
            "com/mycompany/myapp/localService/mockserver"
        ], function(mockserver) {
            mockserver.init();
            initApp();
        });
    } else {
        initApp();
    }

    function initApp() {
        sap.ui.require(["sap/ui/core/ComponentSupport"]);
    }
});
```

**Usage**: `index.html?useMockServer=true`

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: mock-server)

---

## Test Automation Best Practices

### 1. Test Structure (AAA Pattern)

```javascript
QUnit.test("Test description", function(assert) {
    // Arrange - setup test data and conditions
    var oModel = new JSONModel({ value: 10 });

    // Act - execute the function being tested
    var iResult = myFunction(oModel.getProperty("/value"));

    // Assert - verify the result
    assert.strictEqual(iResult, 20, "Result is correct");
});
```

### 2. Use Descriptive Test Names

```javascript
// Good
QUnit.test("Should format currency with two decimal places", function(assert) {});
QUnit.test("Should return empty string when price is null", function(assert) {});

// Bad
QUnit.test("Test 1", function(assert) {});
QUnit.test("Format test", function(assert) {});
```

### 3. Test One Thing Per Test

```javascript
// Good - separate tests
QUnit.test("Should add item to cart", function(assert) {});
QUnit.test("Should calculate correct total", function(assert) {});

// Bad - testing multiple things
QUnit.test("Should add item and calculate total", function(assert) {});
```

### 4. Use Spies and Stubs (Sinon.js)

```javascript
QUnit.test("Should call service method", function(assert) {
    // Arrange
    var oStub = sinon.stub(oService, "getData").returns([]);

    // Act
    oController.loadData();

    // Assert
    assert.ok(oStub.calledOnce, "Service called once");

    // Cleanup
    oStub.restore();
});
```

### 5. Clean Up After Tests

```javascript
QUnit.module("Test Module", {
    beforeEach: function() {
        // Setup before each test
        this.oModel = new JSONModel();
    },
    afterEach: function() {
        // Cleanup after each test
        this.oModel.destroy();
    }
});
```

### 6. Use autoWait in OPA5

```javascript
Opa5.extendConfig({
    autoWait: true // Automatically waits for UI to be ready
});
```

### 7. Organize Tests by Feature

```
test/
├── unit/
│   ├── model/
│   │   └── formatter.js
│   ├── controller/
│   │   └── Main.controller.js
│   └── unitTests.qunit.html
├── integration/
│   ├── pages/
│   │   ├── Worklist.js
│   │   └── Object.js
│   ├── WorklistJourney.js
│   ├── NavigationJourney.js
│   └── opaTests.qunit.html
└── localService/
    ├── mockserver.js
    ├── metadata.xml
    └── mockdata/
```

---

## Code Coverage

Enable code coverage in QUnit:

**test/unit/unitTests.qunit.html**:
```html
<script src="../../resources/sap/ui/qunit/qunit-coverage.js"></script>
```

**View Coverage Report**:
1. Run tests in browser
2. Click "Enable coverage" in QUnit toolbar
3. View coverage report after tests complete

**Coverage Goals**:
- Unit tests: 80%+ coverage
- Integration tests: Cover all critical user flows

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: code-coverage)

---

## Continuous Integration

### Karma Runner

**karma.conf.js**:
```javascript
module.exports = function(config) {
    config.set({
        frameworks: ["ui5"],
        ui5: {
            type: "application",
            configPath: "ui5.yaml",
            paths: {
                webapp: "webapp"
            }
        },
        browsers: ["ChromeHeadless"],
        reporters: ["progress", "coverage"],
        coverageReporter: {
            type: "html",
            dir: "coverage/"
        },
        singleRun: true
    });
};
```

**package.json**:
```json
{
    "scripts": {
        "test": "karma start"
    },
    "devDependencies": {
        "karma": "^6.0.0",
        "karma-ui5": "^2.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0"
    }
}
```

**Run Tests**:
```bash
npm test
```

---

## Testing Tools

### UI5 Inspector

Browser extension for debugging SAPUI5 apps:
- View control tree
- Inspect control properties
- View bindings
- Check performance

**Installation**: Available for Chrome and Firefox

### Support Assistant

Built-in tool for quality checks:

```javascript
// Enable in code
sap.ui.require(["sap/ui/support/RuleAnalyzer"], function(RuleAnalyzer) {
    RuleAnalyzer.analyze();
});
```

**Or use keyboard**: `Ctrl+Alt+Shift+S`

**Documentation**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: support-assistant)

---

## Links to Official Documentation

- **Testing Overview**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: testing)
- **QUnit**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: qunit)
- **OPA5**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: opa5)
- **Mock Server**: https://github.com/SAP-docs/sapui5/tree/main/docs/04_Essentials (search: mock-server)
- **Get Started Testing**: https://github.com/SAP-docs/sapui5/tree/main/docs/03_Get-Started (search: testing)

---

**Note**: This document covers testing strategies and best practices for SAPUI5 applications. For specific testing scenarios and advanced techniques, refer to the official documentation links provided.
