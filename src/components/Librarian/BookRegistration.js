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
    <Typography variant="h4" component="h1"  className="mt-3 fw-bold text-primary"gutterBottom>
    <button className="btn btn-secondary float-end" onClick={() => window.history.back()}>Back</button>
      Book Registration
    </Typography>
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Book Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          value={bookDetails.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">Book Name is required</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Book Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
        />
        {errors.title && <div className="invalid-feedback">Book Title is required</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="entity" className="form-label">Entity</label>
        <input
          type="text"
          className={`form-control ${errors.entity ? 'is-invalid' : ''}`}
          id="entity"
          name="entity"
          value={bookDetails.entity}
          onChange={handleChange}
        />
        {errors.entity && <div className="invalid-feedback">Entity is required</div>}
      </div>
      <Button
        type="submit"
        variant="contained"
        className="btn btn-primary"
      >
        Register Book
      </Button>
    </form>
    {registrationSuccess && (
      <Typography variant="body1" color="success">
        Book registered successfully
      </Typography>
    )}
  </Container>
);
}


export default BookRegistration;
