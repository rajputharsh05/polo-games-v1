import { createSlice } from '@reduxjs/toolkit';


export type AuthStateType = {
    logIn: boolean,
    user: string | null,
    permissions: any,
    token : string,
} 

const initialState : AuthStateType = {
    logIn : false,
    user: null,
    permissions: {},
    token : "",
}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.logIn = true;
            state.user = action.payload.role;
            state.permissions = action.payload.permissions;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.logIn = false;
            state.user = null;
            state.permissions = {}
            state.token = "";
        }
    }
})


export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;