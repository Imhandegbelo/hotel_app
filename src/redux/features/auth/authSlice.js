import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authServices"

const user = JSON.parse(localStorage.getItem("userAuth"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Register user
export const registerUser = createAsyncThunk(
    "auth/register", async (userData, thunkAPI) => {
        try {
            return await authService.registerUser(userData)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login user
export const loginUser = createAsyncThunk(
    "auth/login", async (userData, thunkAPI) => {
        try {
            return await authService.loginUser(userData)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logout", async (user, thunkAPI) => {
        try {
            return await authService.logoutUser(user)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Request password
export const requestPasswordReset = createAsyncThunk(
    "auth/request-pass", async (email, thunkAPI) => {
        try {
            return await authService.requestPasswordReset(email)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Reset password
export const resetPassword = createAsyncThunk(
    "auth/reset", async (userData, thunkAPI) => {
        try {
            return await authService.resetPassword(userData)
        } catch (error) {
            const message = (error.response &&
                response.data &&
                response.data.message) ||
                error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
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
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null
        }).addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            state.user = null
        }).addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;