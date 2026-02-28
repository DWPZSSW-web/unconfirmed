import React from 'react';
import { STUDIO_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-black text-white border-b border-neutral-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono text-neutral-500 tracking-widest mb-4">ABOUT THE STUDIO</h3>
            <div className="w-12 h-[1px] bg-white mb-6"></div>
          </div>
          <div className="md:col-span-8">
            {STUDIO_INFO.philosophy.map((paragraph, index) => (
              <p key={index} className="text-xl md:text-3xl font-light leading-relaxed text-neutral-200 mb-8 text-balance">
                {paragraph}
              </p>
            ))}
            
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-neutral-900 pt-8">
               <div>
                  <h4 className="text-neutral-500 text-xs mb-2">创始人 / FOUNDER</h4>
                  <p className="text-sm">老灰</p>
               </div>
               <div>
                  <h4 className="text-neutral-500 text-xs mb-2">领域 / DISCIPLINE</h4>
                  <p className="text-sm">装置 / 雕塑 / 公共艺术</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;