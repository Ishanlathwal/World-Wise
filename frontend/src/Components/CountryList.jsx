import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { UseCitiesContext } from "../Contexts/CitiesContext";
export default function CountryList() {
  const { cities, isLoading } = UseCitiesContext();
  if (isLoading) return <Spinner />;
  if (!cities?.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else {
      return acc;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((item, i) => (
        <CountryItem country={item} key={i} />
      ))}
    </ul>
  );
}
