const expect = require('chai').expect
const request = require('supertest')
const constants = require('../../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../../app.js')

describe('For filter isFavourite', () => {
    var queryStringWoValue = "?" + constants.QUERY_IS_FAVOURITE + "="
    it('Positive, get data as per contract', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'true')
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, get only the ones with favorites', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'true')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('favourite')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })
    
    it('Positive, get all irrespective of favorites', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'false')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })
    
    it('Negative, verify that photo query param = null returns same result', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'null')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })
    
    it('Negative, verify that photo query param = "undefined" returns same result', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'undefined')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, verify that photo query param = "random" returns same result', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'random')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })
})