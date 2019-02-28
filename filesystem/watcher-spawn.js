'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn
const filename = process.argv[2]

if (!filename) {
    throw Error('A file to watch must be specified!')
}
fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename])
    ls.stdout.pipe(process.stdout)    
})
console.log(`Now watching ${filename} for changes...`)

//NOTES
/*
-'child_process': nodejs.org/api/child_process.html
-'spawn()' the name of the program to execute + an array of command-line args, returns a ChildProcess
*/