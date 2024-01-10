const { JSDOM } = require('jsdom')
const { argv } = require('node:process')

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

function crawlPage(currentURL) {
    try {
        const resp = fetch(currentURL)
        if (resp.status >= 400 || resp.status < 500) {
            throw new Error(`Got status code ${resp.status}`)
        }
    } catch (error) {

    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}
