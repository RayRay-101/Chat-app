import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AddContact.module.css';

function AddContactModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContact = { name, phoneNumber, picture };
      const response = await axios.post('http://localhost:5000/api/contacts', newContact);
      onAdd(response.data);
      onClose(); // Close the modal after adding a contact
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Picture URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;
