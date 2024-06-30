import "./App.css";

import UserProfile from './components/UserProfile';

import Header from "./components/Header"
import ContactList from "./components/ContactList";
import Chat from "./components/Chat";
import Profile from "./components/Profile";


function App() {
  return (
    <>
      <Header />
      <div className="layout">
        <ContactList />
        <Chat />
        <Profile />
      </div>
      <UserProfile />
    </>
  );
}

export default App;
