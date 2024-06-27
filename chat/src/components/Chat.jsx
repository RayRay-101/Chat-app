import styles from '../styles/Chat.module.css'
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";

import { useSelector,useDispatch } from 'react-redux';
import { addMessage } from '../app/features/chat/chatSlice';


function Chat() {

  const messages = useSelector((state) => state.chat.messages)
  const  dispatch = useDispatch()

  const addMessages = (message) => {
    dispatch(addMessage(message))
  };

  return (
    <div className={styles.chat__container}>
      <MessageCard messages={messages} />
      <MessageInput addMessages={addMessages} />

    </div>
  );
}
export default Chat;
