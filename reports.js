function sortPages(pages) {
    return pages
}

function printReport(pages) {
    console.log("Beginning report...")
    const sortedPages = sortPages(pages)
    for (let page of Object.entries(sortedPages)) {
        console.log(`Found ${page[0]} a total of ${page[1]} times`)
    }
}

module.exports = {
    printReport
}