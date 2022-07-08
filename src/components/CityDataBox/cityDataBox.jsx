import React from "react";
import { useFormattedDate } from "../../utils/hooks";
import { MdOutlineLocationOn } from "react-icons/md";
import styles from "./styles.module.scss";

const CityDataBox = ({ data }) => {
  const { formattedDay, formattedMonth } = useFormattedDate(data.localtime);
  const date = data.localtime && data.localtime.split(" ");

  return (
    data && (
      <div className={styles.cityInfoBox}>
        <span className={styles.cityName}>
          <MdOutlineLocationOn className={styles.cityName__location} />
          <h1 className={styles.cityName__h1}> {data.name}</h1>
        </span>
        <p className={styles.timeP}>{date && date[1]}</p>
        <p className={styles.dateP}>
          {formattedDay},{" "}
          {formattedMonth && formattedMonth.split("").slice(0, 3).join("")}
        </p>
      </div>
    )
  );
};

export default CityDataBox;
