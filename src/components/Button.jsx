import React from "react";

export default function Button({
  title = "",
  primary = true,
  onButtonClick,
  classList = "",
  otherProps
}) {
  return (
    <button
      onClick={onButtonClick}
      className={`border border-primary ${
        primary
          ? "bg-primary hover:bg-primary/70 text-white disabled:bg-primary/70"
          : "bg-white hover:bg-primary text-primary"
      } transition-all duration-200 rounded-l-full rounded-r-full uppercase ${classList}`}
      {...otherProps}
    >
      {title}
    </button>
  );
}
