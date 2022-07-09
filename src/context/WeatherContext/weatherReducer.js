import {
  WEATHERDATA_FETCH_REQUEST,
  WEATHERDATA_FETCH_SUCCESS,
  WEATHERDATA_FETCH_ERROR,
  FUTUREDATA_FETCH_SUCCESS,
  FUTUREDATA_FETCH_ERROR,
  DISCARD_ERROR,
  SET_HIDE,
  SET_SEARCH_INPUT,
  AUTOCOMPLETE,
} from "../constants";

export default function reducer(state, action) {
  switch (action.type) {
    case WEATHERDATA_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WEATHERDATA_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        dataStatus: true,
        weatherData: { ...action.payload },
      };
    case WEATHERDATA_FETCH_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DISCARD_ERROR:
      return {
        ...state,
        error: "",
        loading: false,
      };
    case SET_HIDE:
      const hideStatus = { ...state };
      console.log("reducer", hideStatus);
      return {
        ...state,
        hide: !hideStatus.hide,
      };
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case AUTOCOMPLETE:
      return {
        ...state,
        suggestions: action.payload,
      };
    default:
      throw new Error();
  }
}
