const expect = require('chai').expect
const assert = require('chai').assert
const request = require('supertest')
const constants = require('../../../utils/constants')
const endpoint = constants.ENDPOINT_MATCHES

const app = require('../../../app.js')

describe('Tests with composite filters', () => {
    const queryStringHasPhoto = constants.QUERY_HAS_PHOTO + "="
    const queryStringMaxAge = constants.QUERY_AGE_MAX + "="
    const queryStringIsFav = constants.QUERY_IS_FAVOURITE + "="
    const queryStringMinAge = constants.QUERY_AGE_MIN + "="
    it('Positive, hasPhoto && isFavourite doesnt break the contract', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + 'true' + "&" + queryStringIsFav + 'true')
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('matches')
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, hasPhoto && isFavourite returns both Favs with Photos', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + 'true' + "&" + queryStringIsFav + 'true')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('main_photo')).to.be.true;
                expect(element.hasOwnProperty('favourite')).to.be.true;
                assert.isNotNull(element.main_photo)
                assert.isNotNull(element.favourite)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, isFavourite && hasPhoto returns both Favs with Photos', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('main_photo')).to.be.true;
                expect(element.hasOwnProperty('favourite')).to.be.true;
                assert.isNotNull(element.main_photo)
                assert.isNotNull(element.favourite)
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, hasPhoto && isFavourite both "null" returns all results', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + 'null' + "&" + queryStringIsFav + 'null')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                assert.isNotNull(element.display_name)
                expect(element.main_photo).to.satisfy(function (url) {
                    if (url == "" || 
                    url == undefined || 
                    url == null || 
                    typeof url === 'string') {
                        return true;
                    } else {
                        return false;
                    }
                 });

                 expect(element.favourite).to.satisfy(function (favourite) {
                    if (typeof(favourite) == "boolean") {
                        return true;
                    } else {
                        return false;
                    }
                 });
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, hasPhoto && isFavourite both "" returns all results', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + '' + "&" + queryStringIsFav + '')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                assert.isNotNull(element.display_name)
                expect(element.main_photo).to.satisfy(function (url) {
                    if (url == "" || 
                    url == undefined || 
                    url == null || 
                    typeof url === 'string') {
                        return true;
                    } else {
                        return false;
                    }
                 });

                 expect(element.favourite).to.satisfy(function (favourite) {
                    if (typeof(favourite) == "boolean") {
                        return true;
                    } else {
                        return false;
                    }
                 });
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, hasPhoto && isFavourite both "undefined" returns all results', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + 'undefined' + "&" + queryStringIsFav + 'undefined')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('display_name')).to.be.true;
                assert.isNotNull(element.display_name)
                expect(element.main_photo).to.satisfy(function (url) {
                    if (url == "" || 
                    url == undefined || 
                    url == null || 
                    typeof url === 'string') {
                        return true;
                    } else {
                        return false;
                    }
                 });

                 expect(element.favourite).to.satisfy(function (favourite) {
                    if (typeof(favourite) == "boolean") {
                        return true;
                    } else {
                        return false;
                    }
                 });
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, hasPhoto="" && isFavourite="true" returns all favourites', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + '' + "&" + queryStringIsFav + 'true')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.main_photo).to.satisfy(function (url) {
                    if (url == "" || 
                    url == undefined || 
                    url == null || 
                    typeof url === 'string') {
                        return true;
                    } else {
                        return false;
                    }
                 });
                expect(element.hasOwnProperty('favourite')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, hasPhoto="true" && isFavourite="" returns all with photos', (done) => {
        request(app).get(endpoint + "?" + queryStringHasPhoto + 'true' + "&" + queryStringIsFav + '')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.favourite).to.satisfy(function (fav) {
                    if (fav == "" || 
                    fav == undefined ||
                    fav == null || 
                    typeof fav === 'boolean') {
                        return true;
                    } else {
                        return false;
                    }
                 });
                expect(element.hasOwnProperty('main_photo')).to.be.true;
            });
            done()
        })
        .catch((err) => done(err))
    })

    it('Positive, isFavourite && hasPhoto & minAge=30 & maxAge=40 returns Favs with Photos within 30-40', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true'
        + "&" + queryStringMinAge + '30'
        + "&" + queryStringMaxAge + '40')
        .then((res) => {
            const body = res.body
            body.matches.forEach(element => {
                expect(element.hasOwnProperty('main_photo')).to.be.true;
                expect(element.hasOwnProperty('favourite')).to.be.true;
                assert.isNotNull(element.main_photo)
                assert.isNotNull(element.favourite)
                expect(element.age).to.be.least(20)
                expect(element.age).to.be.most(40)
            });

            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, isFavourite && hasPhoto & minAge=17 & maxAge=40 fails with validation message', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true'
        + "&" + queryStringMinAge + '17'
        + "&" + queryStringMaxAge + '40')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, isFavourite && hasPhoto & minAge=21 & maxAge=96 fails with validation message', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true'
        + "&" + queryStringMinAge + '17'
        + "&" + queryStringMaxAge + '96')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, isFavourite && hasPhoto & minAge=21 & maxAge absent fails with validation message', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true'
        + "&" + queryStringMinAge + '17')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })

    it('Negative, isFavourite && hasPhoto & maxAge=40 & minAge absent fails with validation message', (done) => {
        request(app).get(endpoint + "?" + queryStringIsFav + 'true' + "&" + queryStringHasPhoto + 'true'
        + "&" + queryStringMaxAge + '40')
        .then((res) => {
            const body = res.body
            expect(res.status).to.eql(400)
            expect(body).to.contain.property('message')
            done()
        })
        .catch((err) => done(err))
    })
})