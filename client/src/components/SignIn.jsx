import React, { useState, useContext } from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const SignIn = () => {
  const context = useContext(CourseManagerContext);
  let history = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * DESCRIPTION: LIVE FORM INPUT FIELD UPDATE AND STORAGE.
   * Takes user input from the form fields in the form of an event object. Allows for the dynamic extraction and manipulation of event.target.value input fields.
   *
   * @param {object} event - the data stored in the input field
   *
   * The event.target.name value (the name of the input field) is used to determine and update the corresponding state fields via the useState() hook.
   *
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
   * Dynamically fetches and stores user credentials in an object to use in the createUser function call.
   */
  // const submit = () => {
  //   console.log(
  //     `Submit function in SignIn page is sending credentials for authentication. Email: (${emailAddress}), Password: (${password})`
  //   );
  //   context.actions
  //     .signIn(emailAddress, password)
  //     .then((errors) => {
  //       if (errors.length) {
  //         console.log("Submit function in SignIn page has error length .");
  //         setErrors(errors);
  //       } else {
  //         console.log("Submit function in SignIn page has no errors.");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(`An error occurred during login`, err);
  //       // history("/error", { replace: true });
  //     });
  // };

  // NEW FIX
  const submit = () => {
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsuccesful"]);
        } else {
          console.log("Sign-in was successful");
          history("/authenticated", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        Don't have a user account? <Link to="/signup">Click here</Link> to sign
        up!
      </p>
    </div>
  );
};

export default SignIn;
