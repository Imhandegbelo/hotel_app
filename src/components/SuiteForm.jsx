import { useState } from 'react'
import TextInput from "./TextInput"
import { Button, Field, Select, Label } from "@headlessui/react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { createSuite } from "../redux/features/suite/suiteSlice"
import { FaSpinner } from "react-icons/fa"

export default function NewSuiteForm() {
    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError } = useSelector((state) => state.suite)
    const [suiteData, setSuiteData] = useState({
        name: "",
        size: "",
        bedroom: 1,
        guests: 2,
        type: "",
        cost: 0,
    })
    const options = ["City view", "Free WiFi", "IPTV", "Dining area", "Living room", "Kitchen"]
    const [selected, setSelected]=useState([])

    const handleChange = (option) => {
        setSelected((prev) =>
          prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
      }

    const handleCreate = () => {
        console.log({...suiteData, selected})
    }

    return (
        <div className="space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <TextInput
                        type="text"
                        id="name"
                        label="Name"
                        value={suiteData.name}
                        placeholder="Suite Name"
                        maxWidth=""
                        onChange={(value) => setSuiteData({ ...suiteData, name: value })}
                    />
                    <div className="flex justify-between gap-2">
                        <TextInput
                            type="number"
                            id="bedroom"
                            label="Bedroom"
                            value={suiteData.bedroom}
                            placeholder="Suite Name"
                            maxWidth=""
                            onChange={(value) => setSuiteData({ ...suiteData, bedroom: value })}
                        />
                        <TextInput
                            type="number"
                            id="size"
                            label="Size"
                            value={suiteData.size}
                            placeholder="e.g 3.4"
                            maxWidth=""
                            onChange={(value) => setSuiteData({ ...suiteData, size: value })}
                        />

                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <TextInput
                        type="number"
                        id="guest"
                        label="Guests"
                        value={suiteData.guests}
                        placeholder="e.g 2"
                        maxWidth=""
                        onChange={(value) => setSuiteData({ ...suiteData, guests: value })}
                    />
                    <Field className="w-full">
                        {/* <Label>Suite</Label> */}
                        <Select
                            name="type"
                            value={suiteData.type}
                            className="capitalize w-full py-2 px-3 border rounded-xl"
                            onChange={(e) => setSuiteData({ ...suiteData, type: e.target.value })}
                        >
                            <option value="" >Select type</option>
                            <option value="suite" >Suite</option>
                            <option value="apartment" >Apartment</option>
                        </Select>
                    </Field>
                    <TextInput
                        type="number"
                        id="cost"
                        label="Cost"
                        value={suiteData.cost}
                        placeholder="e.g 20000"
                        maxWidth=""
                        onChange={(value) => setSuiteData({ ...suiteData, cost: value })}
                    />
                </div>
                <div className='space-x-3'>
                    {options.map((option) => (
                        <label key={option} className="whitespace-nowrap">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selected.includes(option)}
                                onChange={() => handleChange(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <Button
                    className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-gray-600/50 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-600/50 disabled:bg-gray-600/50"
                    onClick={handleCreate}
                >
                    {isLoading && <FaSpinner className="animate-spin mr-2 text-white" />} Add Suite
                </Button>
            </form>
        </div>
    )
}
