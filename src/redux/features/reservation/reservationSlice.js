import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import reservationServices from "./reservationServices"

const initialState = {
    reservations: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

// create reservation
export const createReservation = createAsyncThunk(
    "reservation/create",
    async (reservationData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        try {
            return await reservationServices.createReservation(reservationData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Get reservation
export const getReservation = createAsyncThunk(
    "reservation/get-all",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reservationServices.getAllReservations(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(createReservation.pending, (state) => {
            state.isLoading = true
        }).addCase(createReservation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload
        }).addCase(createReservation.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        }).addCase(getReservation.pending, (state) => {
            state.isLoading = true
        }).addCase(getReservation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reservations = action.payload
        })
    }
})
export const { reset } = reservationSlice.actions;
export default reservationSlice.reducer