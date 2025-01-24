import React, { useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  MdOutlineCheckCircle,
  MdOutlineFileUpload,
  MdOutlinePrint,
} from "react-icons/md";
import ReservationDetails from "../components/ReservationDetails";
import { useLocation, useNavigate } from "react-router-dom";


export default function CheckoutConfirmation() {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(()=>{
    if (!location.state) {
      navigate("/booking")
    }
    document.body.scrollTop = 20
  },[])

  return (
    <div className="py-10 px-6 md:px-12 lg:px-16 md:h-[700px]">
      {location.state? (

      <div className="space-y-6">
        <div className="flex gap-2">
          <MdOutlineCheckCircle color="#008000" className="text-5xl" />
          <div>
            <h1 className="font-Grotesk text-[#008000] text-xl">
              CONGRATS! YOUR RESERVATION IS BOOKED.
            </h1>
            <p className="">
              Check {location.state.email || ""} for booking details.
            </p>
          </div>
        </div>
        <div>
          <p className="font-Grotesk text-xl">
            THANKS JOHN, YOUR BOOKING CODE IS #34885777y577
          </p>
          <p className="">
            Thank you for choosing Radisson Onyx! We look forward to welcoming
            you
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <ReservationDetails
            suite={""}
            email={location.state.email}
            checkin={location.state.checkin}
            checkout={location.state.checkout}
            name={location.state.name}
            guestCount={location.state.guestCount}
            price={location.state.price}
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
      ):null}
    </div>
  );
}
