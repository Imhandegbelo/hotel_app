import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import PriceDetails from "../components/PriceDetails";
import { useCart } from "../context/CartContext";
import { getSuiteByPrice } from "../utils/getSuite";

export default function Checkout() {
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [guestInfo, setGuestInfo] = useState({});

  useEffect(() => {
    if (!location.state) navigate("/booking");

    const guestInfo = JSON.parse(localStorage.getItem("guest"));
    setGuestInfo(guestInfo);

    document.body.scrollTop = 20;
  }, [location.pathname]);

  return (
    <div className="py-10 space-y-6 px-6 md:px-12 lg:px-16">
      <Link
        to="/booking"
        className="font-Grotesk font-semibold flex items-center gap-2 md:text-3xl"
      >
        <FiArrowLeft />
        CHECKOUT
      </Link>

      {/* contact form */}
      {location.state ? (
        <div className="flex flex-col lg:flex-row gap-10">
          <CheckoutForm price={location.state.price} />
          <PriceDetails
            suite={getSuiteByPrice(location.state.price)}
            guestCount={guestInfo.people}
            items={cartItems}
          />
        </div>
      ) : null}
    </div>
  );
}
