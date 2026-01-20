import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line
import { Check, Phone, Plus, Minus } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import ImageUpload from '../../components/ImageUpload';
import VideoUpload from '../../components/VideoUpload';
import CitySearch from '../../components/CitySearch';
import { useApi } from '../../Context/AppContext';

const AdminPostPropertyPage = () => {
  const { propertyApi } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    purpose: 'Sell',
    propertyType: 'Residential',
    propertySubType: 'Independent House / Villa',

    // Step 2: Location Details
    city: 'Kolkata',
    locality: 'Goragacha',
    subLocality: '',
    apartment: '',

    // Step 3: Property Profile
    bedrooms: '2',
    bathrooms: '2',
    balconies: '1',
    plotArea: '12000',
    areaUnit: 'sq.ft.',
    carpetArea: '',
    builtUpArea: '',
    totalFloors: '2',
    availabilityStatus: 'Ready to move',
    propertyAge: '1-5 years',
    ownership: 'Freehold',
    expectedPrice: '',
    pricePerSqFt: '',
    allInclusivePrice: false,
    taxExcluded: false,
    priceNegotiable: false,
    propertyDescription: '',

    // Step 4: Photos & Videos
    photos: [],
    video: null,

    // Step 5: Amenities
    otherRooms: [],
    furnishing: '',
    coveredParking: 0,
    openParking: 0,
    amenities: [],
    propertyFeatures: [],
    societyFeatures: [],
    additionalFeatures: [],
    waterSource: [],
    overlooking: [],
    otherFeatures: {
      gatedSociety: false,
      cornerProperty: false,
      petFriendly: false,
      wheelchairFriendly: false
    },
    powerBackup: 'None',
    propertyFacing: '',
    flooringType: '',
    locationAdvantages: []
  });

  const steps = [
    { id: 1, title: 'Basic Details', subtitle: 'Step 1' },
    { id: 2, title: 'Location Details', subtitle: 'Step 2' },
    { id: 3, title: 'Property Profile', subtitle: 'Step 3' },
    { id: 4, title: 'Photos, Videos & Voice-over', subtitle: 'Step 4' },
    { id: 5, title: 'Amenities section', subtitle: 'Step 5' }
  ];

  const propertyScore = currentStep === 1 ? 12 : currentStep === 2 ? 27 : currentStep === 3 ? 53 : currentStep === 4 ? 65 : 65;

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleArrayItem = (field, item) => {
    const currentArray = formData[field];
    if (currentArray.includes(item)) {
      updateFormData(field, currentArray.filter(i => i !== item));
    } else {
      updateFormData(field, [...currentArray, item]);
    }
  };

  // Upload images to Cloudinary
  const uploadToCloudinary = async (file, resourceType = 'image') => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'YOUR_UPLOAD_PRESET';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('cloud_name', cloudName);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  // Submit property to backend
  const handleSubmitProperty = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.city || !formData.locality) {
        alert('Please fill in all required location fields');
        setIsSubmitting(false);
        return;
      }

      if (!formData.plotArea || !formData.expectedPrice) {
        alert('Please fill in property area and price details');
        setIsSubmitting(false);
        return;
      }

      // Upload images to Cloudinary
      let photoUrls = [];
      if (formData.photos && formData.photos.length > 0) {
        console.log(`Uploading ${formData.photos.length} images to Cloudinary...`);
        
        try {
          const uploadPromises = formData.photos.map((photo, index) => {
            console.log(`Uploading image ${index + 1}/${formData.photos.length}...`);
            return uploadToCloudinary(photo.file, 'image');
          });
          photoUrls = await Promise.all(uploadPromises);
          console.log('✅ All images uploaded successfully:', photoUrls);
        } catch (error) {
          alert('Failed to upload images. Please check your Cloudinary configuration and try again.');
          console.error('Image upload failed:', error);
          setIsSubmitting(false);
          return;
        }
      }

      // Upload video to Cloudinary
      let videoUrl = null;
      if (formData.video && formData.video.file) {
        console.log('Uploading video to Cloudinary...');
        
        try {
          videoUrl = await uploadToCloudinary(formData.video.file, 'video');
          console.log('✅ Video uploaded successfully:', videoUrl);
        } catch (error) {
          alert('Failed to upload video. Please check your Cloudinary configuration and try again.');
          console.error('Video upload failed:', error);
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare data for backend with Cloudinary URLs
      const propertyData = {
        ...formData,
        photos: photoUrls,
        video: videoUrl
      };

      console.log('📤 Submitting property to backend...', propertyData);
      const result = await propertyApi.createProperty(propertyData);
      
      if (result.success) {
        alert('🎉 Property posted successfully!');
        // Reset form or redirect
        // Option 1: Reset form
        setFormData({
          purpose: 'Sell',
          propertyType: 'Residential',
          propertySubType: 'Independent House / Villa',
          city: 'Kolkata',
          locality: 'Goragacha',
          subLocality: '',
          apartment: '',
          bedrooms: '2',
          bathrooms: '2',
          balconies: '1',
          plotArea: '12000',
          areaUnit: 'sq.ft.',
          carpetArea: '',
          builtUpArea: '',
          totalFloors: '2',
          availabilityStatus: 'Ready to move',
          propertyAge: '1-5 years',
          ownership: 'Freehold',
          expectedPrice: '',
          pricePerSqFt: '',
          allInclusivePrice: false,
          taxExcluded: false,
          priceNegotiable: false,
          propertyDescription: '',
          photos: [],
          video: null,
          otherRooms: [],
          furnishing: '',
          coveredParking: 0,
          openParking: 0,
          amenities: [],
          propertyFeatures: [],
          societyFeatures: [],
          additionalFeatures: [],
          waterSource: [],
          overlooking: [],
          otherFeatures: {
            gatedSociety: false,
            cornerProperty: false,
            petFriendly: false,
            wheelchairFriendly: false
          },
          powerBackup: 'None',
          propertyFacing: '',
          flooringType: '',
          locationAdvantages: []
        });
        setCurrentStep(1);
        
        // Option 2: Redirect to properties list
        // window.location.href = '/admin/properties';
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('An unexpected error occurred while posting the property');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Steps */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-100 rounded-lg shadow-sm p-6 mb-6 border border-gray-200"
            >
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            currentStep === step.id
                              ? 'border-slate-800 bg-amber-500'
                              : currentStep > step.id
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {currentStep > step.id ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <div
                              className={`w-3 h-3 rounded-full ${
                                currentStep === step.id ? 'bg-white' : 'bg-transparent'
                              }`}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-sm ${
                            currentStep === step.id ? 'text-gray-100' : 'text-gray-700'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-normal">{step.subtitle}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-4 top-10 w-0.5 h-10 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-100 rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${propertyScore * 2.26} 226`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-100">{propertyScore}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-100 text-sm">Property Score</h3>
                  <p className="text-xs text-gray-500">
                    Better your property score, greater your visibility
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content - Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-lg shadow-md p-8"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-bold text-gray-100 mb-1">
                      Welcome back RIVU MONDAL,
                    </h2>
                    <p className="text-base text-gray-100 mb-8">Fill out basic details</p>

                    {/* I'm looking to */}
                    <div className="mb-8">
                      <label className="block text-gray-100 font-semibold mb-3 text-sm">
                        I'm looking to
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['Sell', 'Rent / Lease', 'PG'].map((option) => (
                          <button
                            key={option}
                            onClick={() => updateFormData('purpose', option)}
                            className={`px-5 py-2 rounded-full font-medium transition-all text-sm border-2 ${
                              formData.purpose === option
                                ? 'bg-amber-50 text-amber-600 border-slate-800'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* What kind of property */}
                    <div className="mb-8">
                      <label className="block text-gray-100 font-semibold mb-3 text-sm">
                        What kind of property do you have?
                      </label>
                      <div className="flex gap-6 mb-4">
                        {['Residential', 'Commercial'].map((option) => (
                          <label key={option} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="propertyType"
                              checked={formData.propertyType === option}
                              onChange={() => updateFormData('propertyType', option)}
                              className="w-4 h-4 text-amber-500 accent-amber-500"
                            />
                            <span className="text-gray-100 font-medium text-sm">{option}</span>
                          </label>
                        ))}
                      </div>

                      {/* Property Subtypes */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Flat/Apartment',
                          'Independent House / Villa',
                          'Independent / Builder Floor',
                          'Plot / Land',
                          '1 RK/ Studio Apartment',
                          'Serviced Apartment',
                          'Farmhouse',
                          'Other'
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => updateFormData('propertySubType', option)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm border-2 ${
                              formData.propertySubType === option
                                ? 'bg-amber-50 text-amber-600 border-slate-800'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Continue Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="bg-amber-500 text-white px-8 py-2.5 rounded font-semibold hover:bg-amber-600 transition-colors text-sm"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 2: Location Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <button
                      onClick={handleBack}
                      className="flex items-center text-gray-600 hover:text-gray-100 mb-6 transition"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back
                    </button>

                    <h2 className="text-2xl font-bold text-gray-100 mb-2">
                      Where is your property located?
                    </h2>
                    <p className="text-gray-600 mb-8">An accurate location helps you connect with the right buyers</p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-100 font-medium mb-2 text-sm">City</label>
                        <CitySearch
                          onCitySelect={(city) => updateFormData('city', city)}
                          selectedCity={formData.city}
                          dropdownClassName="bg-white border-gray-200"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-100 font-medium mb-2 text-sm">Locality</label>
                        <input
                          type="text"
                          value={formData.locality}
                          onChange={(e) => updateFormData('locality', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter locality"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Sub Locality (Optional)</label>
                        <input
                          type="text"
                          value={formData.subLocality}
                          onChange={(e) => updateFormData('subLocality', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter sub locality"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Apartment / Society (Optional)</label>
                        <input
                          type="text"
                          value={formData.apartment}
                          onChange={(e) => updateFormData('apartment', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter apartment or society name"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="mt-8 bg-amber-500 text-white px-8 py-2.5 rounded font-semibold hover:bg-amber-600 transition-colors text-sm"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 3: Property Profile */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <button
                      onClick={handleBack}
                      className="flex items-center text-gray-600 hover:text-gray-100 mb-6 transition"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back
                    </button>

                    <h2 className="text-2xl font-bold text-gray-100 mb-8">Tell us about your property</h2>

                    <div className="space-y-8">
                      {/* Add Room Details */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Add Room Details</h3>

                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-2">No. of Bedrooms</label>
                          <div className="flex gap-3">
                            {['1', '2', '3', '4'].map((num) => (
                              <button
                                key={num}
                                onClick={() => updateFormData('bedrooms', num)}
                                className={`px-4 py-2 rounded-lg font-medium transition border-2 ${
                                  formData.bedrooms === num
                                    ? 'bg-amber-50 text-amber-600 border-slate-800'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          <button className="mt-2 text-amber-500 text-sm font-medium hover:underline flex items-center bg-transparent border-0 p-0">
                            <Plus className="w-4 h-4 mr-1" /> Add other
                          </button>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm text-gray-700 mb-2">No. of Bathrooms</label>
                          <div className="flex gap-3">
                            {['1', '2', '3', '4'].map((num) => (
                              <button
                                key={num}
                                onClick={() => updateFormData('bathrooms', num)}
                                className={`px-4 py-2 rounded-lg font-medium transition border-2 ${
                                  formData.bathrooms === num
                                    ? 'bg-amber-50 text-amber-600 border-slate-800'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          <button className="mt-2 text-amber-500 text-sm font-medium hover:underline flex items-center bg-transparent border-0 p-0">
                            <Plus className="w-4 h-4 mr-1" /> Add other
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Balconies</label>
                          <div className="flex gap-3">
                            {['0', '1', '2', '3', 'More than 3'].map((num) => (
                              <button
                                key={num}
                                onClick={() => updateFormData('balconies', num)}
                                className={`px-4 py-2 rounded-lg font-medium transition border-2 ${
                                  formData.balconies === num
                                    ? 'bg-amber-50 text-amber-600 border-slate-800'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Add Area Details */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Add Area Details</h3>
                        <p className="text-sm text-gray-600 mb-4">Atleast one area type is mandatory</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Plot Area</label>
                            <input
                              type="text"
                              value={formData.plotArea}
                              onChange={(e) => updateFormData('plotArea', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="12000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">&nbsp;</label>
                            <select
                              value={formData.areaUnit}
                              onChange={(e) => updateFormData('areaUnit', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            >
                              <option>sq.ft.</option>
                              <option>sq.m.</option>
                              <option>sq.yards</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-4">
                          <button className="text-amber-500 text-sm font-medium hover:underline flex items-center bg-transparent border-0 p-0">
                            <Plus className="w-4 h-4 mr-1" /> Add Carpet Area
                          </button>
                          <button className="text-amber-500 text-sm font-medium hover:underline flex items-center bg-transparent border-0 p-0">
                            <Plus className="w-4 h-4 mr-1" /> Add Built-up Area
                          </button>
                        </div>
                      </div>

                      {/* Floor Details */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Floor Details</h3>
                        <p className="text-sm text-gray-600 mb-2">Total no of floors and your floor details</p>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Total Floors</label>
                          <input
                            type="text"
                            value={formData.totalFloors}
                            onChange={(e) => updateFormData('totalFloors', e.target.value)}
                            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="2"
                          />
                        </div>
                      </div>

                      {/* Availability Status */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Availability Status</h3>
                        <div className="flex gap-4">
                          {['Ready to move', 'Under construction'].map((status) => (
                            <button
                              key={status}
                              onClick={() => updateFormData('availabilityStatus', status)}
                              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                                formData.availabilityStatus === status
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of Property */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Age of property</h3>
                        <div className="flex flex-wrap gap-3">
                          {['0-1 years', '1-5 years', '5-10 years', '10+ years'].map((age) => (
                            <button
                              key={age}
                              onClick={() => updateFormData('propertyAge', age)}
                              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                                formData.propertyAge === age
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {age}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ownership */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Ownership</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney'].map((type) => (
                            <button
                              key={type}
                              onClick={() => updateFormData('ownership', type)}
                              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                                formData.ownership === type
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Details */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-4">Price Details</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Expected Price</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">₹</span>
                              <input
                                type="text"
                                value={formData.expectedPrice}
                                onChange={(e) => updateFormData('expectedPrice', e.target.value)}
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="50,00,000"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Price per sq.ft.</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">₹</span>
                              <input
                                type="text"
                                value={formData.pricePerSqFt}
                                onChange={(e) => updateFormData('pricePerSqFt', e.target.value)}
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="416"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.allInclusivePrice}
                              onChange={(e) => updateFormData('allInclusivePrice', e.target.checked)}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">All inclusive price</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.taxExcluded}
                              onChange={(e) => updateFormData('taxExcluded', e.target.checked)}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Tax and Govt. charges excluded</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.priceNegotiable}
                              onChange={(e) => updateFormData('priceNegotiable', e.target.checked)}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Price Negotiable</span>
                          </label>
                        </div>
                        <button className="mt-3 text-amber-500 text-sm font-medium hover:underline flex items-center bg-transparent border-0 p-0">
                          <Plus className="w-4 h-4 mr-1" /> Add more pricing details
                        </button>
                      </div>

                      {/* Property Description */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">What makes your property unique</h3>
                        <p className="text-sm text-gray-600 mb-3">Adding description will increase your listing visibility</p>
                        <textarea
                          value={formData.propertyDescription}
                          onChange={(e) => updateFormData('propertyDescription', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          rows="4"
                          placeholder="Share some details about your property like spacious rooms, well maintained facilities..."
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          Minimum 30 characters required " 0/5000
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="mt-8 bg-amber-500 text-white px-8 py-2.5 rounded font-semibold hover:bg-amber-600 transition-colors text-sm"
                    >
                      Post & continue
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 4: Photos, Videos & Voice-over */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center text-gray-600 hover:text-gray-100 transition"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>
                      <button className="text-amber-500 hover:text-amber-600 font-medium text-sm">Close X</button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Add one video of property</h2>
                    <p className="text-gray-600 mb-4">
                      A video is worth a thousand pictures. Properties with videos get higher page views
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      Make sure it follows the <a href="#" className="text-amber-500 hover:underline">Video Guidelines</a>
                    </p>

                    {/* Upload Video */}
                    <div className="mb-8">
                      <div className="flex items-center mb-4">
                        <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-semibold mr-2">NEW</span>
                        <span className="font-semibold text-gray-100">Upload Video</span>
                      </div>

                      <VideoUpload
                        video={formData.video}
                        onVideoChange={(video) => updateFormData('video', video)}
                      />
                    </div>

                    {/* Upload Photos */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-100 mb-2">
                        Add photos of your property <span className="text-sm font-normal text-gray-600">(Optional)</span>
                      </h2>
                      <p className="text-gray-600 mb-6">
                        A picture is worth a thousand words. 87% of buyers look at photos before buying
                      </p>

                      <h3 className="font-semibold text-gray-100 mb-4">Upload images</h3>

                      <ImageUpload
                        images={formData.photos}
                        onImagesChange={(images) => updateFormData('photos', images)}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="bg-amber-500 text-white px-8 py-2.5 rounded font-semibold hover:bg-amber-600 transition-colors text-sm"
                    >
                      Save and Continue
                    </motion.button>
                  </motion.div>
                )}

                {/* Step 5: Amenities Section */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center text-gray-600 hover:text-gray-100 transition"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>
                      <button className="text-amber-500 hover:text-amber-600 font-medium text-sm">Close X</button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Add amenities/unique features</h2>
                    <p className="text-gray-600 mb-6">
                      These fields are used to populate USP & Captions. All fields on this page are optional
                    </p>

                    <div className="space-y-8">
                      {/* Other Rooms */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Other rooms <span className="text-gray-500 font-normal">(Optional)</span></h3>
                        <div className="flex flex-wrap gap-3">
                          {['Pooja Room', 'Study Room', 'Servant Room', 'Store Room'].map((room) => (
                            <button
                              key={room}
                              onClick={() => toggleArrayItem('otherRooms', room)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.otherRooms.includes(room)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {room}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Furnishing */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Furnishing <span className="text-gray-500 font-normal">(Optional)</span></h3>
                        <div className="flex gap-4">
                          {['Furnished', 'Semi-furnished', 'Un-furnished'].map((type) => (
                            <button
                              key={type}
                              onClick={() => updateFormData('furnishing', type)}
                              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                                formData.furnishing === type
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reserved Parking */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Reserved Parking <span className="text-gray-500 font-normal">(Optional)</span></h3>
                        <div className="grid grid-cols-2 gap-4 max-w-md">
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Covered Parking</label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateFormData('coveredParking', Math.max(0, formData.coveredParking - 1))}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="text"
                                value={formData.coveredParking}
                                readOnly
                                className="flex-1 text-center border-none focus:ring-0 py-2"
                              />
                              <button
                                onClick={() => updateFormData('coveredParking', formData.coveredParking + 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-2">Open Parking</label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateFormData('openParking', Math.max(0, formData.openParking - 1))}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                type="text"
                                value={formData.openParking}
                                readOnly
                                className="flex-1 text-center border-none focus:ring-0 py-2"
                              />
                              <button
                                onClick={() => updateFormData('openParking', formData.openParking + 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Amenities</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Maintenance Staff', 'Water Storage', 'Waste Disposal', 'Private Garden / Terrace'].map((amenity) => (
                            <button
                              key={amenity}
                              onClick={() => toggleArrayItem('amenities', amenity)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.amenities.includes(amenity)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {amenity}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Features */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Property Features</h3>
                        <div className="flex flex-wrap gap-3">
                          {['High Ceiling Height', 'False Ceiling Lighting', 'Piped-gas'].map((feature) => (
                            <button
                              key={feature}
                              onClick={() => toggleArrayItem('propertyFeatures', feature)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.propertyFeatures.includes(feature)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {feature}
                            </button>
                          ))}
                        </div>
                        <button className="mt-3 text-amber-500 text-sm font-medium hover:underline bg-transparent border-0 p-0">7 more +</button>
                      </div>

                      {/* Society/Building Feature */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Society/Building feature</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Fitness Centre / GYM', 'Swimming Pool', 'Club house / Community Center', 'Security Personnel'].map((feature) => (
                            <button
                              key={feature}
                              onClick={() => toggleArrayItem('societyFeatures', feature)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.societyFeatures.includes(feature)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {feature}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Features */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Additional Features</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Separate entry for servant room', 'No open drainage around', 'Bank Attached Property', 'Low Density Society'].map((feature) => (
                            <button
                              key={feature}
                              onClick={() => toggleArrayItem('additionalFeatures', feature)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.additionalFeatures.includes(feature)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {feature}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Water Source */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Water Source</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Municipal corporation', 'Borewell/Tank', '24*7 Water'].map((source) => (
                            <button
                              key={source}
                              onClick={() => toggleArrayItem('waterSource', source)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.waterSource.includes(source)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {source}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Overlooking */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Overlooking</h3>
                        <div className="flex flex-wrap gap-3">
                          {['Pool', 'Park/Garden', 'Club', 'Main Road', 'Others'].map((view) => (
                            <button
                              key={view}
                              onClick={() => toggleArrayItem('overlooking', view)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.overlooking.includes(view)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {view}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Other Features */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Other Features</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.otherFeatures.gatedSociety}
                              onChange={(e) => updateFormData('otherFeatures', {...formData.otherFeatures, gatedSociety: e.target.checked})}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">In a gated society</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.otherFeatures.cornerProperty}
                              onChange={(e) => updateFormData('otherFeatures', {...formData.otherFeatures, cornerProperty: e.target.checked})}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Corner Property</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.otherFeatures.petFriendly}
                              onChange={(e) => updateFormData('otherFeatures', {...formData.otherFeatures, petFriendly: e.target.checked})}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.otherFeatures.wheelchairFriendly}
                              onChange={(e) => updateFormData('otherFeatures', {...formData.otherFeatures, wheelchairFriendly: e.target.checked})}
                              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Wheelchair Friendly</span>
                          </label>
                        </div>
                      </div>

                      {/* Power Back up */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Power Back up</h3>
                        <div className="flex gap-4">
                          {['None', 'Partial', 'Full'].map((type) => (
                            <button
                              key={type}
                              onClick={() => updateFormData('powerBackup', type)}
                              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                                formData.powerBackup === type
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Facing */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Property facing</h3>
                        <div className="flex flex-wrap gap-3">
                          {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map((direction) => (
                            <button
                              key={direction}
                              onClick={() => updateFormData('propertyFacing', direction)}
                              className={`px-4 py-2 rounded-full font-medium transition border-2 ${
                                formData.propertyFacing === direction
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              {direction}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Type of Flooring */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-3">Type of flooring</h3>
                        <select
                          value={formData.flooringType}
                          onChange={(e) => updateFormData('flooringType', e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option>Marble</option>
                          <option>Tiles</option>
                          <option>Granite</option>
                          <option>Wooden</option>
                          <option>Vitrified</option>
                        </select>
                      </div>

                      {/* Location Advantages */}
                      <div>
                        <h3 className="font-semibold text-gray-100 mb-2">Location Advantages</h3>
                        <p className="text-sm text-gray-600 mb-3">Highlight the nearby landmarks</p>
                        <div className="flex flex-wrap gap-3">
                          {['Close to Metro Station', 'Close to School', 'Close to Hospital', 'Close to Market', 'Close to Railway Station', 'Close to Airport', 'Close to Mall', 'Close to Highway'].map((advantage) => (
                            <button
                              key={advantage}
                              onClick={() => toggleArrayItem('locationAdvantages', advantage)}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center border-2 ${
                                formData.locationAdvantages.includes(advantage)
                                  ? 'bg-amber-50 text-amber-600 border-slate-800'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <Plus className="w-4 h-4 mr-1" /> {advantage}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-amber-50 border border-blue-200 rounded-lg p-4 flex items-start">
                      <div className="text-amber-500 mr-3 mt-0.5">💡</div>
                      <div>
                        <p className="text-sm text-gray-100">
                          <span className="font-semibold">You can change your Top USPs from here</span>
                          <br />
                          Or see your current top USPs{' '}
                          <button className="text-amber-500 hover:underline font-medium bg-transparent border-0 p-0">click here</button>
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitProperty}
                      disabled={isSubmitting}
                      className="mt-8 bg-amber-500 text-white px-8 py-2.5 rounded font-semibold hover:bg-amber-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Posting Property...' : 'Post Property'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-right"
            >
              <div className="inline-block bg-slate-800 rounded-lg shadow-sm border border-gray-200 p-3">
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-left">
                    <p className="text-xs text-gray-600 mb-1">Need help ?</p>
                    <p className="text-xs text-gray-700">
                      You can email us at{' '}
                      <a href="mailto:support@royalbengalproperties.com" className="text-amber-500 font-semibold hover:underline">
                        support@royalbengalproperties.com
                      </a>
                    </p>
                    <p className="text-xs text-gray-700">
                      or call us at{' '}
                      <a href="tel:18001234567" className="text-amber-500 font-semibold hover:underline">
                        1800 123 4567
                      </a>{' '}
                      <span className="text-gray-500">(IND Toll-Free).</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPostPropertyPage;
