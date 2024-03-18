import './Chat.css'
import { useState } from "react";
import MessageList from "./MessageList";
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
    <div className="chat-container">
      <MessageList messages={messages} />
      <MessageInput addMessages={addMessages} />

    
    </div>
  );
}
export default Chat;
