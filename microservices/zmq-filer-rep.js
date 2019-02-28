'use strict'

const fs = require('fs')
const zmq = require('zeromq')

//socket to reply to client requests
const responder = zmq.socket('rep')

//handle incoming requests
responder.on('message', data => {
    
    //parse incoming message
    const request = JSON.parse(data)
    console.log(`Received request to get: ${request.path}`)
    
    //read file & reply with content
    fs.readFile(request.path, (err, content) => {
        console.log('Sending response content.')
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }))
    })
})

//listen on tcp port 60401
responder.bind('tcp://127.0.0.1:60401', err => {
    console.log('Listening for zmq requesters...')
})

//close responder when Node process ends
process.on('SIGINT', () => {
    console.log('Shutting down...')
    responder.close()
})

//NOTES
/*
-REQ/REP pattern (request/reply) responds in lockstep (a request comes in, a reply goes out) though the app is only aware of one request at a time
*/