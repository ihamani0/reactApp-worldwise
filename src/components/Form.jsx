import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";

import ButtonBack from "./ButtonBack";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesProvider";
import { useNavigate } from "react-router-dom";

const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  //state for the From
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  //state for the reactivity

  const [error, setError] = useState("");

  const [isLodingInformation, setIsLodingInformation] = useState(false);

  const [lat, lng] = useUrlLocation();

  const { CreateCity, isLoding } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetailsCountry() {
      try {
        setIsLodingInformation(true);
        setError("");

        const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);

        if (!res.ok) throw Error("Can not Fetch Deatils Country");

        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That does't to been city please choose other place ⭐"
          );

        setCityName(data.city);
        setCountry(data.countryName);
        // console.log('--- country code emoji ---:',  convertToEmoji(data.countryCode));
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLodingInformation(false);
      }
    }
    fetchDetailsCountry();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await CreateCity(newCity);
    navigate("/app/cities");
  };

  if (error) return <Message message={error} />;

  if (!error && isLodingInformation) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoding ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          className="react-datepicker"
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClickEvent={handleSubmit} >Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
