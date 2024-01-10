const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('Test 1', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('Test 2', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('Test 3', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('Test 4', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})