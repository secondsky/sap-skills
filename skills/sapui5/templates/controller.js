/**
 * SAPUI5 Controller Template
 *
 * Usage: Replace placeholders with actual values:
 * - {{namespace}}: Your app namespace
 * - {{ControllerName}}: Controller name
 *
 * File: controller/{{ControllerName}}.controller.js
 */

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "{{namespace}}/model/formatter"
], function(Controller, JSONModel, Filter, FilterOperator, MessageToast, MessageBox, formatter) {
    "use strict";

    return Controller.extend("{{namespace}}.controller.{{ControllerName}}", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when controller is instantiated
         */
        onInit: function() {
            // Create view model
            var oViewModel = new JSONModel({
                busy: false,
                selectedItemsCount: 0,
                title: ""
            });
            this.getView().setModel(oViewModel, "view");

            // Get router
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("{{routeName}}").attachPatternMatched(this._onObjectMatched, this);
        },

        /**
         * Called before view is rendered
         */
        onBeforeRendering: function() {
            // Preparation before rendering
        },

        /**
         * Called after view is rendered
         */
        onAfterRendering: function() {
            // DOM manipulation if needed
        },

        /**
         * Called when controller is destroyed
         */
        onExit: function() {
            // Cleanup
        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Refresh data
         */
        onRefresh: function() {
            var oBinding = this.byId("table").getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                MessageToast.show(this.getResourceBundle().getText("refreshSuccess"));
            }
        },

        /**
         * Search handler
         * @param {sap.ui.base.Event} oEvent Search event
         */
        onSearch: function(oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            var aFilters = [];

            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("{{Field1}}", FilterOperator.Contains, sQuery),
                        new Filter("{{Field2}}", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                }));
            }

            this.byId("table").getBinding("items").filter(aFilters);
        },

        /**
         * Item press handler
         * @param {sap.ui.base.Event} oEvent Press event
         */
        onPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            var sObjectId = oContext.getProperty("{{IdField}}");

            this.getOwnerComponent().getRouter().navTo("detail", {
                objectId: sObjectId
            });
        },

        /**
         * Selection change handler
         * @param {sap.ui.base.Event} oEvent Selection change event
         */
        onSelectionChange: function(oEvent) {
            var iSelectedItems = this.byId("table").getSelectedItems().length;
            this.getView().getModel("view").setProperty("/selectedItemsCount", iSelectedItems);
        },

        /**
         * Add button press handler
         */
        onAdd: function() {
            var oModel = this.getView().getModel();
            var oContext = oModel.createEntry("/{{EntitySet}}", {
                properties: {
                    {{Field1}}: "",
                    {{Field2}}: "",
                    {{Field3}}: 0
                }
            });

            // Navigate to detail page or open dialog
            MessageToast.show(this.getResourceBundle().getText("addSuccess"));
        },

        /**
         * Delete button press handler
         */
        onDelete: function() {
            var that = this;
            var aSelectedItems = this.byId("table").getSelectedItems();

            if (aSelectedItems.length === 0) {
                MessageBox.warning(this.getResourceBundle().getText("noItemsSelected"));
                return;
            }

            MessageBox.confirm(
                this.getResourceBundle().getText("deleteConfirm", [aSelectedItems.length]),
                {
                    onClose: function(sAction) {
                        if (sAction === MessageBox.Action.OK) {
                            that._deleteSelectedItems(aSelectedItems);
                        }
                    }
                }
            );
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Route pattern matched handler
         * @param {sap.ui.base.Event} oEvent Pattern matched event
         * @private
         */
        _onObjectMatched: function(oEvent) {
            var sObjectId = oEvent.getParameter("arguments").objectId;

            this.getView().bindElement({
                path: "/{{EntitySet}}('" + sObjectId + "')",
                events: {
                    dataRequested: function() {
                        this.getView().getModel("view").setProperty("/busy", true);
                    }.bind(this),
                    dataReceived: function() {
                        this.getView().getModel("view").setProperty("/busy", false);
                    }.bind(this)
                }
            });
        },

        /**
         * Delete selected items
         * @param {Array} aSelectedItems Selected items
         * @private
         */
        _deleteSelectedItems: function(aSelectedItems) {
            var oModel = this.getView().getModel();
            var that = this;

            this.getView().getModel("view").setProperty("/busy", true);

            var aPromises = aSelectedItems.map(function(oItem) {
                var sPath = oItem.getBindingContext().getPath();
                return new Promise(function(resolve, reject) {
                    oModel.remove(sPath, {
                        success: resolve,
                        error: reject
                    });
                });
            });

            Promise.all(aPromises)
                .then(function() {
                    that.getView().getModel("view").setProperty("/busy", false);
                    MessageToast.show(that.getResourceBundle().getText("deleteSuccess"));
                    that.byId("table").removeSelections();
                })
                .catch(function(oError) {
                    that.getView().getModel("view").setProperty("/busy", false);
                    MessageBox.error(that.getResourceBundle().getText("deleteError"));
                });
        },

        /**
         * Get resource bundle for i18n
         * @returns {sap.ui.model.resource.ResourceModel} Resource bundle
         * @private
         */
        getResourceBundle: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }
    });
});
