# Password stealer

## Description
An extension with the ID `kgejglhpjiefppelpmljglcjbhoiplfn` (Screen Reader
extension) can use the debugger API to attach to "chrome-extension://" targets
and thus hijack other installed browser extensions.

An attacker who convinced a user to install a malicious extension can, for
instance, steal sensitive information such as passwords using this method.

One enabler for this vulnerability is the ability to impersonate other
extensions by setting the "key" manifest property, together with the
presence of hardcoded IDs in Chromium's source code.

## How to use
1. Install and enable the provided extension

The PoC extension will automatically open a new tab containing sensitive
information extracted from the following two extensions:
- LastPass (hdokiejnpimakedhajhdlcegeplioahd)
- Mailvelope (kajibbejlbohfaggdiogboambcijhkke)

## Timeline
- 2021-12-03: Reported to Google in https://crbug.com/1276497
