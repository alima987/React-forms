import { configureStore } from "@reduxjs/toolkit";
import CountriesReducer from './slices/countriesSlice';
import PictureReducer from "./slices/pictureSlice";
import UncontrolledFormReducer from './slices/uncontrolled'

export const store = configureStore({
    reducer: {
        countries: CountriesReducer,
        picture: PictureReducer,
        uncontrolledFormData: UncontrolledFormReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch