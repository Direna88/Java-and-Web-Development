import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    // eslint-disable-next-line react/prop-types
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Note;
