import { Fragment, useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUsers } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { MdOutlineDateRange } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6"
// import TextInput from "./TextInput"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

export default function BookingForm() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [guest, setGuest] = useState({})
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adultCount, setAdultCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [guestModal, setGuestModal] = useState(false)

  useEffect(() => {
    const guest = localStorage.getItem("guest");
    if (!guest) {
      setGuest({ people: "", checkin: "", checkout: "" });
    } else {
      setGuest(JSON.parse(guest));
    }
  }, [navigate]);

  const formatEntry = () => {
    let guest_list = ""
    if (adultCount > 0) {
      guest_list += `${adultCount} Adults`
    }
    if (childCount > 0) {
      guest_list += `, ${childCount} Children`
    }
    return guest_list
  }

  const handleSubmit = () => {
    setGuest({ ...guest, people: formatEntry() });

    if (adultCount === "" || childCount === "" || checkin === "" || checkout === "") {
      console.log({ adultCount, childCount, checkin, checkout })
      toast.error("One or more fields empty");
      return;
    }

    if(checkin < new Date()){
      toast.error("Checkin date cannot be earlier than today")
    }

    if (checkout < checkin) {
      toast.error("Check-out date cannot be earlier than Check-in date");
      return;
    }

    localStorage.setItem("guest", JSON.stringify({ people: formatEntry(), checkin: checkin, checkout: checkout }));
    navigate("/checkout", { state: { price: cartItems[0]?.price || "" } });
  };

  return (
    <div className="bg-gray-200/50 md:bg-gray-200 w-full rounded-3xl md:rounded-l-full md:rounded-r-full p-4 md:p-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2"
      >
        <div className="relative bg-white w-full md:max-w-[200px] border rounded-l-full rounded-r-full px-6 md:px-4">
          <p
            htmlFor="guests"
            className="my-0 py-0 flex items-center text-gray-500 gap-2"
          >
            <FiUsers /> Guests
          </p>
          <input
            type="text"
            id="guests"
            autoComplete={false}
            placeholder="2 Adults, 1 child"
            aria-placeholder="2 Adults, 1 child"
            value={formatEntry() || ""}
            onClick={() => setGuestModal(true)}
            className="rounded-l-full md:w-[150px] cursor-pointer md:bg-transparent l/g:bg-white rounded-r-full focus:outline-none"
          />
        </div>

        <div className="w-full md:bg-white md:border md:border-gray-400 flex flex-col gap-4 md:gap-0 md:flex-row justify-center rounded-l-full rounded-r-full md:divide-x divide-gray-400 md:px-3 py-1">
          <div className="bg-white md:bg-transparent w-full flex flex-col px-2 md:mx-0 rounded-l-full rounded-r-full md:rounded-none md:mr-2 md:mr-0">
            <label
              htmlFor="checkin"
              className="text-sm my-0 py-0 flex items-center text-gray-500 md:gap-2"
            >
              <MdOutlineDateRange />
              Check-in-date
            </label>
            <input
              type="date"
              id="checkin"
              value={checkin || ""}
              onChange={(e) => setCheckin(e.target.value)}
              className="text-sm sm:text-base rounded-l-full bg-white focus:outline-none"
            />
          </div>
          <div className="bg-white md:bg-transparent w-full flex flex-col px-2 md:mx-0 rounded-l-full rounded-r-full md:rounded-none md:mr-2 md:mr-0">
            <label
              htmlFor="checkout"
              className="text-sm my-0 py-0 flex items-center text-gray-500 md:gap-2"
            >
              <MdOutlineDateRange />
              Check-out-date
            </label>
            <input
              type="date"
              id="checkout"
              value={checkout || ""}
              onChange={(e) => setCheckout(e.target.value)}
              className="text-sm sm:text-base rounded-r-full bg-white focus:outline-none"
            />
          </div>
        </div>
        <Button
          title="book now"
          onButtonClick={handleSubmit}
          classList="md:text-sm px-6 md:px-3 py-3 uppercase whitespace-nowrap w-full md:max-w-fit mx-auto md:mx-0"
        />
      </form>

      <Dialog open={guestModal} as="div" className="absolute z-10 focus:outline-none" onClose={() => setGuestModal(false)}>
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
                  <p>{adultCount}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={adultCount === 0}
                    onClick={() => setAdultCount(adultCount - 1)}
                    className="p-1"
                  >
                    <FaMinus size={20} className={`${adultCount < 1 ? "text-gray-400" : "text-primary"}`} />
                  </button>
                  <button
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="p-1"
                  >
                    <FaPlus size={20} className="text-primary" />
                  </button>

                </div>
              </div>
              <div className="flex justify-between border border-gray-200 bg-white px-4 py-2 rounded-l-full rounded-r-full">
                <div>
                  <p className="font-medium">Children</p>
                  <p>{childCount}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    disabled={childCount === 0}
                    onClick={() => setChildCount(childCount - 1)}
                    className="p-1"
                  >
                    <FaMinus size={20} className={`${childCount < 1 ? "text-gray-400" : "text-primary"}`} />
                  </button>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
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
