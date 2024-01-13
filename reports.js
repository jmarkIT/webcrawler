function sortPages(pages) {
    let convertedPages = convertPages(pages)
    convertedPages.sort(function (a, b) {
        return b.count - a.count
    })
    return convertedPages
}

function convertPages(pages) {
    let listOfPages = []
    for (const [url, count] of Object.entries(pages)) {
        pageObj = {
            url: url,
            count: count
        }
        listOfPages.push(pageObj)
    }
    return listOfPages
}

function printReport(pages) {
    console.log("Beginning report...")
    const sortedPages = sortPages(pages)
    for (let page of sortedPages) {
        if (page.count === 1) {
            console.log(`Found ${page.url} a total of ${page.count} time`)
        } else {
            console.log(`Found ${page.url} a total of ${page.count} times`)
        }
    }
}

module.exports = {
    printReport
}