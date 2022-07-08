import { useEffect } from "react";
import { useWeatherContext } from "../../context/WeatherContext/weatherContext";
import WeatherCard from "../WeatherCard";
import { StatusContextProvider } from "../../context/StatusContext/statusContext";

import styles from "./styles.module.scss";

const WeatherCardList = () => {
  const { weatherStore, updateData } = useWeatherContext();

  console.log(weatherStore);

  useEffect(() => {
    updateData((prev) => (prev ? prev : "Catania"));
  }, []);

  return (
    <StatusContextProvider>
      <section className={styles.wrapperCardList}>
        <WeatherCard />
      </section>
    </StatusContextProvider>
  );
};

export default WeatherCardList;
