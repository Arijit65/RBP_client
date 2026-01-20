import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileSearchModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('All Residential');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  const popularSearches = [
    'Apartments in Delhi',
    'Villas in Mumbai',
    'Flats in Bangalore',
    'PG in Pune',
    'Commercial Space in Hyderabad'
  ];

  const propertyTypes = [
    'All Residential',
    'Apartment',
    'Villa',
    'House',
    'Plot',
    'Commercial'
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const params = new URLSearchParams();
    
    if (activeTab === 'Rent') params.append('purpose', 'rent');
    else if (activeTab === 'Buy') params.append('purpose', 'buy');
    
    if (propertyType !== 'All Residential') {
      params.append('propertyType', propertyType.toLowerCase());
    }
    
    const searchTerm = searchQuery.toLowerCase().trim();
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    const cities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad'];
    const foundCity = cities.find(city => searchTerm.includes(city));
    
    if (foundCity) {
      navigate(`/properties?city=${foundCity}${queryString ? '&' + queryString.slice(1) : ''}`);
    } else {
      navigate(`/properties${queryString}`);
    }
    
    onClose();
  };

  const handlePopularSearch = (search) => {
    setSearchQuery(search);
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-slate-900 z-60 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900 shadow-sm px-4 py-3 flex items-center space-x-3 z-10 border-b border-slate-700">
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition active:scale-95"
          aria-label="Close search"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>
        <h2 className="text-lg font-bold text-gray-100">Search Properties</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Tabs */}
        <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg">
          {['Buy', 'Rent', 'PG'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-md font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Type Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by city, locality, or property"
              className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-700 text-gray-200 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all shadow-lg active:scale-95"
        >
          Search Properties
        </button>

        {/* Popular Searches */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
            <span className="mr-2">🔥</span>
            Popular Searches
          </h3>
          <div className="space-y-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handlePopularSearch(search)}
                className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all text-gray-300 text-sm border border-slate-700"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Top Cities</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'].map((city) => (
              <button
                key={city}
                onClick={() => {
                  navigate(`/properties?city=${city.toLowerCase()}`);
                  onClose();
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all text-gray-300 text-sm border border-slate-700"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchModal;
