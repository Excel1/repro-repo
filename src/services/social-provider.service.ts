import { api } from 'boot/axios';
import { toUserCredentials } from 'src/interfaces/CredentialType';

const baseApiPath = '/realms/' + import.meta.env.VITE_REALM;

export default {
  async getSocialProviders(linked: boolean) {
    try {
      const keycloakServiceResponse = await api.get(baseApiPath + `/account/linked-accounts?linked=` + linked);

      return toUserCredentials(keycloakServiceResponse.data);
    } catch (error) {
      throw new Error('Can´t retrieve Social Providers: ' + String(error));
    }
  },
}
