import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

function BookManagement() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [books, setBooks] = useState([]);
  const [updatedBooks, setUpdatedBooks] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage update success message
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State to manage delete success message

  useEffect(() => {
    // Fetch books data when component mounts
    fetchBooks();
  }, [updateSuccess, deleteSuccess]); // Update book list on update or delete success

  useEffect(() => {
    // Reset update success message after a certain time
    if (updateSuccess) {
      const timer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000); // Reset after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

  useEffect(() => {
    // Reset delete success message after a certain time
    if (deleteSuccess) {
      const timer = setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000); // Reset after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess]);

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

  const handleDelete = async (id) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': jwtToken
        }
      };

      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/books/${id}`, requestOptions);
      if (response.ok) {
        setDeleteSuccess(true); // Set delete success state to true
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify(updatedBooks[id])
      };

      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/books/${id}`, requestOptions);
      if (response.ok) {
        setUpdateSuccess(true); // Set update success state to true
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleChange = (event, id, field) => {
    const value = event.target.value;
    setUpdatedBooks(prevState => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value }
    }));
  };

  return (
    <Container maxWidth="md">
      <button onClick={() => window.history.back()}>Back</button>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Management
      </Typography>
      {(updateSuccess || deleteSuccess) && ( // Conditionally render update or delete success message
        <Typography variant="body1" color="success">
          {updateSuccess ? 'Book updated successfully' : 'Book deleted successfully'}
        </Typography>
      )}
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
                <TableCell>
                  <TextField
                    value={updatedBooks[book._id]?.name || book.name}
                    onChange={(e) => handleChange(e, book._id, 'name')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={updatedBooks[book._id]?.title || book.title}
                    onChange={(e) => handleChange(e, book._id, 'title')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={updatedBooks[book._id]?.entity || book.entity}
                    onChange={(e) => handleChange(e, book._id, 'entity')}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleDelete(book._id)}>Delete</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleUpdate(book._id)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BookManagement;
