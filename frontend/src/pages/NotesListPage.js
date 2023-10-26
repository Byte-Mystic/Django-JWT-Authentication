import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import transition from "../transition";
import { AddButton, ListItem } from "../components";
import "./Notes.css";
import useAxios from "../utils/useAxios";

const NotesListPage = () => {
  let [loading, setLoading] = useState(true);
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  let api = useAxios();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      let response = await api.get(`/api/notes/`);
      console.log(response);
      if (response.status === 200) {
        let parsedData = response.data.map((item) => JSON.parse(item));
        setNotes(parsedData);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">
          &#9782; Notes
          <p className="notes-count">{notes.length}</p>
        </h2>
      </div>
      {loading ? (
        <div className="loading-screen">
          {/* Loading SCREEn */}
          Loading...
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note, index) => (
            <ListItem key={index} note={note} />
          ))}
        </div>
      )}
      <AddButton />
    </div>
  );
};

export default transition(NotesListPage);
