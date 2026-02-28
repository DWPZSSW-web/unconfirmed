
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import ArtistProfile from './components/ArtistProfile';
import WorkGallery from './components/WorkGallery';
import Comparison from './components/Comparison';
import SomethingElse from './components/SomethingElse';
import FactoryTraces from './components/FactoryTraces';
import Footer from './components/Footer';
import Intro from './components/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* Intro Overlay */}
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}

      <Navigation />
      <main>
        <Hero />
        <About />
        <ArtistProfile />
        <WorkGallery />
        <Comparison />
        <SomethingElse />
        <FactoryTraces />
      </main>
      <Footer />
    </div>
  );
}

export default App;
