import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import { createReservation, getReservation, reset } from '../../redux/features/reservation/reservationSlice'
import { toast } from 'react-toastify'

export default function BookingManagement() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { reservations, isLoading, isError, isSuccess, message } = useSelector((state) => state.reservation)

    useEffect(() => {
        if (user) dispatch(reset())
    }, [user, dispatch])

    useEffect(() => {
        if (isError) toast.error(message)

        if (isSuccess) toast.success(reservations.message)

        if (!user) navigate("/login")
        dispatch(getReservation())


    }, [user, dispatch, navigate, isError, message, isSuccess])

    console.log("reservation", reservations)
    return (
        <main className='space-y-6 px-6 md:px-12 lg:px-16 py-16'>
            <h1 className="font-Grotesk font-medium uppercase text-3xl">
                Booking Management
            </h1>
            <div className="">
                {isLoading ? (
                    <p className="inline-flex gap-4 items-center"><FaSpinner size={26} className="animate-spin text-primary" /> Getting reservations...</p>
                ) : reservations.length > 0 ? (
                    <table className="w-full">
                        <thead className='text-gray-600'>
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
                        </thead>
                        <tbody>
                            {reservations.responseData.map((res) => (
                                <tr className='py-1'>
                                    <td>{res.id}</td>
                                    <td>{`${res.firstname} ${res.lastname}`}</td>
                                    <td>{res.email}</td>
                                    <td>{res.phone}</td>
                                    <td>{res.guests}</td>
                                    <td>{res.suite}</td>
                                    <td>{new Date(res.checkin).toLocaleDateString()}</td>
                                    <td>{new Date(res.checkout).toLocaleDateString()}</td>
                                    <td>{res.price}</td>
                                    <td className={`font-medium ${res.status === 'pending' ? "text-rose-500" : "text-emerald-500"}`}>
                                        {res.status}
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
        </main >
    )
}
