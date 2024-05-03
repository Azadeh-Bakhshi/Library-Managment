import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LibrarianDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div>
      <h2>Librarian Dashboard </h2>
      {username && <p>Welcome, {username}!</p>}
      <Link to="/librarianprofile">Profile</Link>
      <Link to="/bookregistration">Book Registration</Link>
      <Link to="/bookmanagement">Book Management</Link>
    </div>
  );
}

export default LibrarianDashboard;
