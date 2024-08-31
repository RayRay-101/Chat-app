import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../app/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function Login() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Regular expression to validate the phone number (international format or digits only)
    const phoneRegex = /^\d{1,14}$/;
    return phoneRegex.test(sanitizedPhoneNumber);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phone)) {
      setPhoneError('Invalid phone number. It must be in international format and no more than 14 digits.');
      return;
    }

    setPhoneError(''); // Clear any previous error

    if (username.trim() && phone.trim()) {
      const formData = new FormData();
      formData.append('name', username);
      formData.append('phone', phone);
      if (profilePicture) {
        formData.append('picture', profilePicture);
      }

      try {
        const response = await axios.post(`${backendUrl}/api/users/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const user = response.data;
        dispatch(setUser(user));
        navigate('/chat');
      } catch (error) {
        console.error('Error registering user:', error);
      }
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
          {currentUser.picture && (
            <img
              src={`${backendUrl}/api/users/images/${currentUser.picture}`}
              alt="Profile"
              className={styles.profilePicture}
            />
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className={styles.loginBox}>
          <p>No user logged in.</p>
          <form onSubmit={handleLogin} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Enter your name"
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
            {phoneError && <p className={styles.errorText}>{phoneError}</p>}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className={styles.loginInput}
              required
            />
            <button type="submit" className={styles.loginButton}>
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
