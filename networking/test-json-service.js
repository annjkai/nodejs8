'use strict'

const server = require('net').createServer(connection => {
    console.log('Subscriber connected.')
    
    //message chunks
    const firstChunk = '{"type": "changed", "timesta'
    const secondChunk = 'mp": 1550761918071}\n'
    
    //immediately send first chunk
    connection.write(firstChunk)
    
    //shirt delay, send chunk two
    const timer = setTimeout(() => {
        connection.write(secondChunk)
        connection.end()
    }, 100)
    
    //clear timer when connection ends
    connection.on('end', () => {
        clearTimeout(timer)
        console.log('Subscriber disconnected.')
    })
})

//(rewrote as arrow func)
server.listen(60300, () => {
    console.log('Test server listening for subscribers...')
})