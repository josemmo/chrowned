const CDP_VERSION = '1.3'

/**
 * Attach to browser
 * @return {Promise<void>} Callback when finished
 */
async function attachToBrowser() {
    await chrome.debugger.attach({targetId: 'browser'}, CDP_VERSION)
}

/**
 * Send command to browser target
 * @param  {string}          method Method name
 * @param  {Object?}         params Method parameters
 * @return {Promise<Object>}        Response
 */
async function sendCommand(method, params) {
    await chrome.debugger.sendCommand({targetId: 'browser'}, method, params)
}

(async () => {
    // Define CDP event listener
    chrome.debugger.onEvent.addListener((source, method, params) => {
        if (method !== 'Fetch.requestPaused') {
            // Ignore other events
            return
        }

        // Handle network response
        if (params.responseStatusCode !== undefined) {
            sendCommand('Fetch.continueResponse', {requestId: params.requestId})
            console.log('🔻', params.responseStatusCode, params.request.url, params.responseHeaders)
            return
        }

        // Handle network request
        sendCommand('Fetch.continueRequest', {requestId: params.requestId, interceptResponse: true})
        console.log('🔺', params.request.method, params.request.url, params.request.headers)
    })

    // Start monitoring traffic
    await attachToBrowser()
    await sendCommand('Fetch.enable')
})()
