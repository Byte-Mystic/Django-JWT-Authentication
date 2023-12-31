import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import AuthContext from "../context/AuthContext";

const NotePage = () => {
  let { authTokens, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);
  console.log("NOTE", note);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let res = await fetch(`http://127.0.0.1:8000/api/notes/${id}`);
    let data = await res.json();
    setNote(JSON.parse(data));
  };

  let createNote = async () => {
    fetch("http://127.0.0.1:8000/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(note),
    });
  };
  let updateNote = async () => {
    fetch(`http:127.0.0.1:8000/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    let res = await fetch(`http:127.0.0.1:8000/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/notes");
  };

  let handleSubmit = () => {
    console.log(note);
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    navigate("/notes");
  };
  let handleChange = (value) => {
    setNote({ ...note, body: value });
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
