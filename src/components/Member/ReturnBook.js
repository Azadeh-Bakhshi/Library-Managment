import React, { useState } from 'react';
import { Button, Container, Typography, TextField, Snackbar } from '@mui/material';

function ReturnBook() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [successMessage, setSuccessMessage] = useState('');
  const [returnInfo, setReturnInfo] = useState({});

  const handleReturnBook = async () => {
    const { name, title } = returnInfo;
    if (!name || !title) {
      console.error('Name and title are required.');
      return;
    }

    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': jwtToken
        }
      };

      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/books', requestOptions);
      const data = await response.json();

      const bookInDatabase = data.data.find(book => book.name === name && book.title === title);

      if (bookInDatabase) {
        const updatedEntity = bookInDatabase.entity + 1;
        const updateEntityRequestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
          },
          body: JSON.stringify({ entity: updatedEntity })
        };

        const updateEntityResponse = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/books/${bookInDatabase._id}`, updateEntityRequestOptions);
        if (updateEntityResponse.ok) {
          setSuccessMessage('Return successful');
          setReturnInfo({}); // Clear input fields after successful return
        } else {
          console.error('Failed to update entity of the book');
        }
      } else {
        console.error('Book not found in the database.');
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReturnInfo({
      ...returnInfo,
      [name]: value
    });
  };

  return (
    <Container maxWidth="md">
      <button onClick={() => window.history.back()}>Back</button>
      <Typography variant="h4" component="h1" gutterBottom>
        Return Book
      </Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        size="small"
        value={returnInfo.name || ''}
        onChange={handleInputChange}
      />
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        size="small"
        value={returnInfo.title || ''}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleReturnBook}
      >
        Return
      </Button>
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
}

export default ReturnBook;
