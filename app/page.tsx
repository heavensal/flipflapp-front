'use client';

// library
import { useState, useEffect } from 'react';

// components
import Header from './components/Header';
import IconesSlide1 from './components/IconesSlide1';
import Footer from './components/Footer';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Organise ton match de football",
      description: "Planifie un match rapidement: donne l'heure, l'endroit, le nombre de joueurs. C'est toi qui décide."

    },
    {
      title: "Invite tes amis",
      description: "Ils sont sur la feuille de match ? Sur le banc ? Tes amis peuvent facilement rejoindre le match.",
    },
    {
      title: "Le match peut commencer !",
      description: "Pas d'excuse ! Les équipes sont faites, les joueurs ont l'heure, l'endroit, et tout le reste. Que la meilleure équipe gagne !"
    }
  ];

  // Gestion du scroll pour mettre à jour l'indicateur
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const slideWidth = e.currentTarget.offsetWidth;
    const newCurrentSlide = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(newCurrentSlide);
  };

  // Auto-rotation du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-green to-bg-green-2 relative overflow-hidden">

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <Header />

        {/* Carrousel principal */}
        <main className="flex-1 px-4 sm:px-8 py-4">
          <div className="w-full h-full">

            {/* Card du carrousel */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl h-full overflow-hidden">

              {/* Conteneur avec snap horizontal */}
              <div
                className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={handleScroll}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-center flex flex-col justify-center px-8 sm:px-12 py-16"
                  >
                    {/* Structure uniforme pour tous les slides */}
                    <div className="text-center max-w-4xl mx-auto">

                      {/* Zone des icônes - hauteur fixe pour tous les slides */}
                      <div className="h-[30%] sm:h-48 mb-8 flex items-center justify-center">
                        <IconesSlide1 />
                      </div>

                      {/* Zone du titre - hauteur fixe */}
                      <div className="sm:h-24 mb-6 flex items-center justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center leading-tight">
                          {slide.title}
                        </h2>
                      </div>

                      {/* Zone de description - hauteur fixe */}
                      <div className=" sm:h-20 flex items-center justify-center">
                        <p className="text-lg text-indigo-100/80 leading-relaxed text-center max-w-3xl">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicateurs de slides uniquement */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-3">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-white scale-125'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

      </div>
    </div>
  );
}
