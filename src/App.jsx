import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import TopNav from "./components/TopNav";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import Checkout from "./pages/Checkout";
import Booking from "./pages/Booking";

function App() {
  return (
    <div className="font-Montserrat max-w-[1440px]">
      <Router>
        <TopNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<CheckoutConfirmation />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
