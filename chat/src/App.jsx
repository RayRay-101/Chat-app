import "./App.css";

import Header from "./Header"
import Contact from "./Contact";
import Chat from "./Chat";
import Profile from "./Profile";

function App() {
  return (
    <>
      <Header />
      <div className="layout">
        <Contact />
        <Chat />
        <Profile />
      </div>
    </>
  );
}

export default App;
