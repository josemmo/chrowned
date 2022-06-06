# Credit card stealer

## Description
An extension with the ID `kgejglhpjiefppelpmljglcjbhoiplfn` (Screen Reader
extension) can evaluate JavaScript code on "chrome://" targets without having
the `extensions-on-chrome-urls` switch enabled.

An attacker who convinced a user to install a malicious extension can then
use it for various purposes, including stealing sensitive information and
also taking control of the browser by modifying its settings. Note that
being able to modify browser settings can be used to intercept network
traffic by changing the proxy configuration.

Additionally, allowing arbitrary JavaScript execution on Chrome UI pages
is already dangerous by itself, as these are typically privileged
contexts.

One enabler for this vulnerability is the ability to impersonate other
extensions by setting the "key" manifest property, together with the
presence of hardcoded IDs in Chromium's source code.

## How to use
1. Install and enable the provided extension

The extension will automatically open the settings page in a new tab and show
stored credit card numbers in plaintext.

## Timeline
- 2021-12-03: Reported to Google in https://crbug.com/1276500
- 2021-12-03: Flagged as duplicate of https://crbug.com/1276497
