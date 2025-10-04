import { useEffect, useState } from "react";
import axios from "axios";
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
    const [city, setCity] = useState("Istanbul");
    const [search, setSearch] = useState("");

    // Axios call 
    const fetchWeather = async (cityName: string) => {
        try {
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
                { params: { q: cityName, appid: API_KEY, units: "metric" } }
            );
            setWeather(data);
            setCity(cityName);
            console.log(data);

        } catch (error: any) {
            if (error.response?.status === 404) alert("City not found!");
            else console.error(error);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
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

    const { temp, humidity } = weather.main;
    const { main: description } = weather.weather[0];
    const { speed: windSpeed } = weather.wind;
    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
    const icon = weatherIcons[description] || sunIcon;

    return (
        <>
            <div className="relative min-h-screen text-white hide-below-500">
                {/* Background Blur */}
                <div
                    className="fixed inset-0 bg-cover bg-center z-[-1]"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl" />
                </div>

                {/* Search Input */}
                <form
                    onSubmit={handleSearch}
                    className="fixed top-6 inset-x-0 flex justify-center z-10 px-2"
                >
                    <input
                        type="text"
                        placeholder="Search city"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm h-11 rounded-lg px-5 text-base text-white placeholder-white/70 bg-white/10 backdrop-blur-md border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                    />
                </form>

                <div className="flex flex-col items-center justify-center min-h-screen px-6 ">
                    <p className="text-3xl font-semibold tracking-wide drop-shadow-md"> {city} </p>
                    <img src={icon} className="w-40 my-6 drop-shadow-lg" alt="weather icon" />

                    <div className="text-center mb-8">
                        <p className="text-7xl font-light drop-shadow-lg">
                            {Math.round(temp)}°
                            <span className="text-4xl align-top">C</span>
                        </p>
                        <span className="text-xl opacity-90 tracking-wide">{description}</span>
                    </div>

                    {/* Extra things */}
                    <div className="flex justify-around w-full max-w-md mb-8 text-sm">
                        <div className="flex flex-col items-center">
                            <p className="font-medium">{windSpeed} km/h</p>
                            <span className="opacity-70">Wind</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-medium">{humidity}%</p>
                            <span className="opacity-70">Humidity</span>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">
                        ☀️ Sunrise at <span className="font-medium">{sunrise}</span>
                    </p>
                </div>
                <p className=" fixed bottom-5 left-1/2 transform -translate-x-1/2 text-white text-sm text-center ">App version : 2.0</p>
            </div>
            {/* Big Display  */}
            <div className="ffff  hide-above-500">
                <div className="bigScreens relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white px-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-400 opacity-20 animate-pulse -z-10 rounded-full"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mb-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    <h1 className="text-3xl font-bold mb-4">Welcome to Weather App 🌤️</h1>
                    <p className="text-lg mb-6">
                        To view the app, please open it in a mobile browser and tap the <b>"Add to Home Screen"</b> button.
                    </p>
                    <button className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        Thanks
                    </button>
                </div>
            </div>
        </>

    );
}

export default App;