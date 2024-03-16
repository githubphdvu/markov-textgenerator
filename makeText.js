//Command-line tool to generate Markov text
const markov = require("./markov")
const fs = require("fs")
const axios = require("axios")
const process = require("process")

function makeText(file) {//read file and generate text from it
    fs.readFile(file, "utf8",(err, data)=>{
        if (err) {
            console.error(`ERROR IS: ${err}`)
            process.exit(1)
        } 
        else  {
            let mm = new markov.MarkovMachine(data)
            console.log(mm.generateMarkovText())
        }
    })
}
async function makeURLText(url) {//read URL and make text from it
    let resp
    try {
        resp = await axios.get(url)
    } 
    catch (err) {
        console.error(`ERROR IS: ${err}`)
        process.exit(1)
    }
    let mm = new markov.MarkovMachine(resp.data)
    console.log(mm.generateMarkovText())
}
if     (process.argv[2] === "file")makeText(process.argv[3])
else if(process.argv[2] === "url") makeURLText(process.argv[3])
else {
    console.log(`WRONG FORMAT. GOOD EXAMPLES:\n node makeText.js file text.txt\n node makeText.js url https://example-files.online-convert.com/document/txt/example.txt`)
    process.exit(1)
}