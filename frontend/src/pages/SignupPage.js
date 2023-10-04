import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import transition from "../transition";
import { motion } from "framer-motion";

const SignupPage = () => {
  let { signupUser } = useContext(AuthContext);
  return (
    <div className="signupBox">
      <form onSubmit={signupUser}>
        <input type="text" name="username" placeholder="Enter Your Username" />
        <input type="email" name="email" placeholder="Enter Your Email" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input
          type="password"
          name="password2"
          placeholder="Enter Password Again"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="login-button"
          onClick={() => signupUser}
        >
          Login
        </motion.button>
      </form>
    </div>
  );
};

export default transition(SignupPage);
