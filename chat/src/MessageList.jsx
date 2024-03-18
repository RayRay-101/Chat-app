import styles from "./styles/MessageCard.module.css";

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
          !message.isSender ? styles.receiver : ""
          }`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}
export default MessageList;
