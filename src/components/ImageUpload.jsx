import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUpload = ({ images = [], onImagesChange, maxImages = 50, maxSizeMB = 10 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PNG, JPG, JPEG, GIF, or WEBP images.';
    }

    if (file.size > maxSize) {
      return `File size exceeds ${maxSizeMB}MB limit.`;
    }

    return null;
  };

  const processFiles = (files) => {
    setError('');
    const fileArray = Array.from(files);

    if (images.length + fileArray.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const newImages = [];
    const errors = [];

    fileArray.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(validationError);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push({
            file,
            preview: reader.result,
            name: file.name,
            size: file.size
          });

          if (newImages.length === fileArray.length - errors.length) {
            onImagesChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    if (errors.length > 0) {
      setError(errors[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    setError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-all
          ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-purple-300 bg-amber-50'}
          ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={images.length < maxImages ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
          onChange={handleChange}
          className="hidden"
          disabled={images.length >= maxImages}
        />

        <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-amber-400" />
        <p className="text-amber-500 font-semibold mb-2 text-sm sm:text-base">
          + Add {images.length === 0 ? 'atleast 5' : 'more'} photos
        </p>
        <p className="text-sm text-gray-600 mb-3">Drag and drop your photos here</p>
        <p className="text-xs text-gray-500 mb-4">
          Upto {maxImages} photos · Max. size {maxSizeMB} MB · Formats: png, jpg, jpeg, gif, webp
        </p>
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={images.length >= maxImages}
          className="border-2 border-amber-500 text-amber-500 px-4 sm:px-6 py-2 rounded font-semibold hover:bg-amber-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          Upload Photos Now
        </button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
          >
            <span className="text-red-600 text-sm">⚠️</span>
            <p className="text-sm text-red-700 flex-1">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              Uploaded Images ({images.length}/{maxImages})
            </h4>
            {images.length >= 5 && (
              <span className="text-xs sm:text-sm text-green-600 font-medium">✓ Minimum requirement met</span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-amber-400 transition"
                >
                  <img
                    src={image.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Info Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                    <p className="text-white text-xs font-medium mb-1 truncate w-full text-center">
                      {image.name}
                    </p>
                    <p className="text-white text-xs mb-2">{formatFileSize(image.size)}</p>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Number Badge */}
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Info Banners */}
      {images.length < 5 && (
        <div className="mt-4 bg-blue-900 text-white rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
          <div className="bg-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-slate-900 font-bold text-xs sm:text-sm">!</span>
          </div>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Add 4+ property photos</span> & increase responses upto 21%
          </p>
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
          <span className="text-orange-600 text-lg sm:text-xl flex-shrink-0">⚠️</span>
          <p className="text-xs sm:text-sm text-gray-700">Without photos your ad will be ignored by buyers</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
