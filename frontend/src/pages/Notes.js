import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import transition from "../transition";
import AddButton from "../components/AddButton";
import "./Notes.css";

const Notes = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/api/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Welcome To Your Notes!</h2>
      <ul className="todo-list">
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
      <AddButton />
    </div>
  );
};

export default transition(Notes);
