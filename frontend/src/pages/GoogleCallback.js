import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";

const GoogleCallback = () => {
  let { setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const clientId =
    "534552463083-bu6k1l16c9tbjh6u71eture9lkojt5ni.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/v1/users/login/google/callback/";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const formData = new FormData();
    formData.append("code", code);
    formData.append("clientId", clientId);
    formData.append("redirectUri", redirectUri);

    axios
      .post("http://127.0.0.1:8000/api/auth/google/", formData)
      .then((response) => {
        localStorage.setItem("authTokens", JSON.stringify(response.data.token));
        setUser(jwt_decode(response.data.token.access));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <div>YOU ARE SIGN WITH GOOGLE</div>;
};

export default GoogleCallback;
