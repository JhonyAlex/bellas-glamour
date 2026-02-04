import React from 'react';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedModels } from '../components/home/FeaturedModels';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-jet-black">
      <Header />
      <main>
        <HeroSection />
        <FeaturedModels />
      </main>
    </div>
  );
};

export default Home;