import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Register = ({history}) => {
  const [email, setEmail] = useState("");

  // access the state
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete yuor registration `
    );

    window.localStorage.setItem("emailForSignIn", email);
    setEmail("");
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={handleChange}
        placeholder="Your email"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div>
      <div className="container p-5">
        {/* 12 columns */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            <ToastContainer />
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
