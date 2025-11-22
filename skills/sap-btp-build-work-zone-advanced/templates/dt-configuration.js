/**
 * UI Integration Card Design-time Configuration
 *
 * This file defines the configuration editor for the card,
 * allowing users to customize card settings in the Work Zone editor.
 *
 * Place this file at: dt/configuration.js in your card project
 *
 * Documentation: https://ui5.sap.com/#/topic/5b46b03f024542ba802d99d67bc1a3f4
 */
sap.ui.define(["sap/ui/integration/Designtime"], function (Designtime) {
    "use strict";

    return Designtime.extend("{{namespace}}.{{cardName}}.dt.Configuration", {

        /**
         * Create the card configuration form
         */
        create: function () {
            return {
                form: {
                    items: {
                        // General Settings Group
                        generalGroup: {
                            type: "group",
                            label: "General Settings"
                        },
                        title: {
                            manifestpath: "/sap.card/header/title",
                            type: "string",
                            label: "Card Title",
                            description: "Title displayed in the card header",
                            required: true
                        },
                        subTitle: {
                            manifestpath: "/sap.card/header/subTitle",
                            type: "string",
                            label: "Card Subtitle",
                            description: "Subtitle displayed below the title"
                        },

                        // Data Settings Group
                        dataGroup: {
                            type: "group",
                            label: "Data Settings"
                        },
                        destination: {
                            manifestpath: "/sap.card/configuration/destinations/myDestination/name",
                            type: "destination",
                            label: "Data Destination",
                            description: "Select the destination for data retrieval"
                        },
                        maxItems: {
                            manifestpath: "/sap.card/configuration/parameters/maxItems/value",
                            type: "integer",
                            label: "Maximum Items",
                            description: "Maximum number of items to display",
                            visualization: {
                                type: "Slider",
                                settings: {
                                    min: 1,
                                    max: 20
                                }
                            }
                        },

                        // Display Settings Group
                        displayGroup: {
                            type: "group",
                            label: "Display Settings"
                        },
                        showIcon: {
                            manifestpath: "/sap.card/content/item/icon/visible",
                            type: "boolean",
                            label: "Show Item Icons",
                            description: "Display icons next to list items"
                        }
                    }
                },

                // Context values available from SAP Build Work Zone
                // Note: Verify these paths against your tenant's Host API using getContextValue()
                // Available context keys may vary by Work Zone version and configuration
                context: {
                    "sap.workzone": {
                        currentUser: {
                            id: {
                                label: "Current User ID",
                                description: "Unique identifier of the logged-in user"
                            },
                            firstName: {
                                label: "Current User First Name",
                                description: "First name of the logged-in user"
                            },
                            lastName: {
                                label: "Current User Last Name",
                                description: "Last name of the logged-in user"
                            },
                            email: {
                                label: "Current User Email",
                                description: "Email address of the logged-in user"
                            }
                        }
                        // Note: currentCompany and currentWorkspace context values
                        // should be verified against your tenant's Host API.
                        // Use oHost.getContextValue("sap.workzone/...") to check availability.
                    }
                }
            };
        }
    });
});
