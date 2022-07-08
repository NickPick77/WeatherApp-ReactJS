import { createContext, useContext, useReducer } from "react";
import statusReducer from "./statusReducer";

const initialState = {
  hide: true,
  error: null,
};

const StatusContext = createContext(initialState);

export const useStatusContext = () => useContext(StatusContext);

export const StatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statusReducer, initialState);

  const updateHide = (value) => dispatch({ type: "SET_HIDE", payload: value });

  const discardError = () => {
    dispatch({ type: "DISCARD_ERROR" });
  };

  const value = { status: state, updateHide, discardError };

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};
