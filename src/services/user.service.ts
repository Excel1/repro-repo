import { api } from 'boot/axios';
import type { KeycloakUser } from 'src/interfaces/User';
import  { toUser } from 'src/interfaces/User';

const basePath = import.meta.env.VITE_KEYCLOAK_URL;
const baseApiPath = '/realms/' + import.meta.env.VITE_REALM;
const clientId: string = import.meta.env.VITE_CLIENT_ID;

export default {
  async getKeycloakUser() {
    try {
      const keycloakServiceResponse = await api.get(baseApiPath + `/account/`);

      const keycloakUser = keycloakServiceResponse.data;
      return toUser(keycloakUser);
    } catch (error) {
      throw new Error('Can´t retrieve KeycloakUser: ' + String(error));
    }
  },
  async updateKeycloakUser(keycloakUser: KeycloakUser) {
    try {
      await api.post(baseApiPath + `/account/`, keycloakUser);

    } catch (error) {
      throw new Error('Can´t update KeycloakUser: ' + String(error));
    }
  },
  deleteKeycloakUser(redirectUri: string) {
    try {
      const accountUrl = new URL(basePath + '/' + baseApiPath + `/account/`);
      accountUrl.searchParams.set('referrer', clientId);
      accountUrl.searchParams.set('referrer_uri', redirectUri);
      accountUrl.searchParams.set('kc_action', 'DELETE_ACCOUNT');

      window.location.href = accountUrl.toString();
    } catch (error) {
      throw new Error('Can´t delete KeycloakUser: ' + String(error));
    }
  },
  updatePasswordKeycloakUser(redirectUri: string) {
    try {
      const keycloakBaseUrl = import.meta.env.VITE_KEYCLOAK_URL;
      const realm = import.meta.env.VITE_REALM;

      const updatePasswordUrl = new URL(`${keycloakBaseUrl}/realms/${realm}/login-actions/required-action`);
      updatePasswordUrl.searchParams.set('execution', 'UPDATE_PASSWORD');
      updatePasswordUrl.searchParams.set('client_id', clientId);
      updatePasswordUrl.searchParams.set('tab_id', crypto.randomUUID());
      updatePasswordUrl.searchParams.set('client_data', btoa(JSON.stringify({
        ru: redirectUri,     // redirect URI
        rt: 'code',          // response type
        st: crypto.randomUUID() // state/nonce, optional
      })));

      window.location.href = updatePasswordUrl.toString();
    } catch (error) {
      throw new Error('Can´t update KeycloakUser password: ' + String(error));
    }
  }
};

/*
function handlePasswordUpdateRedirect() {
  const params = new URLSearchParams(window.location.search);

  const action = params.get('kc_action');
  const status = params.get('kc_action_status');

  if (action === 'UPDATE_PASSWORD') {
    switch (status) {
      case 'success':
        alert('Passwort wurde erfolgreich geändert!');
        break;
      case 'cancelled':
        alert('Passwortänderung abgebrochen.');
        break;
      default:
        alert('Unbekannter Status bei Passwortänderung.');
    }
  }
}

https://my-theme.keycloakify.dev/?state=b2lkYy1zcGEuaSIjOu0_6M_d2ajXo44s&session_state=469a885b-2e3d-711d-a144-eb15e380c37b&iss=http://localhost:8080/realms/myrealm&kc_action=UPDATE_PASSWORD&kc_action_status=cancelled&code=93659518-8baf-a9da-1fed-5329bb9b0d4b.469a885b-2e3d-711d-a144-eb15e380c37b.8fba88fa-61e9-45a4-893d-ab102973ebf6

 */
