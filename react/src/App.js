import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const axiosInstance = axios.create({
  baseURL: 'http://20.22.235.69:3000'
});

function App() {
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const response = await axiosInstance.get('/contacts');
      const { data } = response;
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCurrentContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (isEditMode) {
        await axiosInstance.put(`/contacts/${currentContact.id}`, currentContact);
      } else {
        await axiosInstance.post('/contacts', currentContact);
      }
      fetchContacts();
      closeForm();
    } catch (error) {
      console.error('Error creating/updating contact:', error);
    }
  }

  function openForm(contact) {
    setCurrentContact(contact);
    setIsEditMode(true);
    setIsFormVisible(true);
  }

  function openCreateForm() {
    setCurrentContact({
      id: '',
      name: '',
      email: '',
      phone: ''
    });
    setIsEditMode(false);
    setIsFormVisible(true);
  }

  function closeForm() {
    setIsFormVisible(false);
    setIsEditMode(false);
    setCurrentContact({
      id: '',
      name: '',
      email: '',
      phone: ''
    });
  }

  async function deleteContact(contactId) {
    try {
      await axiosInstance.delete(`/contacts/${contactId}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }

  return (
    <div>
      <h1>Contacts App</h1>
      <button onClick={openCreateForm}>Add</button>

      {isFormVisible && (
        <div className="overlay">
          <div className="form-container">
            <h2>{isEditMode ? 'Edit Contact' : 'Create New Contact'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={currentContact.name} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={currentContact.email} onChange={handleInputChange} required />
              </label>
              <label>
                Phone:
                <input type="tel" name="phone" value={currentContact.phone} onChange={handleInputChange} required />
              </label>
              <div className="buttons">
                <button type="submit">{isEditMode ? 'Save' : 'Create'}</button>
                <button type="button" onClick={closeForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => openForm(contact)}>Edit</button>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
