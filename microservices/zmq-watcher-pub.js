'use strict'

const fs = require('fs')
const zmq = require('zeromq')
const filename = process.argv[2]

//create publisher endpoint
const publisher = zmq.socket('pub')

fs.watch(filename, () => {
    //send message to any & all subscribers
    publisher.send(JSON. stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }))
})

//listen on TCP port 60500 (book prescribes 60400 - mine already in use)
publisher.bind('tcp://*:60500', err => {
    if(err) {
        throw err
    }
    console.log('Listening for zmq subscribers...')
})