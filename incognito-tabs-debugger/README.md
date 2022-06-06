# Incognito tabs debugger

## Description
An extension with access to the "chrome.debugger" API can list all active
targets (including those it cannot attach to and tabs from incognito windows)
through the use of the `chrome.debugger.getTargets()` method, which returns
both tab IDs and target IDs.

When calling `chrome.debugger.attach({tabId: ...})` with the ID of a tab
from an incognito window, the browser correctly rejects the request with a
"No tab with given id" error.

However, when attaching using the equivalent target ID of the tab by calling
`chrome.debugger.attach({targetId: ...})`, no additional input verification
is performed and the request is fulfilled, even if the extension is not
allowed to run on incognito windows.

An attacker who convinced a user to install a malicious extension can
track all tabs opened by the user on incognito windows and even exfiltrate
sensitive information or manipulate the contents and behavior of these tabs.

## How to use
1. Install and enable the provided extension

The extension will automatically open a new incognito tab and trigger an
alert to prove the successful evaluation of arbitrary JavaScript code.

## Timeline
- 2022-03-01: Reported to Google in https://crbug.com/1301950
- 2022-03-10: Submitted fix in https://crrev.com/c/3514069
- 2022-03-24: Merged in https://chromiumdash.appspot.com/commit/e2614a3e51ba8ad7dd25a6884d8a10aa1012fa0c
- 2022-03-24: Landed in Chromium Canary 102.0.4962.0
- 2022-04-22: Flagged as duplicate of https://crbug.com/1236325
- 2022-05-17: Landed in Chromium Stable 102.0.5005.61
