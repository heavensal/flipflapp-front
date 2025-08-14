// app/_controllers/api_client.ts
import { authController } from './auth_controller';

export class ApiClient {
  private readonly API_BASE_URL = 'http://127.0.0.1:3000';

  /**
   * 🌟 MÉTHODE PRINCIPALE : Faire une requête authentifiée
   * Cette méthode récupère automatiquement les cookies et les ajoute aux headers
   */
  async authenticatedFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
    // 1️⃣ Récupérer les tokens depuis les cookies
    const tokens = await authController.getAuthTokens();

    if (!tokens) {
      throw new Error('Utilisateur non connecté');
    }

    // 2️⃣ Construire les headers avec les tokens d'authentification
    const authenticatedHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 🔑 LES 3 HEADERS REQUIS PAR DEVISE_TOKEN_AUTH
      'access-token': tokens.accessToken,
      'client': tokens.client,
      'uid': tokens.uid,
      // Ajouter les autres headers personnalisés
      ...options.headers,
    };

    // 3️⃣ Faire la requête avec les headers d'authentification
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: authenticatedHeaders,
    });

    // 4️⃣ Vérifier si les tokens ont été renouvelés
    await this.handleTokenRenewal(response);

    return response;
  }

  /**
   * 🔄 GESTION DU RENOUVELLEMENT DES TOKENS
   * DeviseTokenAuth peut renouveler les tokens automatiquement
   */
  private async handleTokenRenewal(response: Response): Promise<void> {
    const newAccessToken = response.headers.get('access-token');
    const newClient = response.headers.get('client');
    const newUid = response.headers.get('uid');

    // Si de nouveaux tokens sont fournis, les mettre à jour
    if (newAccessToken && newClient && newUid) {
      const tokens = {
        accessToken: newAccessToken,
        client: newClient,
        uid: newUid,
      };

      // Mettre à jour les cookies avec les nouveaux tokens
      await authController.setAuthCookies(tokens);
    }
  }

  // 📝 EXEMPLES D'UTILISATION PRATIQUE

  /**
   * Récupérer la liste des événements (avec authentification)
   */
  async getEvents() {
    const response = await this.authenticatedFetch('/api/v1/events');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }
    return await response.json();
  }

}

// Export singleton instance
export const apiClient = new ApiClient();

// app/_controllers/auth_controller.ts
export class AuthController {

  async getAuthTokens() {
    // Implementation to retrieve auth tokens from cookies or storage
    // This is a placeholder - you'll need to implement the actual logic
    const accessToken = this.getCookie('access-token');
    const client = this.getCookie('client');
    const uid = this.getCookie('uid');

    if (accessToken && client && uid) {
      return {
        accessToken,
        client,
        uid
      };
    }

    return null;
  }

  private getCookie(name: string): string | null {
    // Simple cookie getter implementation
    if (typeof document !== 'undefined') {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
    }
    return null;
  }
}
