import React, { useState, useEffect } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { toast } from "react-toastify";
import { bankDetails } from "../data/bankData";
import { verifyEmail } from "../utils/verifyEmail";
import { useNavigate } from "react-router-dom";
import { getSuiteByPrice } from "../utils/getSuite";
// import "../components/checkbox.css"

export default function CheckoutForm({ price }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    lastname: "",
    firstname: "",
    cancelTerm: false,
    bookingTerm: false,
  });
  const [guestCount, setGuestCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(Math.random() * 10);
  const [suite, setSuite] = useState(0);

  useEffect(() => {
    const guestInfo = JSON.parse(localStorage.getItem("guest"));
    getSuiteByPrice(price);
    setGuestCount(guestInfo);
  }, []);

  const handleSubmit = async () => {
    if (formData.firstname.length < 2) {
      toast.error("Firstname required");
      return;
    }
    if (formData.lastname.length < 2) {
      toast.error("Lastname required");
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
    if (!(formData.bookingTerm && formData.cancelTerm)) {
      toast.error("Must accept terms before proceeding");
      return;
    }

    const form = new FormData(document.getElementById("checkout-form"));
    form.append("guestCount", guestCount.people);
    form.append("checkin", guestCount.checkin);
    form.append("checkout", guestCount.checkout);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      setResetKey(Math.random() * 10);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        number: "",
        bookingTerm: false,
        cancelTerm: false,
      });
      navigate("/confirmation", {
        state: {
          email: formData.email,
          checking: guestCount.checking,
          checkout: guestCount.checkout,
          name: `${formData.firstname} ${formData.lastname}`,
          guestCount: guestCount.people,
          totalPrice: price + 14000,
        },
      });
    } else {
      toast.error(data);
    }
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
        value="aeaa3be7-b3a6-4a13-9977-a1c65d9a4cc6"
      />
      <input
        type="hidden"
        name="subject"
        value="Radisson Onyx - Checkout request"
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
              onChange={(value) => setFormData({ ...formData, email: value })}
            />
            <small className="text-xs sm:text-sm">
              We will send you confirmation to this email adress
            </small>
          </div>
          <TextInput
            type="text"
            id="number"
            name="number"
            placeholder="Contact Number"
            label="Contact Number"
            value={formData.number}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, number: value })}
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
                onChange={() =>
                  setFormData({ ...formData, cancelTerm: !formData.cancelTerm })
                }
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
                onChange={() =>
                  setFormData({
                    ...formData,
                    bookingTerm: !formData.bookingTerm,
                  })
                }
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
            title={loading ? "Processing..." : "CONFIRM BOOKING"}
            classList="w-full lg:w-fit py-3 lg:py-0 px-6 whitespace-nowrap"
            onButtonClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}
