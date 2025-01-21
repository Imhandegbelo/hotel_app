import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdCreditCard } from "react-icons/md";
import { FiX } from "react-icons/fi";
import Button from "./Button";
import NoPhoto from "../assets/NoPhoto.png";
import { formatNum } from "../utils/formatNum";
import { Dialog, DialogPanel } from "@headlessui/react";

export default function RoomCard({ room, onAddItem }) {
  const [show, setShow] = useState(false);

  const handleBooking = () => {
    console.log("Booked");
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log(show);
  }, [show]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 border rounded-3xl md:rounded-xl p-4 w-full">
        <img src={NoPhoto} alt={room.name} className="md:w-1/4 h-1/2" />
        <div className="md:w-3/4">
          <div className="space-y-4">
            <h4 className="font-semibold text-xl uppercase">{room.name}</h4>
            <p className="text-gray-500">
              {room.bedroom} Bedroom &middot; {room.guest} Guests &middot;{" "}
              {room.size} Sq M <br />
              {room.extra}
            </p>

            <button
              onClick={handleShow}
              className="font-Grotesk flex items-center gap-3 border border-white px-2 rounded text-primary hover:border-black hover:text-black"
            >
              ROOM DETAILS <MdKeyboardArrowDown />
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 md:mt-0 space-y-4">
            <p className="text-sm">
              ✔ Free cancellation up to 72 hours before arrival
            </p>
            <div className="space-y-4">
              <div className="md:text-right">
                <p className="font-semibold text-xl">{formatNum(room.price)}</p>
                <p className="text-sm text-gray-700">Average Nightly Rate</p>
                <p className="text-xs text-gray-500">
                  Excluding taxes and fees
                </p>
              </div>
              <Button
                title="BOOK NOW"
                classList="px-4 py-3 md:py-2 w-full text-sm mt-3 whitespace-nowrap"
                onButtonClick={onAddItem}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog as="div" open={show} onClose={setShow}>
        <div className="fixed inset-0 z-50 bg-black/80" />
        <DialogPanel className="fixed inset-0 flex items-center justify-center overflow-auto left-0 z-50 w-full">
          <div className="bg-white p-4 rounded-xl w-full max-w-[746px]">
            <div className="relative flex flex-col md:flex-row gap-3 w-full">
              <h3 className="text-lg md:hidden">{room.name}</h3>
              <img src={NoPhoto} alt={room.name} className="md:w-2/6 h-1/2" />
              <div className="space-y-4">
                <h4 className="md:block font-semibold text-xl uppercase">
                  {room.name}
                </h4>
                <p className="text-gray-500">
                  {room.bedroom} Bedroom &middot; {room.guest} Guests &middot;{" "}
                  {room.size} Sq M <br />
                  {room.extra}
                </p>
              </div>
              <button
                onClick={handleShow}
                className="absolute top-0 right-0 font-Grotesk flex items-center gap-3 border border-white px-2 rounded text-primary hover:border-black hover:text-black"
              >
                <FiX size={20} className="text-black" />
              </button>
            </div>
            <div className="md:flex">
              <div className="">
                <p className="-my-4 flex items-center gap-2">
                  <MdCreditCard /> Online banking policy
                </p>
              </div>
              <div className="space-y-4">
                <div className="md:text-right">
                  <p className="font-semibold text-xl">
                    {formatNum(room.price)}
                  </p>
                  <p className="text-sm text-gray-700">Average Nightly Rate</p>
                  <p className="text-xs text-gray-500">
                    Excluding taxes and fees
                  </p>
                </div>
                <Button
                  title="BOOK NOW"
                  classList="px-4 py-3 md:py-2 w-full text-sm mt-3 whitespace-nowrap"
                  onButtonClick={onAddItem}
                />
              </div>
            </div>

            <h3 className="md:block font-Grotesk text-2xl text-center my-6">
              Amenities
            </h3>
            <div className="flex text-gray-500 gap-2">
              <div className="flex flex-col">
                <div>
                  <p className="font-medium text-gray-600">Furnishings</p>
                  <ul className="list-disc ml-3">
                    {room.furnishings.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Kitchen</p>
                  <ul className="list-disc ml-3">
                    {room.kitchen.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:hidden">
                  <p className="font-medium text-gray-600">Entertainment</p>
                  <ul className="list-disc ml-3">
                    {room.entertainment.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="font-medium text-gray-600">Bathroom</p>
                  <ul className="list-disc ml-3">
                    {room.bathroom.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Bedding</p>
                  <ul className="list-disc ml-3">
                    {room.bedding.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:hidden">
                  <p className="font-medium text-gray-600">General</p>
                  <ul className="list-disc ml-3">
                    {room.general.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:flex flex-col">
                <div>
                  <p className="font-medium text-gray-600">Entertainment</p>
                  <ul className="list-disc ml-3">
                    {room.entertainment.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-600">General</p>
                  <ul className="list-disc ml-3">
                    {room.general.map((b) => (
                      <li>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
