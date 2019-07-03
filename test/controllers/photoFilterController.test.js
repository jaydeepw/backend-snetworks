const expect = require('chai').expect
const assert = require('chai').assert
const PhotosFilterController = require('../../controllers/photoFilterController')
var items = []

describe('PhotosFilterController test', () => {
    
    beforeEach(function () {
        items = []
        items.push({main_photo : "http://someurl.com"})
        items.push({main_photo : "http://someurl.com"})
        items.push({main_photo : ""})
        items.push({main_photo : ""})
        items.push({main_photo : undefined})
        items.push({main_photo : null})
    })

    it('filters out with valid photos', (done) => {
        var result = PhotosFilterController.filter(items)
        assert.isArray(result)
        assert.lengthOf(result, 2)
        result.forEach(element => {
            assert.isNotNull(element.main_photo)
            expect(element.hasOwnProperty('main_photo')).to.be.true
            expect(element.main_photo).to.be.a('string')
        });
        done()
    })
})