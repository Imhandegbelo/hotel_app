/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import TextInput from "./TextInput"
import { useSelector, useDispatch } from 'react-redux'
import { getAllSuites } from "../redux/features/suite/suiteSlice"
import { updateReservation, getReservations } from "../redux/features/reservation/reservationSlice"
import {
    Select,
    Field,
    // Label,
    Button
} from "@headlessui/react";
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function ReservationForm({ reservation, suite_id }) {
    const dispatch = useDispatch()
    const { reservations, isError, isLoading, isSuccess, message } = useSelector((state) => state.reservation)
    const { suites } = useSelector((state) => state.suite)
    const [reservationData, setReservationData] = useState({
        firstname: reservation.firstname || "",
        lastname: reservation.lastname || "",
        email: reservation.email || "",
        phone: reservation.phone || "",
        guests: reservation.guests || "",
        suite_id: reservation.suite_id || "",
        checkin_date: reservation.checkin_date || "",
        checkout_date: reservation.checkout_date || "",
        price: reservation.price || "",
        status: reservation.status || ""
    })
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [declineLoading, setDeclineLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllSuites())
    }, [])


    const handleReservationUpdate = () => {
        try {
            dispatch(updateReservation(reservationData))
        } catch (error) {
            toast.error(message)
        }
    }

    const handleAccept = () => {
        try {
            setAcceptLoading(true)
            const reservationData = { status: "approved" }
            dispatch(updateReservation({ reservationId: reservation._id, reservationData }))
            setAcceptLoading(false)
            if (isSuccess) {
                dispatch(getReservations())
                toast.success(message)
            }
            if (isError) toast.success(message)
        } catch (error) {
            setAcceptLoading(false)
            toast.error(error)
        } finally {
            setAcceptLoading(false)
        }
    }

    const handleDecline = () => {
        try {
            setDeclineLoading(true)
            const reservationData = { status: "declined" }
            dispatch(updateReservation({ reservationId: reservation._id, reservationData }))
            if (isSuccess) toast.success(message)
            if (isError) toast.success(message)
            setDeclineLoading(false)
        } catch (error) {
            toast.error(error)
        } finally {
            setDeclineLoading(false)
        }
    }


    return (
        <div className="space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="text"
                        id="firstname"
                        label="First name"
                        placeholder="First name"
                        maxWidth=""
                        value={reservationData.firstname}
                        onChange={(value) => setReservationData({ ...reservationData, firstname: value })}
                    />
                    <TextInput
                        type="text"
                        id="lastname"
                        label="Last name"
                        placeholder="Last name"
                        maxWidth=""
                        value={reservationData.lastname}
                        onChange={(value) => setReservationData({ ...reservationData, lastname: value })}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="Email"
                        maxWidth=""
                        value={reservationData.email}
                        onChange={(value) => setReservationData({ ...reservationData, email: value })}
                    />
                    <TextInput
                        type="tel"
                        id="Phone"
                        label="Phone"
                        placeholder="Phone"
                        maxWidth=""
                        value={reservationData.phone}
                        onChange={(value) => setReservationData({ ...reservationData, phone: value })}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="text"
                        id="guests"
                        label="Guests"
                        placeholder="Guests"
                        maxWidth=""
                        value={reservationData.guests}
                        onChange={(value) => setReservationData({ ...reservationData, guests: value })}
                    />
                    <Field className="w-full">
                        {/* <Label>Suite</Label> */}
                        <Select
                            name="suite_id"
                            defaultValue={suite_id}
                            className="capitalize w-full py-2 px-3 border rounded-xl"
                            onChange={(value) => setReservationData({ ...reservationData, suite_id: value })}
                        >
                            {suites?.map((s) => (
                                <option key={s._id} value={s._id} className="capitalize">{s.name}</option>
                            ))}
                        </Select>
                    </Field>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="date"
                        id="checkin_date"
                        label="Checkin Date"
                        placeholder="Checkin Date"
                        maxWidth=""
                        value={reservationData.checkin_date.slice(0, 10)}
                        onChange={(value) => setReservationData({ ...reservationData, checkin_date: value })}
                    />
                    <TextInput
                        type="date"
                        id="checkout_date"
                        label="Checkout Date"
                        placeholder="Checkout Date"
                        maxWidth=""
                        value={reservationData.checkout_date.slice(0, 10)}
                        onChange={(value) => setReservationData({ ...reservationData, checkout_date: value })}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="string"
                        id="price"
                        label="Price"
                        placeholder="Price"
                        maxWidth=""
                        value={reservationData.price}
                        onChange={(value) => setReservationData({ ...reservationData, price: value })}
                    />
                    <TextInput
                        type="string"
                        id="status"
                        label="Status"
                        disabled
                        placeholder="Status"
                        maxWidth=""
                        value={reservationData.status}
                        onChange={(value) => setReservationData({ ...reservationData, status: value })}
                    />
                </div>

                <div className="flex justify-between flex-col flex-row/">
                    <Button
                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-gray-600/50 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-600/50 disabled:bg-gray-600/50"
                        onClick={handleReservationUpdate}
                    >
                        {isLoading && <FaSpinner className="animate-spin mr-2 text-white" />} Edit
                    </Button>

                    <div className="mt-4 flex gap-4">
                        <Button
                            className="inline-flex items-center gap-2 rounded-md bg-[#07bc0c] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-[#07bc0c]/50 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-[#07bc0c]/50 disabled:bg-[#07bc0c]/50"
                            onClick={handleAccept}
                        >
                            {acceptLoading && <FaSpinner className="animate-spin mr-2 text-white" />} Accept
                        </Button>
                        <Button
                            className="inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-primary/50 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-primary/50 disabled:bg-primary/50"
                            onClick={handleDecline}
                        >
                            {declineLoading && <FaSpinner className="animate-spin mr-2 text-white" />} Decline
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
