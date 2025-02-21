import { useEffect, useState } from "react";
import { getTotalPrice } from "../utils/totalPrice";
import { formatNum } from "../utils/formatNum";
import { Link } from "react-router-dom";

export default function PriceDetails({
  items,
  suite,
  guestCount,
}) {
  const [checks, setChecks] = useState({});

  useEffect(() => {
    const guestDetails = JSON.parse(localStorage.getItem("guest"));
    const checkin = new Date(guestDetails.checkin).toDateString();
    const checkout = new Date(guestDetails.checkout).toDateString();
    setChecks({ in: checkin, out: checkout });
  }, []);

  return (
    <div className="border p-4 space-y-6 lg:w-6/12 h-fit rounded-xl">
      <h3 className="font-Grotesk text-2xl font-semibold">PRICE DETAILS</h3>
      <div>
        <div className="flex justify-between">
          <p className="inline-flex justify-between">TOTAL</p>
          <p className="font-Grotesk text-lg">{formatNum(getTotalPrice(items) + 14000)}</p>
        </div>
        <p>Including taxes and fees</p>
      </div>
      <div className="bg-gray-50 p-2 rounded-xl border space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between">
            <div>
              <p className="font-semibold capitalize">{item.name}</p>
              <p>Best Flexible Rate - Room Only</p>
            </div>
            <p className="font-bold">{item.cost}</p>
          </div>
        ))}
        <div className="flex justify-between">
          <p className="font-semibold">Taxes and fees</p>
          <p className="font-bold">₦14,000</p>
        </div>

        <u className="font-semibold font-semibold text-primary">1 NIGHT STAY</u>

        <p>
          {checks.in} - {checks.out} <br /> {guestCount}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="font-bold">TOTAL</p>
        <p className="font-bold">{formatNum(getTotalPrice(items) + 14000)}</p>
      </div>

      <p>INCLUDING TAXES AND FEES</p>

      <Link
        to="/booking"
        className="block lg:w-fit border border-primary text-primary text-center rounded-l-full rounded-r-full px-6 py-3 md:py-4 hover:bg-primary hover:text-white transition-all duration-200"
      >
        ADD A ROOM
      </Link>
    </div>
  );
}
