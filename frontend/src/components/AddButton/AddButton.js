import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import "../../pages/Notes.css";
import "./AddButton.css";
import { GrAdd } from "react-icons/gr";

const AddButton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <GrAdd />
    </Link>
  );
};

export default AddButton;
