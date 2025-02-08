/* eslint-disable react/prop-types */
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  props;
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Sends the note to the backend (Database)
  const submitNoteToDB = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      console.log(data);
      console.log("Server Response:", data);

      // Clear input fields and refresh notes after saving
      setNote({ title: "", content: "" });
      setExpanded(false);
      props.onAdd(note);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  function submitNote(event) {
    event.preventDefault();

    if (note.title || note.content) {
      submitNoteToDB(); //Saves to DB
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new line & page refresh
      submitNote(event);
    }
  }

  // Expands the textarea when clicked
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab type="submit" onClick={submitNote} className="fab-button">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
