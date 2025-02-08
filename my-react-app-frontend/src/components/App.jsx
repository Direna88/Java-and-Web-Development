/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import Footer from "./Footer";
import Notes from "./Notes";


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader = location.pathname === "/signup" || location.pathname === "/login"; // Hide on signup & login
  const showLogout = location.pathname === "/notes";
  
  return (
    <>
      {!hideHeader && <Header showLogout={showLogout} />}
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;