import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {

    const jwtToken = process.env.REACT_APP_JWT_TOKEN;
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '', // New state for selected role
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Determine the isActive status based on the role
        const isActive = userDetails.role === 'admin';
    
        const requestOptions = {
            method: "POST",
            headers: new Headers({
                "Authorization": jwtToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                ...userDetails,
                isActive: isActive
            }),
        };
    
        fetch("https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users", requestOptions)
            .then(response => response.text())
            .then(result => {
                setRegistrationSuccess(true); // Set registration success to true to show the modal
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCloseModal = () => {
        setRegistrationSuccess(false); // Close the modal
        navigate('/'); // Redirect after closing the modal
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                User Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userDetails.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    autoComplete="given-name"
                    value={userDetails.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    autoComplete="family-name"
                    value={userDetails.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userDetails.password}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={userDetails.role}
                        onChange={handleChange}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                        <MenuItem value="librarian">Librarian</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
            {/* Modal for showing registration success */}
            <Modal
                open={registrationSuccess}
                onClose={handleCloseModal}
                aria-labelledby="registration-success-modal"
                aria-describedby="registration-success-description"
            >
                <Box sx={{
                    position: 'absolute',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Typography id="registration-success-modal" variant="h6" component="h2">
                        Registration Successful!
                    </Typography>
                    <Typography id="registration-success-description" sx={{ mt: 2 }}>
                        Your registration was successful. please wait for approval.
                    </Typography>
                    <Button onClick={handleCloseModal} sx={{ mt: 2 }}>Close</Button>
                </Box>
            </Modal>
        </Container>
    );
}

export default UserRegistration;
