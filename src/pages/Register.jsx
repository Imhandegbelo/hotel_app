import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {registerUser} from "../redux/features/auth/authSlice"
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { verifyEmail } from "../utils/verifyEmail";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const handleSubmit = () => {
    if (formData.email === "") {
      toast.error("Email is required");
      return;
    }
    if (!verifyEmail(formData.email.trim())) {
      toast.error("Invalid email. Please check");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password is too short");
      return;
    }
    if (formData.password === "") {
      toast.error("Password is required");
      return;
    }
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }
    const userData = {email: formData.email, password: formData.password}
    dispatch(registerUser(userData))

  };

  useEffect(()=>{
    if(user){
      if(user.role === "Admin"){
        navigate("/dashboard/admin")
      }
      if (user.role ==="Super") {
        navigate("/dashboard/super")
      }
    }
  },[dispatch, user])

  return (
    <main className="flex justify-center py-10 md:py-12 lg:py-24 px-6 md:px-12 lg:px-16">
      <div className="space-y-6">
        <h1 className="font-Grotesk text-4xl">Login</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[400px] p-4 space-y-6 border rounded-lg"
        >
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
          <TextInput
            type="password"
            label="Verify Password"
            placeholder="Verify password"
            value={formData.password2}
            onChange={(value) => setFormData({ ...formData, password2: value })}
          />
          <Button
            type="submit"
            title="Login"
            classList="w-full py-3"
            onButtonClick={handleSubmit}
          />
          <p className="text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password
            </Link>
          </p>
          <p className="text-center text-sm">
            Already have an account{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
