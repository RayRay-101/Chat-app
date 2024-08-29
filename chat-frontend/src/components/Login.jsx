import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../app/features/user/userSlice';
import {useNavigate} from 'react-router-dom'
import styles from '../styles/Login.module.css'
import axios from 'axios';


function Login () {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [profilePicture, setProfilePicture] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Logging in:', username);
    if (username.trim() && phone.trim()) {
      const formData = new FormData();
      formData.append('name', username);
      formData.append('phone', phone);
      if (profilePicture) {
        formData.append('picture', profilePicture);
      }
  
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        const user = response.data;
    dispatch(setUser(user));
    navigate('/chat');
    } catch (error) {
      console.error('Error registering user:', error);
  };
    }
  }

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
          {currentUser.picture && (
            <img
              src={`http://localhost:5000/api/users/images/${currentUser.picture}`}
              alt="Profile"
              className={styles.profilePicture}
            />
          )}
          <button onClick={handleLogout}>Logout</button>

        </div>
      ) : (
        <div className={styles.loginBox}>
          <p>No user logged in.</p>
          <form onSubmit={handleLogin} 
          encType="multipart/form-data">
            <input 
            type="text"
            placeholder='Enter your name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.loginInput} 
            required
            />
             <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.loginInput}
            required
          />
          <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className={styles.loginInput}
              required
            />
          <button 
            type='submit'
            className={styles.loginButton}>Enter</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;