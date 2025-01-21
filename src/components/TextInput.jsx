import React, { useState } from "react";

export default function TextInput({
  type,
  label,
  placeholder,
  value,
  maxWidth,
  onChange,
  ...otherProps
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false)

  return (
    <div className="relative w-full">
      <label
        htmlFor={otherProps.id}
        className={`absolute ${isFocused || inputValue !=="" ? "-top-3 bg-white px-1" : "top-2 text-gray-500"} transition-all duration-200 left-4 sr-only/`}
      >
        {label} {otherProps.required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        id={otherProps.id}
        value={value || inputValue}
        aria-placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        {...otherProps}
        className={`border rounded-xl py-2 px-4 w-full ${maxWidth}`}
      />
    </div>
  );
}
