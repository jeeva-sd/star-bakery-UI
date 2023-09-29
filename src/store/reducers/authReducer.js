import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isRequesting: false,
        userInfo: [],
    },
    reducers: {
        setLoginRequesting: (state) => {
            state.isRequesting = true;
            state.userInfo = [];
        },
        setUserInfo: (state, action) => {
            const payload = action.payload;
            const userInfo = payload ? payload : [];

            state.userInfo = userInfo;
            state.isRequesting = false;
        },
    },
});

export const { setLoginRequesting, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
