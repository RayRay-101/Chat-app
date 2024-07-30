import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import ContactList from "./components/ContactList";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

import './App.css'
function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div >
        <Routes>
          <Route
            path="/login"
            element={<Login />}
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
              <Navigate to="/login" />
            )}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
