import { useRef } from "react";
import styles from "./styles.module.scss";

const Button = ({ classVariation, text, onClick, Inputvalue }) => {
  const values = useRef();
  const theme = classVariation;
  const clicked = (value) => {
    onClick(value);
  };

  return (
    <>
      <button
        className={`${styles.Button} ${styles[theme]}`}
        onClick={() => clicked(values.current.value)}
        value={Inputvalue}
        ref={values}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
