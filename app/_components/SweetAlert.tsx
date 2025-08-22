'use client';

import { useEffect } from 'react';

interface SweetAlertProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

const SweetAlert = ({ type, title, message, onClose }: SweetAlertProps) => {

  useEffect(() => {
    // Fermer automatiquement après 5 secondes
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Gestion de la fermeture par échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const iconConfig = {
    success: {
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    error: {
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  const config = iconConfig[type];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-50 duration-300"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header avec icône */}
          <div className="text-center pt-8 pb-4">
            <div className={`w-16 h-16 ${config.bgColor} ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {config.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
          </div>

          {/* Message */}
          <div className="px-6 pb-6">
            <p className="text-gray-600 text-center leading-relaxed mb-6">
              {message}
            </p>

            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                type === 'success'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Fermer
            </button>
          </div>

          {/* Barre de progression pour l'auto-fermeture */}
          <div className="h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
            <div
              className={`h-full ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}
              style={{
                animation: 'shrink 5s linear forwards'
              }}
            />
          </div>

        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .zoom-in-50 {
          animation-name: zoom-in-50;
        }

        @keyframes zoom-in-50 {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default SweetAlert;
