import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, name, id } = action.payload;
      state.token = token;
      state.name = name;
      state.id = id;
    },
    clearUser: (state) => {
      state.token = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 