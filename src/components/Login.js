import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { login } from '../authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const jwtToken = process.env.REACT_APP_JWT_TOKEN;

  useEffect(() => {
    // Redirect to the dashboard if user is already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Authorization": jwtToken,
        "Content-Type": "application/json"
      }),
    };
  
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users', requestOptions);
      const data = await response.json();
      const user = data.data.find(u => u.email === email && u.password === password);
  
      if (user && user.isActive) {
        console.log('Login successful:', user);
        setErrorMessage('');
        dispatch(login({ username: user.email, sessionKey: user._id, role: user.role, firstName: user.firstName, lastName: user.lastName, password: user.password }));
        navigate('/dashboard');
      } else if (user && !user.isActive) {
        setErrorMessage('Your account is not active. Please contact support.');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };
  
  

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {errorMessage && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
        </Box>
      </Box>
    </Container>
  );

}

export default Login;
