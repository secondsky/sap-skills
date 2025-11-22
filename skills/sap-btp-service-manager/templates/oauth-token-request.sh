#!/bin/bash
# OAuth2 Access Token Retrieval Script
# Documentation: https://github.com/SAP-docs/sap-btp-service-manager/blob/main/docs/Service-Consumption/SAP-Service-Manager/retrieve-an-oauth2-access-token-b6822e6.md
#
# Usage:
#   ./oauth-token-request.sh <uaa_url> <clientid> <clientsecret>
#   ./oauth-token-request.sh -f credentials.json
#
# Environment Variables:
#   TOKEN_OUTPUT_FILE - Custom path for token response (default: token_response.json)
#
# Output:
#   Prints access token to stdout
#   Full response saved to $TOKEN_OUTPUT_FILE (default: token_response.json in cwd)
#
# Security Note:
#   Token response file contains sensitive credentials. Ensure it is stored
#   securely and deleted after use. For production, set TOKEN_OUTPUT_FILE to
#   a secure location with restricted permissions.

set -e

# Function to display usage
usage() {
    echo "Usage: $0 <uaa_url> <clientid> <clientsecret>"
    echo "   or: $0 -f <credentials.json>"
    echo ""
    echo "Examples:"
    echo "  $0 https://xxx.authentication.eu10.hana.ondemand.com sb-client-id client-secret"
    echo "  $0 -f binding-credentials.json"
    exit 1
}

# Parse arguments
if [ "$1" == "-f" ]; then
    # Load from JSON file
    if [ -z "$2" ] || [ ! -f "$2" ]; then
        echo "Error: Credentials file not found: $2"
        usage
    fi

    CREDENTIALS_FILE="$2"
    UAA_URL=$(jq -r '.url // .uaa_url // .certurl' "$CREDENTIALS_FILE")
    CLIENT_ID=$(jq -r '.clientid' "$CREDENTIALS_FILE")
    CLIENT_SECRET=$(jq -r '.clientsecret // empty' "$CREDENTIALS_FILE")
    CERTIFICATE=$(jq -r '.certificate // empty' "$CREDENTIALS_FILE")
    KEY=$(jq -r '.key // empty' "$CREDENTIALS_FILE")

    if [ -z "$UAA_URL" ] || [ -z "$CLIENT_ID" ]; then
        echo "Error: Could not extract UAA URL or client ID from credentials file"
        exit 1
    fi
else
    # Use command line arguments
    if [ $# -lt 3 ]; then
        usage
    fi

    UAA_URL="$1"
    CLIENT_ID="$2"
    CLIENT_SECRET="$3"
fi

# Remove trailing slash from URL
UAA_URL="${UAA_URL%/}"
TOKEN_ENDPOINT="${UAA_URL}/oauth/token"

echo "Requesting token from: $TOKEN_ENDPOINT" >&2
echo "Client ID: $CLIENT_ID" >&2

# Make token request
if [ -n "$CERTIFICATE" ] && [ -n "$KEY" ]; then
    # X.509 certificate authentication
    echo "Using X.509 certificate authentication" >&2

    # Write certificate and key to temp files
    CERT_FILE=$(mktemp)
    KEY_FILE=$(mktemp)
    echo "$CERTIFICATE" > "$CERT_FILE"
    echo "$KEY" > "$KEY_FILE"

    RESPONSE=$(curl -s -X POST "$TOKEN_ENDPOINT" \
        --cert "$CERT_FILE" \
        --key "$KEY_FILE" \
        -H "Accept: application/json" \
        --data-urlencode "grant_type=client_credentials" \
        --data-urlencode "client_id=$CLIENT_ID")

    # Clean up temp files
    rm -f "$CERT_FILE" "$KEY_FILE"
else
    # Client secret authentication
    echo "Using client credentials authentication" >&2

    RESPONSE=$(curl -s -X POST "$TOKEN_ENDPOINT" \
        -H "Accept: application/json" \
        --data-urlencode "grant_type=client_credentials" \
        --data-urlencode "client_id=$CLIENT_ID" \
        --data-urlencode "client_secret=$CLIENT_SECRET")
fi

# Save full response
# WARNING: Token response is written to current working directory.
# For production use, consider using a secure temporary directory or
# specifying an explicit output path with appropriate permissions.
TOKEN_OUTPUT_FILE="${TOKEN_OUTPUT_FILE:-token_response.json}"
echo "$RESPONSE" > "$TOKEN_OUTPUT_FILE"
echo "Full response saved to $TOKEN_OUTPUT_FILE" >&2
echo "WARNING: Token file contains sensitive credentials - secure or delete after use" >&2

# Check for errors
ERROR=$(echo "$RESPONSE" | jq -r '.error // empty')
if [ -n "$ERROR" ]; then
    ERROR_DESC=$(echo "$RESPONSE" | jq -r '.error_description // "Unknown error"')
    echo "Error: $ERROR - $ERROR_DESC" >&2
    exit 1
fi

# Extract and display token info
ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.access_token')
TOKEN_TYPE=$(echo "$RESPONSE" | jq -r '.token_type')
EXPIRES_IN=$(echo "$RESPONSE" | jq -r '.expires_in')
SCOPE=$(echo "$RESPONSE" | jq -r '.scope')

echo "" >&2
echo "Token Type: $TOKEN_TYPE" >&2
echo "Expires In: $EXPIRES_IN seconds" >&2
echo "Scopes: $SCOPE" >&2
echo "" >&2

# Output just the access token
echo "$ACCESS_TOKEN"

# Usage hint
echo "" >&2
echo "Use this token with:" >&2
echo "  curl -H 'Authorization: Bearer <token>' https://service-manager.cfapps.region.hana.ondemand.com/v1/..." >&2
