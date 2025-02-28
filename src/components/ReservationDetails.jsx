import NoImage from "../assets/NoPhoto.png"
import { useEffect, useState } from "react"

export default function ReservationDetails({
  name,
  price,
  email,
  suite,
  checkin,
  checkout,
  guestCount,
}) {

  const [nights, setNights] = useState(1)

  useEffect(() => {
    const guestDetails = JSON.parse(localStorage.getItem("guest"));
    const checkin = new Date(guestDetails.checkin)
    const checkout = new Date(guestDetails.checkout)
    setNights((new Date(checkout) - new Date(checkin)) / (24 * 60 * 60 * 1000))
  }, []);

  return (
    <div className="p-4 w-full border space-y-6 rounded-2xl">
      <h3 className="font-Grotesk text-xl">RESERVATION DETAILS</h3>
      <div>
        <strong className="font-semibold">Radisson-onyx</strong>
        <p className="">
          Agu-Akwa by Immigration junction Ezeuzu, Awka, Anambra State, 420102
          <br /> +234 (0) 806 042 6636
        </p>
      </div>
      <div className="flex gap-4">
        <img src={NoImage} alt="" className="w-full md:w-1/5 h-auto border rounded" />
        <div className="flex flex-col md:justify-between w-full space-y-2">
          <div className="flex justify-between w-full">
            <div className="-space-y-1">
              <strong className="capitalize">{suite}</strong>
              <p>Room only</p>
              <p>{checkin} - {checkout}</p> <p>{guestCount}</p>
              <p>{nights} Night stay</p>
            </div>
            <p className="font-bold">{price}</p>
          </div>
          <div className="-space-y-1">
            <strong>Guest details</strong>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
