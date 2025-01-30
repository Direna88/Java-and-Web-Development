import { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
// import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Notes() {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/auth/notes", {
        headers: {
        "Authorization" : `Bearer ${token}`
        }
    });
    if(response.status !== 201) {
      navigate('/login');
    }
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  }
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
        const response = await fetch ("http://localhost:5000/notes", {
          headers: {Authorization: `Bearer ${token}`},
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

  //Add a note to the database
  const addNote = async (newNote) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newNote)
        })

      const savedNote = await response.json();
      setNotes([...notes, savedNote]);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Delete a note from both Frontend & Database
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      console.log("Token being sent:", token);

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://localhost:5000/notes/${id}`, 
      { method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          },
       });

       if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid or expired, redirect to login
          navigate("/login");
        } else if (response.status === 404) {
          console.warn("Note not found or you don't have permission to delete it.");
        } else {
          console.error(`Error deleting note: ${response.statusText}`);
        }
        return;
      };

      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note key={note.id} id={note.id} title={note.title} content={note.content} onDelete={deleteNote} />
      ))}
      <Footer />
    </div>
  );
}

export default Notes;