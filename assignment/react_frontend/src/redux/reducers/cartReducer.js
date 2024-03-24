import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const initialState = {
  items: [],
  total: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Add product to cart
      const { productId, quantity, products } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return {
          ...state,
          items: updatedItems,
          total: state.total + (quantity * updatedItems[existingItemIndex].price)
        };
      } else {
        // Fetch product details from store
        const product = products.find(product => product.id === productId);; // Fetch product details based on productId
        const newItem = {
          productId,
          quantity,
          price: product.price, // Set the price of the product
        };
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + quantity * product.price,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(item => item.productId !== action.payload.productId);
      const removedItem = state.items.find(item => item.productId === action.payload.productId);
      return {
        ...state,
        items: updatedItems,
        total: state.total - (removedItem.quantity * removedItem.price)
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export default cartReducer;