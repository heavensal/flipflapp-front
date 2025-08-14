// app/controllers/auth.controller.ts
import { cookies } from 'next/headers';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  client: string;
  uid: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    id?: number;
    email?: string;
    name?: string;
    [key: string]: unknown;
  };
  error?: string;
}

class AuthController {
  private readonly API_BASE_URL = 'http://127.0.0.1:3000';

  /**
   * 🔐 FONCTION DE CONNEXION (MVC Pattern)
   * Authentifie l'utilisateur et stocke les cookies
   */
  async getLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('🔐 Tentative de connexion pour:', credentials.email);

      const response = await fetch(`${this.API_BASE_URL}/api/v1/auth/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // ✅ CORRECTION : Envoyer directement email et password (pas dans un objet session)
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      console.log('📡 Réponse API:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Erreur API:', errorData);
        return {
          success: false,
          error: errorData.errors?.[0] || 'Email ou mot de passe incorrect.'
        };
      }

      // Extraire les tokens des headers
      const tokens = this.extractTokensFromHeaders(response);
      if (!tokens) {
        console.error('❌ Tokens manquants dans les headers');
        return {
          success: false,
          error: 'Tokens d\'authentification manquants.'
        };
      }

      console.log('✅ Tokens reçus, création des cookies...');

      // Stocker les tokens dans les cookies
      await this.setAuthCookies(tokens);

      const userData = await response.json();
      console.log('✅ Connexion réussie pour:', credentials.email);

      return {
        success: true,
        data: userData
      };

    } catch (error) {
      console.error('💥 Erreur lors de la connexion:', error);
      return {
        success: false,
        error: 'Erreur de connexion. Veuillez réessayer.'
      };
    }
  }

  /**
   * 🍪 MÉTHODES PRIVÉES POUR GÉRER LES COOKIES
   */
  private extractTokensFromHeaders(response: Response): AuthTokens | null {
    const accessToken = response.headers.get('access-token');
    const client = response.headers.get('client');
    const uid = response.headers.get('uid');

    console.log('🔍 Headers reçus:', {
      'access-token': accessToken ? '✅' : '❌',
      'client': client ? '✅' : '❌',
      'uid': uid ? '✅' : '❌'
    });

    if (!accessToken || !client || !uid) {
      return null;
    }

    return { accessToken, client, uid };
  }

  async setAuthCookies(tokens: AuthTokens): Promise<void> {
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 jours

    console.log('🍪 Création des cookies d\'authentification...');

    cookieStore.set('access-token', tokens.accessToken, {
      expires,
      httpOnly: false, // Nécessaire pour que le client puisse les lire
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('client', tokens.client, {
      expires,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('uid', tokens.uid, {
      expires,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    console.log('✅ Cookies créés avec succès');
  }

  /**
   * 🎫 GET AUTH TOKENS - Récupérer les tokens depuis les cookies
   */
  async getAuthTokens(): Promise<AuthTokens | null> {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('access-token')?.value;
      const client = cookieStore.get('client')?.value;
      const uid = cookieStore.get('uid')?.value;

      if (!accessToken || !client || !uid) {
        return null;
      }

      return { accessToken, client, uid };
    } catch (error) {
      console.error('Erreur lors de la récupération des tokens:', error);
      return null;
    }
  }
}

export const authController = new AuthController();
