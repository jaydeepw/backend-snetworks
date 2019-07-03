const expect = require('chai').expect
const assert = require('chai').assert
const Utils = require('../../utils/utils')
var request = {}

describe('Utils methods\' hasBothParams() test', () => {
    beforeEach(function () {
        request.query = {}
        request.query.param1 = "value1"
        request.query.param2 = "value2"
    })

    it('pass on both params are present and valid', (done) => {
        const result = Utils.hasBothParams(request, "param1", "param2")
        assert.isTrue(result)
        done()
    })

    it('fail on only one param is present', (done) => {
        const result = Utils.hasBothParams(request, "param1", null)
        assert.isFalse(result)
        done()
    })

    it('fail on only another param is present', (done) => {
        const result = Utils.hasBothParams(request, null, "param2")
        assert.isFalse(result)
        done()
    })

    it('fail one param is empty', (done) => {
        const result = Utils.hasBothParams(request, "", "param2")
        assert.isFalse(result)
        done()
    })

    it('fail when another param is empty', (done) => {
        const result = Utils.hasBothParams(request, "param1", "")
        assert.isFalse(result)
        done()
    })

    it('fail one param is undefined', (done) => {
        const result = Utils.hasBothParams(request, undefined, "param2")
        assert.isFalse(result)
        done()
    })

    it('fail when another param is undefined', (done) => {
        const result = Utils.hasBothParams(request, "param1", undefined)
        assert.isFalse(result)
        done()
    })
})

describe('Utils methods\' hasNoBothParams() test', () => {
    beforeEach(function () {
        request.query = {}
        request.query.param1 = "value1"
        request.query.param2 = "value2"
    })

    it('pass on both params are present and valid', (done) => {
        const result = Utils.hasNoBothParams(request, null, null)
        assert.isTrue(result)
        done()
    })

    it('fail on only one param is present', (done) => {
        const result = Utils.hasNoBothParams(request, "param1", null)
        assert.isFalse(result)
        done()
    })

    it('fail on only another param is present', (done) => {
        const result = Utils.hasNoBothParams(request, null, "param2")
        assert.isFalse(result)
        done()
    })

    it('fail one param is empty', (done) => {
        const result = Utils.hasNoBothParams(request, "", "param2")
        assert.isFalse(result)
        done()
    })

    it('fail when another param is empty', (done) => {
        const result = Utils.hasNoBothParams(request, "param1", "")
        assert.isFalse(result)
        done()
    })

    it('fail one param is undefined', (done) => {
        const result = Utils.hasNoBothParams(request, undefined, "param2")
        assert.isFalse(result)
        done()
    })

    it('fail when another param is undefined', (done) => {
        const result = Utils.hasNoBothParams(request, "param1", undefined)
        assert.isFalse(result)
        done()
    })
})