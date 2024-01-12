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
            const cleanLink = link.href.replace(/^\//, '')
            const expandedURL = `${baseURL}${cleanLink}`
            linkList.push(expandedURL)
        }
    return linkList
}

async function crawlPage(baseURL, currentURL, pages = []) {
    if (baseURL.host !== currentURL.host) {
        return pages
    }
    const normalURL = normalizeURL(currentURL.href)
    if (normalURL in pages) {
        pages[normalURL]++
        return pages
    } else {
        const normalBaseURL = normalizeURL(baseURL)
        normalURL === normalBaseURL ? pages[normalBaseURL] = 0 : pages[normalURL] = 1
    }
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
        const body = await resp.text()
        const urls = getURLsFromHTML(body, baseURL)
        for (let link of urls) {
            pages = await crawlPage(baseURL, new URL(link), pages)
        }
        return pages
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}
