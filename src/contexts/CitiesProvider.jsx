/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const URL = "http://localhost:8081";

const CitiesContext = createContext();

const initialState = {
  isLoding: false,
  cities: [],
  City: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoding: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoding: false,
      };
    case "city/loaded":
      return {
        ...state,
        City: action.payload,
        isLoding: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoding: false,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoding: false,
      };
    case "city/created":
      return {
        ...state,
        isLoding: false,
        cities: [...state.cities, action.payload],
      };
    default:
      break;
  }
}

function CitiesProvider({ children }) {
  const [{ isLoding, cities, City, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`, {
          signal: abortController.signal,
        }); // http://localhost:8081/cities

        if (!res.ok) throw Error("Error fetch data");

        const data = await res.json();

        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({
            type: "error",
            payload: error.message,
          });
        }
      }
    }
    fetchCities();

    return () => abortController.abort();
  }, []);

  async function getCityById(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) throw new Error("ERROR IN FETCH ");
      const data = await res.json();

      dispatch({
        type: "city/loaded",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.message,
      });
    }
  }

  async function CreateCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) throw new Error("ERROR IN createing ");

      const data = await res.json();  

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoding,
        cities,
        City,
        error,
        getCityById,
        CreateCity,
        deleteCity,
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
