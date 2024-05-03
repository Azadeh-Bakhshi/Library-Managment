import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LibrarianDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div className="container">
    <h2 className="mt-3 text-primary fw-bold">Librarian Dashboard</h2>
    {username && <p className="mb-3 text-muted"> Welcome, {username}!</p>}
    <div className="list-group">
      <Link to="/librarianprofile" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Profile</Link>
      <Link to="/bookregistration" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Book Registration</Link>
      <Link to="/bookmanagement" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Book Management</Link>
    </div>
  </div>
  

  );
}

export default LibrarianDashboard;
