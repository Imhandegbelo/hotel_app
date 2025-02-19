import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()

    const user = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user.user) navigate("/login")
    }, [navigate, user])

    return children
}
