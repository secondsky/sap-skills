#!/bin/bash
# Shared categorization function for plugin sync scripts
# Maps SAP skill names to categories for marketplace organization

categorize_skill() {
  local skill_name="$1"

  case "$skill_name" in
    # ABAP Development
    sap-abap*) echo "abap" ;;

    # SAP BTP Platform Services
    sap-btp-*) echo "btp" ;;

    # Cloud Application Programming Model
    sap-cap-*) echo "cap" ;;

    # UI Development
    sap-fiori-*|sapui5*) echo "ui-development" ;;

    # HANA Database
    sap-hana-*) echo "hana" ;;

    # Data & Analytics
    sap-sac-*|sap-datasphere|sap-bw-*) echo "data-analytics" ;;

    # AI & Machine Learning
    sap-ai-*|sap-cloud-sdk-ai*|sap-rpt1|sap-rpt1-*|sap-rpt-*) echo "ai" ;;

    # API & Styling
    sap-api-*) echo "tooling" ;;

    # SQL Development
    sap-sqlscript) echo "data-analytics" ;;

    # Development Tools
    skill-review) echo "tooling" ;;

    # Default category for uncategorized skills
    *) echo "tooling" ;;
  esac
}
