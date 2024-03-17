/* eslint-disable react/prop-types */
import { UseCitiesContext } from "../Contexts/CitiesContext";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { flagemojiToPNG } = UseCitiesContext();
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji ? flagemojiToPNG(country.emoji) : ""}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
