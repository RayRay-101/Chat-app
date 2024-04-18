import "./App.css";

import Header from "./components/Header"
import Contact from "./components/Contact";
import Chat from "./components/Chat";
import Profile from "./components/Profile";


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
