# Traffic monitor

## Description
An extension with the ID `lfmkphfpdbjijhpomgecfikhfohaoine` (Perfetto UI
extension) can monitor and intercept all network traffic originating from
tab frames, web workers and extension background pages running outside the
WebUI scheme.

This method will work with requests and responses originating from an
incognito window even when the extension is not allowed to run it that
context.

An attacker who convinced a user to install a malicious extension can
log all traffic made by the user or other extensions and even modify
network responses to impersonate websites and extensions.

One enabler for this vulnerability is the ability to impersonate other
extensions by setting the "key" manifest property, together with the
presence of hardcoded IDs in Chromium's source code.

## How to use
1. Install and enable the provided extension

The extension will automatically open a new tab logging network requests
and responses to the DevTools console.

## Timeline
- 2021-12-03: Reported to Google in https://crbug.com/1276503
- 2021-12-03: Flagged as duplicate of https://crbug.com/1276497
