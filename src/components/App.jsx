//import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignIn from "./pages/SignIn";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
      <div className="notes-container">
        {notes.map(noteItem => (
          <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
          />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default App;