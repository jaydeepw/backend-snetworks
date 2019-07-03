const fs = require('fs')
const constants = require('../utils/constants')
const PhotosFilterController = require('./photoFilterController')
const FavouritesFilterController = require('./favouritesFilterController')

class MatchesController {

    static sendResponseByFilter(dbPath, req, res) {
        var matchesControllerScope = this
        if(!this.hasBothParamsOrHasNone(req, constants.QUERY_AGE_MIN, constants.QUERY_AGE_MAX)) {
            var result = {}
            result.message = this.getAgeQueryParamValidationMsg()
            res.status(400)
            res.send(result)
        } else {
            fs.readFile(dbPath, 'utf8', function(err, contents) {
                if(!err) {
                    contents = JSON.parse(contents)
                    const result = matchesControllerScope.getFilteredData(req, contents)
                    //console.log(result.matches.length)
                    res.send(result)
                } else {
                    res.send(err)
                }
            });
        }
    }

    static getAgeQueryParamValidationMsg() {
        return "'minAge' & 'maxAge' both are needed"
    }

    static hasBothParamsOrHasNone(req, paramName1, paramName2) {
        // ensure both query params exist or none
        if ((!req.query.hasOwnProperty(paramName1) &&
                !req.query.hasOwnProperty(paramName2)) 
            ||
            (req.query.hasOwnProperty(paramName1) &&
                req.query.hasOwnProperty(paramName2))) {
                    return true
                } else {
                    return false
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
            var range = {lower: minAge, upper: maxAge};
            contents.matches = contents.matches.filter(this.isInRange, range)
        }

        return contents
    }

    static isInRange(value) {
        return value.age >= this.lower && value.age <= this.upper;
    }
}

module.exports = MatchesController