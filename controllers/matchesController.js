const fs = require('fs')

class MatchesController {

    static sendResponseByFilter(dbPath, req, res) {
        fs.readFile(dbPath, 'utf8', function(err, contents) {
            if(!err) {
                res.send(JSON.parse(contents))
            } else {
                res.send(err)
            }
        });
    }
}

module.exports = MatchesController