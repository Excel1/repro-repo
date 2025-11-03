export interface Application {
  client_id: string;
  client_name: string;
  description: string;
  userConsent_required: boolean;
  in_use: boolean;
  offline_access: boolean;
  root_url: string;
  base_url: string;
  effective_url: string;
}

export interface KeycloakApplication {
  clientId: string;
  clientName: string;
  description: string;
  userConsentRequired: boolean;
  inUse: boolean;
  offlineAccess: boolean;
  rootUrl: string;
  baseUrl: string;
  effectiveUrl: string;
}

export function toApplication(keycloakApplication: KeycloakApplication): Application {
  return {
    client_id: keycloakApplication.clientId,
    client_name: keycloakApplication.clientName,
    description: keycloakApplication.description,
    userConsent_required: keycloakApplication.userConsentRequired,
    in_use: keycloakApplication.inUse,
    offline_access: keycloakApplication.offlineAccess,
    root_url: keycloakApplication.rootUrl,
    base_url: keycloakApplication.baseUrl,
    effective_url: keycloakApplication.effectiveUrl,
  }
}

export function toApplications(keycloakApplications: KeycloakApplication[]): Application[] {
  return keycloakApplications.map(toApplication);
}
