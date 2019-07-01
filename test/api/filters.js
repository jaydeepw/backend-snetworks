const expect = require('chai').expect
const request = require('supertest')

const app = require('../../app.js')

describe('GET all', () => {
    it('OK, getting all', (done) => {
        request(app).get('/')
        .send()
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
    })
})