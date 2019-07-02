const fs = require('fs')

class MatchesController {

    static sendResponseByFilter(dbPath, req, res) {
        var matchesControllerScope = this
        fs.readFile(dbPath, 'utf8', function(err, contents) {
            if(!err) {
                contents = JSON.parse(contents)
                const result = matchesControllerScope.getFilteredData(req, contents)
                // console.log(result.matches.length)
                res.send(result)
            } else {
                res.send(err)
            }
        });
    }

    static getFilteredData(req, contents) {
        const hasPhoto = req.query.hasPhoto
        const isFavourite = req.query.isFavourite
        if(hasPhoto === 'true') {
            contents.matches = contents.matches.filter(this.hasPhoto)
        }

        if(isFavourite === 'true') {
            contents.matches = contents.matches.filter(this.isFavourite)
        }

        return contents
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