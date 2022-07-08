import { DISCARD_ERROR, SET_HIDE } from "../constants";

export default function statusReducer(state, action) {
  switch (action.type) {
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

    default:
      throw new Error();
  }
}
