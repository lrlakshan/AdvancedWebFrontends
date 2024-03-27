import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import NotFoundPage from "../NotFoundPage";
import { getOrder } from "../../redux/actionCreators/thunks/orders";

const OrderDetailPage = () => {
  const { containerId, textId } = dataTestIds;

  // Extract the orderId from the URL parameters
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { orders, order } = useSelector((state) => state.orders);

  // State variable to track if the orders has been fetched
  const [orderFetched, setOrderFetched] = useState(false);

  // Find the selected order from the store
  const selectedOrder =
    orders.find((order) => order.id === orderId) || order;

  // Dispatch getOrder action only when the order has not been fetched
  useEffect(() => {
    if (!orderFetched) {
      dispatch(getOrder(orderId));
      setOrderFetched(true);
    }
  }, [dispatch, orderId, orderFetched]);

  if (!selectedOrder && !orderFetched) {
    return <NotFoundPage />;
  }

  return (
    <div data-testid={containerId.inspect}>
      <h2>Order Detail</h2>
      {selectedOrder.items.map(item => (
          <div key={item.product.id} data-testid={containerId.listItem(item.product.id)}>
            <p data-testid={textId.name}>Name: {item.product.name}</p>
            <p data-testid={textId.quantity}>Quantity: {item.quantity}</p>
          </div>
        ))}
    </div>
  );
};
export default OrderDetailPage;
