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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        <button onClick={() => window.history.back()}>Back</button>
        Librarian Profile
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
          value={librarianData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label={lastName}
          name="lastName"
          value={librarianData.lastName}
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
          value={librarianData.email}
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
          value={librarianData.password}
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

export default LibrarianProfile;
