const expect = require('chai').expect
const request = require('supertest')
const constants = require('../../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../../app.js')

describe('For filter age', () => {
    var queryStringMinAgeWoValue = constants.QUERY_AGE_MIN + "="
    var queryStringMaxAgeWoValue = constants.QUERY_AGE_MAX + "="
    it('Negative, Has only minAge query param', (done) => {
        request(app).get(endpoint + "?" +queryStringMinAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, Has only maxAge query param', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '20')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, Has both maxAge & minAge query param', (done) => {
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

    it('Positive, Has both maxAge & minAge query param', (done) => {
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

    it('Positive, Has both maxAge & minAge query param', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '35')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(35)
                expect(element.age).to.be.most(40)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, minAge < 18', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '17')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, minAge == 18', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '18')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(18)
                expect(element.age).to.be.most(40)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, minAge > 18', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '40' +
        '&' + queryStringMinAgeWoValue + '19')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(19)
                expect(element.age).to.be.most(40)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, maxAge > 95', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '96' +
        '&' + queryStringMinAgeWoValue + '21')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, maxAge == 95', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '95' +
        '&' + queryStringMinAgeWoValue + '21')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(21)
                expect(element.age).to.be.most(95)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, maxAge < 95', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '94' +
        '&' + queryStringMinAgeWoValue + '21')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(200)
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                expect(element.hasOwnProperty('age')).to.be.true;
                expect(element.hasOwnProperty('age')).to.not.be.NaN;
                expect(element.age).to.be.least(21)
                expect(element.age).to.be.most(94)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, fail on maxAge is string', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '"94"' +
        '&' + queryStringMinAgeWoValue + '21')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, fail on minAge is string', (done) => {
        request(app).get(endpoint + "?" + queryStringMaxAgeWoValue + '94' +
        '&' + queryStringMinAgeWoValue + '"21"')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })
})