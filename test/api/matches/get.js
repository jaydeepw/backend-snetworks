const expect = require('chai').expect
const request = require('supertest')
const constants = require('../../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../../app.js')

describe('Without any filter', () => {
    it('Positive, get data as per contract', (done) => {
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, get non empty data', (done) => {
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            expect(body.matches).to.not.be.empty
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, get all item without filter', (done) => {
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.equal(25)
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, get all without off by one error greater', (done) => {
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.not.equal(26)
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, get all without off by one error smaller', (done) => {
        request(app).get(endpoint)
        .then((res) => {
            const body = res.body
            expect(body.matches.length).to.not.equal(24)
            done()
        })
        .catch((err) => done(err))
    })
})

describe('For filter hasPhoto', () => {
    var queryStringWoValue = "?hasPhoto="
    it('Positive, get data as per contract', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'true')
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, get only the ones with valid photo url', (done) => {
        request(app).get(endpoint + queryStringWoValue + 'true')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('main_photo')).to.be.true;
                var url = element.main_photo
                expect(url).to.not.a('')
                expect(url).to.not.a('undefined')
                expect(url).to.not.equal(null)
            });
            done()
        })
        .catch((err) => done(err))
    })
    
    it('Positive, get all irrespective of photo url', (done) => {
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

describe('For filter isFavourite', () => {
    var queryStringWoValue = "?isFavourite="
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

describe('Tests with composite filters', () => {
    
})

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