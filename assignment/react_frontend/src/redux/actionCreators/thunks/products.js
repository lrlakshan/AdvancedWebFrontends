import axios from 'axios';
import { setProducts, setProduct } from '../productActions';
import { setNotifications } from '../notificationActions';

const url = 'http://localhost:3001/api/products';

export const getProducts = () => {
  return async (dispatch) => {

    dispatch(setNotifications("product", "loading", "loading", Date.now()));
    try {
      const response = await axios.get(url);
      const data = response.data;

      dispatch(setNotifications("product", "success", "success", Date.now()));
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url + `/${id}`);
      const data = response.data;
      console.log("data", data)
      dispatch(setProduct(data));
      //dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};