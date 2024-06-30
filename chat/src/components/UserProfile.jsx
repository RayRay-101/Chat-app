// components/UserProfile.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../app/features/user/userSlice';

function UserProfile () {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = { id: 1, name: 'John Doe' };
    dispatch(setUser(user));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>User Profile</h1>
      {currentUser ? (
        <div>
          <p>ID: {currentUser.id}</p>
          <p>Name: {currentUser.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>No user logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
