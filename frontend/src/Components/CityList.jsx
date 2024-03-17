import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { UseCitiesContext } from "../Contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = UseCitiesContext();
  if (isLoading) return <Spinner />;
  if (!cities?.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((item) => (
        <CityItem item={item} key={item._id} />
      ))}
    </ul>
  );
}
