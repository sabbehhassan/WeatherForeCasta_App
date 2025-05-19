import React from 'react';
import { useSelector } from 'react-redux';

const WeatherCard = () => {
  const { data, isWeatherLoading, error } = useSelector((state) => state?.weather);

  if (isWeatherLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data) return null;

  // Convert Unix timestamp to readable time for sunrise and sunset
  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  };

  // Get current hour
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour >= 6 && currentHour < 18 ? 'Day' : 'Night';  // 6 AM to 6 PM is Day, else Night

  return (
    <div className="text-center bg-sky-100 rounded-xl p-6 shadow-lg">
      {data?.name && <h2 className="text-2xl font-semibold text-gray-800 mb-2"> {data?.name}</h2>}
      
      
      {/* Weather Icon */}
      <img
        src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
        alt={data.weather[0].description}
        className="mb-2 mx-auto"
      />
      
      {/* Temperature */}
      <p className="text-4xl font-bold text-gray-900 mb-2">{Math.round(data.main.temp)}°C</p>
      
      {/* Weather Description */}
      <p className="text-lg text-gray-700 capitalize mb-4">{data.weather[0].description}</p>

      {/* Feels Like Temperature */}
      <p className="text-lg text-gray-700 mb-4">
        <strong>Feels Like:</strong> {Math.round(data.main.feels_like)}°C
      </p>

      {/* Pressure */}
      <p className="text-lg text-gray-700 mb-4">
        <strong>Pressure:</strong> {data.main.pressure} hPa
      </p>

      {/* Sunrise and Sunset */}
      <div className="mb-4">
        <p className="text-lg text-gray-700">
          <strong>Sunrise:</strong> {convertUnixToTime(data.sys.sunrise)}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Sunset:</strong> {convertUnixToTime(data.sys.sunset)}
        </p>
      </div>

      {/* Humidity and Wind */}
      <div className="flex justify-around text-sm text-gray-600">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{data.wind.speed} km/h</p>
        </div>
      </div>

      {/* Display Day or Night */}
      <p className="text-lg text-gray-700 mt-4 font-semibold">
        {timeOfDay} - It's currently {timeOfDay}!
      </p>
    </div>
  );
};

export default WeatherCard;
