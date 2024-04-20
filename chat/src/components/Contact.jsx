import styles from '../styles/Contact.module.css'
import React from 'react';
import Profile2 from "../assets/profile1.jpg"


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
          <img src={Profile2}  />
          {contact.name}
        </li>
          <hr /></>
      ))}
    </div>
  );
}

export default Contact;
