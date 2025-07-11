import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

async function createEvent(formData: FormData) {
  'use server';

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const client = cookieStore.get('client')?.value;
  const uid = cookieStore.get('uid')?.value;

  if (!accessToken || !client || !uid) {
    redirect('/login');
  }

  const eventData = {
    event: {
      title: formData.get('title'),
      description: formData.get('description'),
      location: formData.get('location'),
      start_time: formData.get('start_time'),
      number_of_participants: formData.get('number_of_participants') ? parseInt(formData.get('number_of_participants') as string) : 10,
      price: formData.get('price') ? parseFloat(formData.get('price') as string) : 10.0,
      is_private: formData.get('is_private') !== 'on'
    }
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/api/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        'client': client,
        'uid': uid
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      redirect('/dashboard');
    } else {
      // En cas d'erreur, on pourrait rediriger vers une page d'erreur
      // ou gérer l'erreur différemment
      throw new Error('Erreur lors de la création de l\'événement');
    }
  } catch (error) {
    console.error('Erreur création événement:', error);
    // Redirection vers la page avec un paramètre d'erreur
    redirect('/events/new?error=creation_failed');
  }
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewEventPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
              <h1 className="text-3xl font-bold text-gray-900">Créer un événement</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erreur lors de la création de l&apos;événement
                  </h3>
                  <p className="mt-2 text-sm text-red-700">
                    Une erreur s&apos;est produite. Veuillez réessayer.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <form action={createEvent} className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6">

                {/* Titre */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre de l&apos;événement *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Donnez un titre à votre événement"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Décrivez votre événement..."
                  />
                </div>

                {/* Lieu */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Lieu *
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Où aura lieu l'événement ?"
                  />
                </div>

                {/* Date et heure de début */}
                <div>
                  <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                    Date et heure de début *
                  </label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    id="start_time"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Nombre de participants et Prix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="number_of_participants" className="block text-sm font-medium text-gray-700">
                      Nombre de participants *
                    </label>
                    <input
                      type="number"
                      name="number_of_participants"
                      id="number_of_participants"
                      min="1"
                      defaultValue="10"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Prix (€) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      min="0"
                      step="0.01"
                      defaultValue="10.00"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Événement privé */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="is_private"
                      id="is_private"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="is_private" className="font-medium text-gray-700">
                      Événement privé
                    </label>
                    <p className="text-gray-500">
                      Cochez cette case si vous souhaitez que votre événement soit privé (coché par défaut).
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a
                  href="/dashboard"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Annuler
                </a>
                <button
                  type="submit"
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Créer l&apos;événement
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
