const fs = require('fs')
const constants = require('../utils/constants')

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
            contents.matches = contents.matches.filter(this.hasPhoto)
        }

        if(isFavourite === 'true') {
            contents.matches = contents.matches.filter(this.isFavourite)
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

    static isFavourite(value) {
        return value.favourite != null &&
        value.favourite != 'undefined' &&
        value.favourite != ''  &&
        value.favourite == true;
    }

    static isFavourite(value) {
        return value.favourite != null &&
        value.favourite != 'undefined' &&
        value.favourite != ''  &&
        value.favourite == true;
    }

    static hasPhoto(value) {
        return value.main_photo != null &&
        value.main_photo != 'undefined' &&
        value.main_photo != '';
    }
}

module.exports = MatchesController