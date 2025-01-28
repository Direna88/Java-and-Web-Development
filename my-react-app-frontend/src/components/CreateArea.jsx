/* eslint-disable react/prop-types */
import { useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  // Sends the note to the backend (Database)
  const submitNoteToDB = async () => {
    try {
      const response = await fetch ("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      // Clears input fields only if API call is successful
      setNote({ title: "", content: ""});
      setExpanded(false);
      props.onAdd(data); //Updates frontend with newly added note
    } catch (err) {
      console.log(err.message);
    }
  };

  function submitNote(event) {
    event.preventDefault();

    if (note.title || note.content) {
      submitNoteToDB(); //Saves to DB
    }
  };


  function handleKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new line & page refresh
      submitNote(event);
    }
  }

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
          <Fab
          type="submit" 
          onClick={submitNote}
          className="fab-button"
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
