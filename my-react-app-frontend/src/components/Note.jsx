import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

function Note({ id, title, content, onDelete }) {
  //Handle delete note API request
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" });
      onDelete(id); //Remove from frontend after deleting from database
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Note;
