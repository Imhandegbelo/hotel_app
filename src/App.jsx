import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import TopNav from "./components/TopNav";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import Checkout from "./pages/Checkout";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import AdminDashboard from "./pages/Admin/AdminDashboard"
import BookingManagement from "./pages/Admin/BookingManagement";
import SuperDashboard from "./pages/SuperDashboard"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="font-Montserrat max-w-[1440px] mx-auto">
      <Router>
        <TopNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<CheckoutConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><BookingManagement /></ProtectedRoute>} />
          <Route path="/super/dashboard" element={<ProtectedRoute><SuperDashboard /></ProtectedRoute>} />
          {/* </Route> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
