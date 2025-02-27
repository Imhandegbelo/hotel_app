/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { toast } from "react-toastify";
import { bankDetails } from "../data/bankData";
import { verifyEmail } from "../utils/verifyEmail";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
// import {useCart} from "../context/CartContext"
import { createReservation, reset } from "../redux/features/reservation/reservationSlice"
// import "../components/checkbox.css"

export default function CheckoutForm({ cart }) {
  // const {cartItems} = useCart()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    lastname: "",
    firstname: ""
  });
  const [cancelTerm, setCancelTerm] = useState(false)
  const [bookingTerm, setBookingTerm] = useState(false)
  const [resetKey, setResetKey] = useState(Math.random() * 10);
  const [guestDetail, setGuestDetail] = useState({})
  const [nights, setNights] = useState(1)
  const { reservations, isSuccess, isError, isLoading, message } = useSelector((state) => state.reservation)

  useEffect(() => {
    const guestDetails = JSON.parse(localStorage.getItem("guest"));
    const checkin = new Date(guestDetails.checkin).toDateString();
    const checkout = new Date(guestDetails.checkout).toDateString();
    setGuestDetail(guestDetails)
    setNights(checkout.split(" ")[2] - checkin.split(" ")[2])
  }, []);

  const handleSubmit = async () => {
    if (formData.firstname.length < 2 || formData.lastname < 2) {
      toast.error("Firstname and lastname are required");
      return;
    }
    if (formData.email.length < 5) {
      toast.error("Email is required");
      return;
    }
    if (!verifyEmail(formData.email)) {
      toast.error("Email is invalid, Check again");
      return;
    }
    if (!(bookingTerm && cancelTerm)) {
      toast.error("Must accept terms before proceeding");
      return;
    }

    if (!cart || cart._id === undefined) {
      toast.error("No room selected")
      const delayBooking = setTimeout(() => {
        navigate("/booking")
      }, 3000)

      return () => clearTimeout(delayBooking)
    }

    const reservationData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      guests: guestDetail.people,
      suite_id: cart._id,
      checkin_date: guestDetail.checkin,
      checkout_date: guestDetail.checkout,
      price: (cart.cost * nights) + 14000
    }
    // try {

    const form = new FormData(document.getElementById("checkout-form"));
    form.append("guestCount", guestDetail.people);
    form.append("checkin", guestDetail.checkin);
    form.append("checkout", guestDetail.checkout);

    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    dispatch(createReservation(reservationData))

    if (isSuccess) {
      toast.success("Reservation created")
      console.log(reservations)
      localStorage.setItem("res_id", reservations._id)
      localStorage.setItem("formData", JSON.stringify(formData))

      const goToConfirm = setTimeout(() => {
        navigate("/confirmation");
      }, 3000);
  
      return () => clearTimeout(goToConfirm);
    }

    if (isError) toast.error(message)
  };

  return (
    <form
      key={resetKey}
      className="space-y-8"
      id="checkout-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="hidden"
        name="access_key"
        value="39f88d39-ebba-4256-9b01-b36df765dd6a"
      // value="aeaa3be7-b3a6-4a13-9977-a1c65d9a4cc6"
      />
      <input
        type="hidden"
        name="subject"
        value="Radisson Onyx - booking request"
      />
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-Grotesk md:text-xl">CONTACT INFO</h3>
          <p>
            <span className="text-red-500">*</span>Required
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextInput
            type="text"
            id="firstname"
            name="firstname"
            required
            autoFocus
            placeholder="First Name"
            label="First Name"
            value={formData.firstname}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, firstname: value })}
          />
          <TextInput
            type="text"
            id="lastname"
            name="lastname"
            required
            placeholder="Last Name"
            label="Last Name"
            value={formData.lastname}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, lastname: value })}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full order-last md:order-first">
            <TextInput
              type="text"
              id="email"
              name="email"
              required
              placeholder="Email address"
              label="Email Address"
              value={formData.email}
              maxWidth={""}
              onChange={(value) => setFormData({ ...formData, email: value.toLowerCase() })}
            />
            <small className="text-xs sm:text-sm">
              We will send you confirmation to this email adress
            </small>
          </div>
          <TextInput
            type="text"
            id="number"
            name="phone"
            placeholder="Contact Number"
            label="Contact Number"
            value={formData.phone}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-Grotesk md:text-2xl">PAYMENT INFO</h3>
        <div className="grid sm:grid-cols-2 gap-y-4 md:grid-cols-3">
          {bankDetails.map((bank, index) => (
            <div key={index} className="space-y-3">
              <img
                src={bank.logo}
                alt={bank.name}
                aria-label={bank.name}
                className="md:mx-auto h-20 md:mx-0"
              />
              <p className="capitalize">{bank.accountName}</p>
              <p className="">{bank.accountNo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* policies */}
      <div className="bg-gray-50 rounded-md space-y-4 p-4">
        <h3 className="font-Grotesk">POLICIES</h3>
        <div className="flex gap-10">
          <div>
            <strong>Check-in</strong>
            <p>after 12:00pm</p>
          </div>
          <div>
            <strong className="">Check-out</strong>
            <p>before 2:00pm</p>
          </div>
        </div>
        <div>
          <p className="font-medium">Gaurantee Policy</p>
          <p className="text-gray-600">
            All reservations must be guaranteed by a valid credit card upon
            reservation. Reservations can be held until 1600 hrs on the day of
            check-in, or guaranteed with a credit card for late arrival.
          </p>
        </div>
        <div>
          <p className="font-medium">Cancel Policy</p>
          <p className="text-gray-600">
            Cancellations must be made before 72 hours prior to arrival to avoid
            one night cancellation charge.
          </p>
        </div>
      </div>

      {/* acknowledgement */}
      <div className="space-y-4">
        <h3 className="font-Grotesk">ACKNOWLEDGEMENT</h3>
        <div className="flex flex-col lg:flex-row gap-6 md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="cancelTerm"
                checked={formData.cancelTerm}
                onChange={() => setCancelTerm(!cancelTerm)}
                className="h-4 w-4 accent-primary"
              />
              <label
                htmlFor="cancelTerm"
                className="text-xs md:text-base font-medium"
              >
                <span className="text-primary font-bold">*</span>I agree with
                the Guarantee & Cancel Terms.
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="bookingTerm"
                checked={formData.bookingTerm}
                onChange={() => setBookingTerm(!bookingTerm)}
                className="h-4 w-4 accent-primary"
              />
              <label
                htmlFor="bookingTerm"
                className="text-xs md:text-base font-medium"
              >
                <span className="text-primary">*</span>I agree with the Booking
                Conditions.
              </label>
            </div>
          </div>
          <Button
            type="submit"
            isDisabled={isLoading}
            title={isLoading ? "Processing..." : "CONFIRM BOOKING"}
            loading={isLoading}
            classList="w-full lg:w-fit py-3 lg:py-0 px-6 whitespace-nowrap disabled:bg-primary/50"
            onButtonClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}
