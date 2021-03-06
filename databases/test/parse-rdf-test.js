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
        expect(book).to.have.a.property('id', 132)
        expect(book).to.have.a.property('title', 'The Art of War')       
        expect(book).to.have.a.property('authors')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Sunzi, active 6th century B.C.')
            .and.contains('Giles, Lionel')          
        expect(book).to.have.a.property('subjects')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Military art and science -- Early works to 1800')
            .and.contains('War -- Early works to 1800')
        
        //wrapping up tasks
        //expect(book).to.have.a.property('LLC')
        //   .that.is.a('string').with.lengthOf(1)
    })
})

//NOTES
/*
-Mocha is a testing framework
-Chai is an assertion library => makes tests more human-readable
-When Mocha is invoked with the --watch flag (package.json) it will continuously monitor any files ending in .js
*/