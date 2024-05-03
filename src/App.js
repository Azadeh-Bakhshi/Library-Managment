import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';

import { logout, login } from './authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './components/Home';
import MemberDashboard from './components/Member/MemberDashboard';
import LibrarianDashboard from './components/Librarian/LibrarianDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import NotFound from './components/NotFound';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import UserRegistration from './components/Registration';
import AdminProfile from './components/Admin/AdminProfile';
import AdminReportPage from './components/Admin/AdminReportPage';
import ManageUsers from './components/Admin/ManageUsers';
import MemberProfile from './components/Member/MemberProfile';
import CheckOutBook from './components/Member/CheckOutBook';
import ReturnBook from './components/Member/ReturnBook';
import LibrarianProfile from './components/Librarian/LibrarianProfile';
import BookManagement from './components/Librarian/BookManagement';
import BookRegistration from './components/Librarian/BookRegistration';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const storedAuth = JSON.parse(sessionStorage.getItem('auth'));
    if (storedAuth && storedAuth.isAuthenticated) {
      dispatch(login(storedAuth));
    }
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth'); 
    dispatch(logout());
  };

  return (
    <Router>
<div class="container-fluid p-0">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <Link to="/" class="navbar-brand">Library Managment Website</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          {!isAuthenticated && <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>}
          {isAuthenticated && <li class="nav-item"><Link to="/dashboard" class="nav-link">Dashboard</Link></li>}
          {!isAuthenticated && <li class="nav-item"><Link to="/registration" class="nav-link">Registration</Link></li>}
          {!isAuthenticated && <li class="nav-item"><Link to="/login" class="nav-link">Login</Link></li>}
          {isAuthenticated && <li class="nav-item"><button onClick={handleLogout} class="btn btn-outline-danger">Logout</button></li>}
        </ul>
      </div>
    </div>
  </nav>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/registration" element={<UserRegistration />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={
      isAuthenticated ? (
        <ProtectedRoute>
          <div class="row">
            {userRole === 'admin' && <AdminDashboard />}
            {userRole === 'member' && <MemberDashboard />}
            {userRole === 'librarian' && <LibrarianDashboard />}
          </div>
        </ProtectedRoute>
      ) : (
        <Navigate to="/login" /> 
      )
    } />
    <Route path="/memberprofile" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />
    <Route path="/adminprofile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
    <Route path="/report" element={<ProtectedRoute><AdminReportPage /></ProtectedRoute>} />
    <Route path="/manageusers" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
    <Route path="/librarianprofile" element={<ProtectedRoute><LibrarianProfile /></ProtectedRoute>} />
    <Route path="/bookregistration" element={<ProtectedRoute><BookRegistration /></ProtectedRoute>} />
    <Route path="/bookmanagement" element={<ProtectedRoute><BookManagement /></ProtectedRoute>} /> 
    <Route path="/CheckOutBook" element={<ProtectedRoute><CheckOutBook /></ProtectedRoute>} /> 
    <Route path="/ReturnBook" element={<ProtectedRoute><ReturnBook /></ProtectedRoute>} /> 
    <Route path="*" element={<NotFound />} />
  </Routes>
</div>

    </Router>
  );
}

export default App;
