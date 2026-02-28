import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaItem from './MediaItem';
import { getSomethingElseMedia } from '../utils/mediaRegistry';

const SomethingElse: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [images] = useState<string[]>(() => {
    const loadedImages = getSomethingElseMedia();
    if (loadedImages.length > 0) {
      return loadedImages;
    } else {
      // 默认占位图，如果没有文件
      return [
        'https://picsum.photos/seed/se1/800/600',
        'https://picsum.photos/seed/se2/800/600',
        'https://picsum.photos/seed/se3/800/600',
        'https://picsum.photos/seed/se4/800/600',
        'https://picsum.photos/seed/se5/800/600',
        'https://picsum.photos/seed/se6/800/600',
        'https://picsum.photos/seed/se7/800/600',
      ];
    }
  });

  // Handle scroll wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (Math.abs(e.deltaY) > 10) {
        isScrolling.current = true;
        
        if (e.deltaY > 0) {
          setActiveIndex((prev) => (prev + 1) % images.length);
        } else {
          setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 500); // Debounce time
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [images.length]);

  // Calculate visible items based on activeIndex
  const getVisibleItems = () => {
    if (images.length === 0) return [];
    
    const items = [];
    const total = images.length;
    // Show 2 items on each side
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + total) % total;
      items.push({ index, offset: i, src: images[index] });
    }
    return items;
  };

  return (
    <section className="py-32 bg-black overflow-hidden relative min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-12 text-center z-10 relative">
        <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter mb-4">
          Something Else
        </h2>
        <p className="text-neutral-500 font-mono tracking-widest uppercase text-xs">
          SCROLL TO EXPLORE
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[60vh] w-full flex items-center justify-center perspective-1000"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {getVisibleItems().map((item) => (
              <motion.div
                key={`${item.index}-${item.offset}`} // Unique key for animation
                className="absolute w-[60vw] md:w-[40vw] aspect-video bg-neutral-900 shadow-2xl rounded-xl overflow-hidden cursor-pointer"
                initial={{ 
                  x: (item.offset + (item.offset > 0 ? 1 : -1)) * 50 + '%', 
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  x: item.offset * 60 + '%', // Spacing
                  scale: item.offset === 0 ? 1.2 : 0.8, // Center scale
                  zIndex: 50 - Math.abs(item.offset) * 10,
                  opacity: item.offset === 0 ? 1 : 0.4,
                  rotateY: item.offset * -25, // Rotation
                  filter: item.offset === 0 ? 'blur(0px)' : 'blur(2px)',
                }}
                exit={{ 
                  x: (item.offset + (item.offset > 0 ? 1 : -1)) * 50 + '%',
                  opacity: 0,
                  scale: 0.5
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25
                }}
                onClick={() => setActiveIndex(item.index)}
              >
                <MediaItem 
                  src={item.src} 
                  alt={`Gallery ${item.index}`} 
                  className="w-full h-full pointer-events-none"
                  autoPlay={item.offset === 0} // Only autoplay center item
                  loop={true}
                  muted={true}
                />
                {item.offset === 0 && (
                  <div className="absolute inset-0 ring-1 ring-white/20 pointer-events-none rounded-xl" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SomethingElse;
