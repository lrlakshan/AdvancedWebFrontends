import React, { useEffect, useState } from "react";
import { axiosHelper } from "./utils/axiosHelper.jsx";
import { setUserRole, setCurrentUser } from "./redux/actionCreators/userActions.js";
import { useDispatch } from "react-redux";
import App from "./App.jsx";
import { USERS } from "./constants/constants.js";

const AppWrapper = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("checkStat");
        const data = await axiosHelper.get("/check-status");
        dispatch(setUserRole(data.user.role));

        if (USERS.guest !== data.user.role){
          dispatch(setCurrentUser(data.user));
        }
      } catch (error) {
        dispatch(setUserRole(USERS.guest));
        dispatch(setCurrentUser({}));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <App />;
};

export default AppWrapper;