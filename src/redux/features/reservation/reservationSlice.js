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
        try {
            return await reservationServices.createReservation(reservationData)
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
export const getReservations = createAsyncThunk(
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

// Get reservation by id
export const getReservationById = createAsyncThunk(
    "reservation/get-one",
    async (reservationId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reservationServices.getReservationById(reservationId, token)
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

// update reservations
export const updateReservation = createAsyncThunk(
    "reservation/update",
    async (reservationData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reservationServices.updateReservation(reservationData, token)
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

// delete reservations
export const deleteReservation = createAsyncThunk(
    "reservation/delete",
    async (reservationId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await reservationServices.updateReservation(reservationId, token)
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
    // extraReducers: (builder) => {
    //     builder.addCase(createReservation.pending, (state) => {
    //         state.isLoading = true
    //     }).addCase(createReservation.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.message = action.payload
    //     }).addCase(createReservation.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload
    //     }).addCase(getReservations.pending, (state) => {
    //         state.isLoading = true
    //     }).addCase(getReservations.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.reservations = action.payload
    //     }).addCase(getReservations.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload
    //     }).addCase(getReservationById.pending, (state)=>{
    //         state.isLoading=true
    //     }).addCase(getReservationById.fulfilled, (state,action)=>{
    //         state.isLoading=false;
    //         state.isSuccess=true;
    //         state.reservations=action.payload
    //     }).addCase(getReservationById.rejected, (state,action)=>{
    //         state.isLoading=false;
    //         state.isError=true;
    //         state.message =action.payload
    //     }).addCase(updateReservation.pending, (state) => {
    //         state.isLoading = true
    //     }).addCase(updateReservation.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.reservations = action.payload
    //     }).addCase(updateReservation.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload
    //     }).addCase(deleteReservation.pending, (state) => {
    //         state.isLoading = true
    //     }).addCase(deleteReservation.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.isSuccess = true;
    //         state.message = action.payload
    //     }).addCase(deleteReservation.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.message = action.payload
    //     })
    // }
})
export const { reset } = reservationSlice.actions;
export default reservationSlice.reducer