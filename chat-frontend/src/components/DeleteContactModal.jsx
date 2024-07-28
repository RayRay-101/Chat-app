import React from 'react';
import styles from '../styles/DeleteContact.module.css';

function DeleteContactModal({ contact, onDelete, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <p>Are you sure you want to delete {contact.name}?</p>
        <button className={styles.button} onClick={onDelete}>Delete</button>
        <button className={styles.button} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteContactModal;
