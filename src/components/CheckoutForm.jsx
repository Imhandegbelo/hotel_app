import React, { useState } from "react";
import TextInput from "./TextInput";
import { bankDetails } from "../data/bankData";
import Button from "./Button";
import { toast } from "react-toastify";
import { verifyEmail } from "../utils/verifyEmail";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    bookingTerm: false,
    cancelTerm: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
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
    toast.success("Form submitted");
    console.log(formData);
  };

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-Grotesk text-xl">CONTACT INFO</h3>
          <p>
            <span className="text-red-500">*</span>Required
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <TextInput
            type="text"
            id="firstname"
            placeholder="First Name"
            label="First Name"
            required
            value={formData.firstname}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, firstname: value })}
          />
          <TextInput
            type="text"
            id="lastname"
            placeholder="Last Name"
            label="Last Name"
            required
            value={formData.lastname}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, lastname: value })}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <TextInput
              type="text"
              id="email"
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
            placeholder="Contact Number"
            label="Contact Number"
            value={formData.number}
            maxWidth={""}
            onChange={(value) => setFormData({ ...formData, number: value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-Grotesk text-2xl">PAYMENT INFO</h3>
        <div className="grid sm:grid-cols-2 gap-y-4 md:grid-cols-3">
          {bankDetails.map((bank, index) => (
            <div key={index} className="text-center space-y-3 md:text-left">
              <img
                src={bank.logo}
                alt={bank.name}
                aria-label={bank.name}
                className="mx-auto h-20 md:mx-0"
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
          <p>
            All reservations must be guaranteed by a valid credit card upon
            reservation. Reservations can be held until 1600 hrs on the day of
            check-in, or guaranteed with a credit card for late arrival.
          </p>
        </div>
        <div>
          <p className="font-medium">Cancel Policy</p>
          <p>
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
                className="h-4 w-4 accent-[#FEA116]"
              />
              <label htmlFor="cancelTerm" className="font-semibold">
                <span className="text-red-500 font-bold">*</span>I agree with
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
                className="h-4 w-4 accent-[#FEA116]"
              />
              <label htmlFor="bookingTerm" className="font-semibold">
                <span className="text-red-500">*</span> I agree with the Booking
                Conditions.
              </label>
            </div>
          </div>
          <Button
            title={loading ? "Processing..." : "CONFIRM BOOKING"}
            classList="w-full lg:w-fit py-3 lg:py-0 px-6 whitespace-nowrap"
            onButtonClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}
