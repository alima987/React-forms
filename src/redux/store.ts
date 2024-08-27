import { configureStore } from "@reduxjs/toolkit";
import CountriesReducer from './slices/countriesSlice';
import PictureReducer from "./slices/pictureSlice";

export const store = configureStore({
    reducer: {
        countries: CountriesReducer,
        picture: PictureReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch