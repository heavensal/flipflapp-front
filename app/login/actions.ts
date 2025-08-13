'use server';

import { authController } from '../_controllers/auth_controller';
import { redirect } from 'next/navigation';

/**
 * 🔐 ACTION DE CONNEXION
 * Utilise la fonction getLogin de l'AuthController (pattern MVC)
 */
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      error: 'Email et mot de passe requis'
    };
  }

  // Utiliser la fonction getLogin de l'AuthController (MVC)
  const result = await authController.getLogin({ email, password });

  if (result.success) {
    // ✅ Connexion réussie, rediriger vers le dashboard
    redirect('/events');
  } else {
    // ❌ Connexion échouée, retourner l'erreur
    return result;
  }
}
