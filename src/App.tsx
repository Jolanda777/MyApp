import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeWithouLogin from "./pages/HomeWithoutLogin";
import Home from "./pages/home";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/login";
import Wishlist from "./pages/wishlist";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import Items from "./pages/Items";
import Checkout from "./pages/checkout";
import User from "./pages/User";
import Productview from "./pages/productview";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<HomeWithouLogin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user" element={<User />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/items" element={<Items />} />
          <Route
            path="/productview"
            element={
              <Productview
                id={0}
                name={""}
                price={0}
                description={""}
                image={""}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
