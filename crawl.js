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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}

function main() {
    /*All your main function should do at this point is:
    
    If the number of CLI arguments is less than 1, print an error and exit.
    If the number of CLI arguments is more than 1, print an error and exit.
    If we have exactly one CLI argument, it's the "baseURL", so print some kind of message letting the user know the crawler is starting at that baseURL*/
    if (argv.length < 3) {
        console.log("Error: Not enough arguments. Please provide a url")
        process.exit()
    }
    if (argv.length > 3) {
        console.log("Error: Please only provide one argument")
        process.exit()
    }
    const baseURL = argv[2]
    console.log(`Parsing beginning at ${baseURL}`)
}


main()