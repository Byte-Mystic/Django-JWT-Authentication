import React, { useState, useEffect, useContext } from "react";
import { IoSaveSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const NotePage = () => {
  let { authTokens, logoutUser } = useContext(AuthContext);
  let api = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, []);

  let getNote = async () => {
    if (id === "new") return;
    let response = await api.get(`/api/notes/${id}`);
    setNote(JSON.parse(response.data));
  };

  let createNote = async () => {
    try {
      let response = await api.post(`/api/notes/`, note);
    } catch (err) {
      console.error("error in creating note: ", err);
    }
  };

  let updateNote = async () => {
    try {
      let response = await api.put(`/api/notes/${id}`, note);
    } catch (err) {
      console.error("Error in Updating Note: ", err);
    }
  };

  let deleteNote = async () => {
    let response = await api.delete(`/api/notes/${id}`);
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
          <button onClick={deleteNote}>
            <FaTrashAlt />
          </button>
        ) : (
          <button onClick={handleSubmit}>
            <IoSaveSharp />
          </button>
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
