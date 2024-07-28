import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../app/features/user/userSlice';
import {useNavigate} from 'react-router-dom'
import styles from '../styles/UserProfile.module.css'

function UserProfile () {
  const [username, setUsername] = useState('')
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Logging in:', username);
    if (username.trim()) {
    const user = { id: 1, name: username };
    dispatch(setUser(user));
    navigate('/chat');
    }
  };


  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>WELCOME</h1>

      {currentUser ? (
        <div>
          <p>ID: {currentUser.id}</p>
          <p>Name: {currentUser.name}</p>
          <button onClick={handleLogout}>Logout</button>

        </div>
      ) : (
        <div className={styles.loginBox}>
          <p>No user logged in.</p>
          <form onSubmit={handleLogin}>
            <input 
            type="text"
            placeholder='Enter your name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.loginInput} />
            <button 
            type='submit'
            onClick={handleLogin}
            className={styles.loginButton}>Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
