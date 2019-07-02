const fs = require('fs')

class MatchesController {

    static sendResponseByFilter(dbPath, req, res) {
        var matchesControllerScope = this
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

    static getFilteredData(req, contents) {
        const hasPhoto = req.query.hasPhoto
        if(hasPhoto === 'true') {
            contents.matches = contents.matches.filter(this.hasPhoto)
        }
            
        return contents
    }

    static hasPhoto(value) {
        return value.main_photo != null &&
        value.main_photo != 'undefined' &&
        value.main_photo != '';
    }
}

module.exports = MatchesController