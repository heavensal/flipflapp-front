'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  createdAt: string;
  avatar?: string;
}

interface UserStats {
  eventsCount: number;
  friendsCount: number;
  participationsCount: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupération des données utilisateur
        const accessToken = localStorage.getItem('access-token');
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');

        if (!accessToken || !client || !uid) {
          router.push('/login');
          return;
        }

        const userResponse = await fetch('http://127.0.0.1:3000/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'uid': uid
          },
        });

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            // Utilisateur non authentifié, redirection vers login
            router.push('/login');
            return;
          }
          throw new Error('Erreur lors de la récupération des données');
        }

        const userData = await userResponse.json();
        setUser(userData);
        console.log('✅ Données utilisateur récupérées:', userData);

        // Récupération des statistiques utilisateur
        const statsResponse = await fetch('/api/user/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken || '',
          'client': client || '',
          'uid': uid || '',
        },
      });

      if (response.ok) {
        console.log('✅ Déconnexion réussie');
      } else {
        console.warn('⚠️ Déconnexion échouée côté serveur');
      }
    } catch (err) {
      console.error('❌ Erreur réseau pendant la déconnexion', err);
    } finally {
      // Toujours nettoyer les données locales
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');

      router.push('/login');
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">Aucune donnée utilisateur trouvée</div>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bonjour, {user.first_name || user.username || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Profil utilisateur */}
            <div className="lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Informations du profil
                  </h3>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex-shrink-0">
                      {user.avatar ? (
                        <Image
                          className="h-20 w-20 rounded-full"
                          src={user.avatar}
                          alt="Avatar"
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {user.first_name && user.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : user.username || 'Utilisateur'
                        }
                      </h4>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ID Utilisateur</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                    </div>
                    {user.firstName && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Prénom</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.first_name}</dd>
                      </div>
                    )}
                    {user.lastName && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Nom</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.last_name}</dd>
                      </div>
                    )}
                    {user.username && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Nom d&apos;utilisateur</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.username}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Statut du joueur</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.status == "private" ? "Joueur Privé" : "Agent Libre"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="space-y-6">
              {stats && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Statistiques
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Événements créés</span>
                        <span className="text-2xl font-bold text-blue-600">{stats.eventsCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Amis</span>
                        <span className="text-2xl font-bold text-green-600">{stats.friendsCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Participations</span>
                        <span className="text-2xl font-bold text-purple-600">{stats.participationsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions rapides */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Actions rapides
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Créer un événement
                    </button>
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Voir mes amis
                    </button>
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      Mes participations
                    </button>
                    <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                      Modifier le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
