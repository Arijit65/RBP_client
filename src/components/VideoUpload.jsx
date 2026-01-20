import { useState, useRef } from 'react';
import { Upload, X, Play, Video as VideoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoUpload = ({ video = null, onVideoChange, maxSizeMB = 80, maxDurationMinutes = 10 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

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
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    const validExtensions = ['.mp4', '.mov', '.h264', '.avi'];
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

    // Check file type
    const isValidType = validTypes.includes(file.type) ||
                       validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      return 'Invalid file type. Please upload MP4, MOV, H264, or AVI videos.';
    }

    if (file.size > maxSize) {
      return `File size exceeds ${maxSizeMB}MB limit.`;
    }

    return null;
  };

  const checkVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const maxDuration = maxDurationMinutes * 60; // Convert minutes to seconds

        if (duration > maxDuration) {
          reject(`Video duration exceeds ${maxDurationMinutes} minutes limit.`);
        } else {
          resolve(duration);
        }
      };

      video.onerror = () => {
        reject('Error loading video. Please try another file.');
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const processFile = async (file) => {
    setError('');
    setUploading(true);

    try {
      // Validate file type and size
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setUploading(false);
        return;
      }

      // Check video duration
      await checkVideoDuration(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoData = {
          file,
          preview: reader.result,
          name: file.name,
          size: file.size,
          type: file.type
        };
        onVideoChange(videoData);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err);
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = () => {
    onVideoChange(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      {!video && (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-all
            ${dragActive ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-gray-50'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={!uploading ? handleButtonClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.h264,.avi"
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />

          <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            {uploading ? 'Processing video...' : (
              <>
                Drag your videos here or{' '}
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-amber-500 hover:underline font-medium"
                  disabled={uploading}
                >
                  Upload
                </button>
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">
            Upload video of max size {maxSizeMB} MB in format .mov, .mp4, .H264, .avi.
            Video duration should be less than {maxDurationMinutes} mins.
          </p>

          {uploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          )}
        </div>
      )}

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

      {/* Video Preview */}
      {video && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4"
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={video.preview}
                controls
                className="w-full h-full object-contain"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>

              {/* Remove Button */}
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                aria-label="Remove video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Info */}
            <div className="bg-gray-800 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="bg-amber-500 p-2 rounded-lg flex-shrink-0">
                    <VideoIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate mb-1">{video.name}</p>
                    <p className="text-gray-400 text-xs">{formatFileSize(video.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-amber-400 hover:text-blue-300 text-sm font-medium whitespace-nowrap"
                >
                  Replace
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
            <span className="text-green-600 text-lg">✓</span>
            <p className="text-sm text-green-800">
              Video uploaded successfully! Properties with videos get <span className="font-semibold">higher page views</span>.
            </p>
          </div>
        </motion.div>
      )}

      {/* Info Banner */}
      {!video && !uploading && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
          <div className="text-yellow-600 text-lg sm:text-xl flex-shrink-0">💡</div>
          <div>
            <p className="text-xs sm:text-sm text-gray-900 font-medium">
              Don't have a Video! We can help you create one with our Paid Plans,{' '}
              <button type="button" className="text-amber-500 hover:underline">
                Contact to Upgrade
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
