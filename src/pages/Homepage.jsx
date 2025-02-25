import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import {
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import testimonials from "../data/testimonials.json";
import TestimonialCard from "../components/TestimonialCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/servicesData";
import { amenities } from "../data/amenityData";
import BookingForm from "../components/BookingForm";
// import Button from "../components/Button"

export default function Homepage() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(testimonials[0]);

  const handleNext = () => {
    setCount(count + 1);
    setData(testimonials[count % testimonials.length]);
  };

  const handlePrevious = () => {
    setCount(count - 1);
    setData(testimonials[count % testimonials.length]);
  };


  return (
    <div>
      <header className="bg-black/50 flex flex-col gap-4 items-center justify-center h-[320px] md:h-[650px]">
        <div className="w-fit text-center">
          <h1 className="font-Grotesk text-white text-2xl md:text-5xl">
            Awka&apos;s Premier Hotel Destination
          </h1>
          <p className="text-gray-200">THE NUMBER 1 HOTEL IN AWKA</p>
        </div>
        <Link
          to="/booking"
          className="md:hidden bg-[#ED1B24] px-6 py-3 uppercase w-fit hover:bg-[#ED1B24]/70 text-white transition-all duration-200 rounded-l-full rounded-r-full"
        >
          Book now
        </Link>
        
        <div className="hidden md:block w-full max-w-[750px] lg:max-w-[760px]">
          <BookingForm />
        </div>
      </header>

      {/* Featured Ameninties */}
      <section className="py-12 space-y-6 px-6 md:px-12 lg:px-16">
        <h3 className="font-Grotesk text-center text-3xl md:text-5xl">
          Featured Amenities
        </h3>
        <div className="grid md:grid-cols-3 lg:px-10 gap-6 md:gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity.desc}
              className="flex items-center gap-3 md:gap-2 lg:gap-3 lg:pl-[15%]"
            >
              <img
                src={amenity.icon}
                alt={amenity.desc}
                className="w-8 md:w-6 lg:w-8"
              />
              <p className="text-xl md:text-lg lg:text-2xl whitespace-nowrap text-gray-500">
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Location */}
      <section className="py-12 text-center">
        <h2 className="font-Grotesk text-center text-3xl md:text-5xl">
          Location
        </h2>
        <p className="text-center">
          Agu-Akwa by Immigration junction Ezeuzu, Awka, Anambra State
        </p>
        <p className="text-xl">Contact us for reservation</p>
        {/* <div className="md:flex md:flex-row justify-center gap-4 my-6">
          <p className="flex mx-auto w-fit md:flex items-center gap-2">
            <MdOutlineEmail />{" "}
            <span>
              <a href="mailto:radissononyxapartmentandsuite@gmail.com">
                radissononyxapartmentandsuite@gmail.com
              </a>
            </span>
          </p>
          <p className="flex mx-auto w-fit items-center gap-2">
            <FiPhone /> <span>07014707637, 08060426636</span>
          </p>
        </div> */}
        <div className="w-full">
          <iframe
            width="100%"
            height="600"
            title="Radisson Onyx Apartment and Suites"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Agu-Akwa%20by%20Immigration%20junction%20Ezeuzu,%20Awka,%20Anambra%20State+(Radisson%20Onxy%20Apartments%20and%20Suites)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps trackers</a>
          </iframe>
        </div>
      </section>

      {/*Services */}
      <section className="divide-y border-y">
        {services.map((service, index) => (
          <div
            key={`service-${index}`}
            style={{ backgroundImage: `url(${service.img})` }}
            className="relative group h-[180px] md:h-[440px] bg-cover bg-center"
          >
            <div className="bg-black/50 invisible group-hover:visible absolute inset-0 z-10"></div>
            <Link
              to={service.path}
              className="flex gap-3 invisible group-hover:visible items-center text-white hover:text-[#ED1B24] absolute z-20 bottom-10 right-[10%] uppercase"
            >
              {service.text}
              <span className="group-hover:translate-x-2 transition-all duration-200">
                <MdOutlineKeyboardArrowRight />
              </span>
            </Link>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="py-10 px-6 md:px-12 lg:px-16">
        <h3 className="font-Grotesk text-center text-3xl md:text-5xl">
          What Our Guests have to say
        </h3>
        <p className="text-base text-center">
          Here&apos;s what guests at Radisson Onyx has to say
        </p>
        <div className="flex justify-between gap-6 md:gap-16 py-4 mt-10">
          <button onClick={handlePrevious}>
            <FaRegArrowAltCircleLeft color="#ED1B24" className="text-xl md:text-3xl" />
          </button>
          <TestimonialCard
            testimony={data.tesimony}
            name={data.name}
            date={data.date}
          />
          <button onClick={handleNext}>
            <FaRegArrowAltCircleRight color="#ED1B24" className="text-xl md:text-3xl" />
          </button>
        </div>
      </section>
    </div>
  );
}
