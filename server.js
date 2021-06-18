// node modules
const express = require('express')
const fs = require('fs')
const path = require('path')
//
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err
    let notes = JSON.parse(data)
    console.log(notes)
    res.notes
  })
})

app.listen(PORT, () => {
  console.log(`Server now on port http://localhost:${PORT}`)
})