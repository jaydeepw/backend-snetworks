var express = require('express')
var router = express.Router()

var constants = require('../utils/constants')
var MatchesController = require('../controllers/matchesController')

router.get(constants.ENDPOINT_MATCHES, (req, res) => {
    MatchesController.sendResponse(constants.DB_PATH, req, res)
})

module.exports = router