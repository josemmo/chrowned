# Another credit card stealer

## Description
An extension with the ID `lfmkphfpdbjijhpomgecfikhfohaoine` (Perfetto UI
extension) is able to access the browser target through the Debugger API.
By using a "proxy" target to redirect CDP commands, such an extension can
evaluate arbitrary JavaScript code on any active target (including Web UI
tabs and service workers and background pages from other extensions).

An attacker who convinced a user to install a malicious extension can
exfiltrate sensitive information from any tab, extension or target and even
manipulate its contents and behavior.

One enabler for this vulnerability is the ability to impersonate other
extensions by setting the "key" manifest property, together with the
presence of hardcoded IDs in Chromium's source code.

## How to use
1. Install and enable the provided extension

The extension will automatically open the settings page in a new tab and show
stored credit card numbers in plaintext.

## Timeline
- 2022-03-01: Reported to Google in https://crbug.com/1301966
- 2022-03-28: Flagged as "not-a-security-bug" and made public
