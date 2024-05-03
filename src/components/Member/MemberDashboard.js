import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MemberDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div className="container">
      <h2 className="mt-3 fw-bold text-primary">Member Dashboard</h2>
      {username && <p className="mb-3 text-muted">Welcome, {username}!</p>}
      <div className="list-group">
        <Link to="/memberprofile" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Profile</Link>
        <Link to="/CheckOutBook" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Check out book</Link>
        <Link to="/ReturnBook" className="list-group-item list-group-item-action btn btn-outline-primary text-dark">Return Book</Link>
      </div>
    </div>
  );
}

export default MemberDashboard;

