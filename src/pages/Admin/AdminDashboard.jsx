import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminDashboard() {
  const user = useSelector((state)=>state.auth)

  const links = [
    {
      title: "booking management",
      path: "/admin/bookings"
    },
    {
      title: "",
      path: ""
    },
  ]

  return (
    <main className='space-y-6 px-6 md:px-12 lg:px-16 py-16'>
      <h1 className="font-Grotesk font-medium uppercase text-3xl">
        Admin Dashboard
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {links.map((card) => (
          <CardLink key={card.title} title={card.title} path={card.path} />
        ))}
      </div>
    </main>
  )
}

const CardLink = ({ path, title }) => {
  return (
    <Link to={path} className='rounded-3xl bg-gray-100 h-36 p-6 border border-transparent cursor-pointer hover:border-red hover:bg-gray-200'>
      <h2 className='text-2xl capitalize'>{title}</h2>
    </Link>
  )
}