'use strict'

const fs = require('fs')
const net = require('net')
const filename = process.argv[2]

if (!filename) {
    throw Error('Error: No filename specified.')
}

net.createServer(connection => {
    
    //reporting
    console.log('Subscriber connected.')
    connection.write(`Now watching "${filename} for changes..."\n`)
    
    //watcher setup
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`))
    
    //cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected.')
        watcher.close()
    })
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'))

//NOTES
/*
-Unix sockets can be faster than TCP sockets because they don't require invoking network hardware
*/