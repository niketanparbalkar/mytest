// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  user: null, // optional: store user info if needed
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      console.log(action.payload);
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
