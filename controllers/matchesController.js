const fs = require('fs')
const constants = require('../utils/constants')
const Utils = require('../utils/utils')
const PhotosFilterController = require('./photoFilterController')
const FavouritesFilterController = require('./favouritesFilterController')
const AgeFilterController = require('./ageFilterController')

class MatchesController {

    static sendResponse(dbPath, req, res) {
        var matchesControllerScope = this
        if(!Utils.hasBothParamsOrHasNone(req, constants.QUERY_AGE_MIN, constants.QUERY_AGE_MAX)) {
            var result = {}
            result.message = AgeFilterController.getAgeQueryParamValidationMsg()
            res.status(400)
            res.send(result)
        } else if(Utils.hasBothParams(req, constants.QUERY_AGE_MIN, constants.QUERY_AGE_MAX) &&
            !AgeFilterController.hasValidMinAge(req.query.minAge)) {
            var result = {}
            result.message = AgeFilterController.getInvalidMinAgeMessage()
            res.status(400)
            res.send(result)
        } else {
            fs.readFile(dbPath, 'utf8', function(err, contents) {
                if(!err) {
                    contents = JSON.parse(contents)
                    const result = matchesControllerScope.getFilteredData(req, contents)
                    res.send(result)
                } else {
                    res.send(err)
                }
            });
        }
    }

    static getFilteredData(req, contents) {
        const hasPhoto = req.query.hasPhoto
        const isFavourite = req.query.isFavourite
        const minAge = parseInt(req.query.minAge)
        const maxAge = parseInt(req.query.maxAge)
        if(hasPhoto === 'true') {
            contents.matches = PhotosFilterController.filter(contents.matches)
        }

        if(isFavourite === 'true') {
            contents.matches = FavouritesFilterController.filter(contents.matches)
        }

        if(!isNaN(minAge) && !isNaN(maxAge)) {
            contents.matches = AgeFilterController.filter(contents.matches, minAge, maxAge)
        }

        return contents
    }
}

module.exports = MatchesController