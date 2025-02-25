import axios from "axios"

const API_URL = "https://hot-engine.vercel.app/api/user"

// Register User
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + "/register", userData)

    if (response.data) {
        localStorage.setItem("userAuth", JSON.stringify(response.data))
    }

    return response.data;
}

// Login user
const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData)

    if (response.data) {
        localStorage.setItem("userAuth", JSON.stringify(response.data))
    }

    return response.data;
}

// Update
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "/:userId", userData)

    if (response.data) {
        localStorage.setItem("userAuth", JSON.stringify(response.data))
    }

    return response.data
}

// Logout
const logoutUser = async () => {
    localStorage.removeItem("userAuth")
    const response = await axios.post(API_URL + "/logout")

    return response.data
}

// Request password reset
const requestPasswordReset = async () => {

}

// Reset password
const resetPassword = async () => {

}

const authService = {
    registerUser, loginUser, updateUser, logoutUser, requestPasswordReset, resetPassword
}

export default authService;