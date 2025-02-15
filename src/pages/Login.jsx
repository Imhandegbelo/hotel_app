import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verifyEmail } from "../utils/verifyEmail";
import { loginUser, reset } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) toast.error(message)

    if (isSuccess || user) {
      if (user.role === "Super") {
        navigate("/super/dashboard")
      } else if (user.role === "Admin") {
        navigate("/admin/dashboard")
      }
    }
    dispatch(reset())
  }, [message, isError, isSuccess, dispatch, navigate])

  const handleSubmit = () => {
    if (formData.email === "") {
      toast.error("Email is required");
      return;
    }
    if (!verifyEmail(formData.email.trim())) {
      toast.error("Invalid email. Please check");
      return;
    }
    if (formData.password === "") {
      toast.error("Password is required");
      return;
    }
    const userData = formData
    dispatch(loginUser(userData))
    // toast.success("Requirements met!!");
  };

  return (
    <main className="flex justify-center py-10 md:py-12 lg:py-24 px-6 md:px-12 lg:px-16">
      <div className="space-y-6">
        <h1 className="font-Grotesk font-semibold text-4xl">Login</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[440px] px-4 py-6 space-y-6 border rounded-lg"
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
          <Button
            type="submit"
            title="Login"
            classList="w-full py-2"
            disabled={isLoading}
            onButtonClick={handleSubmit}
          />
          <p className="text-center">

            <small className="w-fit">Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link> Instead</small>
          </p>
        </form>
      </div>
    </main>
  );
}
