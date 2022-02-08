import React, { useState } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const submit = (event) => {
    const user = { firstName, lastName, emailAddress, password };
    console.log(user);

    // history("/", { replace: true });
  };
  const cancel = () => {
    history("/", { replace: true });
  };
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Sign Up"
        elements={() => (
          <React.Fragment>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={change}
              placeholder="First Name"
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={change}
              placeholder="Last Name"
            />
            <input
              id="emailAddress"
              name="emailAddress"
              type="emailAddress"
              value={emailAddress}
              onChange={change}
              placeholder="Email Address"
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
        Already have a user account? <Link to="/sign-in">Click here</Link> to
        sign in!
      </p>
    </div>
  );
};

export default SignUp;
