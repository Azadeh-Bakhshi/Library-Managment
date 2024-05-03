import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';

function CheckOutBook() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': jwtToken
        }
      };

      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/books', requestOptions);
      const data = await response.json();

      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCheckOut = async (id) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({
          entity: books.find(book => book._id === id).entity - 1, // Decrease entity by 1
          checkedOut: books.find(book => book._id === id).checkedOut + 1 // Increase checkedOut by 1
        })
      };
  
      const updateResponse = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/books/${id}`, requestOptions);
      if (updateResponse.ok) {
        fetchBooks();
        setSuccessMessage('Check out successful');
      } else {
        console.error('Failed to update book details');
      }
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };
  
  

  
  
  

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <Container maxWidth="md">
      <button onClick={() => window.history.back()}>Back</button>
      <Typography variant="h4" component="h1" gutterBottom>
        Check Out Book
      </Typography>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
  <TableRow>
    <TableCell>Name</TableCell>
    <TableCell>Title</TableCell>
    <TableCell>Entity</TableCell>
    <TableCell>Actions</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {books.map((book) => (
    <TableRow key={book._id}>
      <TableCell>{book.name}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.entity}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleCheckOut(book._id)}>Check Out</Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
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

export default CheckOutBook;
