
import React from 'react';
import { STUDIO_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 bg-neutral-950 border-t border-neutral-900">
       <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
              {/* Call to Action */}
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">LETS CREATE</h2>
                <p className="text-neutral-500 mb-8">Discuss your next installation.</p>
                
                <div className="flex flex-col items-start gap-6">
                  <a 
                    href={`mailto:${STUDIO_INFO.contact.email}`} 
                    className="inline-block border border-neutral-700 px-8 py-3 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    EMAIL US
                  </a>
                  
                  {/* XiaoHongShu Button */}
                  <div className="inline-flex items-center gap-3 text-neutral-400 group">
                    <span className="text-sm tracking-widest pb-1 border-b border-transparent group-hover:border-red-500 transition-colors">
                      关注小红书 / {STUDIO_INFO.contact.xiaohongshu}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex flex-col justify-end space-y-8 text-sm text-neutral-400 font-light">
                 {/* Only display if address is provided */}
                 {STUDIO_INFO.contact.address && (
                   <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Office</h4>
                      <p>{STUDIO_INFO.contact.address}</p>
                   </div>
                 )}
                 
                 <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">微信 / WeChat</h4>
                    <p>{STUDIO_INFO.contact.phone}</p>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Email</h4>
                    <p>{STUDIO_INFO.contact.email}</p>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-600 uppercase tracking-widest">
               <p>&copy; {new Date().getFullYear()} {STUDIO_INFO.name_en}. ALL RIGHTS RESERVED.</p>
               <p className="mt-2 md:mt-0">{STUDIO_INFO.contact.location}</p>
           </div>
       </div>
    </footer>
  );
};

export default Footer;
