
import React, { useEffect, useState } from 'react';
import { STUDIO_INFO } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 1. Text fades in after a short delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500);

    // 2. Start exit sequence (fade out entire screen)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4000); // Display time: 4 seconds

    // 3. Remove component from DOM after fade out completes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5500); // 4000 + 1500ms transition

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* =========================================
          LAYER 1: The "Figures" (Shadows)
          Behind the glass. We simulate people with 
          moving blurred shapes.
         ========================================= */}
      <div className="absolute inset-0 z-0 opacity-60">
        <style>{`
          @keyframes walk-left {
            0% { transform: translateX(120%) skewX(-5deg); }
            100% { transform: translateX(-120%) skewX(5deg); }
          }
          @keyframes walk-right {
            0% { transform: translateX(-120%) skewX(5deg); }
            100% { transform: translateX(120%) skewX(-5deg); }
          }
          .figure-shadow {
            position: absolute;
            background: #333; /* Dark Grey Shadows */
            border-radius: 50%;
            filter: blur(60px); /* Heavy blur even before the glass */
          }
        `}</style>

        {/* Shadow Figure 1: Moving Left */}
        <div 
          className="figure-shadow w-[150px] h-[60vh] top-[20%]"
          style={{ 
            animation: 'walk-left 12s linear infinite', 
            animationDelay: '-2s' 
          }}
        />

        {/* Shadow Figure 2: Moving Right (Slower) */}
        <div 
          className="figure-shadow w-[200px] h-[70vh] top-[15%]"
          style={{ 
            animation: 'walk-right 18s linear infinite',
            animationDelay: '-5s',
            background: '#2a2a2a'
          }}
        />

        {/* Shadow Figure 3: Moving Left (Fast, Small) */}
        <div 
          className="figure-shadow w-[100px] h-[50vh] top-[30%]"
          style={{ 
            animation: 'walk-left 9s linear infinite',
            animationDelay: '-8s',
            background: '#404040'
          }}
        />
      </div>

      {/* =========================================
          LAYER 2: The "Black Frosted Glass"
          Backdrop blur + Black overlay
         ========================================= */}
      <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[80px]" />

      {/* =========================================
          LAYER 3: The Text content
          In front of the glass
         ========================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div 
          className={`flex flex-col items-center transition-all duration-[2000ms] ease-out transform ${
            showText ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-[0.2em] mix-blend-screen">
            {STUDIO_INFO.name_en}
          </h1>
          <p className="mt-6 text-xs text-neutral-500 tracking-[0.8em] uppercase font-light">
            {STUDIO_INFO.name_zh}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
