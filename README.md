# *Chrowned* by an Extension: Exploiting the Chrome DevTools Protocol
This repository contains the artifacts for the aforementioned paper.
Each directory contains the files for a different Proof-Of-Concept Chromium
extension.
All extensions are written using the Manifest V3 specification.

## Getting Started
All sample extensions can be installed by either:
- Going to `chrome://extensions`, clicking on "Load Unpacked" and selecting
  the desired artifact directory.
- Packing the artifact directory contents as a ZIP archive and
  drag-and-dropping it into `chrome://extensions`.

## Contents
- **Listing active targets**
    - [Running extensions detector](running-extensions-detector/README.md)
- **Running on regular tabs**
    - [Incognito tabs debugger](incognito-tabs-debugger/README.md)
    - [Cookie stealer](cookie-stealer/README.md)
- **Running on security interstitial tabs**
    - [Interstitials bypasser](interstitials-bypasser/README.md)
- **Running on WebUI tabs**
    - [Credit card stealer](credit-card-stealer/README.md)
- **Running on other extensions**
    - [Password stealer](password-stealer/README.md)
- **Attaching to the browser target**
    - [Another credit card stealer](another-credit-card-stealer/README.md)
    - [Traffic monitor](traffic-monitor/README.md)

## License
The contents of this repository are available under the [MIT License](LICENSE).
