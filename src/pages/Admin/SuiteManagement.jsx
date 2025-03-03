/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSpinner, FaTrash, FaPen } from 'react-icons/fa'
import { getAllSuites, deleteSuite } from '../../redux/features/suite/suiteSlice'
import { toast } from 'react-toastify'
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogTitle, DialogPanel, Button } from '@headlessui/react'
import ReservationForm from '../../components/ReservationForm'
import NewSuiteForm from '../../components/SuiteForm'

export default function SuiteManagement() {
    const navigate = useNavigate()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isNewForm, setIsNewForm] = useState(false)
    const [isWarning, setIsWarning] = useState(false)
    const [toDelete, setToDelete] = useState("")
    const [suiteId, setSuiteId] = useState("")
    const [selectedSuite, setSelectedSuite] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { suites, isLoading, isError, message } = useSelector((state) => state.suite)



    useEffect(() => {
        if (!user) navigate("/login")
        dispatch(getAllSuites())
        if (isError) {
            toast.error(message)
        }
    }, [user, isFormOpen, isNewForm, message, isError, dispatch, navigate])

    const handleOpen = (res, suite_id) => {
        setSuiteId(suite_id)
        setSelectedSuite(res)
        setIsFormOpen(true)
    }

    const handleDeleteConfirm = (id) => {
        setToDelete(id)
        setIsWarning(true)
    }
    const handleDelete = () => {
        dispatch(deleteSuite(toDelete))
    }

    return (
        <main className='space-y-6 px-6 md:px-12 lg:px-16 py-16'>
            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                <h1 className="font-Grotesk font-medium uppercase text-3xl">
                    Suite Management
                </h1>
                <Button
                    className="inline-flex items-center justify-center text-white py-2 px-3 rounded bg-[#0F172B] hover:bg-[#0F172B]/80"
                    onClick={() => setIsNewForm(true)}
                >
                    <FaPlus className="mr-2" /> Create Suite
                </Button>
            </div>
            <div className="w-full overflow-auto">
                {isLoading ? (
                    <p className="inline-flex gap-4 items-center"><FaSpinner size={26} className="animate-spin text-primary" /> Getting reservations...</p>
                ) : suites.length > 0 ? (
                    <table className="w-full">
                        <thead className='text-gray-600 text-left'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Bedrooms</th>
                                <th>Size</th>
                                <th>Max guests</th>
                                <th>type</th>
                                <th>cost</th>
                                {/* <th>cost</th> */}
                                {/* <th>status</th> */}
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suites.map((suite, index) => (
                                <tr key={suite._id} className='py-2 border-y hover:bg-gray-100'>
                                    <td>{`${index + 1}`}</td>
                                    <td className="capitalize">{suite.name}</td>
                                    <td>{suite.bedroom}</td>
                                    <td>{suite.size}</td>
                                    <td>{suite.guests}</td>
                                    <td>{suite.type}</td>
                                    <td>{suite.cost}</td>
                                    {/* <td className={`font-medium ${res.status === "pending" ? "text-gray-500" : res.status === "approved" ? "text-[#07bc0c]" : "text-primary"}`}>
                                        {res.status}
                                    </td> */}
                                    <td className="flex items-center justify-between px-2">
                                        <button className="w-fit" title="Edit suite" onClick={() => handleOpen(suite)}>
                                            <FaPen className="mx-auto" color="#008000" />
                                        </button>
                                        <button className="w-fit" title="Delete suite" onClick={() => handleDeleteConfirm(suite._id)}>
                                            <FaTrash className="mx-auto text-primary" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3 className='text-center text-neutral-500 text-3xl'>
                        There are no suites yet
                    </h3>
                )}

            </div>

            {/* For editing suites */}
            <Dialog open={isFormOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsFormOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-xl bg-white shadow-3xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="flex justify-between text-base mb-6 font-medium">
                                Suite Form
                            </DialogTitle>
                            {selectedSuite && <ReservationForm suite={selectedSuite} />}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* For creating suites */}
            <Dialog open={isNewForm} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsNewForm(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-xl bg-white shadow-3xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base mb-6 font-medium">
                                Suite Form
                            </DialogTitle>
                            <NewSuiteForm />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* For confirming suite deletion */}
            <Dialog open={isWarning} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsWarning(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="text-center w-full max-w-sm rounded-xl bg-white shadow-3xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base text-primary mb-6 font-medium">
                                Warning!
                            </DialogTitle>
                            <div>
                                <p>The selected suite will be deleted. Are you sure you want to delete this suite?</p>
                                <div className="flex justify-between">
                                    <Button
                                        onClick={() => setIsWarning(false)}
                                        className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        className="bg-primary text-white hover:bg-primary/50 px-4 py-2"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </main >
    )
}
