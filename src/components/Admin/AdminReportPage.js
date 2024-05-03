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
    <div className="mb-3">
    <button className="btn btn-secondary float-end" onClick={() => window.history.back()}>Back</button>
    </div>
    <Typography  variant="h4" className="mt-3 fw-bold text-primary ">
      Admin Report
    </Typography>
    <div className="table-responsive mb-4">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Role</th>
            <th>Total Users</th>
            <th>Active Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Members</td>
            <td>{countUsersByRole('member')}</td>
            <td>{countActiveUsersByRole('member')}</td>
          </tr>
          <tr>
            <td>Librarians</td>
            <td>{countUsersByRole('librarian')}</td>
            <td>{countActiveUsersByRole('librarian')}</td>
          </tr>
          <tr>
            <td>Administrators</td>
            <td>{countUsersByRole('admin')}</td>
            <td>{countActiveUsersByRole('admin')}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <tbody>
          <tr>
            <td className="fw-bold">Number of All Books:</td>
            <td className="text-body">{books.length}</td>
          </tr>
          <tr>
            <td className="fw-bold">Most Checked-Out Books:</td>
            <td className="text-body">pizza</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Container>
  
  
  

  );
}

export default AdminReportPage;
