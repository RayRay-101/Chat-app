
import styles from "../styles/MessageCard.module.css";

function MessageList({ messages }) {
  return (
    <div className={styles}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={` ${styles.msg} `}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
export default MessageList;
