import { useEffect } from "react";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";
import { useStatusContext } from "../../context/StatusContext/statusContext";

import Button from "../Button";
import WeatherCardInfoExt from "../WeatherCardInfoExt";
import CityDataBox from "../CityDataBox";
import CarouselCondition from "../CarouselCondition";

import WeatherBadge from "../WeatherBadge";

import styles from "./styles.module.scss";

const WeatherCard = () => {
  const { weatherStore } = useWeatherContext();
  const { status, updateHide } = useStatusContext();

  const setShowMore = () => {
    updateHide(status.hide);
  };

  return (
    weatherStore.dataStatus && (
      <div className={styles.container}>
        <div className={styles.weatherInfo}>
          <CityDataBox data={weatherStore.weatherData.location} />
          <WeatherBadge
            temp={weatherStore.weatherData.current.temp_c}
            condition={weatherStore.weatherData.current.condition.text}
            img={weatherStore.weatherData.current.condition.icon}
          />
        </div>
        <CarouselCondition />
        <WeatherCardInfoExt />
        <div>
          <Button
            classVariation="Show"
            text={status.hide === true ? "show more" : "hide"}
            onClick={setShowMore}
          />
        </div>
        {status.hide === false && <WeatherCardInfoExt />}
      </div>
    )
  );
};
export default WeatherCard;
