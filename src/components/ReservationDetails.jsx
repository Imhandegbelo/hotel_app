import React from "react";

export default function ReservationDetails() {
  return (
    <div className="p-4 w-full border space-y-6 rounded-2xl">
      <h3 className="font-Grotesk text-xl">RESERVATION DETAILS</h3>
      <div>
        <strong className="font-semibold">Radisson-onyx</strong>
        <p className="">
          Agu-Akwa by Immigration junction Ezeuzu, Awka, Anambra State, 420102 
          <br /> +234 (0) 806 042 6636
        </p>
      </div>
      <div className="flex gap-4">
        <img src="" alt="" className="w-1/5 h-auto border rounded" />
        <div className="flex flex-col md:justify-between w-full space-y-2">
          <div className="flex justify-between w-full">
            <div className="-space-y-1">
              <strong>Superior Room</strong>
              <p>Room only</p>
              <p>Sun, Jan 3, 2025 - Mon, Jan 6, 2025</p> <p>1 Adult, 1 child</p>
              <p>1 Night stay</p>
            </div>
            <p className="font-bold">₦84,000</p>
          </div>
          <div className="-space-y-1">
            <strong>Guest details</strong>
            <p>John Okafor</p>
            <p>example@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
