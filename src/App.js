import "./reset.css";
import "./App.css";
import Input from "./components/Input";
import Field from "./components/Field";
import Button from "./components/Button";
import React, { useState } from "react";

// regex to validate email
// I had to look it up online, I did not make this on my own
// source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// now this one, ako po gumawa hehe
const validatePassword = (password) => {
  const valid =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8;

  console.log(valid);
  return valid;
};
function App() {
  const [messages, setMessages] = useState({
    name: [],
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check first if fields are all filled up
    const { firstName, lastName, email, password, repeatPassword } = formState;
    const newMessages = {
      name: [],
      email: "",
      password: "",
      repeatPassword: "",
    };
    console.log("Nag s-submit na siya...");
    if (firstName === "") newMessages.name.push("X First name is required");
    if (lastName === "") newMessages.name.push("X Last name is required");
    if (email === "") newMessages.email = "X Email is required";
    else if (!validateEmail(email)) newMessages.email = "X Invalid email";
    if (password === "") newMessages.password = "X Password is required";
    else if (!validatePassword(password))
      newMessages.password =
        "X Password must contain one uppercase letter, one lower case letter, one number, and at least 8 characters long";
    if (repeatPassword === "")
      newMessages.repeatPassword = "X Repeat password is required";
    else if (repeatPassword !== password)
      newMessages.repeatPassword = "X Password must match";

    setMessages({ ...newMessages });
  };
  return (
    <div className="App">
      <h1 className="heading">Sign Up</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <Field
          className="field-2"
          message={
            messages.name.length > 0
              ? messages.name.map((message) => <p>{message}</p>)
              : ""
          }
        >
          <Input
            label="First Name"
            className="bg-grey"
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            className="bg-grey"
            type="Text"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </Field>
        <Field messageType="text-red" message={<p>{messages.email || ""}</p>}>
          <Input
            className="bg-grey"
            label="E-mail"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          messageType="text-red"
          message={<p>{messages.password || ""}</p>}
        >
          <Input
            className="bg-grey"
            label="Password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          messageType="text-red"
          message={<p>{messages.repeatPassword || ""}</p>}
        >
          <Input
            className="bg-grey"
            label="Repeat Password"
            type="password"
            name="repeatPassword"
            value={formState.repeatPassword}
            onChange={handleInputChange}
          />
        </Field>
        <Field>
          <Button type="submit" className="btn btn-block bg-green text-white">
            Sign Up
          </Button>
        </Field>
      </form>
    </div>
  );
}

export default App;
