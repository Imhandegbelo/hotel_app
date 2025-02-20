import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice";
import reservationReducer from "./features/reservation/reservationSlice"
import suiteReducer from "./features/suite/suiteSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reservation: reservationReducer,
        suite: suiteReducer
    },
})

export default store