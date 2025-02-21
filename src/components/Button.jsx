import React from "react";
import { FaSpinner } from "react-icons/fa"

export default function Button({
  title = "",
  primary = true,
  onButtonClick,
  classList = "",
  loading=false,
  otherProps
}) {
  return (
    <button
      onClick={onButtonClick}
      className={`border flex justify-center items-center border-primary ${primary
          ? "bg-primary hover:bg-primary/70 text-white disabled:bg-primary/70"
          : "bg-white hover:bg-primary text-primary"
        } transition-all duration-200 rounded-l-full rounded-r-full uppercase ${classList}`}
      {...otherProps}
    >
      {loading && <><FaSpinner className="animate-spin mr-2" /> {title}</>}
      {!loading && <>{title}</>}
    </button>
  );
}
