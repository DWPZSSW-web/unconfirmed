import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import MediaItem from './MediaItem';

const WorkGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="work" className="py-20 md:py-32 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-12">
          <div>
            <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter">
              我们做了什么
            </h2>
            <p className="text-[10px] text-neutral-600 font-mono tracking-[0.6em] uppercase mt-6">
              艺术干预 / ARTISTIC INTERVENTIONS
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:text-right max-w-xs">
          </div>
        </div>

        {/* Dynamic Layout */}
        <div className="grid grid-cols-1 gap-y-32 md:gap-y-48">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <MediaItem 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
                  <span className="text-white text-[10px] font-mono tracking-[0.5em] border border-white/30 px-6 py-3 backdrop-blur-md mb-4">DISCOVER PROJECT</span>
                  <h3 className="text-3xl font-bold text-white tracking-widest">{project.title}</h3>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center px-2">
                 <span className="text-[9px] text-neutral-600 font-mono tracking-[0.3em] uppercase">{project.category}</span>
                 <span className="text-[9px] text-neutral-400 font-mono tracking-widest">{project.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto pt-24 px-6 pb-20 scrollbar-hide">
          <button 
            onClick={() => setSelectedProject(null)}
            className="fixed top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors p-2"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="container mx-auto max-w-6xl">
            <div className="mb-16">
              <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase mb-4 block">{selectedProject.category}</span>
              <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter mb-4 leading-tight">{selectedProject.title}</h2>
              <p className="text-neutral-500 tracking-widest uppercase text-[10px]">{selectedProject.location}</p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {selectedProject.gallery?.map((item, i) => (
                <div key={i} className="w-full bg-neutral-900 overflow-hidden reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                  <MediaItem src={item} alt={`${selectedProject.title} media ${i}`} autoHeight={true} />
                </div>
              ))}
            </div>

            <div className="mt-40 text-center">
               <button 
                onClick={() => setSelectedProject(null)}
                className="group flex flex-col items-center mx-auto"
               >
                 <span className="text-[10px] font-mono text-neutral-600 group-hover:text-white tracking-[1em] uppercase transition-colors mb-4">CLOSE ARCHIVE</span>
                 <div className="w-[1px] h-12 bg-neutral-800 group-hover:h-20 transition-all duration-700"></div>
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkGallery;