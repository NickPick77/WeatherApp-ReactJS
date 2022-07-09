import { useWeatherContext } from "../../context/WeatherContext/weatherContext";
import { useStatusContext } from "../../context/StatusContext/statusContext";
import { useLocalDate } from "../../utils/hooks";

import Button from "../Button";
import WeatherCardInfoExt from "../WeatherCardInfoExt";
import CityDataBox from "../CityDataBox";
import CarouselCondition from "../CarouselCondition";
import CarouselHourForecast from "../CarouselHourForecast";

import WeatherBadge from "../WeatherBadge";

import styles from "./styles.module.scss";
import SearchInput from "../SearchInput";

const WeatherCard = () => {
  const { weatherStore } = useWeatherContext();
  const { status, updateHide } = useStatusContext();
  const { hour } = useLocalDate();

  const setShowMore = () => {
    updateHide(status.hide);
  };

  return (
    weatherStore.dataStatus && (
      <div className={styles.container}>
        <SearchInput />
        <div className={styles.weatherInfo}>
          <CityDataBox data={weatherStore.weatherData.location} />
          <WeatherBadge
            temp={weatherStore.weatherData.current.temp_c}
            condition={weatherStore.weatherData.current.condition.text}
            img={weatherStore.weatherData.current.condition.icon}
          />
        </div>
        <CarouselCondition />

        <CarouselHourForecast
          data={[weatherStore.weatherData.forecast.forecastday[0].hour, hour]}
        />

        <div>
          <Button
            classVariation="Show"
            text={status.hide === true ? "Show 3 Days Forecast" : "Hide"}
            onClick={setShowMore}
          />
        </div>
        {status.hide === false && <WeatherCardInfoExt />}
      </div>
    )
  );
};
export default WeatherCard;
