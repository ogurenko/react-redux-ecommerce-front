import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  // We have access to redux
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForSignIn"));
  }, [history]);

  // history when user logged in we redirect him wherevere we want
  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("Email and password is required");

      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      // console.log("RESULT", result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForSignIn");

        let user = auth.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        console.log("user", user, "IdTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        history.push("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={handleChange}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div>
      <div className="container p-5">
        {/* 12 columns */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register Complete</h4>
            {completeRegistrationForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
