import styles from '../styles/MessageInput.module.css'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../app/features/chat/chatSlice';
import { current } from '@reduxjs/toolkit';

function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const messages = useSelector((state) => state.chat.messages)
  const currentUser = useSelector((state) => state.user.currentUser)
  const selectedContact = useSelector((state) => state.user.selectedContact)
  const dispatch = useDispatch()



  const handleSendMessage = () => {

    if (!selectedContact) return

    const message = {
      content: input,
      sender: currentUser.name,
      receiver: selectedContact.name,
      timestamp: new Date().toISOString(),
    }
    dispatch(addMessage(message))
    setInputValue('')
}

  // const handleSubmit = () => {
  //   e.preventDefault();
  //   if (inputValue.trim() !== "") {
  //   }
  // };


  return (
    <div className={styles.chat__input}>
      {selectedContact ? (
        <div>
        <h2>Chat with {selectedContact.name}</h2>
      <ul>
          {messages
          .filter((msg) => (msg.receiver === selectedContact.name && msg.sender === currentUser.name) || (msg.receiver === currentUser.name && msg.sender === selectedContact.name))
          .map((msg, index) => (
            <li
              key={index}
              className={` ${styles.msg} `}
            >
              {msg.sender}: {msg.content} ({msg.timestamp})
            </li>
        ))}
        </ul>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleSendMessage}>Send</button>
        </div>
      ):(
        <p>Please select a Chat</p>
      )}
      </div>
  );
}
export default MessageInput;
