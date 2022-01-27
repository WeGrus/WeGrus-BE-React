import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: "AccessToken",
    initialState: {
        value: "hihhi",
    },
    reducers: {
        getter: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {getter} = slice.actions;

export const selectAccessToken = state => state.AccessToken.value;

export default slice.reducer;