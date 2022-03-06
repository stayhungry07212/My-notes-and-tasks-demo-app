import { configureStore, createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    addNote: false,
    loading: false,
    error: false,
  },
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    toggleError: (state) => {
      state.error = !state.error;
    },
    toggleaddNote: (state) => {
      state.addNote = !state.addNote;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { toggleLoading, toggleError, toggleaddNote, setNotes } =
  notesSlice.actions;

export default configureStore({
  reducer: { notes: notesSlice.reducer },
});
