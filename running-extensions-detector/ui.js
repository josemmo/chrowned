(async () => {
    /** @type {Map<string, string|null>} */
    const extensions = new Map()

    // List targets
    const targets = await chrome.debugger.getTargets()
    for (const target of targets) {
        if (target.extensionId) {
            extensions.set(target.extensionId, target.title)
        } else if (target.url.startsWith('chrome-extension://')) {
            const extensionId = target.url.split('/')[2]
            extensions.set(extensionId, null)
        }
    }

    // Render targets
    const $main = document.querySelector('main')
    $main.innerHTML += '<h1>Detected running extensions</h1>'
    $main.innerHTML += `<pre>${JSON.stringify([...extensions.entries()].map(([id, name]) => ({id, name})), null, 2)}</pre>`
})()
