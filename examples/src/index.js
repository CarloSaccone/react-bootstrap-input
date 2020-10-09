/***  examples/src/index.js ***/
import React, { useState, useReducer } from "react";
import { render } from "react-dom";

import { SimpleInput, validationReducer } from "../../src/index";
import JSONPretty from "react-json-pretty";
import "./app.css";

const App = () => {
  const [form, setform] = useState({ percent: 0.5 });
  const [show, setshow] = useState({});

  const [validation, setvalidation] = useReducer(validationReducer, {});

  const filterChange = (formObj) => {
    setform(formObj);
  };
  const validationChange = (field) => {
    setvalidation(field);
  };

  const setValue = () => {
    setform({ name: "John", email: "john@doe.com", salary: "50000" });
  };
  const resetValue = () => {
    setform({});
  };

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://carlosaccone.github.io/react-bootstrap-input/main.1e04e9ee7b8d321bec73.css"
        crossOrigin="anonymous"
      />
      <header className="App-header">
        <div className="container">
          <h1 className="pt-5">react-bootstrap-input</h1>
          <p>try to change form data using input fields or buttons</p>
          <div className="my-5">
            <div className="row">
              <div className="col">
                <SimpleInput
                  formObj={form}
                  type="date"
                  name="birthday"
                  placeholder="Birthday (dd/MM/yyyy)"
                  onChange={filterChange}
                  onValidationChange={validationChange}
                  pattern={
                    "^(0[1-9]|[12][0-9]|[3][01])/(0[1-9]|1[012])/[1-2]{1}[0-9]{3}$"
                  }
                  required
                  validated
                  errorMessage="Please provide a valid date (dd/MM/yyyy)"
                />
              </div>
              <div className="col">
                <SimpleInput
                  formObj={form}
                  name="email"
                  placeholder="Your email"
                  onChange={filterChange}
                  onValidationChange={validationChange}
                  required
                  validated
                  autoFocus
                  pattern={
                    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                  }
                  errorMessage="Please provide a valid email address"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <SimpleInput
                  formObj={form}
                  type="money"
                  name="salary"
                  placeholder="Desired salary"
                  onChange={filterChange}
                />
              </div>
              <div className="col">
                <SimpleInput
                  formObj={form}
                  type="number"
                  name="number"
                  placeholder="Just a number"
                  onChange={filterChange}
                />
              </div>
              <div className="col">
                <SimpleInput
                  formObj={form}
                  type="percent1"
                  name="percent"
                  placeholder="Just a percent"
                  onChange={filterChange}
                />
              </div>
              <div className="col">
                {show && (
                  <SimpleInput
                    formObj={form}
                    name="name"
                    placeholder="Your name"
                    onChange={filterChange}
                    onValidationChange={validationChange}
                    required
                    validated
                  />
                )}
                <button type="button" onClick={() => setshow(!show)}>
                  show/hide field
                </button>
              </div>
            </div>
          </div>
          <p>form content is:</p>
          <div className="box">
            <JSONPretty id="json-pretty" data={form}></JSONPretty>
          </div>
          <p>form validation is:</p>
          <div className="box">
            <JSONPretty id="json-pretty" data={validation}></JSONPretty>
          </div>
          <div className="py-5">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                onClick={setValue}
                className="btn btn-primary "
              >
                Set value
              </button>
              <button
                type="button"
                onClick={resetValue}
                className="btn btn-secondary "
              >
                Reset to empty
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
render(<App />, document.getElementById("root"));
