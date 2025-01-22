import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignIn from "./pages/SignIn";
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
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
        <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
      <Footer />
    </div>
  )
}

export default App;