import React from 'react';
import { FOUNDER_INFO } from '../constants';
import MediaItem from './MediaItem';

const ArtistProfile: React.FC = () => {
  return (
    <section id="artist" className="py-32 bg-black text-white border-y border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Portrait Image with MediaItem */}
          <div className="w-full lg:w-5/12 max-w-md relative">
            <div className="absolute -inset-4 border border-neutral-900 -z-10 translate-x-2 translate-y-2"></div>
            <div className="relative aspect-[3/4] grayscale contrast-125 border border-neutral-800 shadow-2xl">
              <MediaItem 
                src={FOUNDER_INFO.image} 
                alt={FOUNDER_INFO.name} 
                className="w-full h-full"
              />
            </div>
            <div className="mt-8 flex gap-4">
              <div className="w-12 h-[1px] bg-neutral-700 my-auto"></div>
              <span className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase">The Outsider Art</span>
            </div>
          </div>

          {/* Profile Text */}
          <div className="w-full lg:w-7/12">
             <span className="text-[10px] font-mono text-neutral-600 tracking-[0.4em] uppercase mb-8 block">ABOUT FOUNDER</span>
             <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">{FOUNDER_INFO.name}</h2>
             <p className="text-xl text-neutral-400 mb-12 font-light tracking-wide">{FOUNDER_INFO.title}</p>
             
             <div className="grid grid-cols-1 gap-10">
               {FOUNDER_INFO.accolades.map((item, index) => (
                 <div key={index} className="flex gap-8 group">
                    <span className="text-neutral-800 text-sm font-mono mt-1 group-hover:text-white transition-colors">0{index + 1}</span>
                    <div className="flex flex-col">
                      <p className="text-neutral-300 font-light text-lg md:text-xl tracking-wide group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="mt-20 flex gap-12">
                <div>
                   <p className="text-[10px] text-neutral-600 mb-2 font-mono">ROLE</p>
                   <p className="text-sm font-light uppercase tracking-widest">Lead Designer / Artist</p>
                </div>
                <div>
                   <p className="text-[10px] text-neutral-600 mb-2 font-mono">LOCATION</p>
                   <p className="text-sm font-light uppercase tracking-widest">Shanghai, CN</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtistProfile;