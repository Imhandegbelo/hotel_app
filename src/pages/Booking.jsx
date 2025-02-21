import { useEffect, useState } from "react";
import CartSumarry from "../components/CartSumarry";
import RoomCard from "../components/RoomCard";
// import { rooms } from "../data/roomData";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useSelector, useDispatch } from "react-redux"
import { getAllSuites } from "../redux/features/suite/suiteSlice"
import { FaSpinner } from "react-icons/fa"

export default function Booking() {
  const { cartItems, addItem, removeItem } = useCart();
  const dispatch = useDispatch()
  const { suites, isLoading } = useSelector((state) => state.suite)

  useEffect(() => {
    document.body.scrollTop = 20;
    dispatch(getAllSuites())
  }, []);

  const handleAddItem = (room) => {
    addItem(room)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-10 px-6 md:px-12 lg:px-16">
      <div className="w-full max-w-[748px/]">
        <p className="text-gray-500 my-4 uppercase">
          <Link to="/">Home</Link> {">"} Book a Room
        </p>

        <BookingForm />

        <section className="my-6 space-y-6 w-full">
          <h1 className="font-Grotesk text-2xl md:text-3xl">SELECT A ROOM</h1>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {isLoading ? <p className="inline-flex gap-4 items-center">
              <FaSpinner size={26} className="animate-spin text-primary" /> Loading...
            </p> : (
              <>
                <div className="space-y-4 w-full">
                  {suites.map((s) => (
                    <RoomCard
                      key={s._id}
                      room={s}
                      onAddItem={() => handleAddItem(s)}
                    />
                  ))}
                </div>
                <div className="hidden md:block w-full md:w-3/6 h-fit order-first md:order-last">
                  <CartSumarry
                    cartItems={cartItems}
                    onRemove={() => removeItem(id)}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
