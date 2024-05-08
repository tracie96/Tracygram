import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
      isAuthenticated: false,
    },

    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers(builder) {},
});

export const {userData, setLoading, setUser} = userSlice.actions;
export default userSlice.reducer;
