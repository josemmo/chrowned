# Cookie stealer

## Description
An extension with access to the "chrome.debugger" API can send CDP commands
to regular tabs. Some of these commands, like `Network.getAllCookies`, break
isolation as they affect the entire browser instance and not just the
debugged target.

An attacker who convinced a user to install a malicious extension can
steal and modify any cookie stored in the browser.

## How to use
1. Install and enable the provided extension

The extension will automatically open a new tab listing all entries from the
browser cookie store.

## Timeline
Not reported to Google as it was considered intended behavior.
