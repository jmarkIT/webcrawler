function normalizeURL(url) {
    const fullURL = new URL(url)
    const host = fullURL.host
    const path = fullURL.pathname.replace(/\/$/, '')
    return `${host}${path}`
}

module.exports = {
    normalizeURL
}