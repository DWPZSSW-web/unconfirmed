import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaItem from './MediaItem';
import { getFactoryMedia } from '../utils/mediaRegistry';

const FactoryTraces: React.FC = () => {
  const [images] = useState<string[]>(() => {
    const loadedImages = getFactoryMedia();
    if (loadedImages.length > 0) {
      return loadedImages;
    } else {
      // 默认占位图
      return [
        'https://picsum.photos/seed/f1/800/600',
        'https://picsum.photos/seed/f2/800/600',
        'https://picsum.photos/seed/f3/800/600',
        'https://picsum.photos/seed/f4/800/600',
      ];
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-32 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">
            制作痕迹
          </h2>
          <p className="text-neutral-500 font-mono tracking-widest uppercase text-xs">
            FACTORY TRACES
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-neutral-600 text-xs font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className="relative w-full aspect-[21/9] md:aspect-[32/9] bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <MediaItem 
                src={images[currentIndex]} 
                alt={`Factory Trace ${currentIndex + 1}`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-900">
            <motion.div 
              className="h-full bg-white/30"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear", repeat: 0 }}
              key={`progress-${currentIndex}`}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Counter */}
      <div className="container mx-auto px-6 mt-4 md:hidden text-right">
        <p className="text-neutral-600 text-xs font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
};

export default FactoryTraces;
