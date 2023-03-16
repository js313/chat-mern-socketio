import { createContext, useReducer } from "react";
import React from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const signin = async (email, password) => {
    dispatch({ type: "SIGNIN_REQUEST" });
    try {
    } catch (err) {
      dispatch({ type: "SIGNIN_FAILURE", payload: err });
    }
  };
  return (
    <UserContext.Provider value={{ state, dispatch, signin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
