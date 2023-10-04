import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import transition from "../transition";
import { motion } from "framer-motion";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="loginBox">
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Your Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="login-button"
          onClick={() => loginUser}
        >
          Login
        </motion.button>
      </form>
    </div>
  );
};

export default transition(LoginPage);
