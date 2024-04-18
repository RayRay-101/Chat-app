import styles from '../styles/MessageInput.module.css'

import { useState } from "react";

function MessageInput({ addMessages }) {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addMessages(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.chat__input}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInput}
        />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
export default MessageInput;
