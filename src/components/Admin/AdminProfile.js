import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Modal } from '@mui/material';

function AdminProfile() {
  const sessionKey = useSelector(state => state.auth.sessionKey);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const password = useSelector(state => state.auth.password);
  const username = useSelector(state => state.auth.username);

  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;

  useEffect(() => {
    // Fetch admin data and populate the form
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
          throw new Error('Failed to fetch admin data');
        }

        const data = await response.json();
        const admin = data.find(user => user.role === 'admin');
        if (admin) {
          setAdminData({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            password: admin.password
          });
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, [jwtToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdminData({ ...adminData, [name]: value });
    setUpdatedFields({ ...updatedFields, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${sessionKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': jwtToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      });

      if (!response.ok) {
        throw new Error('Failed to update admin data');
      }

      setSuccessMessage('Admin data updated successfully');
      setModalOpen(true);
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessMessage('');
  };

  return (
    <div className="container">
  <h4 className="mt-3 fw-bold text-primary" >
    Admin Profile
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
        value={adminData.firstName}
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
        value={adminData.lastName}
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
        value={adminData.email}
        onChange={handleChange}
      />
      {errors.email && <div className="text-danger">Email is required</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        placeholder={password}
        value={adminData.password}
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
</div>

  )
}
export default AdminProfile;
