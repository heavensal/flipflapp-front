'use client';

import { useState, useEffect } from 'react';

const GoToForm = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Vérifie si on est en haut de la page
      setIsVisible(window.scrollY === 0);
    };

    // Ajoute un écouteur pour l'événement scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoie l'écouteur lors du démontage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="#beta-tester-title"
      aria-label="Aller à la section Beta Testers"
      className="inline-grid size-12 place-items-center bg-form-green text-yellow-500
                shadow-sm motion-safe:animate-bounce fixed bottom-4 right-4
                active:scale-95 transition-transform duration-150 ease-out select-none"
      style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
    >
      {/* Flèche pixel (vers le bas, avec queue) */}
      <svg viewBox="0 0 8 8" className="size-6" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <g fill="currentColor" shapeRendering="crispEdges">
          {/* queue */}
          <rect x="3" y="0" width="2" height="4" />
          {/* tête ↓ */}
          <rect x="1" y="4" width="6" height="1" />
          <rect x="2" y="5" width="4" height="1" />
          <rect x="3" y="6" width="2" height="1" />
        </g>
      </svg>


    </a>
  );
};

export default GoToForm;
