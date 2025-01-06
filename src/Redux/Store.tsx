import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './lineMatchesSlice'; // Import slice reducer here

const store = configureStore({
  reducer: {
    match: counterReducer, // Add slice reducer here
  },
});

export default store;
