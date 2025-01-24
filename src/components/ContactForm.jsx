import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import TextAreaInput from "./TextAreaInput";
import { toast } from "react-toastify";
import states from "../data/states.json";
import { verifyEmail } from "../utils/verifyEmail";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    comment: "",
  });
  const [ResetKey, setResetKey] = useState(Math.random() * 10);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstname === "" || formData.firstname.length < 2) {
      toast.error("First name is required");
      return;
    }
    if (formData.lastname === "" || formData.lastname.length < 2) {
      toast.error("Last name is required");
      return;
    }
    if (formData.email === "") {
      toast.error("Email name is required");
      return;
    }
    if (!verifyEmail(formData.email.trim())) {
      toast.error("Invalid email, please recheck");
      return;
    }
    if (formData.comment === "" || formData.comment.length < 10) {
      toast.error("A helpful comment is required");
      return;
    }

    const form = new FormData(document.getElementById("form"));

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      toast.success(
        "Thank you for contacting us, we will get back to you shortly"
      );
      e.target.reset();
      setResetKey(Math.random() * 10);
      setFormData({
        ...formData,
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        comment: "",
      });
    } else {
      toast.error(data);
    }
  };

  return (
    <form
      key={ResetKey}
      id="form"
      onSubmit={handleSubmit}
      className="w-full space-y-5"
    >
      <input
        type="hidden"
        name="access_key"
        value="aeaa3be7-b3a6-4a13-9977-a1c65d9a4cc6"
      />
      <input
        type="hidden"
        name="subject"
        value="Radisson Onyx - Enquiry notice from Contact Us"
      />
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          type="text"
          id="firstname"
          name="firstname"
          label="First name"
          placeholder="First name"
          maxWidth=""
          value={formData.firstname}
          onChange={(value) => setFormData({ ...formData, firstname: value })}
        />
        <TextInput
          type="text"
          id="lastname"
          name="lastname"
          label="Last name"
          placeholder="Last name"
          maxWidth=""
          value={formData.lastname}
          onChange={(value) => setFormData({ ...formData, lastname: value })}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          type="email"
          id="email"
          name="email"
          label="Email"
          maxWidth=""
          placeholder="Email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
        />
        <TextInput
          type="text"
          id="phone"
          name="phone"
          label="Phone number"
          maxWidth=""
          placeholder="Phone number"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
        />
      </div>
      <TextInput
        type="text"
        id="address"
        name="address"
        label="Address"
        placeholder="Address"
        value={formData.address}
        onChange={(value) => setFormData({ ...formData, address: value })}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          type="text"
          id="city"
          name="city"
          label="City"
          placeholder="City"
          maxWidth=""
          value={formData.city}
          onChange={(value) => setFormData({ ...formData, city: value })}
        />

        <div className="relative w-full">
          <label
            htmlFor="state"
            className={`absolute ${
              isFocused || formData.state !== ""
                ? "-top-3 bg-white px-1"
                : "top-2 text-gray-500"
            } transition-all duration-200 left-4 sr-only/`}
          >
            State
          </label>
          <select
            id="state"
            name="state"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.change })
            }
            className="border rounded-xl py-2 px-4 w-full"
          >
            {states.map((state) => (
              <option key={state} className="w-full">
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TextAreaInput
        label="Comment"
        name="Comment"
        value={formData.comment}
        placeholder="Comment"
        onChange={(value) => setFormData({ ...formData, comment: value })}
      />

      <Button type="submit" title="submit" classList="px-5 py-2 uppercase" />
    </form>
  );
}
