import React from 'react';
import { STUDIO_INFO } from '../constants';
import MediaItem from './MediaItem';
import { getCoverMedia } from '../utils/mediaRegistry';

// 尝试加载 src/assets/cover 下的图片/视频，如果不存在则使用默认占位
const HERO_FALLBACK_SRC = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop";

const Hero: React.FC = () => {
  const heroMedia = getCoverMedia() || HERO_FALLBACK_SRC;

  return (
    <header className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Cinematic Background Video/Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MediaItem 
          src={heroMedia} 
          alt="UNCONFIRMED Cinematic"
          className="w-full h-full mix-blend-luminosity opacity-40 scale-100"
          autoPlay={true}
          loop={true}
          muted={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 z-10 text-center relative">
        <div className="mb-4 reveal" style={{ animationDelay: '0.2s' }}>
          <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-[1em] uppercase block mb-4">
            EST. {STUDIO_INFO.founded} — SHANGHAI
          </span>
        </div>

        <h1 className="text-6xl md:text-[10rem] font-bold text-white tracking-tightest leading-none mb-4 reveal">
          {STUDIO_INFO.name_en}
        </h1>
        
        <div className="flex flex-col items-center reveal" style={{ animationDelay: '0.4s' }}>
          <p className="text-base md:text-xl text-neutral-400 tracking-widest-xl uppercase font-light">
            {STUDIO_INFO.name_zh}
          </p>
        </div>

        <div className="mt-20 max-w-xl mx-auto reveal" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg md:text-2xl text-white/80 font-light italic mb-2 text-balance">
              “{STUDIO_INFO.slogan_sub}”
            </p>
            <div className="w-8 h-[1px] bg-white/20 mx-auto my-6" />
            <p className="text-[9px] md:text-xs text-neutral-600 font-mono tracking-widest uppercase">
              {STUDIO_INFO.slogan}
            </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center reveal" style={{ animationDelay: '1s' }}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-800 to-transparent"></div>
      </div>
    </header>
  );
};

export default Hero;