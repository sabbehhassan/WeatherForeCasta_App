
import './App.css';
import SearchBar from './components/SearchBar/searchBar';
import WeatherCard from './components/WeatherCard/weatherCard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          🌤️ Weather Dashboard
        </h1>
        <SearchBar />
        <WeatherCard />
      </div>
    </div>
  );
}

export default App;
