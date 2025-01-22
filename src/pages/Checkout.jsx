import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import PriceDetails from "../components/PriceDetails";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { getSuiteByPrice } from "../utils/getSuite";

export default function Checkout() {
  const { cartItems } = useCart();
  const location = useLocation();

  const guestInfo = JSON.parse(localStorage.getItem("guest"));
  

  return (
    <div className="py-10 space-y-6 px-6 md:px-12 lg:px-16">
      <Link
        to="/accomodations"
        className="font-Grotesk font-semibold flex items-center gap-2 md:text-3xl"
      >
        <FiArrowLeft />
        CHECKOUT
      </Link>

      {/* contact form */}
      <div className="flex flex-col lg:flex-row gap-10">
        <CheckoutForm price={location.state.price} />
        <PriceDetails
          suite={getSuiteByPrice(location.state.price)}
          guestCount={guestInfo.people}
          items={cartItems}
        />
      </div>
    </div>
  );
}
