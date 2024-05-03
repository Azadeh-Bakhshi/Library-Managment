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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        <button onClick={() => window.history.back()}>Back</button>
        Admin Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        All fields are required.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          label="First Name"
          placeholder={firstName}
          name="firstName"
          value={adminData.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          label="Last Name"
          placeholder={lastName}
          name="lastName"
          value={adminData.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label='Username'
          placeholder={username}
          name="email"
          type="email"
          value={adminData.email}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          placeholder={password}
          name="password"
          type="password"
          value={adminData.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default AdminProfile;
