const constants = require('./utils/constants')
const matches = require('./controllers/matches')

const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.get(constants.ENDPOINT_MATCHES, matches)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app