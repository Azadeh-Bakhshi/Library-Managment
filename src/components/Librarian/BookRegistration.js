import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function BookRegistration() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [bookDetails, setBookDetails] = useState({
    name: '',
    title: '',
    entity: '',
    checkedOut: 0 // Initialize checkedOut to 0
  });
  const [errors, setErrors] = useState({
    name: false,
    title: false,
    entity: false
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to manage registration success message

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("bookDetails:", bookDetails);

    const anyEmpty = Object.values(bookDetails).some(val => val === '' || val === null);

    if (anyEmpty) {
      // Display error message or handle accordingly
      alert('All fields are required.');
      return;
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify(bookDetails)
      };

      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/books', requestOptions);
      const data = await response.json();

      console.log('Book registered successfully:', data);
      setRegistrationSuccess(true); // Set registration success state to true
      // Optionally, you can navigate to another page after successful registration
    } catch (error) {
      console.error('Error registering book:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'entity' ? parseInt(value) : value; // Parse value as integer only if the field is 'entity'
    setBookDetails({ ...bookDetails, [name]: parsedValue });
    setErrors({ ...errors, [name]: String(parsedValue).trim() === '' });
  };
  
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        <button onClick={() => window.history.back()}>Back</button>
        Book Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Book Name"
          name="name"
          value={bookDetails.name}
          error={errors.name}
          helperText={errors.name ? 'Book Name is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Book Title"
          name="title"
          value={bookDetails.title}
          error={errors.title}
          helperText={errors.title ? 'Book Title is required' : ''}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="entity"
          label="Entity"
          name="entity"
          value={bookDetails.entity}
          error={errors.entity}
          helperText={errors.entity ? 'Entity is required' : ''}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register Book
        </Button>
        {registrationSuccess && ( // Conditionally render success message
          <Typography variant="body1" color="success">
            Book registered successfully
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default BookRegistration;
