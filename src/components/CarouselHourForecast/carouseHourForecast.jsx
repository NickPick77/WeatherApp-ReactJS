import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { WiThermometer } from "react-icons/wi";

import Button from "../Button";

import styles from "./styles.module.scss";

const CarouselHourForecast = ({ data }) => {
  const [displayedElem, setDisplayElem] = useState([]);
  const [position, setPosition] = useState(data[1]);
  const [limit, setLimit] = useState(() => {
    if (data[1] < 20) {
      return data[1] + 4;
    } else {
      return 24;
    }
  });
  const [touchPosition, setTouchPosition] = useState(0);
  const [slideAnim, setSlideAnim] = useState(true);
  console.log(data);
  const setElemDisplay = () => {
    setDisplayElem(data[0].slice(position, limit));

    if (data[1] === 22) {
      setDisplayElem(data[0].slice(22, 24).concat(data[0].slice(0, 2)));
    }
  };

  const setSlideAnimation = () => {
    setSlideAnim((prev) => !prev);

    setTimeout(() => {
      setSlideAnim((prev) => !prev);
    }, 10);
  };

  const goForward = () => {
    const finishSentinel = 20;

    setSlideAnimation();

    setPosition((prev) => prev + 1);
    setLimit((prev) => prev + 1);

    if (finishSentinel === position) {
      setPosition(0);
      setLimit(4);
    }
  };

  const goBack = () => {
    if (position >= 1) {
      setSlideAnimation();

      setPosition((prev) => prev - 1);
      setLimit((prev) => prev - 1);
    } else {
      setSlideAnimation();

      setPosition(20);
      setLimit(24);
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

    if (diff > 8) {
      goForward();
    }

    if (diff < -8) {
      goBack();
    }

    setTouchPosition(null);
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

  useEffect(() => {
    setElemDisplay();
    // eslint-disable-next-line
  }, [position]);

  return (
    <div className={styles.Section}>
      <Button
        classVariation="Swiper"
        text={<IoIosArrowBack />}
        onClick={slide}
        Inputvalue="indietro"
      />
      <div
        className={styles.Section__Wrapper}
        onTouchStart={(event) => swipeStart(event)}
        onTouchMove={(event) => swipeMove(event)}
      >
        {displayedElem &&
          displayedElem.map((e, index) => (
            <div
              className={slideAnim ? styles.Container : styles.Container__Anim}
              key={index}
            >
              <h3>{e.time.split(" ")[1]}</h3>
              <div className={styles.Bagde}>
                <img
                  className={styles.icon}
                  src={e.condition.icon}
                  alt={e.condition.icon}
                />
                <span className={styles.Bagde__span}>
                  <WiThermometer className={styles.Bagde__span__thermo} />
                  <p className={styles.temp}>{e.temp_c}°</p>
                </span>
              </div>
              {/* <p>{e.condition.text}</p> */}
            </div>
          ))}
      </div>
      <Button
        classVariation="Swiper"
        text={<IoIosArrowForward />}
        onClick={slide}
        Inputvalue="avanti"
      />
    </div>
  );
};

export default CarouselHourForecast;
