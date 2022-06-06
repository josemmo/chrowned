(async () => {
    const CDP_VERSION = '1.3'

    // Attach to ourselves (any regular tab will do)
    const targets = await chrome.debugger.getTargets()
    const targetId = targets.find(target => target.url === document.location.href).id
    await chrome.debugger.attach({targetId}, CDP_VERSION)

    // Get all browser cookies
    const {cookies} = await chrome.debugger.sendCommand({targetId}, 'Network.getAllCookies')
    const $main = document.querySelector('main')
    $main.innerHTML += '<h1>Browser cookies</h1>'
    $main.innerHTML += `<pre>${JSON.stringify(cookies, null, 2)}</pre>`

    // Detach from target
    await chrome.debugger.detach({targetId})
})()
