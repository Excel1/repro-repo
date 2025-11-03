import { defineStore, acceptHMRUpdate } from 'pinia';
import { type User } from '../interfaces/User';
import userService from 'src/services/user.service';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: <User | undefined> undefined,
  }),

  getters: {
    getEmail(): string {
      return this.user?.email ?? '';
    },
    getFirstName(): string {
      return this.user?.first_name ?? '';
    },
    getLastName(): string {
      return this.user?.last_name ?? '';
    }
  },

  actions: {
    async fetchUserData() {
      try {
        this.user = await userService.getKeycloakUser();
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
