import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import {
  MdOutlineMenu,
  MdOutlineShoppingCart
} from "react-icons/md";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import CartSumarry from "./CartSumarry";
import { logoutUser } from "../redux/features/auth/authSlice"

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const links = [
    { name: "Rooms", path: "/rooms" },
    { name: "Apartments", path: "/booking" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Login", path: "/login" },
  ];

  useEffect(() => {
    setIsOpen(false);
    setCartOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <nav className="flex justify-between items-center shadow-lg py-4 bg-white px-6 md:px-12 lg:px-16">
        <Link to="/" className="text-3xl font-semibold">
          <img src={logo} alt="Radisson Onyx logo" />
        </Link>

        <ul className="hidden md:flex items-center gap-6 uppercase">
          {links.map((link) => (
            <li key={`top-${link.name}`}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          {user && <button
            onClick={handleLogout}
            className="px-4 py-1 text-primary border border-white rounded-xl hover:border-primary"
          >
            Logout
          </button>}
        </ul>
        <div className="flex md:hidden gap-6 items-center">
          {location.pathname === "/booking" && cartItems.length > 0 && (
            <button className="relative" onClick={() => setCartOpen(!isOpen)}>
              <MdOutlineShoppingCart size={24} />
              <span className="absolute flex items-center justify-center bg-white -right-1 -top-1 border rounded-full text-[6px] text-primary font-semibold h-3 w-3 border-primary">
                {cartItems.length}
              </span>
            </button>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            <MdOutlineMenu size={24} />
          </button>
        </div>
      </nav>

      <Dialog
        open={cartOpen}
        as={Fragment}
        onClose={setCartOpen}
        className="absolute top-0 right-0"
      >
        {/* <div className="fixed top-20 left-/0 right-0 inset-x-/0 z-50 bg-black/80" /> */}
        <Transition
          as="div"
          show={cartOpen}
          appear={true}
          enter="transition ease-out duration-200"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0/ opacity-100"
          leave="transition duration-700"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
          className="space-y-6 mt-0"
        >
          <DialogPanel className="fixed h-screen overflow-y-auto inset-0 space-y-6 bg-white mt-0 shadow-xl pt-5 pb-10 rounded-bl-2xl top-0 z-50 w-full h-full right-0 text-right">
            <button
              onClick={() => setCartOpen(false)}
              className="text-right font-semibold text-sm mr-4"
            >
              Close
            </button>
            <div className="mx-4 h-s/creen overflow-/y-auto">
              <CartSumarry />
            </div>
          </DialogPanel>
        </Transition>
      </Dialog>

      <Dialog
        open={isOpen}
        as={Fragment}
        onClose={setIsOpen}
        className="absolute top-0 right-0"
      >
        {/* <div className="fixed top-20 left-/0 right-0 inset-x-/0 z-50 bg-black/80" /> */}
        <Transition
          as="div"
          show={isOpen}
          appear={true}
          enter="transition ease-out duration-300"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0/ opacity-100"
          leave="transition duration-700"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
          className="space-y-6 mt-0"
        >
          <DialogPanel className="fixed inset-y-0 space-y-6 bg-white mt-0 shadow-xl pt-5 pb-10 rounded-bl-2xl top-0 z-50 w-full h-full right-0">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top- right-6 text-right font-semibold text-sm"
            >
              Close
            </button>
            <ul className="space-y-4 text-2xl text-center font-medium uppercase">
              {links.map((link) => (
                <li key={`top-${link.name}`}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </DialogPanel>
        </Transition>
      </Dialog>
    </>
  );
}
