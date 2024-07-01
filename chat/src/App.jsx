import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from './components/UserProfile';
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

import './App.css'
function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div >
        <Header />
        <Routes>
          <Route
            path="/userprofile"
            element={<UserProfile />}
          />
          <Route
            path="/chat"
            element={currentUser ? (
              <div className='layout'>
                  <ContactList />
                  <Chat />
                  <Profile />
              </div>
            ) : (
              <Navigate to="/userprofile" />
            )}
          />
          <Route path="*" element={<Navigate to="/userprofile" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
