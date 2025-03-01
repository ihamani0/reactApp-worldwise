/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:8081";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [isLoding, setIsLoding] = useState(false);
  const [cities, setCities] = useState([]);
  const [City, setCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoding(true);
        const res = await fetch(`${URL}/cities`); // http://localhost:8081/cities

        if (!res.ok) throw Error("Error fetch data");

        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoding(false);
      }
    }
    fetchCities();
  }, []);

  async function getCityById(id) {
    try {
      setIsLoding(true);
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) throw new Error("ERROR IN FETCH ");
      const data = await res.json();

      setCity(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoding(false);
    }
  }

  async function CreateCity(newCity) {
    try {
      setIsLoding(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) throw new Error("ERROR IN createing ");

      setCities((prev) => [...prev, newCity]);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoding(false);
    }
  }

  async function deleteCity(id){
    try {
      setIsLoding(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });


      setCities((prev) => prev.filter( city => city.id !== id) );
      
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoding(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoding,
        setIsLoding,
        cities,
        City,
        getCityById,
        CreateCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You must hook inside Provider Cities");
  return context;
}

export default CitiesProvider;
