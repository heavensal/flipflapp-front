'use client';

import { useState } from 'react';
import IconesSlide1 from './IconesSlide1';
import IconesSlide2 from './IconesSlide2';
import IconesSlide3 from './IconesSlide3';

const CarrouselContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      component: <IconesSlide1 />,
      title: "Organise ton match",
      description: "Planifie rapidement: donne l'heure, l'endroit, le nombre de joueurs. C'est toi qui décide."
    },
    {
      component: <IconesSlide2 />,
      title: "Invite tes amis",
      description: "Ils sont sur la feuille de match ? Sur le banc ? Tes amis peuvent facilement rejoindre le match.",
    },
    {
      component: <IconesSlide3 />,
      title: "Le match peut commencer !",
      description: "Pas d'excuse ! Les équipes sont faites, les infos sont là. Que le meilleur gagne !"
    }
  ];

  // Gestion du scroll pour mettre à jour l'indicateur
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const slideWidth = e.currentTarget.offsetWidth;
    const newCurrentSlide = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(newCurrentSlide);
  };

  return (
    <div id="container-and-slides-indicators" className="h-[80dvh]">

      {/* Conteneur avec snap horizontal */}
      <section
        id="container-slides"
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide overflow-hidden scroll-smooth overscroll-x-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >

        {slides.map((slide, index) => (
          <div
            className="w-full flex-shrink-0 snap-center px-8 sm:px-12 py-8 snap-always"
            key={index}
          >
              <div className="h-full max-w-4xl mx-auto grid grid-rows-3 grid-cols-1 gap-4">

                {/* Zone des icônes - 1ère ligne de la grid */}
                <div id={`icon-container-${index}`} className='place-content-center'>
                  {slide.component}
                </div>

                {/* Zone du titre - 2ème ligne de la grid */}
                <h2 className="text-4xl sm:text-4xl lg:text-4xl text-white text-center leading-tight place-content-center">
                  {slide.title}
                </h2>

                {/* Zone de description - 3ème ligne de la grid */}
                <p className="text-indigo-100/80 leading-relaxed text-center max-w-3xl place-content-start">
                  {slide.description}
                </p>

              </div>

          </div>
        ))}

      </section>

      {/* Indicateurs de slides */}
      <div className="flex justify-center items-center">
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
  );
};

export default CarrouselContainer;
