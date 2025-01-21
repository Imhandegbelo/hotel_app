import { useState } from "react";
import { Field, Label, Textarea } from "@headlessui/react";

export default function TextAreaInput({
  label = "",
  value = "",
  placeholder = "",
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused,setIsFocused]=useState(false)

  return (
    <Field className="relative w-full">
      <Label className={`absolute ${isFocused || inputValue !==""  ? "-top-3 bg-white px-1" : "top-2 text-gray-500"} transition-all duration-200 left-4 sr-only/`}>{label}</Label>
      <Textarea
        value={value || inputValue}
        // placeholder={placeholder}
        aria-placeholder={placeholder}
        className="w-full px-4 py-2 rounded-xl border invalid:border-rose-400"
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        onFocus={()=>setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
      />
    </Field>
  );
}
