import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
    name: 'picture',
    initialState: null,
    reducers: { 
        setPicture: (_state, action) => {
            return action.payload;
        }
    }
})
export const { setPicture } = pictureSlice.actions;
export default pictureSlice.reducer;