import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container p-3">
      {/* Illustration */}
      <img
        className="d-block w-100 m-auto"
        style={{ maxWidth: "400px" }}
        src="/images/programming-illustration.png"
        alt="programming-illustration"
      />

      {/* Intro */}
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <h1>Introduction</h1>
        <p>
          Platos Demo App is a demo app having feature of managing notes and
          tasks.
        </p>

        <div
          className="mt-4 d-flex justify-content-between flex-wrap"
        >
          {/* Notes */}
          <div>
            <h2>Notes</h2>
            <p>Manage your notes easily.</p>
            <Link to="/notes" className="btn btn-primary mb-3">
              <i className="bi bi-arrow-right" /> Go to Notes
            </Link>
          </div>

          {/* Tasks */}
          <div>
            <h2>Tasks</h2>
            <p>Manage your tasks easily.</p>
            <Link to="/tasks" className="btn btn-primary mb-3">
              <i className="bi bi-arrow-right" /> Go to Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
