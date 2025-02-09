const express = require("express");
const cors = require("cors");
const pool = require("./db");
const router = require("./routes/authRoutes.js");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5001;

//middleware
app.use(cors());
app.use(express.json());
app.use("/auth", router);

//ROUTES ---- NOTES//

app.get("/test", async (req, res) => {
  return res.json({ msg: "Yes, the test is working" });
});

// Create a new note
app.post("/notes", async (req, res) => {
  try {
    const Authorization = req.get("Authorization");
    let token;
    if (Authorization) {
      token = Authorization.split("Bearer ").at(-1);
    }

    // Verify the token and extract the user ID
    const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    const { title, content } = req.body;

    // Insert the new note into the database
    const newNote = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [verifiedUser.id, title, content],
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Get all notes for the authenticated user
app.get("/notes", async (req, res) => {
  try {
    const Authorization = req.get("Authorization");
    let token;
    if (Authorization) {
      token = Authorization.split("Bearer ").at(-1);
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_KEY);

    // Fetch all notes belonging to the user
    const allNotes = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1",
      [verifiedUser.id],
    );

    res.json(allNotes.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a specific note by ID
app.get("/notes/:id", async (req, res) => {
  try {
    const Authorization = req.get("Authorization");
    let token;

    if (Authorization) {
      token = Authorization.split("Bearer ").at(-1);
    }

    // Verify the token and extract the user ID
    const verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    const userId = verifiedUser.id;
    const { id } = req.params;

    // Fetch the requested note only if it belongs to the authenticated user
    const note = await pool.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    res.json(note.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const Authorization = req.get("Authorization");
    console.log("Received Authorization header:", Authorization);

    if (!Authorization) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = Authorization.split("Bearer ").at(-1);
    console.log("Extracted Token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token must be provided" });
    }

    let verifiedUser;
    try {
      verifiedUser = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    const userId = verifiedUser.id;
    const { id } = req.params;

    // Ensure the note belongs to the user before deleting
    const deleteResult = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );
    console.log("Delete Query Result:", deleteResult.rows);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }

    res.json({ message: "Note was deleted!" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});