
import './Chat.css'

function Chat(){
    return(
        <div className="chat-container">
            <div className="chat-header">
                <h2>CHAT</h2>
            </div>
            <div className="chat-messages">
                <div className="chat-message-received">
                    <h3>Hi</h3>
                </div>
                <div className="chat-message-sent">
                    <h3>Hello</h3>
                </div>
            </div>

            <div className="chat-input">
                <input type="text" placeholder="Type a message..."/>
                <button>Send</button>
            </div>

        </div>
    )
}
export default Chat