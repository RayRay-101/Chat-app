import styles from '../styles/Contact.module.css'

import React from 'react';

function Contact() {
  const contacts = [
    { id: 1, name: 'Pill' },
    { id: 2, name: 'Man' },
    { id: 3, name: 'Boy' },
    { id: 4, name: 'Kid' },
  ];

  return (
    <div className={styles.contact__list}>
      {contacts.map(contact => (
        <><li key={contact.id}>
          {contact.name}
        </li>
          <hr /></>
      ))}
    </div>
  );
}

export default Contact;
