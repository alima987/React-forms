import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../types";
  const initialState: FormData = {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    accept: false,
    country: '',
    picture: '',
  };
  
const uncontrolledFormSlice = createSlice({
    name: 'uncontrolledFormData',
    initialState,
    reducers: {
      setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
        state.age = action.payload.age
        state.accept = action.payload.accept
        state.confirmPassword = action.payload.confirmPassword
        state.country = action.payload.country
        state.email = action.payload.email
        state.gender = action.payload.gender;
        state.picture = action.payload.picture
        state.name = action.payload.name
        state.password = action.payload.password
      },
    },
  });
export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;