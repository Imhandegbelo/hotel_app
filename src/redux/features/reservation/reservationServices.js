import axios from "axios"

const API_URL = "http://localhost:5000/api/reservations"

// create reservation
const createReservation = async (formData) => {
    const response = await axios.post(API_URL, formData)

    
}

// update reservation
const updateReservation = () => {

}

// delete reservation
const deleteReservation = () => {

}

const reservationServices = {

}

export default reservationServices