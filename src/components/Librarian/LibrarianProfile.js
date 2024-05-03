import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Modal } from '@mui/material';

function LibrarianProfile() {
  const sessionKey = useSelector(state => state.auth.sessionKey);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const password = useSelector(state => state.auth.password);
  const username = useSelector(state => state.auth.username);

  const [librarianData, setLibrarianData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;

  useEffect(() => {
    // Fetch librarian data and populate the form
    const fetchData = async () => {
      try {
        const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users`, {
          method: 'GET',
          headers: {
            'Authorization': jwtToken,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch librarian data');
        }

        const data = await response.json();
        const librarian = data.find(user => user.role === 'librarian');
        if (librarian) {
          setLibrarianData({
            firstName: librarian.firstName,
            lastName: librarian.lastName,
            email: librarian.email,
            password: librarian.password
          });
        }
      } catch (error) {
        console.error('Error fetching librarian data:', error);
      }
    };

    fetchData();
  }, [jwtToken]);

  const handleChange = (event) => {
    setLibrarianData({ ...librarianData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    const anyEmpty = Object.values(librarianData).some(val => val.trim() === '');
    if (anyEmpty) {
      // Display error message or handle accordingly
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${sessionKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': jwtToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(librarianData)
      });

      if (!response.ok) {
        throw new Error('Failed to update librarian data');
      }

      setSuccessMessage('Librarian data updated successfully');
      setModalOpen(true);
    } catch (error) {
      console.error('Error updating librarian data:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage('');
  };

  return (
    <Container>
  <h4 className="mt-3 fw-bold text-primary">
    Librarian Profile
    <button className="btn btn-secondary float-end" onClick={() => window.history.back()}>Back</button>
  </h4>
  <p className="mb-3">All fields are required.</p>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        type="text"
        className="form-control"
        id="firstName"
        name="firstName"
        placeholder={firstName}
        value={librarianData.firstName}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="lastName" className="form-label">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="lastName"
        name="lastName"
        placeholder={lastName}
        value={librarianData.lastName}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Username</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        placeholder={username}
        value={librarianData.email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        placeholder={password}
        value={librarianData.password}
        onChange={handleChange}
      />
    </div>
    <button type="submit" className="btn btn-primary">Update Profile</button>
  </form>
  <div className="modal" tabIndex="-1" style={{ display: modalOpen ? 'block' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Success</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </div>
        <div className="modal-body">
          <p>{successMessage}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
</Container>
  )
}

export default LibrarianProfile;
