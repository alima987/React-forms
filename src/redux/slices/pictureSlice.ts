import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PictureState {
    picture: string | null;
  }
  
  const initialState: PictureState = {
    picture: null,
  };
const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: { 
        setPicture: (state, action: PayloadAction<string>) => {
            state.picture = action.payload;
          },
        clearPicture: (state) => {
            state.picture = null;
          },
    }
})
export const { setPicture, clearPicture } = pictureSlice.actions;
export default pictureSlice.reducer;