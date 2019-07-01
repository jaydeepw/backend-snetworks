const MatchesController = require('./controllers/matchesController.js')

const dbPath = "data/data.json"
const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.locals.dbPath = dbPath;

app.get('/matches', (req, res) => {
    MatchesController.sendResponseByFilter(app.locals.dbPath, req, res)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app