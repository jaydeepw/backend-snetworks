const expect = require('chai').expect
const request = require('supertest')
const constants = require('../../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../../app.js')

describe('For filter age', () => {
    var queryStringMinAgeWoValue = constants.QUERY_AGE_MIN + "="
    var queryStringMaxAgeWoValue = constants.QUERY_AGE_MAX + "="
    it('Negative, Has only minage query param', (done) => {
        request(app).get(endpoint + "?" +queryStringMinAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            // console.log(res)
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, Has only maxage query param', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            // console.log(res)
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, Has both maxage & minage query param', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, Has both maxage & minage query param', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(20)
                expect(element.age).to.be.most(40)
            });
            done()
        })
        .catch((err) => done(err))
    })
})