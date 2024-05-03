import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MemberDashboard() {
  const username = useSelector(state => state.auth.username);

  return (
    <div>
      <h2>Member Dashboard </h2>
      {username && <p>Welcome, {username}!</p>}
      <Link to="/memberprofile">Profile</Link>
      <Link to="/CheckOutBook">Check out book</Link>
      <Link to="/ReturnBook">Return Book</Link>
    </div>
  );
}

export default MemberDashboard;

