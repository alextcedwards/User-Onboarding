import React from "react";

export default function userForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <div className="form-user-submit">
        <h2>Add A User</h2>

        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.termsOfService}</div>
        </div>
      </div>
      <div className="form-user inputs">
        <h4>General information</h4>

        {/* ////////// TEXT INPUTS ////////// */}
        {/* ////////// TEXT INPUTS ////////// */}
        {/* ////////// TEXT INPUTS ////////// */}
        <label>
          Name
          <input
            value={values.name}
            onChange={onChange}
            name="name"
            type="text"
          />
        </label>
        <div>
          <label>
            Email
            <input
              value={values.email}
              onChange={onChange}
              name="email"
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              value={values.password}
              onChange={onChange}
              name="password"
              type="password"
            />
          </label>
        </div>
        {/* ////////// CHECKBOXES ////////// */}
        <label>
          Terms Of Service
          <input
            type="checkbox"
            name="termsOfService"
            onChange={onChange}
            checked={values.termsOfService}
          />
        </label>
        <div>
          <button id="button" disabled={disabled}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}



