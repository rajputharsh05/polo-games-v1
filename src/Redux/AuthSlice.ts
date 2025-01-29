import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    logIn : false,
    user: null,
    permissions: {}
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload , "Heyyyyyy");
            state.logIn = true;
            state.user = action.payload.role;
            state.permissions = action.payload.permissions;
        },
        logout: (state) => {
            state.logIn = false;
            state.user = null;
            state.permissions = {}
        }
    }
})


export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;