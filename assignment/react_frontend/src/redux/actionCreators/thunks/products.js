import { axiosHelper } from "../../../utils/axiosHelper";
import { setProducts, setProduct, removeProduct, addNewProduct } from "../productActions";
import { setNotifications } from "../notificationActions";
import { dataTestIds, stateTypes } from "../../../tests/constants/components";
import { editProduct } from "../productActions";

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

export const updateProduct = (id, product) => {
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
      const data = await axiosHelper.put("/products" + `/${id}`, product);

      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.success(stateTypes.product),
          "success",
          Date.now()
        )
      );
      dispatch(editProduct(data));
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

export const deleteProduct = (productId) => {
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
      const data = await axiosHelper.delete("/products" + `/${productId}`);

      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.success(stateTypes.product),
          "success",
          Date.now()
        )
      );
      dispatch(removeProduct(data));
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

export const addProduct = (product) => {
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
      const data = await axiosHelper.post("/products", product);

      dispatch(
        setNotifications(
          stateTypes.product,
          notificationId.success(stateTypes.product),
          "success",
          Date.now()
        )
      );
      dispatch(addNewProduct(data));
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
