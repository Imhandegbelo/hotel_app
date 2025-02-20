import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import { createReservation, getReservations, reset } from '../../redux/features/reservation/reservationSlice'
import { toast } from 'react-toastify'
import { MdOutlineModeEdit } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { Dialog, DialogTitle, DialogPanel, Button } from '@headlessui/react'
import ReservationForm from '../../components/ReservationForm'

export default function BookingManagement() {
    const navigate = useNavigate()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [suiteId, setSuiteId] = useState("")
    const [selectedReservation, setSelectedReservation] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { reservations, isLoading, isError, isSuccess, message } = useSelector((state) => state.reservation)

    // useEffect(() => {
    //     if (user) dispatch(reset())
    //     // dispatch()
    // }, [user, dispatch])
    useEffect(() => {
        if (isError) {
            toast.error(message)
        } else if (isSuccess) {
            toast.success(message)
        }
    }, [isSuccess, isError, message])

    useEffect(() => {
        if (isError) toast.error(message)

        if (!user) navigate("/login")

        dispatch(getReservations())

    }, [user, dispatch, navigate])

    const handleOpen = (res, suite_id) => {
        setSuiteId(suite_id)
        setSelectedReservation(res)
        setIsFormOpen(true)
    }


    return (
        <main className='space-y-6 px-6 md:px-12 lg:px-16 py-16'>
            <div className="flex justify-between">

                <h1 className="font-Grotesk font-medium uppercase text-3xl">
                    Booking Management
                </h1>
                <button onClick={""}>Create Reservation</button>
            </div>
            <div className="">
                {isLoading ? (
                    <p className="inline-flex gap-4 items-center"><FaSpinner size={26} className="animate-spin text-primary" /> Getting reservations...</p>
                ) : reservations.length > 0 ? (
                    <table className="w-full">
                        <thead className='text-gray-600 text-left'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>guests</th>
                                <th>suite</th>
                                <th>checkin</th>
                                <th>checkout</th>
                                <th>price</th>
                                <th>status</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.responseData.map((res, index) => (
                                <tr key={res._id} className='py-1 border-y'>
                                    <td>{`${index + 1}`}</td>
                                    <td>{`${res.firstname} ${res.lastname}`}</td>
                                    <td>{res.email}</td>
                                    <td>{res.phone}</td>
                                    <td>{res.guests}</td>
                                    <td>{res.suite}</td>
                                    <td>{res.checkin}</td>
                                    <td>{res.checkout}</td>
                                    <td>{res.price + 14000}</td>
                                    <td className={`font-medium ${res.status.startsWith("p") ? "text-rose-500" : "text-emerald-500"}`}>
                                        {res.status}
                                    </td>
                                    <td className="flex gap-2">
                                        {/* <button onClick={""} className="bg-emerald-500"><MdOutlineModeEdit className="text-primary" /></button> */}
                                        {/* <button onClick={""}><FcCancel/></button> */}
                                        <button onClick={() => handleOpen(res, res.suite_id)}>
                                            <FaRegEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3 className='text-center text-neutral-500 text-3xl'>
                        There are no reservations yet
                    </h3>
                )}

            </div>
            <Dialog open={isFormOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsFormOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-xl bg-white shadow-3xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base font-medium">
                                Take Action
                            </DialogTitle>
                            {selectedReservation && <ReservationForm reservation={selectedReservation} suite={suiteId} />}
                            <div className="mt-4 flex gap-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={""}
                                >
                                    Accept
                                </Button>
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={""}
                                >
                                    Decline
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </main >
    )
}
