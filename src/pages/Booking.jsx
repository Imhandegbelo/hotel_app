// import { useEffect, useState } from "react";
// import { MdOutlineDateRange } from "react-icons/md";
// import { FiUsers } from "react-icons/fi";
import CartSumarry from "../components/CartSumarry";
import RoomCard from "../components/RoomCard";
import { rooms } from "../data/roomData";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const navigate = useNavigate()
  const { cartItems, addItem, removeItem } = useCart();
  // const [guest, setGuest] = useState({});

  // useEffect(() => {
  //   const guest = localStorage.getItem("guest");
  //   if (!guest) {
  //     setGuest({ people: "", checkin: "", checkout: "" });
  //   } else {
  //     setGuest(JSON.parse(guest));
  //   }
  // }, []);

  // const handleSubmit = () => {
  //   if (guest.people === "" || guest.checkin === "" || guest.checkout === "") {
  //     toast.error("One or more fields empty");
  //     return;
  //   }
  //   if (guest.checkout < guest.checkin) {
  //     toast.error("Check-out date cannot be earlier than Check-in date");
  //     return;
  //   }
  //   if (guest.people.length < 5) {
  //     toast.error("Please state the number of guest");
  //     return;
  //   }
  //   localStorage.setItem("guest", JSON.stringify(guest));
  //   console.log("Items in cart",cartItems)
  //   navigate("/checkout", { state: { price: cartItems[0].price } });
  // };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-10 px-6 md:px-12 lg:px-16">
      <div className="w-full max-w-[748px/]">
        <p className="text-gray-500 uppercase">
          <Link to="/">Home</Link> {">"} Book a Room
        </p>

        {/* <div className="bg-gray-200/50 md:bg-gray-200 w-full rounded-3xl md:rounded-l-full md:rounded-r-full p-4 md:p-2 lg:p-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 lg:gap-4"
          >
            <div className="bg-white w-full md:max-w-[200px] border rounded-l-full rounded-r-full px-6 md:px-4 lg:px-6 lg:py-1">
              <label
                htmlFor="guests"
                className="my-0 py-0 flex items-center text-gray-500 gap-2"
              >
                <FiUsers /> Guests
              </label>
              <input
                type="text"
                id="guests"
                placeholder="2 Adults, 1 child"
                aria-placeholder="2 Adults, 1 child"
                value={guest.people}
                onChange={(e) => setGuest({ ...guest, people: e.target.value })}
                className="rounded-l-full md:w-[200px] lg:bg-white rounded-r-full focus:outline-none"
              />
            </div>

            <div className="w-full md:bg-white md:border md:border-gray-400 flex flex-col gap-4 md:gap-0 md:flex-row justify-center rounded-l-full rounded-r-full md:divide-x divide-gray-400 md:px-3 py-1">
              <div className="bg-white md:bg-transparent lg:bg-white w-full flex flex-col lg:gap-1 px-6 md:px-0 lg:px-6 lg:py-1 rounded-l-full rounded-r-full md:rounded-none md:pr-2 md:pr-0 lg:px-5">
                <label
                  htmlFor="checkin"
                  className="text-sm lg:text-base my-0 py-0 flex items-center text-gray-500 md:gap-2"
                >
                  <MdOutlineDateRange />
                  Check-in-date
                </label>
                <input
                  type="date"
                  id="checkin"
                  value={guest.checkin}
                  onChange={(e) =>
                    setGuest({ ...guest, checkin: e.target.value })
                  }
                  className="text-sm sm:text-base rounded-l-full bg-white focus:outline-none"
                />
              </div>
              <div className="bg-white md:bg-transparent lg:bg-white w-full flex flex-col lg:gap-1 px-6 md:px-0 lg:px-6 lg:py-1 rounded-l-full rounded-r-full md:rounded-none md:pr-2 md:pr-0 lg:px-5">
                <label
                  htmlFor="checkout"
                  className="text-sm lg:text-base my-0 py-0 flex items-center text-gray-500 md:gap-2"
                >
                  <MdOutlineDateRange />
                  Check-out-date
                </label>
                <input
                  type="date"
                  id="checkout"
                  value={guest.checkout}
                  onChange={(e) =>
                    setGuest({ ...guest, checkout: e.target.value })
                  }
                  className="text-sm sm:text-base rounded-r-full bg-white focus:outline-none"
                />
              </div>
            </div>
            <Button
              title="book now"
              onButtonClick={handleSubmit}
              classList="md:text-sm lg:text-base px-6 md:px-3 lg:px-6 py-3 uppercase w-full md:max-w-fit mx-auto md:mx-0"
            />
          </form>
        </div> */}
        <BookingForm />

        <section className="my-6 space-y-6 w-full">
          <h1 className="font-Grotesk text-2xl md:text-3xl">SELECT A ROOM</h1>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="space-y-4 w-full">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onAddItem={() => addItem(room)}
                />
              ))}
            </div>
            <div className="hidden md:block w-full md:w-3/6 h-fit order-first md:order-last">
              <CartSumarry
                cartItems={cartItems}
                onRemove={() => removeItem(id)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
