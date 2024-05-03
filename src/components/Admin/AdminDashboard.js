import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div className="container">
    <h2 className="mt-3 text-primary fw-bold">Admin Dashboard</h2>
    {username && <p className="mb-3 text-muted"> Welcome, {username}!</p>}
    <div className="list-group">
      <Link to="/adminprofile" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Profile</Link>
      <Link to="/manageusers" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Manage users</Link>
      <Link to="/report" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Report</Link>
    </div>
  </div>
  

  );
}

export default AdminDashboard;
