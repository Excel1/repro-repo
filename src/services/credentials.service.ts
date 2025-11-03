import { api } from 'boot/axios';
import { toUserCredentials } from 'src/interfaces/CredentialType';

const baseApiPath = '/realms/' + import.meta.env.VITE_REALM;

export default {
  async getKeycloakCredentials() {
    try {
      const keycloakServiceResponse = await api.get(baseApiPath + `/account/credentials/`);

      const keycloakCredentials = keycloakServiceResponse.data;

      return toUserCredentials(keycloakCredentials);
    } catch (error) {
      throw new Error('Can´t retrieve KeycloakApplications: ' + String(error));
    }
  },
}
