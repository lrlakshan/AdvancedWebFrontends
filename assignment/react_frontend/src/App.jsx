import React, { useEffect } from "react";
import { axiosHelper } from "./utils/axiosHelper.jsx";
import { useSelector, useDispatch } from "react-redux";
import { dataTestIds, stateTypes } from "./tests/constants/components.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import { USERS } from "./constants/constants.js";
import { setUser, setUserWithAwait } from "./redux/actionCreators/userActions.js";
import { setNotifications } from "./redux/actionCreators/notificationActions.js";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import Products from "./components/products/Products.jsx";
import ProductDetails from "./components/products/ProductDetails.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Orders from "./components/orders/Orders.jsx";
import Notifications from "./components/Notifications.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import OrderDetails from "./components/orders/OrderDetails.jsx";
import ModifyProduct from "./components/products/ModifyProduct.jsx";

const App = () => {
  const { containerId, notificationId, textId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector(state => state.role);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await axiosHelper.get("/check-status");
        dispatch(setUser(data.user.role));
      } catch (error) {
        dispatch(setUser(USERS.guest));
        console.error(error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(setNotifications(stateTypes.auth, notificationId.loading(stateTypes.auth), "loading", Date.now()));
      const response = await axiosHelper.logout("/logout");
      if (response.status === 200) {
        await setUserWithAwait(dispatch, USERS.guest);
        dispatch(setNotifications(stateTypes.auth, notificationId.success(stateTypes.auth), "success", Date.now()));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      dispatch(setNotifications(stateTypes.auth, notificationId.error(stateTypes.auth), "error", Date.now()));
    }
  }

  return (
    <div data-testid={dataTestIds.app}>
      <Navbar role={role} logout={handleLogout} />
      <div data-testid={containerId.profile}>
        <div data-testid={textId.role}>Role: {role}</div>
      </div>
      <Notifications />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/products/:productId/modify" element={<PrivateRoute role={role} allowedRoles={[USERS.admin]}/>}>
          <Route path="/products/:productId/modify" element={<ModifyProduct/>}/>
        </Route>
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
        <Route path='/orders/:orderId' element={<PrivateRoute role={role} allowedRoles={[USERS.admin, USERS.customer]}/>}>
            <Route path="/orders/:orderId" element={<OrderDetails />} />
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
