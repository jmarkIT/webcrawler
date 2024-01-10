const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL Test 1', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('normalizeURL Test 2', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('normalizeURL Test 3', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('normalizeURL Test 4', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('getURLsFromHTML 1 link', () => {
    const testHTML = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
    </html>`
    expect(getURLsFromHTML(testHTML, 'https://boot.dev')).toEqual(['https://blog.boot.dev/'])
})

test('getURLsFromHTML 2 links', () => {
    const testHTML = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <p>Here is some junk</p>
        <a href="https://boot.dev/catastrophe"><span>Go to Boot.dev</span></a>
    </body>
    </html>`
    expect(getURLsFromHTML(testHTML, 'https://boot.dev')).toEqual(['https://blog.boot.dev/', 'https://boot.dev/catastrophe'])
})

test('getURLsFromHTML relative url', () => {
    const testHTML = `<html>
    <body>
        <a href="/catastrophe"><span>Go to Boot.dev</span></a>
    </body>
    </html>`
    expect(getURLsFromHTML(testHTML, 'https://boot.dev')).toEqual(['https://boot.dev/catastrophe'])
})