import React, { useState, useEffect } from 'react';


function Home() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Fetch books data with authorization token in headers
      const jwtToken = process.env.REACT_APP_JWT_TOKEN;
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

  const calculateMostCheckedOutBook = () => {
    const sortedBooks = [...books].sort((a, b) => b.checkedOut - a.checkedOut);
    const highestCheckoutCount = sortedBooks.length > 0 ? sortedBooks[0].checkedOut : 0;
    const mostCheckedOutBooks = sortedBooks.filter(book => book.checkedOut === highestCheckoutCount);
    return mostCheckedOutBooks.length > 0 ? mostCheckedOutBooks : null;
  };

  return (
<div class="container">
  <h1 className='fw-bold'>Public Page</h1>
  <div class="container">
  <table class="table">
    <thead>
      <tr>
        <th className='fw-bold'> Most Checked-Out Books:</th>
      </tr>
    </thead>
    <tbody>
      {calculateMostCheckedOutBook()?.map(book => (
        <tr key={book.id}>
          <td className='text-primary'>{book.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <h2 className='fw-bold'>Books list</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Book Title</th>
      </tr>
    </thead>
    <tbody>
      {books.map(book => (
        <tr key={book._id}>
          <td className='text-primary'>{book.name}</td>
          <td className='text-primary'>{book.title}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div class="row">
    <div class="col-md-4">
      <img src="https://cdn.dribbble.com/users/8385793/screenshots/20570435/media/f29ac400383de50b43572754501d2dbf.jpg?resize=768x576&vertical=center" alt="Book Image 1" class="img-fluid h-100" />
    </div>
    <div class="col-md-4">
      <img src="https://cdn.dribbble.com/userupload/4091443/file/original-c23c898a022cac66e0019d29f42fdbe9.jpg?resize=1024x768" alt="Book Image 2" class="img-fluid h-100" />
    </div>
    <div class="col-md-4">
      <img src="https://cdn.dribbble.com/userupload/11470448/file/original-6d6e74fef8aed356a6567ebc4935c8a0.jpg?resize=1024x737" alt="Book Image 3" class="img-fluid h-100" />
    </div>
</div>

</div>

  );
}

export default Home;