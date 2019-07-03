const expect = require('chai').expect
const request = require('supertest')
const constants = require('../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../app')

describe('Data tests', () => {
    it('Negative, query wrong db path', (done) => {
        // configure wrong path to access db
        app.locals.dbPath = "wrong/path/data.json"
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body.code).to.equal('ENOENT')
            done()
        })
        .catch((err) => done(err))
    })
})