import axios from "axios"

const API_URL = "https://radissononyx-engine.vercel.app/api/suite"

// create suite
const createSuite = async (suiteData) => {
    const response = await axios.post(API_URL, suiteData)
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
const updateSuite = async (suiteId) => {

}

// delete suite
const deleteSuite = async (suiteId) => {

}

const suiteServices = {
    createSuite,
    getAllSuites,
    getSuiteById,
    updateSuite,
    deleteSuite
}

export default suiteServices

