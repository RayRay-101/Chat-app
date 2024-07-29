import styles from '../styles/Contact.module.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../app/features/profile/profileSlice';
import { selectContact } from '../app/features/user/userSlice';
import axios from 'axios';
import AddContactModal from './AddContactModal';
import DeleteContactModal from './DeleteContactModal';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.user.selectedContact);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contacts');
        setContacts(response.data || []);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
      }
    };

    fetchContacts();
  }, []);

  const handleContactClick = (contact) => {
    dispatch(selectContact(contact));
    dispatch(selectProfile(contact));
  };

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDeleteContact = async () => {
    if (contactToDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/contacts/${contactToDelete._id}`);
        if (response.status === 200) {
          setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== contactToDelete._id));
          setShowDeleteContact(false);
          setContactToDelete(null);
        } else {
          console.error('Error deleting contact:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }

  return (
    <div className={styles.contact__list}>
      <div className={styles.contact__search}>
        <input type="text" placeholder='Search' />
        <button className={styles.addButton} onClick={() => setShowAddContact(true)}>+</button>
      </div>
      <div className={styles.list}>
        {showAddContact && (
          <AddContactModal 
            onAdd={handleAddContact} 
            onClose={() => setShowAddContact(false)} 
          />
        )}

        {showDeleteContact && (
          <DeleteContactModal 
            contact={contactToDelete}
            onDelete={handleDeleteContact}
            onClose={() => setShowDeleteContact(false)}
          />
        )}
        <ul>
          {contacts.map((contact) => (
            <li 
              key={contact._id}
              onClick={() => handleContactClick(contact)}
              style={{ cursor: 'pointer', fontWeight: selectedContact?._id === contact._id ? 'bold' : 'normal' }}
            >
              <img src={contact.picture} alt={contact.name} />  
              <span className={styles.name}>{contact.name}</span>
              <span onClick={(e) => { 
                  e.stopPropagation(); // Prevent triggering handleContactClick
                  setContactToDelete(contact); 
                  setShowDeleteContact(true); 
                }}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/ellipsis.png"
                  alt="ellipsis"
                  className={styles.ellipses}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactList;
