import axios from "axios"

const API_URL = "https://hot-engine.vercel.app/api/reservations"

// create reservation
const createReservation = async (reservationData) => {
    const response = await axios.post(API_URL, reservationData)
    return response.data
}

// get all reservations
const getAllReservations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// get all reservations
const getReservationById = async (reservationId) => {
    const response = await axios.get(API_URL + `/${reservationId}`, config)
    return response.data
}

// update reservation
const updateReservation = async (reservationId, reservationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + `/${reservationId}`, reservationData, config)
    return response.data
}

// delete reservation
const deleteReservation = async (reservationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + `/${reservationId}`, config)
    return response.data
}

const reservationServices = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
}

export default reservationServices