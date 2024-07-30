import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AddContact.module.css';

function AddContactModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await axios.post('http://localhost:5000/api/contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onAdd(response.data);
      onClose();
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
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;
