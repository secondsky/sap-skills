/**
 * SAPUI5 Component Template
 *
 * Usage: Replace placeholders with actual values:
 * - {{namespace}}: Your app namespace (e.g., com.mycompany.myapp)
 * - {{appId}}: Application ID
 *
 * File: Component.js
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function(UIComponent, JSONModel, Device) {
    "use strict";

    return UIComponent.extend("{{namespace}}.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * Component initialization
         * Called once when component is instantiated
         */
        init: function() {
            // Call parent init
            UIComponent.prototype.init.apply(this, arguments);

            // Create device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // Create router
            this.getRouter().initialize();
        },

        /**
         * Get content density class based on device
         * @returns {string} CSS class
         */
        getContentDensityClass: function() {
            if (!this._sContentDensityClass) {
                if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});
