// node modules
const express = require('express')
const fs = require('fs')
const path = require('path')
//
const app = express()
const PORT = process.env.PORT || 8000

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

app.get('/api/notes', (req, res) => res.json(notes))

app.post('/api/notes', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Server now on port http://localhost:${PORT}`)
})