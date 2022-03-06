import db from "../firebase/firebase";
import { Helmet } from "react-helmet";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const taskTitleRef = useRef("");
  const taskDescriptionRef = useRef("");
  const taskStatusRef = useRef(false);

  // Get tasks from db
  async function getTasks() {
    try {
      setLoading(true);
      const q = query(collection(db, "tasks"), orderBy("date"));
      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setTasks(arr);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }

  // Add a new task in collection "tasks"
  async function addTaskHandler(event) {
    try {
      event.preventDefault();
      setAddTask(false);
      setLoading(true);
      const title = taskTitleRef.current.value;
      const description = taskDescriptionRef.current.value;
      const completed = taskStatusRef.current.checked;
      const date = new Date();

      await addDoc(collection(db, "tasks"), {
        title,
        description,
        completed,
        date,
      });

      setRerender(!rerender);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }

  // Update an existing task in collection "tasks"
  async function updateTaskHandler(id, status) {
    try {
      setLoading(true);
      await updateDoc(doc(db, "tasks", id), {
        completed: !status,
      });
      setRerender(!rerender);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }

  // Delete task with specific id
  async function taskDeleteHandler(id) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "tasks", id));
      setRerender(!rerender);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    getTasks();
  }, [rerender]);

  return (
    <div className="container p-3">
      <Helmet>
        <title>Tasks | Platos Demo App</title>
      </Helmet>
      {error ? (
        <h4 className="text-center my-5">
          Something Went Wrong. Please Try Again.
        </h4>
      ) : (
        <>
          <h1>My Tasks</h1>
          <p className="mt-3">Click on New Task button to add new task.</p>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => {
              setAddTask(!addTask);
            }}
          >
            <i className="bi bi-plus-lg me-2" />
            New Task
          </button>

          {addTask && (
            <form onSubmit={addTaskHandler}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  ref={taskTitleRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="noteDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="noteDescription"
                  rows="4"
                  ref={taskDescriptionRef}
                  required
                ></textarea>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="status"
                  ref={taskStatusRef}
                />
                <label className="form-check-label" htmlFor="status">
                  Completed
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Add Task
              </button>
            </form>
          )}

          <hr />

          {loading ? (
            <Loading />
          ) : (
            <div className="d-flex flex-wrap mx-auto">
              {tasks.length === 0 && (
                <h6>There is no task present. Please add one.</h6>
              )}
              {tasks.map((task) => {
                return (
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    taskDeleteHandler={taskDeleteHandler}
                    updateTaskHandler={updateTaskHandler}
                    status={task.completed}
                    key={task.id}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tasks;
