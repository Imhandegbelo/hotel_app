import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { verifyEmail } from "../utils/verifyEmail";

export default function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!verifyEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.error("Email sent");
  };

  return (
    <div className="flex justify-center items-center h-60">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-[400px] space-y-6"
      >
        <TextInput
          type="text"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(value) => setEmail(value)}
        />

        <Button
          type="submit"
          title="Get Reset Code"
          classList="w-full py-3"
          onButtonClick={handleSubmit}
        />
      </form>
    </div>
  );
}
