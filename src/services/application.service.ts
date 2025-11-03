import { api } from 'boot/axios';
import { toApplications } from 'src/interfaces/Application';

const baseApiPath = '/realms/' + import.meta.env.VITE_REALM;

export default {
  async getKeycloakApplications() {
    try {
      const keycloakServiceResponse = await api.get(baseApiPath + `/account/applications/`);

      const keycloakApplications = keycloakServiceResponse.data;

      return toApplications(keycloakApplications);
    } catch (error) {
      throw new Error('Can´t retrieve KeycloakApplications: ' + String(error));
    }
  },
}
