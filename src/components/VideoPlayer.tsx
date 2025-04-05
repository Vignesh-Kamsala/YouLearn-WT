
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when video changes
    setIsLoading(true);
  }, [videoId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl overflow-hidden shadow-elevation bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-6"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-12 h-12 border-4 border-youlearn-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
      
      {/* Video controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-1 text-white text-xs">
            <span className="font-medium">YouLearn</span>
            <span className="opacity-60">•</span>
            <span className="opacity-80">Enhanced Learning Mode</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
