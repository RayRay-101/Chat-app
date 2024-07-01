import styles from '../styles/MessageInput.module.css'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../app/features/chat/chatSlice';

function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const messages = useSelector((state) => state.chat.messages)
  const currentUser = useSelector((state) => state.user.currentUser)
  const selectedContact = useSelector((state) => state.user.selectedContact)
  const dispatch = useDispatch()



  const handleSendMessage = () => {
    if (!selectedContact || !currentUser) {
      console.log("No contact selected or current user not set");
      return
  }

    const message = {
      content: inputValue,
      sender: currentUser.name,
      receiver: selectedContact.name,
      timestamp: new Date().toISOString(),
    }
    dispatch(addMessage(message))
    setInputValue('')
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      handleSendMessage()
    }
  };

  return (
    <div className={styles.chat__input}>
      {selectedContact ? (
        <div>
        <h2>Chat with {selectedContact.name}</h2>
      <ul>
          {messages
          .filter((msg) => 
          (msg.receiver === selectedContact.name && msg.sender === currentUser.name) || 
          (msg.receiver === currentUser.name && msg.sender === selectedContact.name))
          .map((msg, index) => (
            <li
              key={index}
              className={` ${styles.msg} `}
            >
              {msg.content} {/* {msg.sender}:  ({new Date(msg.timestamp).toLocaleTimeString()}) */}
            </li>
        ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        </div>
      ):(
        <p>Please select a Chat</p>
      )}
      </div>
  );
}
export default MessageInput;
