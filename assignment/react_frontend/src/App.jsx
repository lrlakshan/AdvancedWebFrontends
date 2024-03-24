import React from "react";
import { useSelector } from "react-redux";
import { dataTestIds } from "./tests/constants/components.js";
import { Route, Routes } from "react-router-dom";
import { USERS } from "./constants/constants.js";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import Products from "./components/products/Products.jsx";
import ProductDetails from "./components/products/ProductDetails.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Orders from "./components/Orders.jsx";
import Notifications from "./components/Notifications.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

const handleLogout = () => {
  console.log("Logout function");
};

const App = () => {
  const { role } = useSelector(state => state.role);

  return (
    <div data-testid={dataTestIds.app}>
      <Navbar role={role} logout={handleLogout} />
      <Notifications />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route exact path='/cart' element={<PrivateRoute role={role} allowedRoles={[USERS.guest, USERS.customer]}/>}>
            <Route exact path='/cart' element={<Cart/>}/>
        </Route>
        <Route exact path='/register' element={<PrivateRoute role={role} allowedRoles={[USERS.guest]}/>}>
            <Route exact path='/register' element={<Register/>}/>
        </Route>
        <Route exact path='/login' element={<PrivateRoute role={role} allowedRoles={[USERS.guest]}/>}>
            <Route exact path='/login' element={<Login/>}/>
        </Route>
        <Route exact path='/users' element={<PrivateRoute role={role} allowedRoles={[USERS.admin]}/>}>
            <Route exact path='/users' element={<Users/>}/>
        </Route>
        <Route exact path='/orders' element={<PrivateRoute role={role} allowedRoles={[USERS.admin, USERS.customer]}/>}>
            <Route exact path='/orders' element={<Orders/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
