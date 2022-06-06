# *Chrowned* by an Extension: Exploiting the Chrome DevTools Protocol
This repository contains the artifacts for the aforementioned paper.
Each directory contains the files for a different Proof-Of-Concept Chromium
extension.

## Getting Started
All sample extensions can be installed by either:
- Going to `chrome://extensions`, clicking on "Load Unpacked" and selecting
  the desired artifact directory.
- Packing the artifact directory contents as a ZIP archive and
  drag-and-dropping it into `chrome://extensions`.

## Contents
- **Listing active targets**
    - [Running extensions detector](running-extensions-detector/)
- **Running on regular tabs**
    - [Incognito tabs debugger](incognito-tabs-debugger/)
    - [Cookie stealer](cookie-stealer/)
- **Running on security interstitial tabs**
    - [Interstitials bypasser](interstitials-bypasser/)
- **Running on WebUI tabs**
    - [Credit card stealer](credit-card-stealer/)
- **Running on other extensions**
    - [Password stealer](password-stealer/)
- **Attaching to the browser target**
    - [Another credit card stealer](another-credit-card-stealer/)
    - [Traffic monitor](traffic-monitor/)

## License
The contents of this repository are available under the [MIT License](LICENSE).
