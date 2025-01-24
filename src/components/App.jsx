import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <div>
              <CreateArea onAdd={addNote} />
              {notes.map((noteItem, index) => (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
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