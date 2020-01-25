import React, { useState } from "react";
import { SimpleInput } from "react-bootstrap-input";

import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import List from "./List";
import "./styles.css";

const contacts = require("./list.json");

export default function App() {
  const [contactsFiltered, setContactsFiltered] = useState(contacts);
  const [filterName, setfilterName] = useState({});
  const [filterEmail, setFilterEmail] = useState({});

  const filterContacts = (key = "name", filterValue = "") => {
    if (!isEmpty(filterValue)) {
      const filtered = contactsFiltered.filter(contact => {
        return (
          contact[key].toLowerCase().indexOf(filterValue.toLowerCase()) > -1
        );
      });
      setContactsFiltered(filtered);
    } else {
      setContactsFiltered(contacts);
    }
  };

  const orderContacts = (order = "name") => {
    const ordered = sortBy(contactsFiltered, contact => {
      return contact[order];
    });
    setContactsFiltered(ordered);
  };

  const filterNameChange = updatedItem => {
    filterContacts("name", updatedItem.filterName);
    setfilterName(updatedItem);
  };

  const filterEmailChange = updatedItem => {
    filterContacts("email", updatedItem.filterEmail);
    setFilterEmail(updatedItem);
  };

  return (
    <div className="App col-md-9 col-xl-8 py-md-3 pl-md-5">
      <form className="filters">
        <legend>Contacts</legend>
        <div className="form-group">
          <SimpleInput
            formObj={filterName}
            name="filterName"
            placeholder="Filter by name"
            onChange={filterNameChange}
            required={false}
            validated
          />
        </div>
        <div className="form-group">
          <SimpleInput
            formObj={filterEmail}
            name="filterEmail"
            placeholder="Filter by email"
            onChange={filterEmailChange}
            required={false}
            validated
            pattern={
              "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            }
            errorMessage="Please provide a valid email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderBy">Order by</label>
          <select
            className="form-control"
            name="orderBy"
            onChange={evt => {
              orderContacts(evt.target.value);
            }}
          >
            <option value="name">name</option>
            <option value="salary">salary</option>
          </select>
        </div>
      </form>
      <List items={contactsFiltered} />
    </div>
  );
}
