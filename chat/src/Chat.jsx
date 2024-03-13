import "./Chat.css";
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

      {/* <div className="chat-header">
                 <h2>//profile pic and name</h2>
             </div>
             <div className="chat-messages">
                 <div className="chat-message-received">
                     <h3>Hi</h3>
                 </div>
                 <div className="chat-message-sent">
                     <h3>Hello</h3>
                 </div>
             </div> */}
    </div>
  );
}
export default Chat;
