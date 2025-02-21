import { useEffect } from 'react'
import { useCart } from "../context/CartContext"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllSuites } from "../redux/features/suite/suiteSlice"
import { FaSpinner } from "react-icons/fa"
import { toast } from 'react-toastify'
import RoomCard from "../components/RoomCard"

export default function Rooms() {
    const dispatch = useDispatch()
    const { cartItems, addItem, removeItem } = useCart();
    const { suites, isLoading, isError, message } = useSelector((state) => state.suite)

    useEffect(() => {
        document.body.scrollTop = 20;
        dispatch(getAllSuites())
        if (isError) toast.error(message)
    }, []);

    const handleAddItem = (room) => {
        addItem(room)
    }

    return (
        <main className="md:gap-10 py-10 px-6 md:px-12 lg:px-16">
            <p className="text-gray-500 my-4 uppercase">
                <Link to="/">Home</Link> {">"} Rooms
            </p>
            <section className="my-6 space-y-6 w-full">
                <h1 className="font-Grotesk text-2xl md:text-3xl">ROOMS</h1>
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    {isLoading ? <p className="inline-flex gap-4 items-center">
                        <FaSpinner size={26} className="animate-spin text-primary" /> Loading...
                    </p> : (
                        <div className="space-y-4 w-full">
                            {suites.map((s) => (
                                <RoomCard
                                    key={s._id}
                                    room={s}
                                    onAddItem={() => handleAddItem(s)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
