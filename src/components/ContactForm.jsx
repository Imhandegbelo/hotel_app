import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

import TextAreaInput from "./TextAreaInput";
import StateInput from "./StateInput";
import { states } from "../data/states";
import { toast } from "react-toastify";

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
  const [ResetKey,setResetKey]= useState(Math.random()*10)

  const handleSubmit = (e) => {
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
    if (
      !/^([a-z0-9_\-.]+)@([a-z0-9_\-.]+)\.([a-z]{2,5})$/i.test(
        formData.email.trim()
      )
    ) {
      toast.error("Invalid email, please recheck");
      return;
    }
    if (formData.comment === "" || formData.comment.length < 10) {
      toast.error("A helpful comment is required");
      return;
    }
    toast.success(
      "Thank you for contacting us, we will get back to you shortly"
    );
    setResetKey(Math.random()*10)
    console.log(formData);
  };

  return (
    <form key={ResetKey} onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          type="text"
          id="firstname"
          label="First name"
          placeholder="First name"
          maxWidth=""
          value={formData.firstname}
          onChange={(value) => setFormData({ ...formData, firstname: value })}
        />
        <TextInput
          type="text"
          id="lastname"
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
          label="Email"
          maxWidth=""
          placeholder="Email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
        />
        <TextInput
          type="text"
          id="phone"
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
        label="Address"
        placeholder="Address"
        value={formData.address}
        onChange={(value) => setFormData({ ...formData, address: value })}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          type="text"
          id="city"
          label="City"
          placeholder="City"
          maxWidth=""
          value={formData.city}
          onChange={(value) => setFormData({ ...formData, city: value })}
        />
        <StateInput
          placeholder="State"
          value={formData.state}
          onChange={(value) => setFormData({ ...formData, state: value })}
        />
      </div>
      <TextAreaInput
        label="Comment"
        value={formData.comment}
        placeholder="Comment"
        onChange={(value) => setFormData({ ...formData, comment: value })}
      />
      {/* <div className="w-full">
        <label htmlFor="state">State</label>
        <input
          type="text"
          list="states"
          id="state"
          // value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="border px-4 py-2"
        />
        <datalist id="states">
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </datalist>
      </div> */}
      <Button title="submit" classList="px-5 py-2 uppercase" />
    </form>
  );
}
