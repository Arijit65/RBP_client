import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../Context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Home,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Building2,
  Compass,
  Calendar,
  IndianRupee,
  User,
  Shield,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Car,
  Droplet,
  Wind,
  TreeDeciduous,
  Dumbbell,
  Waves,
  Users,
  ShieldCheck,
  Zap,
  ThermometerSun,
  Sofa,
  ChefHat,
  Sparkles,
  Network,
  Building,
  Store,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Train,
  Plane,
  Info,
  Download,
  ThumbsUp,
  ThumbsDown,
  Star,
  MessageSquare
} from 'lucide-react';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { propertyApi } = useApi();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isViewingVideo, setIsViewingVideo] = useState(false);
  const [contactForm, setContactForm] = useState({
    userType: 'Individual',
    reason: 'Investment',
    name: '',
    phone: '',
    message: 'I am interested in this Property.'
  });
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      console.log('Fetching property ID:', id);
      setLoading(true);
      setError(null);

      try {
        const result = await propertyApi.getPropertyById(id);
        console.log('Property result:', result);

        if (result.success) {
          setProperty(result.data);
        } else {
          setError(result.error || 'Failed to load property');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred while loading the property');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, propertyApi]);

  // Refs for each section
  const overviewRef = useRef(null);
  const mediaRef = useRef(null);
  const societyRef = useRef(null);
  const dealerRef = useRef(null);
  const reviewsRef = useRef(null);
  const recommendationsRef = useRef(null);

  const tabs = [
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'media', label: 'Photos & Video', ref: mediaRef },
    { id: 'society', label: 'Property Details', ref: societyRef },
    { id: 'dealer', label: 'Owner Details', ref: dealerRef },
    { id: 'reviews', label: 'Reviews', ref: reviewsRef },
    { id: 'recommendations', label: 'Similar Properties', ref: recommendationsRef }
  ];

  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };

  const nextImage = () => {
    if (!formattedProperty?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % formattedProperty.images.length);
  };

  const prevImage = () => {
    if (!formattedProperty?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + formattedProperty.images.length) % formattedProperty.images.length);
  };

  const toggleShortlist = () => {
    setIsShortlisted(!isShortlisted);
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!contactForm.name || !contactForm.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    setIsSubmittingEnquiry(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email || 'not-provided@propzy.com',
          phone: contactForm.phone,
          message: contactForm.message,
          userType: contactForm.userType,
          reason: contactForm.reason,
          propertyId: property?.id || id,
          source: 'property_detail'
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        // Reset form
        setContactForm({
          userType: 'Individual',
          reason: 'Investment',
          name: '',
          phone: '',
          message: 'I am interested in this Property.'
        });
      } else {
        alert(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please check your connection and try again.');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-100 mb-2">Property Not Found</h2>
            <p className="text-red-600 mb-4">{error || 'The property you are looking for does not exist or has been removed.'}</p>
            <Link
              to="/properties"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition"
            >
              Back to Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format property data
  const formattedProperty = {
    ...property,
    images: property.photos && property.photos.length > 0 ? property.photos : [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    video: property.video || null,
    title: `${property.bedrooms || '3'} BHK ${property.propertySubType || 'Apartment'}`,
    subtitle: `${property.propertyType || 'Residential'} ${property.purpose || 'for Sale'}`,
    price: property.expectedPrice ? `₹${property.expectedPrice}` : 'Price on request',
    pricePerSqft: property.pricePerSqFt ? `₹${property.pricePerSqFt} per sq.ft.` : '',
    location: `${property.locality || ''}, ${property.city || ''}`,
    superBuiltArea: property.builtUpArea ? `${property.builtUpArea} ${property.areaUnit || 'sq.ft.'}` : 
                    property.plotArea ? `${property.plotArea} ${property.areaUnit || 'sq.ft.'}` : 'N/A',
    carpetArea: property.carpetArea ? `${property.carpetArea} ${property.areaUnit || 'sq.ft.'}` : 'N/A',
    plotArea: property.plotArea ? `${property.plotArea} ${property.areaUnit || 'sq.ft.'}` : null,
    floorNumber: property.totalFloors ? `${property.totalFloors} Floors` : 'N/A',
    facing: property.propertyFacing || 'N/A',
    furnished: property.furnishing || 'N/A',
    parking: `${property.coveredParking || 0} Covered, ${property.openParking || 0} Open`,
    waterSource: property.waterSource && property.waterSource.length > 0 ? property.waterSource.join(', ') : 'N/A',
    powerBackup: property.powerBackup || 'N/A',
    flooring: property.flooringType || 'N/A',
    gatedSociety: property.otherFeatures?.gatedSociety || false,
    petFriendly: property.otherFeatures?.petFriendly || false,
    cornerProperty: property.otherFeatures?.cornerProperty || false,
    wheelchairFriendly: property.otherFeatures?.wheelchairFriendly || false,
    propertyAge: property.propertyAge || 'N/A',
    availableFrom: property.availabilityStatus || 'N/A',
    postedDate: `Posted on ${new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    status: property.availabilityStatus || property.status,
    description: property.propertyDescription || 'No description available.',
    // Additional fields used in JSX
    bedrooms: property.bedrooms || 'N/A',
    bathrooms: property.bathrooms || 'N/A',
    balconies: property.balconies || 'N/A',
    reraStatus: property.reraStatus || 'N/A',
    registrationNo: property.registrationNo || 'N/A',
    website: property.website || 'N/A',
    transactionType: property.transactionType || 'N/A',
    ownership: property.ownership || 'Owner',
    // Backend array fields
    amenities: property.amenities || [],
    propertyFeatures: property.propertyFeatures || [],
    societyFeatures: property.societyFeatures || [],
    additionalFeatures: property.additionalFeatures || [],
    locationAdvantages: property.locationAdvantages || [],
    overlooking: property.overlooking || [],
    otherRooms: property.otherRooms || [],
    // Pricing details
    allInclusivePrice: property.allInclusivePrice || false,
    priceNegotiable: property.priceNegotiable || false,
    taxExcluded: property.taxExcluded || false,
    // Property tags
    isInvestmentProperty: property.isInvestmentProperty || false,
    isFeatured: property.isFeatured || false,
    isTopPick: property.isTopPick || false,
    similarProperties: property.similarProperties || [],
    owner: {
      name: property.owner?.userName || 'Property Owner',
      type: property.ownership || 'Owner',
      verified: property.status === 'approved',
      phone: property.owner?.phone || 'Not available',
      email: property.owner?.email || 'Not available',
      properties: property.owner?.properties || 'N/A',
      locations: property.owner?.locations || 'N/A',
      about: property.owner?.about || 'N/A',
      address: property.owner?.address || 'N/A',
      website: property.owner?.website || 'N/A'
    }
  };

  // Build breadcrumb items dynamically based on property data
  const getBreadcrumbItems = () => {
    if (!property) return [];

    const items = [
      { label: 'Properties', href: '/properties' }
    ];

    // Add city if available
    if (property.city) {
      const citySlug = property.city.toLowerCase().replace(/\s+/g, '-');
      items.push({
        label: `Property in ${property.city}`,
        href: `/properties/${citySlug}`
      });
    }

    // Add property type if available
    if (property.propertyType) {
      const typeLabel = property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1);
      items.push({
        label: `${typeLabel}s in ${property.city || 'All Locations'}`,
        href: property.city ? `/properties/${property.city.toLowerCase().replace(/\s+/g, '-')}?propertyType=${property.propertyType}` : `/properties?propertyType=${property.propertyType}`
      });
    }

    // Add locality if available
    if (property.locality) {
      items.push({
        label: `${property.propertyType || 'Properties'} in ${property.locality}`,
        href: null
      });
    }

    // Add final breadcrumb with bedrooms
    if (property.bedrooms && property.locality) {
      items.push({
        label: `${property.bedrooms} BHK ${property.propertyType || 'Property'} in ${property.locality}`,
        href: null
      });
    } else if (property.apartment) {
      items.push({
        label: property.apartment,
        href: null
      });
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Breadcrumb Navigation */}
      {property && <Breadcrumb items={getBreadcrumbItems()} />}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Main Content - Full Width */}
        <div className="space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Main Image/Video Display */}
              <div className="relative aspect-video bg-gray-900">
                {isViewingVideo && formattedProperty.video ? (
                  <>
                    <video 
                      controls 
                      autoPlay
                      className="w-full h-full object-contain"
                      poster={formattedProperty.images[0]}
                    >
                      <source src={formattedProperty.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Close Video Button */}
                    <button
                      onClick={() => setIsViewingVideo(false)}
                      className="absolute top-4 right-4 bg-slate-800/90 hover:bg-slate-800 p-2 rounded-full shadow-lg transition z-10"
                      aria-label="Close video"
                    >
                      <X className="w-6 h-6 text-gray-100" />
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src={formattedProperty.images[currentImageIndex]}
                      alt={formattedProperty.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Image Navigation */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/90 hover:bg-slate-800 p-2 rounded-full shadow-lg transition"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-100" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/90 hover:bg-slate-800 p-2 rounded-full shadow-lg transition"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-100" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Photo {currentImageIndex + 1} of {formattedProperty.images.length}
                    </div>

                    {/* Overlay Badge */}
                    {formattedProperty.isFeatured && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1.5 sm:gap-2 p-3 sm:p-4 bg-slate-900 overflow-x-auto">
                {formattedProperty.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded overflow-hidden border-2 transition flex-shrink-0 ${
                      currentImageIndex === index ? 'border-amber-500' : 'border-transparent hover:border-slate-600'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                {formattedProperty.video && (
                  <button
                    onClick={() => setIsViewingVideo(true)}
                    className={`aspect-video rounded bg-gradient-to-br from-purple-500 to-purple-700 flex flex-col items-center justify-center text-white hover:from-purple-600 hover:to-purple-800 transition flex-shrink-0 ${
                      isViewingVideo ? 'ring-2 ring-amber-500 ring-offset-2' : ''
                    }`}
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                    <span className="text-[10px] sm:text-xs font-medium">Video</span>
                  </button>
                )}
              </div>

              {/* Property Info Banner */}
              <div className="p-4 border-t bg-yellow-50">
                <p className="text-sm text-gray-300">
                  <AlertCircle className="w-4 h-4 inline mr-2 text-yellow-600" />
                  <span className="font-semibold">3 people already contacted yesterday</span>
                </p>
              </div>
            </motion.div>

            {/* Property Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 rounded-lg shadow-md p-4 sm:p-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                    {formattedProperty.isFeatured && (
                      <span className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold">
                        FEATURED
                      </span>
                    )}
                    {formattedProperty.isTopPick && (
                      <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold">
                        TOP PICK
                      </span>
                    )}
                    {formattedProperty.isInvestmentProperty && (
                      <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold">
                        INVESTMENT
                      </span>
                    )}
                    {formattedProperty.reraStatus && formattedProperty.reraStatus !== 'N/A' && (
                      <span className="bg-teal-500 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        RERA {formattedProperty.reraStatus}
                      </span>
                    )}
                    {formattedProperty.status === 'approved' && (
                      <span className="bg-amber-500 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-semibold">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-1 break-words">{formattedProperty.title}</h1>
                  <p className="text-sm sm:text-base text-gray-400 mb-2">{formattedProperty.subtitle}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 break-words">In {formattedProperty.location.split(',')[0]}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 break-words">
                    Registration No: {formattedProperty.registrationNo || 'N/A'} | Website: {formattedProperty.website || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-2 self-start sm:self-auto">
                  <button
                    onClick={toggleShortlist}
                    className={`p-2 rounded-full transition ${
                      isShortlisted ? 'bg-red-50 text-red-600' : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                    }`}
                    aria-label="Add to shortlist"
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isShortlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-slate-700 text-gray-400 hover:bg-slate-600 transition"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent break-words">{formattedProperty.price}</span>
                  <span className="text-sm sm:text-base md:text-lg text-gray-400">{formattedProperty.pricePerSqft}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mb-2">
                  Estimated EMI <span className="font-semibold text-gray-100">{formattedProperty.estimatedEMI || 'Calculate'}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">{formattedProperty.postedDate} • {formattedProperty.status}</p>
              </div>
            </motion.div>

            {/* Navigation Tabs - Sticky to Top */}
            <div className="sticky top-0 bg-slate-800 z-50 shadow-sm -mx-4 sm:-mx-6 lg:-mx-8 px-2 sm:px-4 lg:px-8 border-b">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto py-2 sm:py-3 scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.ref, tab.id)}
                      className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap transition border-b-2 flex-shrink-0 ${
                        activeSection === tab.id
                          ? 'text-amber-500 border-amber-500'
                          : 'text-gray-400 border-transparent hover:text-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6"
            >

              {/* Sections Content */}
              <div className="space-y-12">
                {/* Overview Section */}
                <div ref={overviewRef} id="overview" className="scroll-mt-24 space-y-6">
                  {/* Key Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Maximize className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Area</p>
                        <p className="font-semibold text-gray-100 text-sm break-words">{formattedProperty.superBuiltArea}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <Bed className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Configuration</p>
                        <p className="font-semibold text-gray-100 text-xs sm:text-sm break-words">
                          {formattedProperty.bedrooms || 'N/A'} Bed<span className="hidden sm:inline">rooms</span>, {formattedProperty.bathrooms || 'N/A'} Bath<span className="hidden sm:inline">rooms</span>, {formattedProperty.balconies || 'N/A'} Bal<span className="hidden sm:inline">conies</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-semibold text-gray-100 text-sm break-words">{formattedProperty.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Compass className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Facing</p>
                        <p className="font-semibold text-gray-100 text-sm">{formattedProperty.facing}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Floor Number</p>
                        <p className="font-semibold text-gray-100 text-sm break-words">{formattedProperty.floorNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Possession in</p>
                        <p className="font-semibold text-gray-100 text-sm break-words">{formattedProperty.availableFrom}</p>
                      </div>
                    </div>
                  </div>

                  {/* About Property */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-2 sm:mb-3">About Property</h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                      {formattedProperty.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  {formattedProperty.amenities && formattedProperty.amenities.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Amenities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Property Features */}
                  {formattedProperty.propertyFeatures && formattedProperty.propertyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Property Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.propertyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Society Features */}
                  {formattedProperty.societyFeatures && formattedProperty.societyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Society Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.societyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Features */}
                  {formattedProperty.additionalFeatures && formattedProperty.additionalFeatures.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Additional Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.additionalFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location Advantages */}
                  {formattedProperty.locationAdvantages && formattedProperty.locationAdvantages.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Location Advantages</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.locationAdvantages.map((advantage, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overlooking */}
                  {formattedProperty.overlooking && formattedProperty.overlooking.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Overlooking</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.overlooking.map((view, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{view}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Rooms */}
                  {formattedProperty.otherRooms && formattedProperty.otherRooms.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3">Other Rooms</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {formattedProperty.otherRooms.map((room, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{room}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Property Details Section */}
                <div ref={societyRef} id="society" className="scroll-mt-24 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">Property Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Basic Details */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3">Basic Information</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Property Type</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.subtitle}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Ownership</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.ownership}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Property Age</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.propertyAge}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Availability Status</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.availableFrom}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Furnishing</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.furnished}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Flooring Type</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.flooring}</span>
                        </div>
                      </div>
                    </div>

                    {/* Area & Layout */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3">Area & Layout</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {formattedProperty.plotArea && (
                          <div className="flex justify-between items-center py-2 border-b gap-2">
                            <span className="text-xs sm:text-sm text-gray-400">Plot Area</span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.plotArea}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Built-up Area</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.superBuiltArea}</span>
                        </div>
                        {formattedProperty.carpetArea !== 'N/A' && (
                          <div className="flex justify-between items-center py-2 border-b gap-2">
                            <span className="text-xs sm:text-sm text-gray-400">Carpet Area</span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.carpetArea}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Total Floors</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.floorNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Facing</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.facing}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities & Features */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3">Utilities & Amenities</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Water Source</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.waterSource}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Power Backup</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.powerBackup}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Parking</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.parking}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Gated Community</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.gatedSociety ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Pet Friendly</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.petFriendly ? 'Yes' : 'No'}</span>
                        </div>
                        {formattedProperty.cornerProperty && (
                          <div className="flex justify-between items-center py-2 border-b gap-2">
                            <span className="text-xs sm:text-sm text-gray-400">Corner Property</span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">Yes</span>
                          </div>
                        )}
                        {formattedProperty.wheelchairFriendly && (
                          <div className="flex justify-between items-center py-2 border-b gap-2">
                            <span className="text-xs sm:text-sm text-gray-400">Wheelchair Friendly</span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">Yes</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing Details */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3">Pricing Details</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Expected Price</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.price}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Price per sq.ft.</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right break-words">{formattedProperty.pricePerSqft || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">All Inclusive Price</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.allInclusivePrice ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b gap-2">
                          <span className="text-xs sm:text-sm text-gray-400">Price Negotiable</span>
                          <span className="text-xs sm:text-sm font-semibold text-gray-100 text-right">{formattedProperty.priceNegotiable ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-sm text-gray-400">Tax Excluded</span>
                          <span className="text-sm font-semibold text-gray-100">{formattedProperty.taxExcluded ? 'Yes' : 'No'}</span>
                        </div>
                        {formattedProperty.isInvestmentProperty && (
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-gray-400">Investment Property</span>
                            <span className="text-sm font-semibold text-green-600">Yes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner Details Section */}
                <div ref={dealerRef} id="dealer" className="scroll-mt-24 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6">Owner / Dealer Details</h2>
                  {/* Owner Details */}
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                    {/* Left - Owner Info */}
                    <div className="md:w-1/3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Contact Information</h3>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] mb-2">
                            View Phone Number
                          </button>
                          <p className="text-xs text-gray-400">Rera Registered: UPRERAPRJ303390</p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <h4 className="text-amber-500 font-semibold mb-1">{formattedProperty.owner.name}</h4>
                          <p className="text-gray-400">Real Estate / Property Private Limited</p>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-100 mb-1">Properties Listed: {formattedProperty.owner.properties || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 mb-1"><strong>Locations:</strong></p>
                          <p className="text-gray-300">{formattedProperty.owner.locations || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400"><strong>About {formattedProperty.owner.name}</strong></p>
                          <p className="text-gray-300">{formattedProperty.owner.about || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 mb-1"><strong>Address:</strong></p>
                          <p className="text-gray-300">{formattedProperty.owner.address || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400"><strong>Website:</strong> <a href="#" className="text-amber-500 hover:underline">{formattedProperty.owner.website || 'N/A'}</a></p>
                        </div>
                      </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div className="md:w-2/3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Send Enquiry</h3>
                      <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm text-gray-400 mb-2">You are</p>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setContactForm({ ...contactForm, userType: 'Individual' })}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded border text-xs sm:text-sm flex-1 sm:flex-none ${
                                  contactForm.userType === 'Individual'
                                    ? 'bg-amber-500 text-white border-amber-500'
                                    : 'bg-slate-800 text-gray-300 border-slate-600'
                                }`}
                              >
                                Individual
                              </button>
                              <button
                                type="button"
                                onClick={() => setContactForm({ ...contactForm, userType: 'Dealer' })}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded border text-xs sm:text-sm flex-1 sm:flex-none ${
                                  contactForm.userType === 'Dealer'
                                    ? 'bg-amber-500 text-white border-amber-500'
                                    : 'bg-slate-800 text-gray-300 border-slate-600'
                                }`}
                              >
                                Dealer
                              </button>
                            </div>
                          </div>

                          <div className="flex-1">
                            <p className="text-xs sm:text-sm text-gray-400 mb-2">Your reason to buy is</p>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setContactForm({ ...contactForm, reason: 'Self Use' })}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded border text-xs sm:text-sm flex-1 sm:flex-none ${
                                  contactForm.reason === 'Self Use'
                                    ? 'bg-amber-500 text-white border-amber-500'
                                    : 'bg-slate-800 text-gray-300 border-slate-600'
                                }`}
                              >
                                Self Use
                              </button>
                              <button
                                type="button"
                                onClick={() => setContactForm({ ...contactForm, reason: 'Investment' })}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded border text-xs sm:text-sm flex-1 sm:flex-none ${
                                  contactForm.reason === 'Investment'
                                    ? 'bg-amber-500 text-white border-amber-500'
                                    : 'bg-slate-800 text-gray-300 border-slate-600'
                                }`}
                              >
                                Investment
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                            className="w-full px-3 sm:px-4 py-2 border border-slate-600 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            placeholder="Email (optional)"
                            value={contactForm.email || ''}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border border-slate-600 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div className="flex gap-2">
                          <select className="px-2 sm:px-3 py-2 border border-slate-600 rounded text-sm sm:text-base">
                            <option>IND (+91)</option>
                          </select>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            required
                            className="flex-1 px-3 sm:px-4 py-2 border border-slate-600 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <textarea
                            rows="3"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border border-slate-600 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                          <p className="text-xs text-gray-500 mt-1 text-right">400 chars</p>
                        </div>

                        <div className="text-xs text-gray-400">
                          I agree to the <a href="#" className="text-amber-500 hover:underline">Terms & Conditions</a> and <a href="#" className="text-amber-500 hover:underline">Privacy Policy</a>
                        </div>

                        <button 
                          type="submit"
                          disabled={isSubmittingEnquiry}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSubmittingEnquiry ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            'Send Enquiry'
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>



                {/* Reviews Section */}
                <div ref={reviewsRef} id="reviews" className="scroll-mt-24 space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2">Property Reviews</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Ratings and Reviews for {formattedProperty.location}</p>

                    {/* No Reviews State */}
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-purple-50 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-100 mb-2">Review this Property</h4>
                      <p className="text-xs sm:text-sm text-gray-400 mb-4 px-4">
                        We don't have sufficient reviews to display. Write a review & help others make the right choice
                      </p>
                      <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition">
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>

                {/* Media Section - Photos & Video */}
                <div ref={mediaRef} id="media" className="scroll-mt-24 space-y-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Photos & Video</h3>
                  
                  {/* Photo Gallery */}
                  <div>
                    <h4 className="text-sm sm:text-md font-semibold text-gray-100 mb-2 sm:mb-3">Property Photos</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                      {formattedProperty.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className="aspect-video rounded-lg overflow-hidden border-2 border-slate-700 hover:border-amber-500 transition"
                        >
                          <img src={img} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Video Section */}
                  {formattedProperty.video && (
                    <div>
                      <h4 className="text-sm sm:text-md font-semibold text-gray-100 mb-2 sm:mb-3">Property Video</h4>
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                        <video 
                          controls 
                          className="w-full h-full"
                          poster={formattedProperty.images[0]}
                        >
                          <source src={formattedProperty.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations Section */}
                <div ref={recommendationsRef} id="recommendations" className="scroll-mt-24 space-y-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Similar Properties</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Based on this property, you might also like these options</p>
                  
                  {formattedProperty.similarProperties && formattedProperty.similarProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {formattedProperty.similarProperties.map((prop) => (
                        <Link
                          key={prop.id}
                          to={`/properties/${prop.id}`}
                          className="group rounded-lg overflow-hidden border border-slate-700 hover:shadow-lg transition"
                        >
                          <div className="aspect-[4/3] relative">
                            <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                            <button className="absolute top-2 right-2 bg-slate-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            </button>
                          </div>
                          <div className="p-2 sm:p-3 bg-slate-800">
                            <p className="font-semibold text-xs sm:text-sm text-gray-100 mb-1 break-words">{prop.price}</p>
                            <p className="text-[10px] sm:text-xs text-gray-400 mb-1 break-words">{prop.title}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 break-words">{prop.location}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 sm:py-8 bg-slate-900 rounded-lg">
                      <p className="text-sm sm:text-base text-gray-400">No similar properties available at the moment.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Similar Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 rounded-lg shadow-md p-4 sm:p-6"
            >
              <h2 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Similar Properties</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {formattedProperty.similarProperties && formattedProperty.similarProperties.map((prop) => (
                  <Link
                    key={prop.id}
                    to={`/properties/${prop.id}`}
                    className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <div className="aspect-[4/3] relative">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                      <button className="absolute top-2 right-2 bg-slate-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition">
                        <Heart className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <p className="font-bold text-gray-100 mb-1">{prop.price}, {prop.title}</p>
                      <p className="text-xs text-gray-400 mb-1">{prop.subtitle}</p>
                      <p className="text-xs text-gray-500">{prop.location}</p>
                      <button className="mt-2 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition">
                        Enquire Now
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Property Score Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-100 mb-2">{formattedProperty.price}</h2>
                  <h3 className="text-lg text-gray-300 mb-2">{formattedProperty.title}</h3>
                  <p className="text-sm text-gray-400">{formattedProperty.location}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-600 rounded-lg hover:bg-slate-900 transition">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Dealer FREE
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="bg-teal-500 text-white px-3 py-1 rounded text-xs font-semibold">
                  RERA STATUS {formattedProperty.reraStatus || 'N/A'}
                </span>
                <span className="bg-amber-500 text-white px-3 py-1 rounded text-xs font-semibold">
                  REGISTERED
                </span>
                <span className="text-xs text-gray-400">
                  Registration No: {formattedProperty.registrationNo || 'N/A'}
                </span>
              </div>
            </motion.div>

            {/* Bottom Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-100">Recommendations</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {formattedProperty.similarProperties && formattedProperty.similarProperties.slice(0, 5).map((prop) => (
                  <Link
                    key={prop.id}
                    to={`/properties/${prop.id}`}
                    className="group rounded-lg overflow-hidden border border-slate-700 hover:shadow-lg transition"
                  >
                    <div className="aspect-[4/3] relative">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 bg-slate-800">
                      <p className="font-semibold text-sm text-gray-100">{prop.price}, {prop.title}</p>
                      <p className="text-xs text-gray-400">{prop.subtitle}</p>
                      <p className="text-xs text-gray-500">{prop.location}</p>
                      <button className="mt-2 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition">
                        Enquire Now
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Download Brochure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800 rounded-lg shadow-md p-6 text-center"
            >
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-[0_4px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] transition">
                <Download className="w-5 h-5" />
                Download Brochure
              </button>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;


