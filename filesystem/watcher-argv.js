const fs = require('fs')
const filename = process.argv[2]

if (!filename) {
    throw Error('A file to watch must be specified!')
}

fs.watch(filename, () => console.log(`File ${filename} changed!`))

console.log(`Now watching ${filename} for changes...`)

//NOTES
/*
-argv = argument vector, an array containing node, the full path to this file & target.txt
*/