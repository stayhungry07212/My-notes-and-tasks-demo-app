function NoteCard({ id, title, description, noteDeleteHandler }) {
  return (
    <div className="card w-100 my-3 me-3" style={{ maxWidth: "300px" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            noteDeleteHandler(id);
          }}
        >
          <i className="bi bi-trash-fill me-2" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
