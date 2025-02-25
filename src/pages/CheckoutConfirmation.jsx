import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  MdOutlineCheckCircle,
  MdOutlineFileUpload,
  MdOutlinePrint,
} from "react-icons/md";
import ReservationDetails from "../components/ReservationDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getReservationById } from "../redux/features/reservation/reservationSlice"
import { toast } from "react-toastify"


export default function CheckoutConfirmation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [guest, setGuest] = useState({})
  const [reservationId, setReservationId] = useState("")
  const { reservations } = useSelector((state) => state.reservation)

  useEffect(() => {
    document.body.scrollTop = 20
    let data = JSON.parse(localStorage.getItem("formData"))
    let guest = JSON.parse(localStorage.getItem("guest"))
    let reservationId = localStorage.getItem("res_id")

    if (!data || !guest || !reservationId) navigate("/booking")
    setReservationId(reservationId)
    setFormData(data)
    setGuest(guest)
    getReservation()
    // toast.success("Reservation successfull")

    clearStorage()

  }, [])

  const clearStorage = () => {
    localStorage.removeItem("res_id")
    localStorage.removeItem("formData")
    localStorage.removeItem("guest")
  }

  const getReservation = () => {
    dispatch(getReservationById(reservationId))
  }

  return (
    <div className="py-10 px-6 md:px-12 lg:px-16 md:h-[700px]">
      <div className="space-y-6">
        <div className="flex gap-2">
          <MdOutlineCheckCircle color="#008000" className="text-5xl" />
          <div>
            <h1 className="font-Grotesk text-[#008000] text-xl">
              CONGRATS! YOUR RESERVATION IS BOOKED.
            </h1>
            <p className="">
              Check {formData.email || ""} for booking details.
            </p>
          </div>
        </div>
        <div>
          <p className="font-Grotesk text-xl uppercase">
            THANKS {formData.firstname}, YOUR BOOKING CODE IS <span className="text-primary">#{reservationId}</span>
          </p>
          <p className="">
            Thank you for choosing Radisson Onyx! We look forward to welcoming
            you
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <ReservationDetails
            suite={reservations.name}
            email={formData.email}
            checkin={guest.checkin}
            checkout={guest.checkout}
            name={formData.firstname}
            guestCount={guest.people}
            price={reservations.cost}
          />

          <div className="border rounded-2xl font-semibold p-6 h-fit text-sm w-2/6">
            <button className="flex items-center gap-2 text-[#FEA116] py-2 px-4 border border-transparent hover:border hover:border-[#FEA116] rounded uppercase">
              <MdOutlinePrint />
              Print
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap text-[#FEA116] py-2 px-4 border border-transparent hover:border hover:border-[#FEA116] rounded uppercase">
              <FaRegCalendarAlt />
              Add to calendar
            </button>
            <button className="flex items-center gap-2 text-[#FEA116] py-2 px-4 border border-transparent hover:border hover:border-[#FEA116] rounded uppercase">
              <MdOutlineFileUpload />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
