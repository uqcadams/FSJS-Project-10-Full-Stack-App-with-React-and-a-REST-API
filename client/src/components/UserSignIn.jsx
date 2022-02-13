import React, { useState, useContext } from "react";
import Form from "./Form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const SignIn = () => {
  const context = useContext(CourseManagerContext);
  let history = useNavigate();

  // State management
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * DESCRIPTION: LIVE FORM INPUT FIELD UPDATE AND STORAGE.
   * Takes user input from the form fields in the form of an event object. Allows for the dynamic extraction and manipulation of event.target.value input fields.
   * @param {object} event - the data stored in the input field
   * The event.target.name value (the name of the input field) is used to determine and update the corresponding state fields via the useState() hook.
   * @returns updated state for the target field.
   */
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
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
   * Calls the global sign in function to authenticate user credentials and update global authentication state.
   */
  const submit = () => {
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors([
            `Sign in was not successful. Please check your credentials and try again.`,
          ]);
        } else {
          console.log(
            `[UserSignIn.jsx]: Sign in was successful for user ${emailAddress}.`
          );
          history("/authenticated", { replace: true });
        }
      })
      .catch((err) => {
        console.error(
          `[UserSignIn.jsx]: An error has occurred while attempting to sign in user "${emailAddress}" with signIn(...). Error: `,
          err
        );
      });
  };

  /**
   * Cancels sign in and redirects the user to the homepage.
   */
  const cancel = () => {
    history("/", { replace: true });
  };

  return (
    <React.Fragment>
      {context.auth ? (
        <Navigate to="/" />
      ) : (
        <div className="form--centered main">
          <h2>Sign In</h2>

          <Form
            cancel={cancel}
            submit={submit}
            errors={errors}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label>
                  Email Address
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
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

          <p className="authentication--link">
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default SignIn;
