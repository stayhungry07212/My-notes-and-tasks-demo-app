import db from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleLoading,
  toggleError,
  toggleaddNote,
  setNotes,
} from "../store/store";
import Loading from "../components/Loading";
import NoteCard from "../components/NoteCard";

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  // Converting back date object from string
  notes.forEach((element) => {
    element = { ...element, date: JSON.parse(element.date) };
  });

  const addNote = useSelector((state) => state.notes.addNote);
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);

  const [rerender, setRerender] = useState(false);

  const noteTitleRef = useRef("");
  const noteDescriptionRef = useRef("");

  // Get notes from db
  async function getNotes() {
    try {
      dispatch(toggleLoading());
      const q = query(collection(db, "notes"), orderBy("date"));
      const querySnapshot = await getDocs(q);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      // Converting date object to string to solve issue with redux serializibility
      arr.forEach((element) => {
        element.date = JSON.stringify(element.date);
      });

      dispatch(setNotes(arr));
      dispatch(toggleLoading());
    } catch (e) {
      dispatch(toggleError());
    }
  }

  // Add a new note in collection "notes"
  async function addNoteHandler(event) {
    try {
      event.preventDefault();
      dispatch(toggleaddNote());
      dispatch(toggleLoading());
      const title = noteTitleRef.current.value;
      const description = noteDescriptionRef.current.value;
      const date = new Date();

      await addDoc(collection(db, "notes"), {
        title,
        description,
        date,
      });

      setRerender(!rerender);
      dispatch(toggleLoading());
    } catch (e) {
      console.log(e);
      dispatch(toggleError());
    }
  }

  // Delete note with specific id
  async function noteDeleteHandler(id) {
    try {
      dispatch(toggleLoading());
      await deleteDoc(doc(db, "notes", id));
      setRerender(!rerender);
      dispatch(toggleLoading());
    } catch (e) {
      dispatch(toggleError());
    }
  }

  useEffect(() => {
    getNotes();
  }, [rerender]);

  return (
    <div className="container p-3">
      <Helmet>
        <title>Notes | Platos Demo App</title>
      </Helmet>
      {error ? (
        <h4 className="text-center my-5">
          Something Went Wrong. Please Try Again.
        </h4>
      ) : (
        <>
          <h1>My Notes</h1>
          <p className="mt-3">Click on New Note button to add new note.</p>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => {
              dispatch(toggleaddNote());
            }}
          >
            <i className="bi bi-plus-lg me-2" />
            New Note
          </button>

          {addNote && (
            <form onSubmit={addNoteHandler}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  ref={noteTitleRef}
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
                  ref={noteDescriptionRef}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Add Note
              </button>
            </form>
          )}

          <hr />

          {loading ? (
            <Loading />
          ) : (
            <div className="d-flex flex-wrap mx-auto">
              {notes.length === 0 && (
                <h6>There is no note present. Please add one.</h6>
              )}
              {notes.map((note) => {
                return (
                  <NoteCard
                    id={note.id}
                    title={note.title}
                    description={note.description}
                    noteDeleteHandler={noteDeleteHandler}
                    key={note.id}
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

export default Notes;
