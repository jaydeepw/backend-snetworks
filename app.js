const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/matches', (req, res) => {
    fs.readFile('data/data.json', 'utf8', function(err, contents) {
        if(!err) {
            res.send(JSON.parse(contents))
        } else {
            console.log(err)
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;