import React, { useState, useRef, useEffect } from 'react';
import { COMPARISONS } from '../constants';

const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-32 border-l border-neutral-800 pl-12">
          <h2 className="text-xs font-mono text-neutral-600 tracking-[0.4em] uppercase mb-4">High Fidelity Archive</h2>
          <h3 className="text-4xl md:text-6xl text-white font-bold mb-8 tracking-tighter">还原度档案</h3>
          <p className="text-neutral-500 leading-relaxed font-light text-lg">
            展示从数字概念到物理落地的 1:1 进化过程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20">
          {COMPARISONS.map((item, index) => (
            <ComparisonSlider key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSlider: React.FC<{ item: typeof COMPARISONS[0], index: number }> = ({ item, index }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((relativeX / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="flex flex-col gap-4 reveal group/item">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/9] bg-neutral-900 cursor-ew-resize overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-500 touch-none rounded-sm"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Real Image (Background) */}
        <div className="absolute inset-0">
          <img src={item.realImage} alt="Reality" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 z-20 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[8px] text-white tracking-widest uppercase">
            Reality
          </div>
        </div>

        {/* Render Image (Foreground) */}
        <div 
          className="absolute inset-0 border-r border-white/20 z-10 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="absolute inset-0 h-full" style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}>
            <img src={item.renderImage} alt="Render" className="w-full h-full object-cover contrast-110" />
          </div>
          <div className="absolute bottom-2 left-2 z-20 bg-white/90 px-2 py-0.5 text-[8px] text-black font-bold tracking-widest uppercase">
            Render
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-[1px] bg-white/50 group-hover:bg-white transition-colors"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center bg-black/10 transition-all duration-300 group-hover:scale-110">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-white/40" />
              <div className="w-0.5 h-3 bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;