const expect = require('chai').expect
const assert = require('chai').assert
const AgeFilterController = require('../../controllers/ageFilterController')
var items = []

describe('Controller simple methods test', () => {

    it('Non null min age validation message', (done) => {
        const message = AgeFilterController.getInvalidMinAgeMessage()
        expect(message).to.not.be.undefined
        assert.isNotFunction(message)
        assert.isNotNull(message)
        done()
    })

    it('Non null max age validation message', (done) => {
        const message = AgeFilterController.getInvalidMaxAgeMessage()
        expect(message).to.not.be.undefined
        assert.isNotFunction(message)
        assert.isNotNull(message)
        done()
    })

    it('19 is valid lower age', (done) => {
        assert.isTrue(AgeFilterController.hasValidMinAge(19))
        done()
    })

    it('18 is valid lower age', (done) => {
        assert.isTrue(AgeFilterController.hasValidMinAge(18))
        done()
    })

    it('17 is invalid lower age', (done) => {
        assert.isFalse(AgeFilterController.hasValidMinAge(17))
        done()
    })

    it('96 is invalid upper age', (done) => {
        assert.isFalse(AgeFilterController.hasValidMaxAge(96))
        done()
    })

    it('95 is valid upper age', (done) => {
        assert.isTrue(AgeFilterController.hasValidMaxAge(95))
        done()
    })

    it('94 is valid upper age', (done) => {
        assert.isTrue(AgeFilterController.hasValidMaxAge(94))
        done()
    })
})

describe('Controller medium methods test', () => {
    
    beforeEach(function () {
        items = []
        items.push({age : 14})
        items.push({age : 17})
        items.push({age : 18})
        items.push({age : 19})
        items.push({age : 34})
        items.push({age : 39})
        items.push({age : 40})
        items.push({age : 94})
        items.push({age : 95})
        items.push({age : 96})
    })

    it('filters are within small range', (done) => {
        var result = AgeFilterController.filter(items, 32, 40)
        assert.isArray(result)
        assert.lengthOf(result, 3)
        done()
    })

    it('filters are within large range', (done) => {
        var result = AgeFilterController.filter(items, 14, 96)
        assert.isArray(result)
        assert.lengthOf(result, 10)
        done()
    })

    it('filters empty list', (done) => {
        var result = AgeFilterController.filter([], 14, 96)
        assert.isArray(result)
        assert.lengthOf(result, 0)
        done()
    })
})