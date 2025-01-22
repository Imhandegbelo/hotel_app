import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { FormspreeProvider } from "@formspree/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <FormspreeProvider project="2655285654279159220">
        <App />
        <ToastContainer />
      </FormspreeProvider>
    </CartProvider>
  </StrictMode>
);
