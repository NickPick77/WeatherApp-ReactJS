import { useState, useEffect } from "react";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";

import FutureForecastCard from "../CarouselFutureForecast";

import styles from "./styles.module.scss";

const WeatherCardInfoExt = () => {
  const { weatherStore } = useWeatherContext();
  const [forecastData, setForecastData] = useState();

  console.log(weatherStore.weatherData.forecast.forecastday);
  useEffect(() => {
    setForecastData(weatherStore.weatherData.forecast.forecastday);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.Ext_Container}>
      {forecastData && <FutureForecastCard data={forecastData} />}
    </div>
  );
};

export default WeatherCardInfoExt;
