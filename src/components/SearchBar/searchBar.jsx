import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../features/weatherSlice';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    dispatch(fetchWeather(city));
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Get Weather
      </button>
    </form>
  );
};

export default SearchBar;
