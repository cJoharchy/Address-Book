import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css';


export default function App() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [contacts, setContacts] = useState([]);

  const addContact = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone} = contact;
    const formValid =
      firstName &&
      lastName &&
      /^\S+@\S+\.\S+$/.test(
        email
      ) &&
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-s.]{0,1}[0-9]{3}[-s.]{0,1}[0-9]{4}$/.test(
        phone
      );
    if (!formValid) {
      return;
    }
    setContacts((contacts) => [
      ...contacts,
      { id: uuidv4(), firstName, lastName, email, phone }
    ]);
  };

  const deleteContact = (index) => {
    setContacts((contacts) => contacts.filter((_, i) => i !== index));
  };

  const editContact = (index) => {
    setContacts((contacts) => contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <form onSubmit={addContact}>
        <div>
          <label>First Name </label>
          <input
            value={contact.firstName}
            onChange={(e) =>
              setContact((contact) => ({ ...contact, firstName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Last Name </label>
          <input
            value={contact.lastName}
            onChange={(e) =>
              setContact((contact) => ({ ...contact, lastName: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Email </label>
          <input
            value={contact.email}
            onChange={(e) =>
              setContact((contact) => ({ ...contact, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Phone </label>
          <input
            value={contact.phone}
            onChange={(e) =>
              setContact((contact) => ({ ...contact, phone: e.target.value }))
            }
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {contacts.map((contact, index) => {
        return (
          <div key={contact.id}>
            <p>First Name : {contact.firstName}</p>
            <p>Last Name : {contact.lastName}</p>
            <p>Email : {contact.email}</p>
            <p>Phone : {contact.phone}</p>
            <button type="button" onClick={() => deleteContact(index)}>
              Delete
            </button>
            <button type="button" onClick={() => editContact(index)}>
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}
