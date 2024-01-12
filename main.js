const { crawlPage } = require('./crawl')
const { argv } = require('node:process')

async function main() {
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
    const baseURL = new URL(argv[2])
    console.log(`Parsing beginning at ${baseURL.href}`)
    const pageCounts = await crawlPage(baseURL, baseURL)
    console.log(pageCounts)
}


main()