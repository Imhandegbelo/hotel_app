/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import suiteServices from "./suiteServices"

const initialState = {
    suites: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

// Create suite
export const createSuite = createAsyncThunk(
    "suite/create",
    async (suiteData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await suiteServices.createSuite(suiteData, token)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get suite by ID
export const getSuiteById = createAsyncThunk(
    "suite/get-one",
    async (suiteId, thunkAPI) => {
        try {
            return await suiteServices.getSuiteById(suiteId)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    })

// Get all suites
export const getAllSuites = createAsyncThunk(
    "suite/get-all",
    async (_, thunkAPI) => {
        try {
            return await suiteServices.getAllSuites()
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete suite
export const deleteSuite = createAsyncThunk(
    "suite/delete",
    async (suiteId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await suiteServices.deleteSuite(suiteId, token)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update suite
export const updateSuite = createAsyncThunk(
    "suite/update",
    async ({ suiteId, suiteData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await suiteServices.updateSuite(suiteId, suiteData, token)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const suiteSlice = createSlice({
    name: "suite",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSuites.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllSuites.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.suites = action.payload
        }).addCase(getAllSuites.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        }).addCase(getSuiteById.pending, (state) => {
            state.isLoading = true
        }).addCase(getSuiteById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.suites = action.payload
        }).addCase(getSuiteById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message
        }).addCase(createSuite.pending, (state) => {
            state.isLoading = true
        }).addCase(createSuite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            state.suites = action.payload.suites
        }).addCase(createSuite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message
        }).addCase(deleteSuite.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteSuite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message
        }).addCase(deleteSuite.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message
        }).addCase(updateSuite.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateSuite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message
            state.suites = action.payload
        }).addCase(updateSuite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const { reset } = suiteSlice.actions;
export default suiteSlice.reducer;