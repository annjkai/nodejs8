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
    connection.write(`Now watching "${filename} for changes...\n`)
    
    //watcher setup
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`))
    
    //cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected.')
        watcher.close()
    })
}).listen('60300', () => console.log('Listening for subscribers...'))

//NOTES
/*
-TCPsocckets connections have two endpoints, one binds to a numbered port, the other connects to a port
-third index in argv is the file to watch; if user fails to specify a file, an error will be thrown (uncaught errors cause Node.js to halt)
-`createServer()` does 3 things:
    -reports that connection has been established
    -listens for changes to target file
    listens for connection's close event
*/