'use strict'
const EventEmitter = require('events').EventEmitter

class LDJClient extends EventEmitter {
    constructor(stream) {
        super()
        
        let buffer = ''
        stream.on('data', data => {
            buffer += data
            let boundary = buffer.indexOf('\n')
            while (boundary !== -1){
                const input = buffer.substring(0, boundary)
                buffer = buffer.substring(boundary + 1)
                this.emit('message', JSON.parse(input))
                boundary = buffer.indexOf('\n')
            }
        })
    }
    
    static connect(stream) {
        return new LDJClient(stream)
    }
}

module.exports = LDJClient

//NOTES
/*
-`super()` invokes the EventEmitter's own constructor function (best practice: when implementing a class that extends another class, call `super()` first)
-JS uses prototypal inheritance to establish the relationship between LDJClient and EventEmitter
-`stream.on()` handles data events
*/