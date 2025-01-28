const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a note
app.post("/notes", async (req, res) => {
  try {
    const {title, content } = req.body;
    const newNote = await pool.query("INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

    res.json(newNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all notes
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes");

    res.json(allNotes.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//get a note
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

    res.json(note.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//delete a note
app.delete("/notes/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const deleteNote = await pool.query("DELETE FROM notes WHERE id = $1", [id]);

    res.json("Note was deleted!");
  } catch (err) {
    console.log(err.message);
  }
})


app.listen(5000, () => {
  console.log("Server has started on port 5000")
});