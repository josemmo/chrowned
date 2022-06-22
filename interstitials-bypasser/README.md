# Interstitials bypasser

## Description
An extension with access to the "chrome.debugger" API can attach to tabs
displaying a security interstitial without requiring higher privileges as
such dialogs are loaded in a regular web renderer process outside the
"chrome://" scheme (`kUnreachableWebDataURL`).

An attacker who convinced a user to install a malicious extension can then
evaluate a JavaScript expression to modify the security message or skip it
altogether when a proceed button is available.

## How to use
1. Install and enable the provided extension
2. Trigger an interstitial (e.g., by visiting https://expired.badssl.com/
   or https://testsafebrowsing.appspot.com/s/phishing.html)

The extension will automatically skip the interstitial while providing some
visual feedback.

## Timeline
- 2021-11-09: Reported to Google in https://crbug.com/1268445
- 2022-04-19: Submitted fix in https://crrev.com/c/3594083
- 2022-04-26: Merged in https://chromiumdash.appspot.com/commit/2d1a92dd76bbe7d7e5463c8ec57edba721793247
- 2022-04-27: Landed in Chromium Canary 103.0.5028.0
- 2022-06-21: Landed in Chromium Stable 103.0.5060.53
