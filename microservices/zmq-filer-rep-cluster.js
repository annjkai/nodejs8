'use strict'

const cluster = require('cluster')
const fs = require('fs')
const zmq = require('zeromq')

//built-in 'os' module looks up # of available CPUs - best practice: spin up one worker per available CPU
const numWorkers = require('os').cpus().length

if (cluster.isMaster) {    
    //master process creates ROUTER and DEALER sockets & binds endpoints
    //ROUTER listens for incoming TCP connections
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401')
    //DEALER sockets binds IPC (interprocess connection) endpoint (0MQ IPC files should end in '.ipc.')
    const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc')
    
    //forward messages between router & dealer
    router.on('message', (...frames) => dealer.send(frames))
    dealer.on('message', (...frames) => router.send(frames))
    
    //listen for workers to come online
    cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`))
    
    //fork a worker process for each CPU
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
} else {
    //worker processes create REP socket & connect to DEALER
    const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc')
    
    responder.on('message', data => {
        //parse incoming message
        const request = JSON.parse(data)
        console.log(`${process.pid} received request for: ${request.path}`)
        
        //read file & reply with content
        fs.readFile(request.path, (err, content) => {
            console.log(`${process.pid} sending response`)
            responder.send(JSON.stringify({
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid
            }))
        })
    })
}