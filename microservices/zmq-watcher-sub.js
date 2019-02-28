'use strict'

const zmq = require('zeromq')

//create subscriber endpoint
const subscriber = zmq.socket('sub')

//subscribe to all messages
subscriber.subscribe('')

//handle messages from publisher
subscriber.on('message', data => {
    const message = JSON.parse(data)
    const date = new Date(message.timestamp)
    console.log(`File "${message.file}" changed at ${date}`)
})

//connect to publisher
subscriber.connect("tcp://localhost:60500")

//NOTES
/*
-`subscribe()` must be called at some point or no messages will be received
-in designing networked applications, it's usual to have the more permanent architecture bind while the more transient architecture connects. 0MQ however is very flexible
*/