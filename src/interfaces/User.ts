export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
}

export interface KeycloakUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
}

export function toUser(keycloakUser: KeycloakUser): User {
  return {
    id: keycloakUser.id,
    username: keycloakUser.username,
    first_name: keycloakUser.firstName,
    last_name: keycloakUser.lastName,
    email: keycloakUser.email,
    email_verified: keycloakUser.emailVerified,
  };
}

export function toKeycloakUser(user: User): KeycloakUser {
  return {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    emailVerified: user.email_verified,
  }
}
