import axios from "axios"

const API_URL = "http://localhost:5000/api/reservations"

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

// update reservation
const updateReservation = async (reservationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

}

// delete reservation
const deleteReservation = async (reservationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

}

const reservationServices = {
    createReservation,
    getAllReservations,
    updateReservation,
    deleteReservation
}

export default reservationServices