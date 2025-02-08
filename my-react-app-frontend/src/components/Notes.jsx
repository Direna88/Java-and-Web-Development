import { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Notes() {
  // Checks user authentication and redirects to login if unauthorized
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/auth/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  //Fetch notes from the database when the page loads
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchNotes();
  }, [navigate]);

  // Adds a new note to the frontend state
  const addNote = async (newNote) => {
    setNotes([...notes, newNote]);
  };

  // Deletes a note from both Frontend & Database
  const deleteNote = async (id) => {
    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });
  };

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default Notes;
