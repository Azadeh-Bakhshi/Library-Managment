import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';

function AdminReportPage() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users', {
        headers: {
          'Authorization': jwtToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/books', {
        headers: {
          'Authorization': jwtToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books data');
      }

      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const countUsersByRole = (role) => {
    return users.filter(user => user.role === role).length;
  };

  const countActiveUsersByRole = (role) => {
    return users.filter(user => user.role === role && user.isActive).length;
  };

  const calculateMostCheckedOutBook = () => {
    const sortedBooks = [...books].sort((a, b) => b.checkedOut - a.checkedOut);
    const highestCheckoutCount = sortedBooks.length > 0 ? sortedBooks[0].checkedOut : 0;
    const mostCheckedOutBooks = sortedBooks.filter(book => book.checkedOut === highestCheckoutCount);
    return mostCheckedOutBooks.length > 0 ? mostCheckedOutBooks : null;
  };

  return (
    <Container maxWidth="md">
      <button onClick={() => window.history.back()}>Back</button>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Report
      </Typography>
            
      <Typography variant="h6" gutterBottom>
        Number of All Members: {countUsersByRole('member')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Number of All Librarians: {countUsersByRole('librarian')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Number of All Administrators: {countUsersByRole('admin')}
      </Typography>

      <br />

      <Typography variant="h6" gutterBottom>
        Number of Active Members: {countActiveUsersByRole('member')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Number of Active Librarians: {countActiveUsersByRole('librarian')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Number of Active Administrators: {countActiveUsersByRole('admin')}
      </Typography>

      <br />

      <Typography variant="h6" gutterBottom>
        Number of All Books: {books.length}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Most Checked-Out Books: 
        {calculateMostCheckedOutBook()?.map(book => (
          <span key={book.id}>{book.name}, </span>
        ))}
      </Typography>
    </Container>
  );
}

export default AdminReportPage;
