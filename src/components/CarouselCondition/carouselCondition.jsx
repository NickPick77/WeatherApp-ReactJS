import React, { useEffect, useState } from "react";

import { useWeatherContext } from "../../context/WeatherContext/weatherContext";

import Button from "../Button";
import WeatherConditionBox from "../WeatherConditionBox";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  WiCloudyWindy,
  WiStrongWind,
  WiWindDeg,
  WiHumidity,
  WiUmbrella,
  WiHot,
  WiBarometer,
  WiFog,
  WiCloudy,
  WiShowers,
  WiThermometer,
} from "react-icons/wi";
import { GiWindsock } from "react-icons/gi";

import styles from "./styles.module.scss";

const CarouselCondition = () => {
  const [position, setPosition] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
  const [slideAnim, setSlideAnim] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState();
  const [data, setData] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const { weatherStore } = useWeatherContext();

  const handleSetTitle = () => {
    const titleList = ["Wind", "Air Quality", "Forecast"];
    setTitle(titleList[position]);
  };

  const handleSetText = () => {
    const textList = [
      [<WiCloudyWindy />, <GiWindsock />, <WiWindDeg />, <WiStrongWind />],
      [<WiHumidity />, <WiHot />, <WiFog />, <WiBarometer />],
      [<WiShowers />, <WiUmbrella />, <WiThermometer />, <WiCloudy />],
    ];
    setText(textList[position]);
  };

  const handleSetData = () => {
    const wind = 0;
    const airQuality = 1;
    const forecast = 2;

    switch (position) {
      case wind:
        setData({
          1: `${weatherStore.weatherData.current.wind_kph} Km/h`,
          2: weatherStore.weatherData.current.wind_dir,
          3: `${weatherStore.weatherData.current.wind_degree}°`,
          4: `${weatherStore.weatherData.current.gust_kph} Km/h`,
        });

        break;

      case airQuality:
        setData({
          1: `${weatherStore.weatherData.current.humidity}%`,
          2: `${weatherStore.weatherData.current.uv} UV`,
          3: `${weatherStore.weatherData.current.vis_km} Km`,
          4: `${weatherStore.weatherData.current.pressure_mb} mbar`,
        });
        break;

      case forecast:
        console.log(weatherStore.weatherData.forecast.forecastday[0]);
        setData({
          1: `${weatherStore.weatherData.forecast.forecastday[0].day.totalprecip_mm} mm`,
          2: `${weatherStore.weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`,
          3: `${weatherStore.weatherData.current.feelslike_c}°`,
          4: `${weatherStore.weatherData.current.cloud}%`,
        });
        break;

      default:
        break;
    }
  };

  const handlesetSlideAnim = () => {
    setSlideAnim((prev) => !prev);

    setTimeout(() => {
      setSlideAnim((prev) => !prev);
    }, 10);
  };

  const goForward = () => {
    const finishSentinel = 2;

    if (position < finishSentinel) {
      handlesetSlideAnim();
      setPosition((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (position >= 1) {
      handlesetSlideAnim();
      setPosition((prev) => prev - 1);
    }
  };

  const slide = (value) => {
    const forward = "avanti";
    const backward = "indietro";

    switch (value) {
      case forward:
        goForward();

        break;

      case backward:
        goBack();

        break;

      default:
        throw new Error("qualcosa è andato storto");
    }
  };

  const swipeStart = (event) => {
    const currentPosition = event.touches[0].clientX;
    setTouchPosition(currentPosition);
  };

  const swipeMove = (event) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const diff = touchDown - currentTouch;
    console.log(diff);
    if (diff > 8) {
      goForward();
    }

    if (diff < -8) {
      goBack();
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    handleSetTitle();
    handleSetText();
    handleSetData();
    // eslint-disable-next-line
  }, [position]);

  return (
    <div className={styles.cityInfoContainer}>
      <h2
        className={
          slideAnim
            ? styles.cityInfoContainer__Title__Anim
            : styles.cityInfoContainer__Title
        }
      >
        {title}
      </h2>
      <div className={styles.cityInfoContainer__Wrapper}>
        <Button
          classVariation="Swiper"
          text={<IoIosArrowBack />}
          onClick={slide}
          Inputvalue="indietro"
        />
        <div
          className={
            slideAnim
              ? styles.cityInfoContainer__Wrapper__ConditionBox__Anim
              : styles.cityInfoContainer__Wrapper__ConditionBox
          }
          onTouchStart={(event) => swipeStart(event)}
          onTouchMove={(event) => swipeMove(event)}
        >
          <div className={styles.ConditionBoxDiv}>
            <WeatherConditionBox text={text && text[0]} data={data[1]} />
            <WeatherConditionBox text={text && text[1]} data={data[2]} />
          </div>
          <div className={styles.ConditionBoxDiv}>
            <WeatherConditionBox text={text && text[2]} data={data[3]} />
            <WeatherConditionBox text={text && text[3]} data={data[4]} />
          </div>
        </div>
        <Button
          classVariation="Swiper"
          text={<IoIosArrowForward />}
          onClick={slide}
          Inputvalue="avanti"
        />
      </div>
      <div className={styles.dotsContainer}>
        <div
          className={
            position === 0
              ? `${styles.dotsContainer__dot} ${styles.selected}`
              : styles.dotsContainer__dot
          }
        ></div>
        <div
          className={
            position === 1
              ? `${styles.dotsContainer__dot} ${styles.selected}`
              : styles.dotsContainer__dot
          }
        ></div>
        <div
          className={
            position === 2
              ? `${styles.dotsContainer__dot} ${styles.selected}`
              : styles.dotsContainer__dot
          }
        ></div>
      </div>
    </div>
  );
};

export default CarouselCondition;
