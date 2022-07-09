import { createContext, useContext, useReducer } from "react";
import weatherReducer from "./weatherReducer";
import { GET_FORECAST } from "../../utils/api.js";

const initialState = {
  loading: false,
  error: null,
  dataStatus: false,
  weatherData: {},
};

const WeatherContext = createContext(initialState);

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const updateData = async (cityName) => {
    console.log(cityName);
    dispatch({ type: "WEATHERDATA_FETCH_REQUEST" });
    try {
      const weatherData = await GET_FORECAST(cityName);
      dispatch({ type: "WEATHERDATA_FETCH_SUCCESS", payload: weatherData });
    } catch (error) {
      console.log(state, error);
      dispatch({ type: "WEATHERDATA_FETCH_ERROR", payload: error });
    }
  };

  const discardError = () => {
    dispatch({ type: "DISCARD_ERROR" });
  };

  const value = {
    weatherStore: state,
    updateData,
    discardError,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
