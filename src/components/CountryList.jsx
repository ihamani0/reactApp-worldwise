/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesProvider";

function CountryList() {

  
  const {isLoding,cities} = useCities();


  if (isLoding) return <Spinner />;

  if (!cities.length) return <Message message="Ther Is no Data " />;

  const countrys = cities.reduce(function (arr, cur) {

    if(!arr.map( el => el.country).includes(cur.country)){
      return [...arr , {country: cur.country , emoji :cur.emoji }]
    }else{
      return arr
    }
  }
  ,[]);


  return (
    <div className={styles.countryList}>
      {countrys.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
