import { useState, useEffect } from 'react'
import TextInput from "./TextInput"
import { useSelector, useDispatch } from 'react-redux'
import { getAllSuites } from "../redux/features/suite/suiteSlice"
import { createReservation, reset } from "../redux/features/reservation/reservationSlice"
import {
    Select,
    Field,
    // Label,
    Button
} from "@headlessui/react";
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'



export default function NewReservationForm({ suite_id }) {
    const dispatch = useDispatch()
    const { isError, isSuccess, message } = useSelector((state) => state.reservation)
    const { suites } = useSelector((state) => state.suite)
    const [loading, setLoading] = useState(false)
    const [reservationData, setReservationData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        guests: "",
        suite_id: "",
        checkin_date: "",
        checkout_date: "",
        price: "",
        status: ""
    })

    useEffect(() => {
        dispatch(getAllSuites())
    }, [])

    const hasEmptyValues = (obj) => {
        for (let key in obj) {
            if (obj[key] === "") {
                return true
            }
        }
        return false
    }


    const handleCreateReservation = () => {
        if (hasEmptyValues(reservationData)) {
            toast.error("All fields are required")
            return
        }
        setLoading(true)
        dispatch(createReservation(reservationData))
        isError ? toast.error(message) : null
        isSuccess ? toast.success(message) : null
        setLoading(false)
        dispatch(reset())
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
                        value={reservationData.checkin_date}
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
                    <Field className="w-full">
                        {/* <Label>Suite</Label> */}
                        <Select
                            name="status"
                            defaultValue={"pending"}
                            className="capitalize w-full py-2 px-3 border rounded-xl"
                            value={reservationData.status}
                            onChange={(value) => setReservationData({ ...reservationData, status: value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="pending">Declined</option>
                            <option value="pending">Approved</option>
                        </Select>
                    </Field>
                </div>

                <div className="flex justify-between flex-col flex-row/">
                    <Button
                        className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-gray-600/50 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-600/50 disabled:bg-gray-600/50"
                        onClick={handleCreateReservation}
                    >
                        {loading && <FaSpinner className="animate-spin mr-2 text-white" />} Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}