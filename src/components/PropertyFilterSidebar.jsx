import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const PropertyFilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    budget: true,
    propertyType: true,
    bhk: true,
    postedBy: true,
    furnishing: true,
    availability: true,
    amenities: false
  });

  const [selectedFilters, setSelectedFilters] = useState({
    budget: { min: '', max: '' },
    propertyTypes: [],
    bhk: [],
    postedBy: [],
    furnishing: [],
    availability: '',
    amenities: []
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      budget: { min: '', max: '' },
      propertyTypes: [],
      bhk: [],
      postedBy: [],
      furnishing: [],
      availability: '',
      amenities: []
    });
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3">{children}</div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-amber-500 text-sm font-medium hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Filter Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="p-4">
          {/* Budget */}
          <FilterSection title="Budget" sectionKey="budget">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
                  <input
                    type="text"
                    placeholder="₹ Min"
                    value={selectedFilters.budget.min}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, min: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
                  <input
                    type="text"
                    placeholder="₹ Max"
                    value={selectedFilters.budget.max}
                    onChange={(e) => setSelectedFilters(prev => ({
                      ...prev,
                      budget: { ...prev.budget, max: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['10 L', '20 L', '30 L', '40 L', '50 L', '60 L', '70 L', '80 L', '90 L', '1 Cr'].map((price) => (
                  <button
                    key={price}
                    className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:border-amber-500 hover:text-amber-500 transition"
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Property Type" sectionKey="propertyType">
            <div className="space-y-2">
              {['Flat/Apartment', 'Independent House/Villa', 'Independent/Builder Floor', 'Residential Plot'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.propertyTypes.includes(type)}
                    onChange={() => toggleFilter('propertyTypes', type)}
                    className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* BHK Type */}
          <FilterSection title="BHK Type" sectionKey="bhk">
            <div className="grid grid-cols-3 gap-2">
              {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK'].map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => toggleFilter('bhk', bhk)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition ${
                    selectedFilters.bhk.includes(bhk)
                      ? 'border-amber-500 bg-amber-50 text-amber-500 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Posted By */}
          <FilterSection title="Posted By" sectionKey="postedBy">
            <div className="space-y-2">
              {['Owner', 'Dealer', 'Builder'].map((poster) => (
                <label key={poster} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.postedBy.includes(poster)}
                    onChange={() => toggleFilter('postedBy', poster)}
                    className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{poster}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Furnishing */}
          <FilterSection title="Furnishing" sectionKey="furnishing">
            <div className="space-y-2">
              {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((furnish) => (
                <label key={furnish} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.furnishing.includes(furnish)}
                    onChange={() => toggleFilter('furnishing', furnish)}
                    className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{furnish}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability" sectionKey="availability">
            <div className="space-y-2">
              {['Immediately', 'Within 15 Days', 'Within 30 Days', 'After 30 Days'].map((avail) => (
                <label key={avail} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    checked={selectedFilters.availability === avail}
                    onChange={() => setSelectedFilters(prev => ({ ...prev, availability: avail }))}
                    className="w-4 h-4 text-amber-500 accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{avail}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Amenities */}
          <FilterSection title="Amenities" sectionKey="amenities">
            <div className="space-y-2">
              {['Parking', 'Gym', 'Swimming Pool', 'Lift', 'Power Backup', 'Security', 'Park', 'Water Supply'].map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.amenities.includes(amenity)}
                    onChange={() => toggleFilter('amenities', amenity)}
                    className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;
