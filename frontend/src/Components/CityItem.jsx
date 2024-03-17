/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { UseCitiesContext } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ item }) {
  const { currentCity } = UseCitiesContext();
  const { cityName, emoji, date, _id, position } = item;
  const { flagemojiToPNG, deleteCity } = UseCitiesContext();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("test");
    deleteCity(_id);
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity._id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>
          {emoji ? flagemojiToPNG(emoji) : ""}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
