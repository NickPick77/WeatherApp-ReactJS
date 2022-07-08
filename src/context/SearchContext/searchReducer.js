import {
  SET_SEARCH_INPUT,
  AUTOCOMPLETE,
  GET_SUGGESTIONS_DATA,
} from "../constants";

export default function searchReducer(state, action) {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case GET_SUGGESTIONS_DATA:
      return {
        ...state,
        suggestions: action.payload,
      };
    case AUTOCOMPLETE:
      return {
        ...state,
        filteredSuggestions: action.payload,
      };
    default:
      throw new Error();
  }
}
