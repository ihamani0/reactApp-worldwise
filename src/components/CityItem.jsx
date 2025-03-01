/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesProvider";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {

  const {deleteCity} = useCities();

  const handleDelete = async (event)=>{
    event.preventDefault();

    await deleteCity(city.id)

  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} `}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <p className={styles.name}>{city.cityName}</p>
        <p className={styles.date}>{formatDate(city.date)}</p>
        <button className={styles.deleteBtn} onClick={handleDelete} >&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
