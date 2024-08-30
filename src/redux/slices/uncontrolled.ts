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
        return { ...state, ...action.payload };
      },
    },
  });
export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;