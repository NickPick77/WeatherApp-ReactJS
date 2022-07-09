import { useState, useEffect } from "react";
import { useLocalDate } from "../../utils/hooks";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";

import FutureForecastCard from "../CarouselFutureForecast";

import styles from "./styles.module.scss";

const WeatherCardInfoExt = () => {
  const { weatherStore } = useWeatherContext();
  const [forecastData, setForecastData] = useState();
  //const { hour } = useLocalDate();
  console.log(weatherStore.weatherData.forecast.forecastday);
  useEffect(() => {
    setForecastData(weatherStore.weatherData.forecast.forecastday);
  }, []);

  return (
    <div className={styles.Ext_Container}>
      {forecastData && <FutureForecastCard data={forecastData} />}
    </div>
  );
};

export default WeatherCardInfoExt;
