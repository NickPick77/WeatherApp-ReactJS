import React from "react";

import styles from "./styles.module.scss";

export const WeatherBadge = ({ temp, condition, img, future }) => {
  return (
    <div className={future ? styles.futureBadge : styles.weatherBadgeContainer}>
      <img
        className={
          future ? styles.futureBadge__icon : styles.weatherBadgeContainer__icon
        }
        src={img}
        alt={condition}
      />
      <span
        className={
          future
            ? styles.futureBadge__Wrapper
            : styles.weatherBadgeContainer__Wrapper
        }
      >
        <p
          className={
            future
              ? styles.futureBadge__Wrapper__currentTempC
              : styles.weatherBadgeContainer__Wrapper__currentTempC
          }
        >
          {temp}°
        </p>
      </span>
      <p
        className={
          future
            ? styles.futureBadge__Wrapper__currentCondition
            : styles.weatherBadgeContainer__Wrapper__currentCondition
        }
      >
        {condition}
      </p>
    </div>
  );
};

export default WeatherBadge;
