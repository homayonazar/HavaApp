import { useEffect, useState } from "react";
import background from "./assets/images/bg.png";

// icons
import sunIcon from "./assets/images/sun.png";
import cloudIcon from "./assets/images/cloud.png";
import mistIcon from "./assets/images/mist.png";
import partlycloudy from "./assets/images/partlycloudy.png";
import moderaterain from "./assets/images/moderaterain.png";
import heavyrain from "./assets/images/heavyrain.png";

const API_KEY = "61fb98793a3ce7b0d1b4d960f018fca4";

interface WeatherData {
  main: { temp: number; humidity: number };
  weather: { main: string }[];
  wind: { speed: number };
  sys: { sunrise: number };
}


const weatherIcons: Record<string, string> = {
  Clear: sunIcon,
  Clouds: cloudIcon,
  Mist: mistIcon,
  "Partly Cloudy": partlycloudy,
  "Moderate Rain": moderaterain,
  "Heavy Rain": heavyrain,
};

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Istanbul"); // شهر پیشفرض
  const [search, setSearch] = useState<string>("");

  const fetchWeather = async (cityName: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() !== "") {
      fetchWeather(search.trim());
      setSearch("");
    }
  };

  if (!weather)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );

  const temp = Math.round(weather.main.temp);
  const description = weather.weather[0].main;
  const windSpeed = weather.wind.speed;
  const humidity = Math.round(weather.main.humidity);
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const icon = weatherIcons[description] || sunIcon;

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed filter blur-2xl z-[-1] scale-125"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Search Input */}
      <div className="fixed top-4 inset-x-0 px-5 z-10">
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder="Search city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md h-10 bg-gray-200 rounded text-black ps-5"
          />
        </form>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        {/* City Name */}
        <p className="text-2xl font-semibold mb-4">{city}</p>

        {/* Weather Icon */}
        <img src={icon} className="w-48 mb-6" alt="weather icon" />

        {/* Weather Info */}
        <div className="text-center mb-6">
          <p className="text-4xl font-bold">{temp}°C</p>
          <span className="text-lg">{description}</span>
        </div>

        {/* Weather Details */}
        <div className="flex justify-between w-full max-w-md mb-6 text-white px-10">
          <p>Wind : {windSpeed} km/h</p>
          <p>humidity : {humidity}%</p>
        </div>
        <p>Sunrise Time : {sunrise}</p>

        {/* Daily Forecast */}
        {/* <div className="w-full max-w-md text-left">
          <p>Daily Forecast</p>
        </div> */}


      </div>
    </div>
  );
}

export default App;