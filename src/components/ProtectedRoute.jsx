import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"

export default function ProtectedRoute() {
    const user = useSelector((state) => state.auth)

    
    useEffect(()=>{
        // const decoded = jwtDecode(user.user.token)

        // if (Date.now() >= decoded.exp) {
        //     localStorage.removeItem("userAuth")
        // }
    },[])


    return user.user ? <Outlet /> : <Navigate to="/login" replace />

    // useEffect(() => {
    //     if (!user.user) navigate("/login")
    // }, [navigate, user])

}
