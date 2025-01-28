import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
  const [notes, setNotes] = useState([]);

  //Fetch notes from the database when the page loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch ("http://localhost:5000/notes");
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchNotes();
  }, []);

  //Add a note to the database
  const addNote = async (newNote) => {
    try {
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote), 
      });

      const savedNote = await response.json();
      setNotes([...notes, savedNote]);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Delete a note from both Frontend & Database
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
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
          }/>

          <Route path="/signin" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;