import axios from 'axios';
import { setProducts, setProduct } from '../productActions';
import { setNotifications } from '../notificationActions';
import { dataTestIds, stateTypes } from '../../../tests/constants/components';

const url = 'http://localhost:3001/api/products';

export const getProducts = () => {

  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(setNotifications(stateTypes.product, notificationId.loading(stateTypes.product), "loading", Date.now()));
    try {
      const response = await axios.get(url);
      const data = response.data;

      dispatch(setNotifications(stateTypes.product, notificationId.success(stateTypes.product), "success", Date.now()));
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      dispatch(setNotifications(stateTypes.product, notificationId.error(stateTypes.product), "error", Date.now()));
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url + `/${id}`);
      const data = response.data;
      dispatch(setProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};