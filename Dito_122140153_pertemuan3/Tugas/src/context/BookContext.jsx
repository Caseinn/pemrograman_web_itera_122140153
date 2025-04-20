import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map(b => (b.id === action.payload.id ? action.payload : b));
    case "REMOVE":
      return state.filter(b => b.id !== action.payload);
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [persisted, setPersisted] = useLocalStorage("books", []);
  const [books, dispatch] = useReducer(reducer, persisted);

  React.useEffect(() => setPersisted(books), [books]);

  const value = { books, dispatch };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

BookProvider.propTypes = { children: PropTypes.node };
export const useBooks = () => useContext(BookContext);
