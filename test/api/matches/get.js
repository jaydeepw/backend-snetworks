const expect = require('chai').expect
const request = require('supertest')

const app = require('../../../app.js')

describe('Filter tests', () => {
    it('Positive, get data as per contract', (done) => {
        request(app).get('/matches')
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, get all item without filter', (done) => {
        request(app).get('/matches')
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.equal(25)
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, get all without off by one error greater', (done) => {
        request(app).get('/matches')
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.not.equal(26)
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, get all without off by one error smaller', (done) => {
        request(app).get('/matches')
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.not.equal(24)
            done()
        })
        .catch((err) => done(err))
    })
})

describe('Data tests', () => {
    it('Negative, query wrong db path', (done) => {
        // configure wrong path to access db
        app.locals.dbPath = "wrong/path/data.json"
        request(app).get('/matches')
        .then((res) => {
            const body = res.body
            expect(body.code).to.equal('ENOENT')
            done()
        })
        .catch((err) => done(err))
    })
})