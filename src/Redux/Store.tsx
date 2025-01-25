import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './lineMatchesSlice'; // Import slice reducer here
import ballSlice from './ballSlice';

const store = configureStore({
  reducer: {
    match: counterReducer,
    ball : ballSlice,
  },
});

export default store;
