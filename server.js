// node modules
const express = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

// app and port used
const app = express()
const PORT = process.env.PORT || 8000

// allows app to read our files
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(express.static('./app/public'))

// storing data base
let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/app/db.json')))

// html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './app/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './app/public/notes.html')));
app.get('/api/notes', (req, res) => res.json(notes));


// api routes
app.post('/api/notes', (req, res) => {
  let newNote = req.body
  newNote.id = uuidv4()
  notes.push(newNote)
  fs.writeFileSync(path.join(__dirname, './app/db.json'), JSON.stringify(notes));
  res.json(notes)
});

app.delete('/api/notes/:id', (req, res) => {
  const remove = req.params.id
  notes = notes.filter((value) => {
    return value.id !== remove
  })
  fs.writeFileSync(path.join(__dirname, './app/db.json'), JSON.stringify(notes))
  res.send('You deleted a note')
});

// server listener
app.get("*", (req, res)=> res.sendFile(path.join(__dirname,'./app/public/index.html')));
app.listen(PORT, () => {
  console.log(`Server now on port http://localhost:${PORT}`)
});