import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getTotalPrice } from "../utils/totalPrice";
import { formatNum } from "../utils/formatNum";
import NoImage from "../assets/NoPhoto.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function CartSumarry() {
  const { removeItem, cartItems } = useCart();
  const [checks, setChecks] = useState({});
  const [guestCount, setGuestCount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const guestDetails = JSON.parse(localStorage.getItem("guest"));
    if(!guestDetails){
      setChecks({ in: "", out: "" });
      setGuestCount("");
    } else {
      const checkin = new Date(guestDetails.checkin).toDateString() || "";
      const checkout = new Date(guestDetails.checkout).toDateString() || "";
      setChecks({ in: checkin, out: checkout });
      setGuestCount(guestDetails.people);
    }
  }, []);

  return (
    <div className="border p-4 space-y-6 rounded-xl overflow-y-auto">
      <h3 className="font-Grotesk text-2xl font-semibold">
        YOUR CART: {cartItems.length} ITEM
      </h3>
      <div className="border rounded-lg p-3 bg-gray-100">
        <div className="font-Grotesk flex gap-2 items-center lg:justify-between">
          <p className="inline-flex justify-between">TOTAL</p>
          <p className="text-lg font-semibold">
            {formatNum(getTotalPrice(cartItems) + 14000)}
          </p>
        </div>
        <p className="text-left mb-4">Including taxes and fees</p>

        {cartItems.length > 0 ? (
          <>
            <Link
              to="/booking"
              className="block w-full text-center rounded-l-full rounded-r-full border border-primary py-3 text-primary hover:text-white hover:bg-primary"
            >
              Change room
            </Link>
            <Button
              title="Checkout"
              classList="py-3 w-full mt-3"
              onButtonClick={() =>
                navigate("/checkout", { state: { price: cartItems[0].cost } })
              }
            />
          </>
        ) : (
          <Link
              to="/booking"
              className="block w-full text-center rounded-l-full rounded-r-full border border-primary py-3 text-primary hover:text-white hover:bg-primary"
            >
              Add a room
            </Link>
        )}
      </div>
      {cartItems.length === 0 ? (
        <></>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 p-2 rounded-xl border space-y-4 text-left"
            >
              <img src={NoImage} alt={item.name} className="w-full" />
              <div className="flex justify-between">
                <div className="">
                  <p className="font-semibold">{item.name}</p>
                  <p className="">Best Flexible Rate - Room Only</p>
                </div>
                <p className="font-bold">{formatNum(item.cost)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Taxes and fees (One time pay)</p>
                <p className="font-bold">₦14,000</p>
              </div>

              <p>
                {checks.in} - {checks.out} <br /> {guestCount}
              </p>
              <div className="flex gap-5">
                <button className="font-semibold text-primary underline">
                  Edit
                </button>
                <button
                  onClick={removeItem}
                  className="font-semibold text-primary underline"
                >
                  Remove
                </button>
                <button className="font-semibold text-primary underline">
                  Add coupon
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cartItems.lenght > 0 && (
        <div className="border rounded-md p-2 space-y-4">
          <h3 className="font-Grotesk text-lg">PRICE DETAILS</h3>
          <div>
            <div className="">
              <p className="text-">{cartItems[0].name}</p>
              <p className="">Best Flexible Rate - Room Only</p>
            </div>
          </div>
          <u className="font-semibold font-semibold text-primary">
            1 NIGHT STAY
          </u>
          <div className="flex justify-between">
            <p className="font-bold">TOTAL</p>
            <p className="font-bold">{formatNum(cartItems[0].cost + 14000)}</p>
          </div>

          <p>INCLUDING TAXES AND FEES</p>
        </div>
      )}
    </div>
  );
}
