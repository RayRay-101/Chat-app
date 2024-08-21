import styles from '../styles/Contact.module.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../app/features/profile/profileSlice';
import { selectContact } from '../app/features/user/userSlice';
import axios from 'axios';
import AddContactModal from './AddContactModal';
import DeleteContactModal from './DeleteContactModal';


function ContactList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showDeleteContact, setShowDeleteContact] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.user.selectedContact);
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/contacts');
        const updatedContacts = await Promise.all(
          data.map(async (contact) => {
            const messageResponse = await axios.get(
              `http://localhost:5000/api/messages/${currentUser.name}/${contact.name}`
            );
            // Get the most recent message
          const sortedMessages = messageResponse.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const lastMessage = sortedMessages[0] || {}; // Get the most recent message
          return {
            ...contact,
            lastMessage: lastMessage.content || '',
            lastMessageTime: lastMessage.timestamp || '',
          };
        })
      );
        setContacts(updatedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
      }
    };
    fetchContacts();
  }, [currentUser]);

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

  const formatTime = (time) => {
    return time ? new Date(time).toLocaleString() : '';
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  

  return (
    <div className={styles.contact__list}>
      <div className={styles.contact__search}>
        <input type="text" placeholder='Search' className={styles.search__input}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} />
        <span className={styles.search__icon}>
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/search.png" alt="Search Icon" />
        </span>
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
          {filteredContacts.map((contact) => (
            <li 
              key={contact._id}
              onClick={() => handleContactClick(contact)}
              style={{ cursor: 'pointer', fontWeight: selectedContact?._id === contact._id ? 'bold' : 'normal' }}
            >
              <img src={`http://localhost:5000${contact.picture}`} alt="Profile" className={styles.profilePicture} />
              
              <div className={styles.contactInfo}>
        <span className={styles.name}>{contact.name}</span>
        <span className={styles.lastMessage}>{contact.lastMessage || ''}</span>
      </div>
      <span className={styles.lastMessageTime}>{formatTime(contact.lastMessageTime)}</span>

              <span onClick={(e) => { 
                  e.stopPropagation(); // Prevent triggering handleContactClick
                  setContactToDelete(contact); 
                  setShowDeleteContact(true); 
                }}>
                <img
                   src="https://img.icons8.com/material-outlined/24/FFFFFF/more.png" alt="more"
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
