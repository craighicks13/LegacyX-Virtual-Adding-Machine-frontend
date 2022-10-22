import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    uid: '',
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.email = '';
      state.uid = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
