import styles from '../styles/Contact.module.css'
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { selectProfile } from '../app/features/profile/profileSlice';
import { selectContact } from '../app/features/user/userSlice'

import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile4 from '../assets/profile4.jpg';
import profile5 from '../assets/profile5.jpg';

function ContactList() {
  const contacts = [
    { id: 1, name: 'Mark Zuckerberg', phoneNumber: '123-456-7890',picture: profile1 },
    { id: 2, name: 'Ray Charles', phoneNumber: '234-567-8901',picture: profile2 },
    { id: 3, name: 'Elon Musk', phoneNumber: '345-678-9012',picture: profile4 },
    { id: 4, name: 'Chris Brown', phoneNumber: '765-978-9002',picture: profile5 },
  ];

  const dispatch = useDispatch()
  const selectedContact = useSelector((state) => state.user.selectedContact)
  
  const handleContactClick = (contact) => {
    dispatch(selectContact(contact))
    dispatch(selectProfile(contact))
  }


  return (
      <div className={styles.contact__list}>
      <div className={styles.contact__search}>
        <input type="text" placeholder='Search' />
      </div>
      <div className={styles.list}>
        <ul>
          {contacts.map((contact) => (
            <li 
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              style={{cursor:'pointer', fontWeight: selectedContact?.id === contact.id ? 'bold' : 'normal'}}>
              <img src={contact.picture} />  
              {contact.name}
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactList;
