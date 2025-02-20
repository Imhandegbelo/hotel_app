import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"

export default function SuperDashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(!user.user) navigate("/login")
  },[navigate])

  return (
    <div className="p-10">SuperAdmin Dashboard</div>
  )
}
