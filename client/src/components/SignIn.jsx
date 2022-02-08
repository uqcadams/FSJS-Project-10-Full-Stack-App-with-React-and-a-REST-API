import React, { useState } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  let history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const submit = () => {
    history("/", { replace: true });
  };
  const cancel = () => {
    history("/", { replace: true });
  };
  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Sign In"
        elements={() => (
          <React.Fragment>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={change}
              placeholder="Email"
            />
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={change}
              placeholder="Password"
            />
          </React.Fragment>
        )}
      />

      <p>
        Don't have a user account? <Link to="/sign-up">Click here</Link> to sign
        up!
      </p>
    </div>
  );
};

export default SignIn;
