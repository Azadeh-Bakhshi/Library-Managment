import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Modal } from '@mui/material';

function MemberProfile() {
  const sessionKey = useSelector(state => state.auth.sessionKey);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const password = useSelector(state => state.auth.password);
  const username = useSelector(state => state.auth.username);

  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;

  useEffect(() => {
    // Fetch member data and populate the form
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
          throw new Error('Failed to fetch member data');
        }

        const data = await response.json();
        const member = data.find(user => user.role === 'member');
        if (member) {
          setMemberData({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            password: member.password
          });
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchData();
  }, [jwtToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData({ ...memberData, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    const anyEmpty = Object.values(memberData).some(val => val.trim() === '');
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
        body: JSON.stringify(memberData)
      });

      if (!response.ok) {
        throw new Error('Failed to update member data');
      }

      setSuccessMessage('Member data updated successfully');
      setModalOpen(true);
    } catch (error) {
      console.error('Error updating member data:', error);
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
        Member Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        All fields are required.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label={firstName}
          name="firstName"
          value={memberData.firstName}
          error={errors.firstName}
          helperText={errors.firstName ? 'First Name is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label={lastName}
          name="lastName"
          value={memberData.lastName}
          error={errors.lastName}
          helperText={errors.lastName ? 'Last Name is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={username}
          name="email"
          type="email"
          value={memberData.email}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label={password}
          name="password"
          type="password"
          value={memberData.password}
          error={errors.password}
          helperText={errors.password ? 'Password is required' : ''}
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

export default MemberProfile;
