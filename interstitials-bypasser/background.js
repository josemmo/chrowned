/**
 * Try to attach to target
 * @param  {number}        tabId Tab ID
 * @return {Promise<void>}       Callback when finished
 */
async function attachToTarget(tabId) {
    try {
        await chrome.debugger.attach({tabId}, '1.3')
        console.debug(`Attached to tab #${tabId}`)
    } catch (_) {
        // Already attached or unattachable target, ignore error
    }
}

/**
 * Evaluate code in target
 * @param  {number}        tabId Tab ID
 * @param  {() => void}    fn    Function to evaluate
 * @return {Promise<void>}       Callback when finished
 */
async function evaluateInTarget(tabId, fn) {
    try {
        await chrome.debugger.sendCommand({tabId}, 'Runtime.evaluate', {
            expression: `(${fn.toString()})()`
        })
    } catch (e) {
        console.warn(`Failed to evaluate in tab #${tabId}`, e)
    }
}

// Attach to any tab as soon as it becomes attachable
chrome.tabs.onUpdated.addListener(async (tabId) => {
    await attachToTarget(tabId)
    await evaluateInTarget(tabId, () => {
        // Execute payload only on interstitial pages
        if (document.location.href !== 'chrome-error://chromewebdata/') {
            return
        }

        // Give visual feedback
        // First selector is for Chromium (generic), second for Opera
        const wrapper = document.querySelector('.interstitial-wrapper, .content .description')
        const iter = document.createNodeIterator(wrapper, NodeFilter.SHOW_TEXT)
        let node
        while (node = iter.nextNode()) {
            if (node.textContent.trim() === '') continue
            node.textContent = 'blah '.repeat(~~(node.textContent.length / 5))
        }

        // Bypass interstitial
        certificateErrorPageController.proceed()
    })
})
