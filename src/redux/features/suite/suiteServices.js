import axios from "axios"

const API_URL = "https://hot-engine.vercel.app/api/suite"

// create suite
const createSuite = async (suiteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, suiteData, config)
    return response.data
}

// get all suites
const getAllSuites = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// get single suite
const getSuiteById = async (suiteId) => {
    const response = await axios.get(API_URL + `/${suiteId}`)
    return response.data
}

// update suite
const updateSuite = async (suiteId, suiteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(
        API_URL + `/${suiteId}`,
        suiteData,
        config
    )
    return response.data
}

// delete suite
const deleteSuite = async (suiteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + `/${suiteId}`, config)
    return response.data
}

const suiteServices = {
    createSuite,
    getAllSuites,
    getSuiteById,
    updateSuite,
    deleteSuite
}

export default suiteServices

