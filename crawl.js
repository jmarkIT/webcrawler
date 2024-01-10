const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const fullURL = new URL(url)
    const host = fullURL.host
    const path = fullURL.pathname.replace(/\/$/, '')
    return `${host}${path}`
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urlLinks = new JSDOM(htmlBody).window.document.links
    let linkList = []
    for (let link of urlLinks)
        if (link.href[0] !== '/') {
            linkList.push(link.href)
        } else {
            const expandedURL = `${baseURL}${link.href}`
            linkList.push(expandedURL)
        }
    return linkList
}

async function crawlPage(currentURL) {
    try {
        const resp = await fetch(currentURL)
        const respStatus = resp.status
        if (respStatus >= 400 && respStatus < 500) {
            console.log(`Error: Status code ${respStatus}`)
            return
        }
        if (!resp.headers.get('content-type').includes('text/html')) {
            console.log(`Error: This isn't HTML! This is ${resp.headers.get('content-type')}`)
        }
        const content = await resp.text()
        console.log(content)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}
