/**
 * SAPUI5 Formatter Template
 *
 * Common formatter functions for data display
 *
 * File: model/formatter.js
 */

sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], function(DateFormat, NumberFormat) {
    "use strict";

    return {
        /**
         * Format date to localized string
         * @param {Date} oDate Date object
         * @returns {string} Formatted date
         */
        formatDate: function(oDate) {
            if (!oDate) {
                return "";
            }
            var oDateFormat = DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy"
            });
            return oDateFormat.format(oDate);
        },

        /**
         * Format date and time to localized string
         * @param {Date} oDateTime DateTime object
         * @returns {string} Formatted date and time
         */
        formatDateTime: function(oDateTime) {
            if (!oDateTime) {
                return "";
            }
            var oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "dd.MM.yyyy HH:mm:ss"
            });
            return oDateFormat.format(oDateTime);
        },

        /**
         * Format number with 2 decimal places
         * @param {number} fNumber Number to format
         * @returns {string} Formatted number
         */
        formatNumber: function(fNumber) {
            if (fNumber === null || fNumber === undefined) {
                return "";
            }
            var oNumberFormat = NumberFormat.getFloatInstance({
                minFractionDigits: 2,
                maxFractionDigits: 2
            });
            return oNumberFormat.format(fNumber);
        },

        /**
         * Format currency with symbol
         * @param {number} fAmount Amount
         * @param {string} sCurrency Currency code
         * @returns {string} Formatted currency
         */
        formatCurrency: function(fAmount, sCurrency) {
            if (fAmount === null || fAmount === undefined) {
                return "";
            }
            var oCurrencyFormat = NumberFormat.getCurrencyInstance();
            return oCurrencyFormat.format(fAmount, sCurrency);
        },

        /**
         * Format status to display text
         * @param {string} sStatus Status code
         * @returns {string} Status text
         */
        statusText: function(sStatus) {
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            var mStatusText = {
                "A": oResourceBundle.getText("statusApproved"),
                "R": oResourceBundle.getText("statusRejected"),
                "P": oResourceBundle.getText("statusPending"),
                "D": oResourceBundle.getText("statusDraft")
            };

            return mStatusText[sStatus] || sStatus;
        },

        /**
         * Format status to sap.ui.core.ValueState
         * @param {string} sStatus Status code
         * @returns {string} Value state
         */
        statusState: function(sStatus) {
            var mStatusState = {
                "A": "Success",
                "R": "Error",
                "P": "Warning",
                "D": "None"
            };

            return mStatusState[sStatus] || "None";
        },

        /**
         * Format boolean to Yes/No text
         * @param {boolean} bValue Boolean value
         * @returns {string} Yes or No
         */
        formatBoolean: function(bValue) {
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return bValue ? oResourceBundle.getText("yes") : oResourceBundle.getText("no");
        },

        /**
         * Truncate long text with ellipsis
         * @param {string} sText Text to truncate
         * @param {number} iMaxLength Maximum length
         * @returns {string} Truncated text
         */
        truncateText: function(sText, iMaxLength) {
            if (!sText) {
                return "";
            }
            iMaxLength = iMaxLength || 50;
            if (sText.length <= iMaxLength) {
                return sText;
            }
            return sText.substring(0, iMaxLength) + "...";
        },

        /**
         * Calculate percentage
         * @param {number} fValue Current value
         * @param {number} fTotal Total value
         * @returns {string} Percentage with % sign
         */
        formatPercentage: function(fValue, fTotal) {
            if (!fTotal || fTotal === 0) {
                return "0%";
            }
            var fPercentage = (fValue / fTotal) * 100;
            return fPercentage.toFixed(1) + "%";
        },

        /**
         * Format full name from first and last name
         * @param {string} sFirstName First name
         * @param {string} sLastName Last name
         * @returns {string} Full name
         */
        formatFullName: function(sFirstName, sLastName) {
            if (!sFirstName && !sLastName) {
                return "";
            }
            return (sFirstName || "") + " " + (sLastName || "");
        },

        /**
         * Format file size in human-readable format
         * @param {number} iBytes File size in bytes
         * @returns {string} Formatted file size
         */
        formatFileSize: function(iBytes) {
            if (!iBytes || iBytes === 0) {
                return "0 B";
            }

            var aUnits = ["B", "KB", "MB", "GB", "TB"];
            var iUnit = 0;

            while (iBytes >= 1024 && iUnit < aUnits.length - 1) {
                iBytes /= 1024;
                iUnit++;
            }

            return iBytes.toFixed(1) + " " + aUnits[iUnit];
        },

        /**
         * Highlight search term in text
         * @param {string} sText Full text
         * @param {string} sSearchTerm Search term to highlight
         * @returns {string} Text with highlighted term
         */
        highlightText: function(sText, sSearchTerm) {
            if (!sText || !sSearchTerm) {
                return sText;
            }

            var sRegex = new RegExp("(" + sSearchTerm + ")", "gi");
            return sText.replace(sRegex, "<strong>$1</strong>");
        }
    };
});
