import React, { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../constants';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '作品 / WORK', href: '#work' },
    { name: '关于 / ABOUT', href: '#about' },
    { name: '还原 / REALITY', href: '#comparison' },
    { name: '联系 / CONTACT', href: '#contact' },
  ];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex flex-col group">
          <span className="text-xl font-bold tracking-widest text-white group-hover:tracking-[0.2em] transition-all duration-500">{STUDIO_INFO.name_en}</span>
          <span className={`text-[9px] text-neutral-500 tracking-[0.2em] transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            {STUDIO_INFO.full_name}
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-medium text-neutral-400 hover:text-white transition-colors tracking-[0.3em] uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none"
        >
          <div className="w-6 h-4 relative flex flex-col justify-between">
            <span className={`w-full h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}></span>
            <span className={`w-full h-[1px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-[1px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-screen border-t border-white/10' : 'max-h-0'}`}>
        <div className="flex flex-col py-8 px-6 space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-light text-neutral-400 hover:text-white tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;