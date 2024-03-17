/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import UseUrlPosition from "../Hooks/UseUrlPosition";

const CitiesContext = createContext();

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function CitiesProvider({ children }) {
  const [cities, setcities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setcurrentCity] = useState({});

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const flagemojiToPNG = (flag) => {
    if (flag === undefined) return;
    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />
    );
  };

  const URL = `http://localhost:8000`;

  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${URL}/cities`);
          const data = await res.json();

          setcities((prev) => (prev = data.data));
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },
    [URL]
  );

  const [lat, lng] = UseUrlPosition();
  const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoading(true);
        setGeoCodingError("");
        if ((!lat, !lng)) return;
        const res = await fetch(`${baseUrl}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error(
            "That does not look like a city. Please click someplace else"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function getCity(id) {
    if (id == currentCity._id) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setcurrentCity(data.data);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status}`);
        return;
      }

      const data = await res.json();
      // in future will use react query
      setcities((cities) => [...cities, data.data]);
      setcurrentCity(data.data);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      setcities((cities) => cities.filter((city) => city._id !== id));
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        flagemojiToPNG,
        cityName,
        setCityName,
        country,
        emoji,
        geoCodingError,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}
function UseCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    return new Error("Citiescontext used in wrong component Outside Provider");
  return context;
}

export { UseCitiesContext, CitiesProvider };
