import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CART_ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD:
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case CART_ACTIONS.REMOVE:
      return;
    default:
      return;
  }
};

const CardProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: CART_ACTIONS.add, item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: CART_ACTIONS.add, id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardProvider;
