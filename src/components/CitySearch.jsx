import { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from "lucide-react";
import cities from '../assets/cities.json';

// Top 10 major cities of India (population-based)
const TOP_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Surat",
  "Jaipur"
];

export default function CitySearch({ onCitySelect, dropdownClassName = "", selectedCity = "" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter cities when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Show top cities when no search term
      setFilteredCities(TOP_CITIES.map(city => ({ City: city })));
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    
    // Filter from the cities.json data
    const searched = cities.cities
      .filter(city => 
        city.City.toLowerCase().includes(lowercaseSearch)
      )
      .slice(0, 20); // Limit results to prevent performance issues
    
    setFilteredCities(searched);
  }, [searchTerm]);

  const handleSelectCity = (city) => {
    onCitySelect(city.City);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleClearCity = () => {
    onCitySelect('');
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {selectedCity ? (
        <div className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-800" />
            <span className="text-gray-900 font-medium">{selectedCity}</span>
          </div>
          <button
            type="button"
            onClick={handleClearCity}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex gap-1">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={() => setIsDropdownOpen(true)}
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {isDropdownOpen && !selectedCity && (
        <div className={`absolute z-10 mt-1 w-full shadow-lg max-h-60 rounded-md border  overflow-auto ${dropdownClassName || "bg-white border-gray-200"}`}>
          {searchTerm.trim() === '' && (
            <div className="p-2 text-xs text-gray-500 font-medium bg-gray-50">Top Cities</div>
          )}
          
          {filteredCities.length > 0 ? (
            <ul>
              {filteredCities.map((city, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelectCity(city)}
                >
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span>{city.City}</span>
                  {city.State && <span className="text-gray-400 text-xs ml-auto">{city.State}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
} 