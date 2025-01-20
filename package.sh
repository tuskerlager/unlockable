#!/bin/bash

# ---------------------------------------------------------------------------
# Archive Packaging Script
# ---------------------------------------------------------------------------
# This script automates the process of creating ZIP archives for browser
# extensions, matching the functionality of package.py.
#
# Usage:
#   ./package.sh -v|--version <version> -b|--browser <browser>
#
# Example:
#   ./package.sh -v 1.0.0 -b chromium

# -- Loading bar function
loading_bar() {
    local duration=$1
    local width=30
    local progress=0

    while [ $progress -le $width ]; do
        echo -ne "\r["
        for ((i = 0; i < $width; i++)); do
            if [ $i -lt $progress ]; then
                echo -n "-"
            else
                echo -n " "
            fi
        done
        echo -ne "] $((progress * 100 / width))%"
        sleep $(echo "scale=3; $duration/$width" | bc)
        ((progress++))
    done
    echo
}

# -- Display help info/usage
usage() {
    echo "Usage: $0 -v|--version <version> -b|--browser <browser>"
    echo "Example: $0 -v 0.1.1 -b chromium"
    echo "Available browsers: chromium, firefox"
    exit 1
}

# -- Available browsers
valid_browsers=("chromium" "firefox")

# -- Get absolute path of script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHROMIUM_DIR="${SCRIPT_DIR}/dist/chromium"
FIREFOX_DIR="${SCRIPT_DIR}/dist/firefox"
ARCHIVE_DIR="${SCRIPT_DIR}/archives"

# Create necessary directories
mkdir -p "$CHROMIUM_DIR" "$FIREFOX_DIR" "$ARCHIVE_DIR"

# -- Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
    -v | --version)
        version="$2"
        shift 2
        ;;
    -b | --browser)
        browser="$2"
        shift 2
        ;;
    *)
        echo "Unknown parameter: $1"
        usage
        ;;
    esac
done

# -- Validate required arguments
if [ -z "$version" ] || [ -z "$browser" ]; then
    echo "Error: Version and browser are required"
    usage
fi

# -- Validate version format
if ! [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in format x.x.x (e.g., 0.1.1)"
    exit 1
fi

# -- Validate browser
if [[ ! " ${valid_browsers[@]} " =~ " ${browser} " ]]; then
    echo "Error: Invalid browser specified"
    echo "Available browsers: ${valid_browsers[*]}"
    exit 1
fi

# -- Array of files/directories to include
include=(
    "_locales"
    "icons"
    "about.html"
    "background.js"
    "config.jsonc"
    "content.js"
    "content.js.LICENSE.txt"
    "manifest.json"
    "options.css"
    "options.html"
    "options.js"
    "popup.css"
    "popup.html"
    "popup.js"
    "sites.json"
)

# -- Function to create zip
create_zip() {
    local timestamp=$(date +"%m%d-%H%M")
    local source_dir
    local missing_files=()

    # Set source directory based on browser
    if [ "$browser" == "chromium" ]; then
        source_dir="$CHROMIUM_DIR"
    else
        source_dir="$FIREFOX_DIR"
    fi

    local zip_name="${ARCHIVE_DIR}/unlockable-${version}-${browser}-${timestamp}.zip"

    echo "Creating archive for ${browser} version ${version}"

    # Create temporary directory
    temp_dir=$(mktemp -d)

    # Check for missing files first
    for item in "${include[@]}"; do
        if [ ! -e "${source_dir}/${item}" ]; then
            missing_files+=("$item")
        fi
    done

    # If any files are missing, exit
    if [ ${#missing_files[@]} -gt 0 ]; then
        echo "Error ❗: Missing files: ${missing_files[*]}"
        rm -rf "$temp_dir"
        exit 1
    fi

    # Start copying files
    echo "Copying files... ⏳"
    loading_bar 1

    # Copy files
    for item in "${include[@]}"; do
        if [ -d "${source_dir}/${item}" ]; then
            cp -r "${source_dir}/${item}" "${temp_dir}/"
        else
            cp "${source_dir}/${item}" "${temp_dir}/"
        fi
    done

    # Create ZIP archive
    (cd "$temp_dir" && zip -q -r "$zip_name" .)

    # Cleanup
    rm -rf "$temp_dir"

    if [ -f "$zip_name" ]; then
        echo "Archive created: ${zip_name}"
    else
        echo "Error ❗: Archive creation failed"
        exit 1
    fi
}

# -- Create zip file
create_zip
echo "🐬"
