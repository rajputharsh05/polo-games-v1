import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './lineMatchesSlice';
import ballSlice from './ballSlice';
import loginModalSlice from './loginModalSlice';

const store = configureStore({
  reducer: {
    match: counterReducer,
    ball : ballSlice,
    login : loginModalSlice,
  },
});

export default store;
