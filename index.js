import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "TOGGLE_IMPORTANCE": {
      const id = action.data.id;
      const note = state.find((n) => n.id === id);
      const newnote = {
        ...note,
        important: !note.important,
      };
      return state.map((n) => (n.id === id ? newnote : n));
    }
    default:
      return state;
  }
};
const store = createStore(noteReducer);
const generateId = () => (Math.random() * 1000).toFixed(0);

const toggleImportance = (id) => {
  store.dispatch({
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  });
};
const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = " ";
    store.dispatch({
      type: "NEW_NOTE",
      data: {
        content,
        important: true,
        id: generateId(),
      },
    });
    console.log(store.getState());
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />,
  document.getElementById("root")
);
