import { createSlice } from '@reduxjs/toolkit';

// Load authentication state from localStorage if available
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  username: localStorage.getItem('username') || null,
  sessionKey: localStorage.getItem('sessionKey') || null,
  role: localStorage.getItem('role') || null,
  firstName: localStorage.getItem('firstName') || null,
  lastName: localStorage.getItem('lastName') || null,
  password: localStorage.getItem('password') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.sessionKey = action.payload.sessionKey;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.password = action.payload.password;

      // Persist authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('sessionKey', action.payload.sessionKey);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('firstName', action.payload.firstName);
      localStorage.setItem('lastName', action.payload.lastName);
      localStorage.setItem('password', action.payload.password);
    },
    updateAdminProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.password = action.payload.password;
      state.username = action.payload.username;

      // Update corresponding fields in localStorage
      localStorage.setItem('firstName', action.payload.firstName);
      localStorage.setItem('lastName', action.payload.lastName);
      localStorage.setItem('password', action.payload.password);
      localStorage.setItem('username', action.payload.username);
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
      state.sessionKey = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.password = null;

      // Clear authentication state from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('sessionKey');
      localStorage.removeItem('role');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('password');
    }
  }
});

export const { login, updateAdminProfile, logout } = authSlice.actions;

export default authSlice.reducer;
