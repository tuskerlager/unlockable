#!/usr/bin/env python3

import argparse
import re
import os
import shutil
import sys
import tempfile
import time
from typing import LiteralString
import zipfile
from datetime import datetime
from pathlib import Path

# ---------------------------------------------------------------------------
# Archive Packaging Script
# ---------------------------------------------------------------------------
# This script automates the process of creating ZIP archives for browser
# extensions. It accepts the version number and browser name as inputs
# and generates a uniquely named archive in the format:
# unlockable-<version>-<browser>-<YYYY-MM-DD-HH-MM-SS>.zip (adjustable)
# It validates version format (x.x.x) and ensures the specified browser
# is supported. i.e chrome, firefox, edge, opera
# Depends on: Python 3, zipfile, os, shutil, tempfile, datetime
#
# Usage:
#   ./unlockable.py -v|--version <version> -b|--browser <browser>
#
# Example:
#   ./unlockable.py -v 1.0.0 -b chrome
#
# Archives are saved in the `archives/` directory within the script's folder.

# -- Loading bar function
def loading_bar(duration, width=30) -> None:
    progress = 0
    sleep_time = duration / width

    while progress <= width:
        bar: LiteralString = '-' * progress + ' ' * (width - progress)
        sys.stdout.write(f"\r[{bar}] {progress * 100 // width}%")
        sys.stdout.flush()
        time.sleep(sleep_time)
        progress += 1
    sys.stdout.write("\n")

# -- Display help info/usage
def usage() -> None:
    print("Usage: unlockable.py -v|--version <version> -b|--browser <browser>")
    print("Example: unlockable.py -v 0.1.1 -b firefox")
    print("Available browsers: chromium, firefox")
    sys.exit(status=1)

# -- Available browsers
# valid_browsers: list[str] = ["chrome", "firefox", "edge", "opera"]
valid_browsers: list[str] = ["chromium", "firefox"]

# -- Get absolute path of script directory
# SCRIPT_DIR: str = os.path.dirname(os.path.abspath(__file__))
SCRIPT_DIR: Path = Path(__file__).parent
CHROMIUM_DIR: Path = SCRIPT_DIR / "dist" / "chromium"
FIREFOX_DIR: Path = SCRIPT_DIR / "dist" / "firefox"
# ARCHIVE_DIR: str = os.path.join(SCRIPT_DIR, "archives")
ARCHIVE_DIR: Path = SCRIPT_DIR / "archives"
for directory in [CHROMIUM_DIR, FIREFOX_DIR, ARCHIVE_DIR]:
    os.makedirs(name=ARCHIVE_DIR, exist_ok=True)

# -- Parse command line arguments
parser = argparse.ArgumentParser(description="Archive Packaging Script")
parser.add_argument("-v", "--version", required=True, help="Version number in format x.x.x")
parser.add_argument("-b", "--browser", required=True, help="Browser name (chrome, firefox, edge, opera)")
args: argparse.Namespace = parser.parse_args()

version = args.version
browser = args.browser

# -- Validate version format. Firefox doesn't allow letters in version
# TODO: make more robust, allow 4-digits if Firefox and Chrome allow it
if not re.match(pattern=r"^\d+\.\d+\.\d+$", string=version):
    print("Error: Version must be in format x.x.x (e.g., 0.1.1)")
    sys.exit(status=1)

# -- Validate browser
if browser not in valid_browsers:
    print(f"Error: Invalid browser specified")
    print(f"Available browsers: {', '.join(valid_browsers)}")
    sys.exit(status=1)

# -- Array of files/directories to include
# TODO: reintroduce array of files/directory to exclude
include: list[str] = [
    "_locales",
    "icons",
    "about.html",
    "background.js",
    "config.jsonc",
    "content.js",
    "content.js.LICENSE.txt",
    "manifest.json",
    "options.css",
    "options.html",
    "options.js",
    "popup.css",
    "popup.html",
    "popup.js",
    "sites.json" ] 

# -- Function to create zip
def create_zip() -> None:
    timestamp: str = datetime.now().strftime("%m%d-%H%M")
    zip_name: str = f"{ARCHIVE_DIR}/unlockable-{version}-{browser}-{timestamp}.zip"
    missing_files = []

    print(f"Creating archive for {browser} version {version}")

    # Create temporary directory for zip contents
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Determine source directory based on browser
        source_dir = CHROMIUM_DIR if browser == "chromium" else FIREFOX_DIR
        
        # Check for missing files first
        for item in include:
            if not (source_dir / item).exists():
                missing_files.append(item)

        # If any files are missing, exit
        if missing_files:
            print(f"Error ❗: Missing files: {', '.join(missing_files)}")
            sys.exit(status=1)

        # Start copying files
        print("Copying files... ⏳")
        loading_bar(duration=1)

        # Copy files
        for item in include:
            source = source_dir / item
            dest = temp_path / item
            if source.is_dir():
                shutil.copytree(src=source, dst=dest)
            else:
                shutil.copy2(src=source, dst=dest)
        
        # Create ZIP archive
        with zipfile.ZipFile(file=zip_name, mode='w', compression=zipfile.ZIP_DEFLATED) as zipf:
            for file_path in temp_path.rglob('*'):
                if file_path.is_file():
                    arcname = file_path.relative_to(temp_path)
                    zipf.write(filename=file_path, arcname=arcname)

        print(f"Archive created: {zip_name}")
if __name__ == "__main__":
    create_zip()
    print("🐬")
