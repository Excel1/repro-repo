export interface Client {
  id: string;
  name: string;
  user_consent_required: boolean;
  in_use: boolean;
  offline_access: boolean;
}

export interface KeycloakClient {
  clientId: string;
  clientName: string;
  userConsentRequired: boolean;
  inUse: boolean;
  offlineAccess: boolean;
}

export function toClient(keycloakClient: KeycloakClient): Client {
  return {
    id: keycloakClient.clientId,
    name: keycloakClient.clientName,
    user_consent_required: keycloakClient.userConsentRequired,
    in_use: keycloakClient.inUse,
    offline_access: keycloakClient.offlineAccess,
  }
}

export function toClients(keycloakClients: KeycloakClient[]): Client[] {
  return keycloakClients.map(toClient);
}
