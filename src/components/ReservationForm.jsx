import { useState, useEffect } from 'react'
import Button from "./Button"
import TextInput from "./TextInput"
import { useSelector, useDispatch } from 'react-redux'
import { getAllSuites } from "../redux/features/suite/suiteSlice"
import { updateReservation } from "../redux/features/reservation/reservationSlice"
import {
    Select,
    Field,
    Label,
} from "@headlessui/react";
// import { updateReservation } from "../redux/features/reservation/reservationSlice"



export default function ReservationForm({ reservation, suite_id }) {
    const dispatch = useDispatch()
    const { isError, isLoading, isSuccess, message } = useSelector((state) => state.reservation)
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
        // dispatch(getReservationById(res_id))
    }, [])

    const handleReservationUpdate = () => {

    }

    const handleAccept = () => {
        setAcceptLoading(true)
        const reservationData = { status: "approved" }
        dispatch(updateReservation({ reservationId: res_id, reservationData }))
        if (isSuccess) toast.success(message)
        if (isError) toast.success(message)
        setAcceptLoading(false)
    }

    const handleDecline = () => {
        setDeclineLoading(true)
        const reservationData = { status: "declined" }
        dispatch(updateReservation({ reservationId: res_id, reservationData }))
        if (isSuccess) toast.success(message)
        if (isError) toast.success(message)
        setDeclineLoading(false)
    }


    return (
        <div className="">
            <h4>ReservationForm</h4>
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
                        <Label>Suite</Label>
                        <Select
                            name="suite_id"
                            defaultValue={suite_id}
                            className="w-full"
                            onChange={(value) => setReservationData({ ...reservationData, suite_id: value })}
                        >
                            {suites?.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </Select>
                    </Field>
                    {/* <TextInput
                        type="text"
                        id="suite"
                        label="Suite"
                        placeholder="Suite"
                        maxWidth=""
                        value={reservationData.suite_id}
                        onChange={(value) => setReservationData({ ...reservationData, suite_id: value })}
                    /> */}
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <TextInput
                        type="date"
                        id="checkin_date"
                        label="Checkin Date"
                        placeholder="Checkin Date"
                        maxWidth=""
                        value={new Date(reservationData.checkin_date)}
                        onChange={(value) => setReservationData({ ...reservationData, checkin_date: value })}
                    />
                    <TextInput
                        type="date"
                        id="checkout_date"
                        label="Checkout Date"
                        placeholder="Checkout Date"
                        maxWidth=""
                        value={reservationData.checkout_date}
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

                <div className="mt-4 flex gap-4">
                    <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleAccept}
                    >
                        {acceptLoading && <FaSpinner className="animate-spin mr-2" />} Accept
                    </Button>
                    <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleDecline}
                    >
                        {declineLoading && <FaSpinner className="animate-spin mr-2" />} Decline
                    </Button>
                </div>
            </form>
        </div>
    )
}
