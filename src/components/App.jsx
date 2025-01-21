//import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignIn from "./pages/SignIn";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
      <Note />
      <Footer />
    </div>
  )
}

export default App;