import React, { useState, useEffect } from "react";

import WeatherBadge from "../WeatherBadge/weatherBadge";

import styles from "./styles.module.scss";

const FutureForecastCard = (data) => {
  const [displayedElem, setDisplayElem] = useState([]);

  const setElemDisplay = () => {
    setDisplayElem(data.data);
  };

  useEffect(() => {
    setElemDisplay();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.Wrapper}>
      {displayedElem &&
        displayedElem.map((e, index) => (
          <div className={styles.Container} key={index}>
            <WeatherBadge
              temp={e.day.avgtemp_c}
              condition={e.day.condition.text}
              img={e.day.condition.icon}
              future={true}
            />
          </div>
        ))}
    </div>
  );
};

export default FutureForecastCard;
