import styles from '../styles/MessageInput.module.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../app/features/chat/chatSlice';
import io from 'socket.io-client'

const socket = io('http://localhost:5000');

function MessageInput({own}) {
  const [inputValue, setInputValue] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedContact = useSelector((state) => state.user.selectedContact);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('receivemessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('receivemessage');
    };
    }, [dispatch]);


  const handleSendMessage = () => {
    if (!selectedContact || !currentUser) {
      console.log("No contact selected or current user not set");
      return;
    }

    const message = {
      content: inputValue,
      sender: currentUser.name,
      receiver: selectedContact.name,
      timestamp: new Date().toISOString(),
    };
    
    socket.emit('sendMessage', message);
    // dispatch(addMessage(message));
    setInputValue('')
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  return (
    <>
      <div className={styles.chat__status}>
        <p>{selectedContact ? `${selectedContact.name} is typing...` : ''}</p>
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
                    className={` ${styles.msg} `}>
                    <div className={styles.messageContent}>
                      {msg.content}
                    </div>
                    <div className={styles.messageHeader}>
                      <img src={selectedContact.picture} alt="Profile" className={styles.profilePicture} />
                      <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
                    </div>
                  </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                type="search"
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
