import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { getOrders } from "../../redux/actionCreators/thunks/orders";

const Orders = () => {
  const { containerId, textId, linkId } = dataTestIds;
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div data-testid={containerId.main}>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <div data-testid={containerId.empty}>No orders available</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} data-testid={containerId.listItem(order.id)}>
            <p data-testid={textId.id}>ID: {order.id}</p>
            <p>
              <Link to={`/orders/${order.id}`} data-testid={linkId.inspect(order.id)}>View Order</Link>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;