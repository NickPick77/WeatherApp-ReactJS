import { createStore } from "redux";
import { SetData, SetHide } from "./constants";

// weatherData State
const weatherDataState = {
  weatherData: {
    location: {},
    current: {},
    forecast: {},
  },
  hide: true,
};

//Reducer
const weatherAPI = (state, action) => {
  switch (action.type) {
    case SetData:
      console.log("Reducerr", state);
      return {
        ...state,
        weatherData: { ...state.weatherData, ...action.payload },
      };

    case SetHide:
      const hideStatus = { ...state };
      return {
        ...state,
        hide: !hideStatus.hide,
      };
    default:
      return state;
  }
};

export const store = createStore(weatherAPI, weatherDataState);
