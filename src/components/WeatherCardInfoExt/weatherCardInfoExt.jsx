import { useState, useEffect } from "react";
import { useLocalDate } from "../../utils/hooks";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";

import CarouselHourForecast from "../CarouselHourForecast";

import styles from "./styles.module.scss";

const WeatherCardInfoExt = () => {
  const { weatherStore } = useWeatherContext();
  const [forecastData, setForecastData] = useState();
  const { hour } = useLocalDate();

  useEffect(() => {
    setForecastData(weatherStore.weatherData.forecast.forecastday[0].hour);
  }, []);

  return (
    <div className={styles.Ext_Container}>
      {forecastData && <CarouselHourForecast data={[forecastData, hour]} />}
    </div>
  );
};

export default WeatherCardInfoExt;
