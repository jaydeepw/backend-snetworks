const expect = require('chai').expect
const assert = require('chai').assert
const FavouritesFilterController = require('../../controllers/favouritesFilterController')
var items = []

describe('FavouritesFilterController test', () => {
    
    beforeEach(function () {
        items = []
        items.push({favourite : true})
        items.push({favourite : false})
        items.push({favourite : true})
        items.push({favourite : false})
        items.push({favourite : true})
        items.push({favourite : false})
        items.push({favourite : ""})
        items.push({favourite : undefined})
        items.push({favourite : null})
    })

    it('filters out favourites', (done) => {
        var result = FavouritesFilterController.filter(items)
        assert.isArray(result)
        assert.lengthOf(result, 3)
        result.forEach(element => {
            expect(element.hasOwnProperty('favourite')).to.be.true
            assert.isTrue(element.favourite)
        });
        done()
    })

    it('Does not filter out non-favourites', (done) => {
        var result = FavouritesFilterController.filter(items)
        assert.isArray(result)
        assert.lengthOf(result, 3)
        result.forEach(element => {
            expect(element.hasOwnProperty('favourite')).to.not.be.false
        });
        done()
    })
})