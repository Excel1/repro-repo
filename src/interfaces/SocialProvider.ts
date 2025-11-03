export interface SocialProvider {
  connected: boolean;
  provider_alias: string;
  provider_name: string;
  display_name: string;
  social: boolean;
}

export interface KeycloakSocialProvider {
  connected: boolean;
  providerAlias: string;
  providerName: string;
  displayName: string;
  social: boolean;
}

export function toSocialProvider(keycloakSocialProvider: KeycloakSocialProvider): SocialProvider {
  return {
    connected: keycloakSocialProvider.connected,
    provider_alias: keycloakSocialProvider.providerAlias,
    provider_name: keycloakSocialProvider.providerName,
    display_name: keycloakSocialProvider.displayName,
    social: keycloakSocialProvider.social,
  };
}

export function toSocialProviders(keycloakSocialProviders: KeycloakSocialProvider[]): SocialProvider[] {
  return keycloakSocialProviders.map(toSocialProvider);
}
