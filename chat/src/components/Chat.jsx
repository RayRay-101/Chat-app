import styles from '../styles/Chat.module.css'
import { useState } from "react";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([
    { text: 'Hi', isSender: true },
    { text: 'Yoo man', isSender: false }
  ]);

  const addMessages = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
  };

  return (
    <div className={styles.chat__container}>
      <MessageCard messages={messages} />
      <MessageInput addMessages={addMessages} />

    
    </div>
  );
}
export default Chat;
