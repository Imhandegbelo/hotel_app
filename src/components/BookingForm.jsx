/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6"
// import { useCart } from "../context/CartContext";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

export default function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation()
  // const { cartItems } = useCart();
  const [guest, setGuest] = useState({ people: "", checkin: "", checkout: "" })
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adultCount, setAdultCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const storedGuest = localStorage.getItem("guest");
    if (storedGuest) {
      const Guest = JSON.parse(storedGuest)
      setGuest({ ...Guest });
      let people = Guest.people
      let adultChild = people.split(" ")
      setAdultCount(Number(adultChild[0]))
      setChildCount(adultChild[2] ? Number(adultChild[2]) : 0)
    }
  }, []);

  useEffect(() => {
    if (adultCount > 0) {
      localStorage.setItem("guest", JSON.stringify({ ...guest, people: formatEntry(adultCount, childCount) }))
    }
  }, [adultCount, childCount])


  useEffect(() => {
    location.pathname === "/booking" ? setShowButton(false) : setShowButton(true)
  }, [location])

  const formatEntry = (adult, child) => {
    let guest_list = guest.people

    guest_list = adult > 0 ? `${Number(adult)} Adults` : ""
  
    guest_list += child > 0 ? `, ${Number(child)} Children` : ""
 
    return guest_list
  }

  const hasEmptyValue = (obj) => {
    for (const key in obj) {
      if (obj[key] === "") {
        return true;
      }
    }
    return false
  }

  const handleSubmit = () => {
    localStorage.setItem("guest", JSON.stringify({ ...guest, people: formatEntry(adultCount, childCount) }))

    if (hasEmptyValue(guest)) {
      toast.error("One or more fields empty");
    }

    if (new Date(checkin) < new Date()) {
      toast.error("Checkin date cannot be earlier than today")
      return
    }

    if (new Date(checkout) < new Date(checkin)) {
      toast.error("Checkout date cannot be earlier than Checkin date");
      return;
    }

    navigate("/booking");
  };

  const handleDateChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setGuest({ ...guest, [name]: value })
    localStorage.setItem("guest", JSON.stringify({ ...guest, [name]: value }))
  }

  const addAdult = () => {
    setAdultCount(adultCount + 1)
    setGuest({ ...guest, people: formatEntry(adultCount, childCount) })
    // localStorage.setItem("guest", JSON.stringify({ ...guest }))
  }
  const reduceAdult = () => {
    setAdultCount(adultCount - 1)
    setGuest({ ...guest, people: formatEntry(adultCount, childCount) })
    
    // localStorage.setItem("guest", JSON.stringify({ ...guest }))
  }
  const addChild = () => {
    setChildCount(childCount + 1)
    setGuest({ ...guest, people: formatEntry(adultCount, childCount) })

    // localStorage.setItem("guest", JSON.stringify({ ...guest }))
  }
  const reduceChild = () => {
    setChildCount(childCount - 1)
    setGuest({ ...guest, people: formatEntry(adultCount, childCount) })
   
    // localStorage.setItem("guest", JSON.stringify({ ...guest }))
  }

  return (
    <div className="bg-gray-200/50 md:bg-gray-200 w-full rounded-3xl md:rounded-l-full md:rounded-r-full p-4 md:p-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2"
      >
        <div className="relative bg-white w-full md:max-w-[200px] border rounded-l-full rounded-r-full px-6 md:px-4">
          <label
            htmlFor="guests"
            className="my-0 py-0 flex items-center gap-2"
          >
            <FiUsers className="text-gray-500" /> Guests
          </label>
          <input
            type="text"
            id="guests"
            placeholder="2 Adults, 1 child"
            aria-placeholder="2 Adults, 1 child"
            value={formatEntry(adultCount, childCount)}
            onClick={() => setIsModalOpen(true)}
            className="rounded-l-full w-full md:w-[150px] cursor-pointer md:bg-transparent l/g:bg-white rounded-r-full focus:outline-none"
          />
        </div>

        <div className="w-full md:bg-white md:border md:border-gray-400 flex flex-col gap-4 md:gap-0 md:flex-row justify-center rounded-l-full rounded-r-full md:divide-x divide-gray-400 md:px-3 py-1">
          <div className="bg-white md:bg-transparent w-full flex flex-col px-2 md:mx-0 rounded-l-full rounded-r-full md:rounded-none md:mr-2 md:mr-0">
            <label
              htmlFor="checkin"
              className="text-sm my-0 py-0 flex items-center md:gap-2"
            >
              <MdOutlineDateRange className="text-gray-500" />
              Check-in-date
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              value={guest.checkin}
              // onChange={(e) => setCheckin( e.target.value )}
              onChange={handleDateChange}
              // onBlur={handleSave}
              className="text-sm sm:text-base rounded-l-full bg-white focus:outline-none"
            />
          </div>
          <div className="bg-white md:bg-transparent w-full flex flex-col px-2 md:mx-0 rounded-l-full rounded-r-full md:rounded-none md:mr-2 md:mr-0">
            <label
              htmlFor="checkout"
              className="text-sm my-0 py-0 flex items-center md:gap-2"
            >
              <MdOutlineDateRange className="text-gray-500" />
              Check-out-date
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              value={guest.checkout}
              onChange={handleDateChange}
              // onBlur={handleSave}
              className="text-sm sm:text-base rounded-r-full bg-white focus:outline-none"
            />
          </div>
        </div>
        {showButton && <Button
          title="book now"
          onButtonClick={handleSubmit}
          classList="md:text-sm px-6 md:px-3 py-3 uppercase whitespace-nowrap w-full md:max-w-fit mx-auto md:mx-0"
        />}
      </form>

      <Dialog open={isModalOpen} as="div" className="absolute z-10 focus:outline-none" onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl space-y-4 bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="font-Grotesk font-medium">
                Guests
              </DialogTitle>
              <div className="flex justify-between border border-gray-200 bg-white px-4 py-2 rounded-l-full rounded-r-full">
                <div>
                  <p className="font-medium">Adults</p>
                  {/* <p>{adultCount}</p> */}
                  <input
                    type="number"
                    className="border-none"
                    value={adultCount}
                  // onChange={handleAdultChange}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={adultCount === 0}
                    onClick={() => reduceAdult()}
                    className="p-1"
                  >
                    <FaMinus size={20} className={`${adultCount < 1 ? "text-gray-400" : "text-primary"}`} />
                  </button>
                  <button
                    onClick={() => addAdult()}
                    className="p-1"
                  >
                    <FaPlus size={20} className="text-primary" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between border border-gray-200 bg-white px-4 py-2 rounded-l-full rounded-r-full">
                <div>
                  <p className="font-medium">Children</p>
                  {/* <p>{childCount}</p> */}
                  <input
                    type="number"
                    className="border-none"
                    value={childCount}
                  // onChange={handleChildChange}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={childCount === 0}
                    onClick={() => reduceChild()}
                    className="p-1"
                  >
                    <FaMinus size={20} className={`${childCount < 1 ? "text-gray-400" : "text-primary"}`} />
                  </button>
                  <button
                    onClick={() => addChild()}
                    className="p-1"
                  >
                    <FaPlus size={20} className="text-primary" />
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
