import React from "react";

/**
 * Renders a dynamic <Form> component with custom event handling defined within an associated parent component.
 * @param {*} props - custom form props provided in parent component.
 * @returns
 */
const Form = (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit" onClick={handleSubmit}>
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Functionality to display errors within the Form component, above the form body.
 * @param {object} errors - an object containing validation errors created during form submission.
 * @returns {function} a stateless functional react component listing validation errors
 */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
}

export default Form;
