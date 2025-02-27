import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import PriceDetails from "../components/PriceDetails";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [guestInfo, setGuestInfo] = useState({});

  useEffect(() => {
    const guestInfo = JSON.parse(localStorage.getItem("guest"));
    if (guestInfo.people === "" || guestInfo.checkin === "" || guestInfo.checkout === "") {
      navigate("/booking")
      // console.log("No guest Info")
    } else {
      setGuestInfo(guestInfo);
    }

    document.body.scrollTop = 20;
  }, []);

  return (
    <div className="py-10 space-y-6 px-6 md:px-12 lg:px-16">
      <Link
        to="/booking"
        className="font-Grotesk font-semibold flex items-center gap-2 md:text-3xl"
      >
        <FiArrowLeft />
        CHECKOUT
      </Link>

      {/* Contact form */}
      <div className="flex flex-col lg:flex-row gap-10">
        <CheckoutForm cart={cartItems[0]} />
        <PriceDetails
          suite={cartItems[0] || ""}
          guestCount={guestInfo.people}
          items={cartItems}
        />
      </div>
    </div>
  );
}
