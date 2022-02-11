import React, { useState, useContext } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

/**
 * "Sign Up" - React stateful functional component.
 * @returns {function} Stateful functional component
 */
const SignUp = () => {
  let history = useNavigate();
  const context = useContext(CourseManagerContext);

  // State management
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * Form input handler. Matches user input value with named input fields, and dynamically updates local state to be used for form submission.
   * @param {*} event - user input within individual form fields.
   * @returns updated local state values.
   */
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

  /**
   * Signup form submission handler. Stores form input fields in request body to be passed to the REST API.
   */
  const submit = () => {
    const user = { firstName, lastName, emailAddress, password };
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions
            .signIn(emailAddress, password)
            .then((user) => {
              if (user === null) {
                setErrors([
                  "[UserSignUp.jsx] reported sign-in as UNSUCCESSFUL",
                ]);
              } else {
                console.log(
                  `User "${emailAddress}" has successfully logged in.`
                );
                history("/authenticated", { replace: true });
              }
            })
            .catch((err) => {
              console.error(
                `[UserSignUp.jsx]: An error occurred while attempting to log new user ${emailAddress} into the system.`,
                err
              );
            });
        }
      })
      .catch((err) => {
        console.error(
          `[UserSignUp.jsx]: An error occurred while attempting to sign up new user ${emailAddress}.`,
          err
        );
        history("/error", { replace: true });
      });
  };

  /**
   * Cancels the user sign-up attempt and redirects the user to the home (course list) page.
   */
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
            <label>
              First Name
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={change}
                placeholder="First Name"
              />
            </label>
            <label>
              Last Name
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={change}
                placeholder="Last Name"
              />
            </label>
            <label>
              Email Address
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                autoComplete="username"
                value={emailAddress}
                onChange={change}
                placeholder="Email Address"
              />
            </label>
            <label>
              Password
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={change}
                placeholder="Password"
              />
            </label>
          </React.Fragment>
        )}
      />

      <p>
        Already have a user account? <Link to="/signin">Click here</Link> to
        sign in!
      </p>
    </div>
  );
};

export default SignUp;
