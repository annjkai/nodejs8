'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn
const filename = process.argv[2]

if (!filename) {
    throw Error('A file to watch must be specified!')
}
fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename])
    let output = ''
    
    ls.stdout.on('data', chunk => output += chunk)    
    
    ls.on('close', () => {
        const parts = output.split(/|s+/)
        console.log([parts[0], parts[4], parts[8]])
    })
})
console.log(`Now watching ${filename} for changes...`)

//NOTES
/*
'Event Emitter: provides a channel to dispatch events/ notify listeners
-variables declared with `let` can be reassigned - only use when you know the value needs to be able to change at runtime
-`data` events pass along a Buffer object (Node.js' way of representing binary data). It's better to work with Buffers directly, rather than strings
*/