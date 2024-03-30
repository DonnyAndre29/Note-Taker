const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Read existing notes from the JSON file
const readNotes = () => {
  const dbJson = fs.readFileSync('db/db.json', 'utf8');
  return JSON.parse(dbJson);
};

// Write notes to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync('db/db.json', JSON.stringify(notes));
};

// Defines the get request to this routes end point '/api/notes'
router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
  });
  
 
  // Defines the post request to this routes end point '/api/notes'
  router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
  });


  router.delete('/api/notes/:id', (req, res) => {
    const dbJson = readNotes();
    const noteId = req.params.id;
  
    // Find the index of the note with the specified ID
    const noteIndex = dbJson.findIndex((note) => note.id === noteId);
  
    if (noteIndex !== -1) {
      // Remove the note from the array
      dbJson.splice(noteIndex, 1);
      writeNotes(dbJson);
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  })

  module.exports = router; 