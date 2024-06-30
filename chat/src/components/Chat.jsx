import styles from '../styles/Chat.module.css'
import MessageInput from "./MessageInput";


function Chat() {

  
 

  return (
    <div className={styles.chat__container}>
      
      <MessageInput  />

    </div>
  );
}
export default Chat;
