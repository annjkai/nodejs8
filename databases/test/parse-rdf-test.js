'use strict'

const fs = require('fs')
const expect = require('chai').expect
const parseRDF = require('../lib/parse-rdf.js')

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`)

describe('parseRDF', () => {
    //test passes because of parse-rdf.js library, which exports //a function
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function')
    })
    //test passes because parse-rdf.js returns an object
    it('should parse RDF content', () => {
        const book = parseRDF(rdf)
        expect(book).to.be.an('object')
    })
})

//NOTES
/*
-Mocha is a testing framework
-Chai is an assertion library => makes tests more human-readable
*/