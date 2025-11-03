import { api } from 'boot/axios';
import { toDevices } from 'src/interfaces/Device';

const baseApiPath = '/realms/' + import.meta.env.VITE_REALM;

export default {
  async getKeycloakDevices() {
    try {
      const keycloakServiceResponse = await api.get(baseApiPath + `/account/sessions/devices/`);

      const keycloakDevices = keycloakServiceResponse.data;

      return toDevices(keycloakDevices);
    } catch (error) {
      throw new Error('Can´t retrieve KeycloakDevices: ' + String(error));
    }
  },
}
