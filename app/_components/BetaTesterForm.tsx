'use client';

import { useState } from 'react';
import SnapchatIcon from './svg/Snapchat';
import FacebookIcon from './svg/Facebook';
import TelegramIcon from './svg/Telegram';
import WhatsappIcon from './svg/Whatsapp';
import TwitterIcon from './svg/Twitter';
import InstagramIcon from './svg/Instagram';
import SweetAlert from './SweetAlert';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  favorite_social_network: string;
  social_network_name: string;
  age: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  favorite_social_network?: string;
  social_network_name?: string;
  age?: string;
}

const BetaTesterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    favorite_social_network: '',
    social_network_name: '',
    age: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const socialNetworks = ['Snapchat', 'Facebook', 'Telegram', 'Whatsapp', 'Twitter', 'Instagram'];

  // Utilitaire pour afficher l'icône selon le nom
  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'Snapchat': return <SnapchatIcon />;
      case 'Facebook': return <FacebookIcon />;
      case 'Telegram': return <TelegramIcon />;
      case 'Whatsapp': return <WhatsappIcon />;
      case 'Twitter': return <TwitterIcon />;
      case 'Instagram': return <InstagramIcon />;
      default: return null;
    }
  };
  // Gestion des changements de champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Validation en temps réel
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Vérifier si le formulaire est valide
  const isFormValid = (): boolean => {
    const hasAllFields = Object.values(formData).every(value => value.trim() !== '');
    const hasNoErrors = Object.values(errors).every(error => error === undefined);
    return hasAllFields && hasNoErrors;
  };

  // Validation en temps réel
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'first_name':
        return value.trim() === '' ? 'Le prénom est requis' : undefined;

      case 'last_name':
        return value.trim() === '' ? 'Le nom est requis' : undefined;

      case 'email':
        if (value.trim() === '') return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Format d\'email invalide' : undefined;

      case 'phone':
        if (value.trim() === '') return 'Le téléphone est requis';
        const phoneRegex = /^\+?(\d.*){3,}$/;
        return !phoneRegex.test(value) ? 'Numéro de téléphone invalide' : undefined;

      case 'favorite_social_network':
        return value === '' ? 'Veuillez sélectionner un réseau social' : undefined;

      case 'social_network_name':
        return value.trim() === '' ? 'Le nom d\'utilisateur est requis' : undefined;

      case 'age':
        if (value.trim() === '') return 'L\'âge est requis';
        const ageNum = parseInt(value);
        return (isNaN(ageNum) || ageNum <= 0) ? 'L\'âge doit être un nombre positif' : undefined;

      default:
        return undefined;
    }
  };

  // Soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setIsLoading(false);
      setShowAlert(true);
      setAlertConfig({
        type: 'success',
        title: 'Inscription réussie',
        message: 'Merci de vous être inscrit à la beta!'
      });
    }, 2000);
  };

  return (
    <>
      <section className="min-h-screen p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <h2 className="text-3xl text-white mb-2">Rejoignez les beta testeurs</h2>
          </div>
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Prénom */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Prénom *
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:ring-inset focus:border-transparent outline-none transition-all ${
                  errors.first_name ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-form-green'
                }`}
                placeholder="Votre prénom"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>
            {/* Nom */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Nom *
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:ring-inset focus:border-transparent outline-none transition-all ${
                  errors.last_name ? 'border-red-500' : 'border-form-green'
                }`}
                placeholder="Votre nom"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:ring-inset focus:border-transparent outline-none transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-form-green'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Téléphone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:ring-inset focus:border-transparent outline-none transition-all ${
                  errors.phone ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-form-green'
                }`}
                placeholder="+33 6 12 34 56 78"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            {/* Réseau social favori */}
            <div>
              <label className="block text-sm font-medium text-indigo-100/80 mb-2">
                Réseau social favori *
              </label>
              <div className="flex gap-2">
                {socialNetworks.map(network => {
                  const isSelected = formData.favorite_social_network === network;
                  return (
                    <button
                      type="button"
                      key={network}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, favorite_social_network: network }));
                        setErrors(prev => ({ ...prev, favorite_social_network: undefined }));
                      }}
                      className={`flex flex-col items-center justify-center px-2 py-1 rounded border-2 transition-all focus:outline-none ${
                        isSelected ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300 bg-white opacity-60'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {getSocialIcon(network)}
                    </button>
                  );
                })}
              </div>
              {errors.favorite_social_network && (
                <p className="mt-1 text-sm text-red-600">{errors.favorite_social_network}</p>
              )}
            </div>

            {/* Nom d'utilisateur réseau social */}
            <div>
              <label htmlFor="social_network_name" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Nom d&apos;utilisateur *
              </label>
              <input
                id="social_network_name"
                name="social_network_name"
                type="text"
                value={formData.social_network_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:border-transparent outline-none transition-all ${
                  errors.social_network_name ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-form-green'
                }`}
                placeholder="@votre_pseudo"
              />
              {errors.social_network_name && (
                <p className="mt-1 text-sm text-red-600">{errors.social_network_name}</p>
              )}
            </div>

            {/* Âge */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-indigo-100/80 mb-2">
                Âge *
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 placeholder:text-form-green focus:ring-2 text-indigo-100/80 focus:ring-yellow-500 focus:border-transparent outline-none transition-all ${
                  errors.age ? 'border-red-500 focus:ring-red-500 text-red-500' : 'border-form-green'
                }`}
                placeholder="25"
                min="1"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full py-3 px-4 font-medium transition-all ${
                isFormValid() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Inscription en cours...' : 'Rejoindre la beta'}
            </button>
          </form>
        </div>
      </section>

      {/* SweetAlert */}
      {showAlert && (
        <SweetAlert
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default BetaTesterForm;
