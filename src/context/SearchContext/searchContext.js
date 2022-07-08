import { createContext, useContext, useReducer } from "react";
import searchReducer from "./searchReducer";

import { SEARCH } from "../../utils/api";

const initialState = {
  searchInput: "",
  suggestions: [],
  filteredSuggestions: [],
};

const SearchContext = createContext(initialState);

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setSearchInput = (element) => {
    dispatch({ type: "SET_SEARCH_INPUT", payload: element });
  };

  const getSuggestionsData = async (cityName) => {
    const suggestions = await SEARCH(cityName);

    dispatch({ type: "GET_SUGGESTIONS_DATA", payload: suggestions });
  };

  const autoComplete = (filteredSuggestions) => {
    dispatch({ type: "AUTOCOMPLETE", payload: filteredSuggestions });
  };

  const value = {
    searchStore: state,
    setSearchInput,
    getSuggestionsData,
    autoComplete,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
