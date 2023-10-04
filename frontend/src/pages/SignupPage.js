import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";

const SignupPage = () => {
  let { signupUser } = useContext(AuthContext);
  return (
    <div>
      <form onSubmit={signupUser}>
        <input type="text" name="username" placeholder="Enter Your Username" />
        <input type="email" name="email" placeholder="Enter Your Email" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input
          type="password"
          name="password2"
          placeholder="Enter Password Again"
        />
        <input type="submit" value="Sign Up" />{" "}
      </form>
    </div>
  );
};

export default SignupPage;
