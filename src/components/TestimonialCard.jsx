import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function TestimonialCard({ testimony, name, date }) {
  return (
    <div className="relative flex flex-col md:flex-row justify-between w-full">
      <BiSolidQuoteAltLeft className="absolute top-0 -left-5"/>
      <p className="">
        {testimony}
      </p>
      <div className="flex flex-col mt-3 md:mt-0">
        <p className="font-Grotesk font-semibold">{name}</p>
        <p className="text-gray-500">{date}</p>
      </div>
    </div>
  );
}
