import React from "react";

import styles from "./styles.module.scss";

export const WeatherConditionBox = ({ text, data }) => {
  return (
    <div className={styles.ContainerCondition}>
      <p className={styles.ContainerCondition__Text}>{text}</p>
      <p className={styles.ContainerCondition__Data}>{data}</p>
    </div>
  );
};

export default WeatherConditionBox;
