import { useState, useEffect } from 'react'
import Button from "./Button"
import TextInput from "./TextInput"
import { useSelector, useDispatch } from 'react-redux'
import { getSuiteById } from "../redux/features/suite/suiteSlice"
import { updateReservation } from "../redux/features/reservation/reservationSlice"



export default function ReservationForm({ res_id, suite_id }) {
    const dispatch = useDispatch()
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
    const { reservations, isError, isLoading, isSuccess, message } = useSelector((state) => state.reservation)
    const { suite } = useSelector((state) => state.suite)

    useEffect(() => {
        dispatch(getSuiteById(suite_id))
        // getRes
    }, [dispatch])

    const handleReservationUpdate = () => {

    }

    const handleAccept = () =>{
        const reservationData = {status:"approved", id:res_id}
        dispatch(updateReservation(reservationData))
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
                    <TextInput
                        type="text"
                        id="suite"
                        label="Suite"
                        placeholder="Suite"
                        maxWidth=""
                        value={reservationData.suite_id}
                        onChange={(value) => setReservationData({ ...reservationData, suite_id: value })}
                    />
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
                    <TextInput
                        type="string"
                        id="status"
                        label="Status"
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
                        Accept
                    </Button>
                    <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={""}
                    >
                        Decline
                    </Button>
                </div>

                {/* <Button
                    type="submit"
                    title="Login"
                    classList="w-full py-2"
                    disabled={isLoading}
                    onButtonClick={handleReservationUpdate}
                /> */}
            </form>
        </div>
    )
}
