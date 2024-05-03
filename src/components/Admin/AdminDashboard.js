import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {username && <p>Welcome, {username}!</p>}
      <Link to="/adminprofile">Profile</Link> {/* Add a link to the Admin Profile page */}
      <Link to="/manageusers">Manage users</Link> {/* Add a link to the Admin Profile page */}
      <Link to="/report">Report</Link> {/* Add a link to the Admin Profile page */}
    </div>
  );
}

export default AdminDashboard;
