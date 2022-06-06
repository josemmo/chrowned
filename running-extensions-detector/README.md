# Running extensions detector

## Description
An extension with access to the "chrome.debugger" API can list all active
targets (including those it cannot attach to and tabs from incognito windows)
through the use of the `chrome.debugger.getTargets()` method.

An attacker who convinced a user to install a malicious extension can
track all extensions with a background page or service worker, which is useful
for fingerprinting devices.

## How to use
1. Install and enable the provided extension

The extension will automatically open a new tab showing the list of running
extensions that were detected.

## Timeline
Same as for [incognito tabs debugger](../incognito-tabs-debugger/README.md#timeline).
However, although listing tabs from incognito windows was considered a bug by
the Chromium Developer Team, listing running extension was not.
