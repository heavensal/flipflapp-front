'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Types basés sur votre ShowSerializer
interface EventAuthor {
  id: number;
  first_name: string;
}

interface EventParticipant {
  id: number;
  first_name: string;
}

interface EventTeam {
  id: number;
  name: string;
  event_participants: EventParticipant[];
}

interface EventDetails {
  id: string;
  type: string;
  attributes: {
    id: number;
    title: string;
    description: string;
    location: string;
    start_time: string;
    number_of_participants: number;
    price: number;
    is_private: boolean;
    participants_count: number;
    is_full: boolean;
    status: 'past' | 'full' | 'soon' | 'open';
    author: EventAuthor;
    event_teams: EventTeam[];
  };
}

interface EventResponse {
  data: EventDetails;
}

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const eventId = params.id as string;

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`http://127.0.0.1:3000/api/v1/events/${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('Événement non trouvé');
        } else {
          throw new Error('Erreur lors du chargement de l\'événement');
        }
        return;
      }

      const data: EventResponse = await response.json();
      setEvent(data.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger l\'événement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'soon':
        return 'bg-orange-100 text-orange-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert aux inscriptions';
      case 'soon':
        return 'Bientôt (moins de 24h)';
      case 'full':
        return 'Complet';
      case 'past':
        return 'Terminé';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Gratuit' : `${price}€`;
  };

  const handleJoinEvent = async () => {
    setIsJoining(true);
    try {
      // TODO: Implémenter l'inscription à l'événement
      console.log('Inscription à l\'événement:', eventId);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      alert('Inscription réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription');
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow p-8">
              <div className="h-10 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{error}</h3>
            <div className="mt-6">
              <button
                onClick={fetchEvent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/events"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Événements
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {event.attributes.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Contenu principal */}
        <div className="bg-white shadow rounded-lg overflow-hidden">

          {/* Header */}
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {event.attributes.title}
                  </h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(event.attributes.status)}`}>
                    {getStatusLabel(event.attributes.status)}
                  </span>
                </div>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {event.attributes.description}
                </p>

                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                  {/* Date et lieu */}
                  <div className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Date et heure</dt>
                      <dd className="flex items-center text-base text-gray-900">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v1h16v-1a4 4 0 11-8 0z" />
                        </svg>
                        {formatDate(event.attributes.start_time)}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Lieu</dt>
                      <dd className="flex items-center text-base text-gray-900">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.attributes.location}
                      </dd>
                    </div>
                  </div>

                  {/* Participants et prix */}
                  <div className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Participants</dt>
                      <dd className="flex items-center text-base text-gray-900">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        {event.attributes.participants_count} / {event.attributes.number_of_participants}
                        {event.attributes.is_full && (
                          <span className="ml-2 text-red-600 font-medium">Complet</span>
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Prix</dt>
                      <dd className="flex items-center text-base text-gray-900">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="text-xl font-bold text-indigo-600">
                          {formatPrice(event.attributes.price)}
                        </span>
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Organisateur */}
                <div className="border-t border-gray-200 pt-6">
                  <dt className="text-sm font-medium text-gray-500 mb-2">Organisé par</dt>
                  <dd className="flex items-center text-base text-gray-900">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-medium text-sm">
                        {event.attributes.author.first_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{event.attributes.author.first_name}</span>
                    {event.attributes.is_private && (
                      <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Événement privé
                      </span>
                    )}
                  </dd>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 lg:mt-0 lg:ml-8 flex-shrink-0">
                <div className="space-y-3">
                  {event.attributes.status === 'open' && !event.attributes.is_full && (
                    <button
                      onClick={handleJoinEvent}
                      disabled={isJoining}
                      className="w-full lg:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isJoining ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Inscription...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          S&apos;inscrire
                        </>
                      )}
                    </button>
                  )}

                  {event.attributes.is_full && (
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">Événement complet</p>
                    </div>
                  )}

                  {event.attributes.status === 'past' && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Événement terminé</p>
                    </div>
                  )}

                  <button className="w-full lg:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Équipes et participants */}
          {event.attributes.event_teams.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Équipes et participants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.attributes.event_teams.map((team) => (
                  <div key={team.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121L17 20zM9 12a4 4 0 008 0m-8 0a4 4 0 118 0m-8 0v8a2 2 0 002 2h6a2 2 0 002-2v-8" />
                      </svg>
                      {team.name}
                    </h3>
                    {team.event_participants.length > 0 ? (
                      <div className="space-y-2">
                        {team.event_participants.map((participant) => (
                          <div key={participant.id} className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-indigo-600 font-medium text-sm">
                                {participant.first_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm text-gray-700">{participant.first_name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">Aucun participant pour le moment</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions en bas */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/events"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux événements
          </Link>
        </div>
      </div>
    </div>
  );
}
