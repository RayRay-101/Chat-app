import styles from '../styles/MessageInput.module.css';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setMessages } from '../app/features/chat/chatSlice'; // Ensure setMessages is defined
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedContact = useSelector((state) => state.user.selectedContact);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedContact && currentUser) {
      axios.get(`http://localhost:5000/api/messages/${currentUser.name}/${selectedContact.name}`)
        .then(response => {
          const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          dispatch(setMessages(sortedMessages));
        })
        
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedContact, currentUser, dispatch]);

  useEffect(() => {
    socket.on('receivemessage', (message) => {
      dispatch(addMessage(message));
      scrollToBottom();   
    });

    socket.on('typing', (data) => {
      if (data.sender === selectedContact?.name) {
        setIsTyping(true);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    });

    return () => {
      socket.off('receivemessage');
      socket.off('typing');
    };
  }, [dispatch, selectedContact]);

  const handleSendMessage = () => {
    if (!selectedContact || !currentUser) {
      console.log("No contact selected or current user not set");
      return;
    }

    const message = {
      id: `${Date.now()}-${Math.random()}`,
      content: inputValue,
      sender: currentUser.name,
      receiver: selectedContact.name,
      timestamp: new Date().toISOString(),
    };

    console.log('Sending message:', message);
    // dispatch(addMessage(message));
    socket.emit('sendMessage', message);
    setInputValue('');
    socket.emit('typing', { sender: currentUser.name, typing: false });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    socket.emit('typing', { sender: currentUser.name, typing: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      handleSendMessage();
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.chat__status}>
        {isTyping ? (
          <p className={styles.typingIndicator}>typing...</p>
        ) : (
          selectedContact && (
            <p>
              <img src={`http://localhost:5000${selectedContact.picture}`} alt="Profile" className={styles.profilePicture} />
            </p>
          )
        )}
        <span>⭐</span>
        <span><img src="call.png" alt="call button" /></span>
      </div>
      <div className={styles.chat__input}>
        {selectedContact ? (
          <div>
            <ul>
              {messages
                .filter((msg) =>
                  (msg.receiver === selectedContact.name && msg.sender === currentUser.name) ||
                  (msg.receiver === currentUser.name && msg.sender === selectedContact.name))
                .map((msg, index) => (
                  <li
                    key={index}
                    className={`${styles.msg} ${msg.sender === currentUser.name ? styles.sent : styles.received}`}
                  >
                    {msg.sender === currentUser.name ? (
                      <>
                        <div className={styles.messageContent}>
                          {msg.content}
                        </div>
                        <div className={styles.messageHeader}>
                          <img src={`http://localhost:5000${currentUser.picture}`} alt="Profile" className={styles.profilePicture} />
                          <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.messageHeader}>
                          <img src={`http://localhost:5000${selectedContact.picture}`} alt="Profile" className={styles.profilePicture} />
                          <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
                        </div>
                        <div className={styles.messageContent}>
                          {msg.content}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              <div ref={messagesEndRef} />
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit">
                <img src="send.png" alt="send" />
              </button>
            </form>
          </div>
        ) : (
          <p>Please select a Chat</p>
        )}
      </div>
    </>
  );
}

export default MessageInput;
