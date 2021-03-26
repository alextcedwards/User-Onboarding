import Form from "./Form";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as yup from "yup";
import formSchema from "./FormSchema";

const initialFormValues = {
  ///// TEXT INPUTS /////
  name: "",
  email: "",
  password: "",
  ///// CHECKBOXES /////
  termsOfService: "",
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  termsOfService: "",
};

const initialDisabled = true;

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postNewUser = (newUser) => {
    axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormValues(initialFormValues);
  };

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        //happy path
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    };
    postNewUser(newUser);
  };

  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <header className="App-header">
        <Form
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
        <h1>Users</h1>
        {users.map((user, idx) => {
          return (
            <div key={idx}>
              <p>Name: {`${user.first_name} ${user.last_name}`}</p>
              <p>Email: {user.email}</p>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
