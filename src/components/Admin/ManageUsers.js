import React, { useState, useEffect } from 'react';

function ManageUsers() {
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [formList, setFormList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users', {
        headers: {
          'Authorization': jwtToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFormList(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const handleEdit = (id) => {
    const itemToEdit = formList.find((item) => item._id === id);
    setSelectedUserId(id);
    setFormData({ ...itemToEdit });
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      // Refresh the data after successful update
      fetchData();
      setIsEditMode(false);
      setSuccessMessage('User updated successfully');
      setModalVisible(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': jwtToken
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      // Refresh the data after successful delete
      fetchData();
      setSuccessMessage('User deleted successfully');
      setModalVisible(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({
          isActive: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to deactivate user');
      }

      // Refresh the data after successful deactivation
      fetchData();
      setSuccessMessage('User deactivated successfully');
      setModalVisible(true);
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleReactivate = async (id) => {
    try {
      const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        },
        body: JSON.stringify({
          isActive: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reactivate user');
      }

      // Refresh the data after successful reactivation
      fetchData();
      setSuccessMessage('User activated successfully');
      setModalVisible(true);
    } catch (error) {
      console.error('Error reactivating user:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSuccessMessage('');
  };

  return (
<div className="container">
  <div className="row">
    <div className="col">
    <button className="btn btn-secondary float-end" onClick={() => window.history.back()}>Back</button>
      <h4 className="mt-3 fw-bold text-primary">Manage User</h4>
      {/* <h1 className="mb-4">Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={isEditMode ? 'Update Email' : 'Email'}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isEditMode ? 'Update Password' : 'Password'}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={isEditMode ? 'Update First Name' : 'First Name'}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={isEditMode ? 'Update Last Name' : 'Last Name'}
          />
        </div>
        {isEditMode ? (
          <button type="button" onClick={handleUpdate} className="btn btn-primary me-2">Update</button>
        ) : (
          <button type="submit" className="btn btn-primary me-2">Submit</button>
        )}
      </form> */}
    </div>
  </div>

  <div className="row mt-5">
    <div className="col">
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formList.map((item) => (
            <tr key={item._id}>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.role}</td>
              <td>{item.isActive ? "Active" : "Deactivate"}</td> {/* Display status based on isActive */}
              <td>
                <button onClick={() => handleEdit(item._id)} className="btn btn-warning me-2">Update</button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger me-2">Delete</button>
                <button onClick={() => handleDeactivate(item._id)} className="btn btn-secondary me-2">Deactivate</button>
                <button onClick={() => handleReactivate(item._id)} className="btn btn-success">Approve/Reactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {modalVisible && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>{successMessage}</p>
      </div>
    </div>
  )}
</div>
  );
}

export default ManageUsers;
