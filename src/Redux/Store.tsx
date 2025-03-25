import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './lineMatchesSlice';
import ballSlice from './ballSlice';
import loginModalSlice from './loginModalSlice';
import AuthSlice from './AuthSlice.ts';
import chatSlice from './WidgetSlice';

const store = configureStore({
  reducer: {
    match: counterReducer,
    ball : ballSlice,
    login : loginModalSlice,
    auth : AuthSlice,
    chat : chatSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;
