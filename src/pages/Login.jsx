import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button"
import { toast } from "react-toastify";
import { verifyEmail } from "../utils/verifyEmail";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = () =>{
    if(formData.email === ""){
      toast.error("Email is required")
      return
    }
    if(!verifyEmail(formData.email.trim())){
      toast.error("Invalid email. Please check")
      return
    }
    if(formData.password === ""){
      toast.error("Password is required")
      return
    }
    toast.success("Requirements met!!")
  }

  return (
    <main className="flex justify-center">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          type="text"
          label="Email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
        />
        <Button type="submit" title="Login" classList="" onButtonClick={handleSubmit} />
      </form>
    </main>
  );
}
