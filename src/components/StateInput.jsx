import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import states from "../data/states.json";

export default function StateInput({ placeholder, value, onChange }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [query, setQuery] = useState(value || "");

  const filteredStates =
    query === ""
      ? states
      : states.filter((state) =>
          state.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <Field className="relative">
      <Label
        className={`absolute -top3 left-2 ${ ""
          // query !== ""
          //   ? "-top-3 bg-white px-1"
          //   : "top-2 text-gray-500"
        } transition-all duration-200 left-4 sr-only/`}
      >
        State
      </Label>
      <Combobox
        as="div"
        value={selectedItem || "State"}
        onChange={setSelectedItem}
        className="relative w-full"
      >
        <ComboboxInput
          aria-placeholder={placeholder}
          className="border rounded-xl py-2 px-4 w-full invalid:border-rose-400"
          value={selectedItem}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
        <ComboboxOptions className="absolute z-10 bg-white rounded w-full p-6 space-y-2">
          {filteredStates.map((state) => (
            <ComboboxOption value={state} key={state}>
              {state}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
