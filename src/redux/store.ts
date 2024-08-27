import { configureStore } from "@reduxjs/toolkit";
import CountriesReducer from './slices/countriesSlice'

export const store = configureStore({
    reducer: {
        countries: CountriesReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch