import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const reducer = (state, action) => {
  let updatedCartItems;
  let updatedState;

  switch (action.type) {
    case "CART_ADD_ITEM":
      // console.log(state.cart.cartItems)
      const newItem = action.payload;
      console.log(state);
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      // console.log(existItem)
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id
              ? { ...newItem, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart.cartItems, newItem];
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return newState;
    case "DECREASE_COUNT":
      // console.log(action.payload)
      updatedCartItems = state.cart.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...action.payload, quantity: item.quantity - 1 }
          : item
      );
      //     console.log(updatedItems)
      updatedState = {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedState;
    case "INCREASE_COUNT":
      //         // console.log(action.payload)
      updatedCartItems = state.cart.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...action.payload, quantity: item.quantity + 1 }
          : item
      );
      //     console.log(updatedItems)
      updatedState = {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedState;
    case "REMOVE_ITEM":
      //  updatedItems = state.cart.cartItems.map(item => item._id === existItem._id ? { ...newItem, quantity: item.quantity + 1 } : item)
      updatedCartItems = state.cart.cartItems.filter((item) =>
        item._id !== action.payload._id ? item : null
      );
      updatedState = {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedState;
    case "LOGGED_IN":
      const data = action.payload;
      console.log(action.payload)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", JSON.stringify(data.token))
      return {
        ...state,
        user: data.user,
        token: data.token,
      }
    case "LOG_OUT":
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        return {
            ...state,
            user: null,
            token: null
        }
    default:
      return state;
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
