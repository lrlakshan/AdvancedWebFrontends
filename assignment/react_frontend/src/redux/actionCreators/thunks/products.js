import { axiosHelper } from "../../../utils/axiosHelper";
import { setProducts, setProduct } from "../productActions";
import { setNotifications } from "../notificationActions";
import { dataTestIds, stateTypes } from "../../../tests/constants/components";

const { notificationId } = dataTestIds;

export const getProducts = () => {

  return async (dispatch) => {
    dispatch(
      setNotifications(
        stateTypes.product,
        notificationId.loading(stateTypes.product),
        "loading",
        Date.now()
      )
    );
    try {
      const data = await axiosHelper.get("/products");

      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.success(stateTypes.product),
          "success",
          Date.now()
        )
      );
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.error(stateTypes.product),
          "error",
          Date.now()
        )
      );
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.product,
        notificationId.loading(stateTypes.product),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.get("/products" + `/${id}`);

      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.success(stateTypes.product),
          "success",
          Date.now()
        )
      );
      dispatch(setProduct(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.error(stateTypes.product),
          "error",
          Date.now()
        )
      );
    }
  };
};
