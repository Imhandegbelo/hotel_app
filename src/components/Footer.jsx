import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn, MdOutlineEmail } from "react-icons/md";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const guestLinks = [
    { name: "Features", path: "#" },
    { name: "Pricing", path: "#" },
    { name: "Case studies", path: "#" },
    { name: "Reviews", path: "#" },
    { name: "Updates", path: "#" },
  ];

  const companyData = [
    {
      icon: <MdOutlineEmail className="text-white/80" />,
      text: "radissononyxapartmentandsuite@gmail.com",
      classList: "flex gap-1 items-center text-sm md:text-base",
    },
    {
      icon: <FiPhone className="text-white/80" />,
      text: "07014707637, 08060426636",
      classList: "",
    },
    {
      icon: <MdOutlineLocationOn fontSize={20} className="text-white/80" />,
      text: "Agu-Akwa by Immigration junction Ezeuzu, Awka, Anambra State",
      classList: "",
    },
  ];

  return (
    <footer className="bg-[#0F172B] text-white py-16 px-6 md:px-12 lg:px-16">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="space-y-4 w-full">
          <img src={logo} alt="Radisson Onyx logo" />
          <p>
            Experience unmatched comfort, modern amenities, and exceptional
            service at Radisson Onyx your perfect destination for leisure and
            business.
          </p>
        </div>
        <div className="space-y-4 w-full md:w-2/5">
          <h3 className="font-semibold">For Guests</h3>
          <ul className="space-y-2">
            {guestLinks.map((link) => (
              <li key={link.name} className="text-white/80 hover:text-white">
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 w-full">
          <h3 className="font-semibold">Company</h3>
          <ul className="space-y-2">
            {companyData.map((link, index) => (
              <li
                key={`foo-${index}`}
                className={`text-white/80 hover:text-white inline-flex/ items-center gap-1`}
              >
                {index === 0 ? (
                  <>
                    <a
                      href="mailto:radissononyxapartmentandsuite@gmail.com"
                      className={link.classList}
                    >
                      <p className="text-base">{link.icon}</p> {""} {link.text}
                    </a>
                    {/* <br /> */}
                  </>
                ) : (
                  <p className="flex gap-1">
                    <>{link.icon}</> {""} {link.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-6 text-primary py-6">
        <Link to="#" className="hover:scale-110">
          <FaFacebookF size={20} />
        </Link>
        <Link to="#" className="hover:scale-110">
          <FaTwitter size={20} />
        </Link>
        <Link to="#" className="hover:scale-110">
          <FaInstagram size={20} />
        </Link>
        <Link to="#" className="hover:scale-110">
          <FaLinkedinIn size={20} />
        </Link>
        <Link to="#" className="hover:scale-110">
          <FaYoutube size={20} />
        </Link>
      </div>
      <hr className="bg-white" />
      <div className="md:flex justify-between pt-1">
        <p className="text-white">
          Copyrite &copy; {new Date().getFullYear()} Radisson Onyx
        </p>
        <p className="text-white">
          All rights reserved | <Link to="/">Terms and conditions</Link> |{" "}
          <Link to="/">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
