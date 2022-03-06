function TaskCard({
  id,
  title,
  description,
  taskDeleteHandler,
  status,
  updateTaskHandler,
}) {
  return (
    <div className="card w-100 my-3 me-3" style={{ maxWidth: "300px" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="mb-3">
          <strong>Status: </strong>
          <span>{status ? "Completed" : "Not Completed"}</span>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-warning"
            onClick={() => {
              updateTaskHandler(id, status);
            }}
          >
            {status ? (
              <i className="bi bi-toggle-on me-2" />
            ) : (
              <i className="bi bi-toggle-off me-2" />
            )}
            Toggle Status
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              taskDeleteHandler(id);
            }}
          >
            <i className="bi bi-trash-fill me-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
