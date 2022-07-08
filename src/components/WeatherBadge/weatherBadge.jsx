import React from "react";

import { WiThermometer } from "react-icons/wi";

import styles from "./styles.module.scss";

export const WeatherBadge = ({ temp, condition, img }) => {
  return (
    <div className={styles.weatherBadgeContainer}>
      <img
        className={styles.weatherBadgeContainer__icon}
        src={img}
        alt={condition}
      />
      <span className={styles.weatherBadgeContainer__Wrapper}>
        <p className={styles.weatherBadgeContainer__Wrapper__currentTempC}>
          {temp}°
        </p>
      </span>
      <p className={styles.weatherBadgeContainer__Wrapper__currentCondition}>
        {condition}
      </p>
    </div>
  );
};

export default WeatherBadge;
