import { type Client, type KeycloakClient, toClients } from 'src/interfaces/Client';

export interface Session {
  id: string;
  ip_address: string;
  started: number;
  last_access: number;
  expires: number;
  clients: Client[];
  browser: string;
  current: boolean;
}

export interface KeycloakSession {
  id: string;
  ipAddress: string;
  started: number;
  lastAccess: number;
  expires: number;
  clients: KeycloakClient[];
  browser: string;
  current: boolean;
}

export function toSession(keycloakSession: KeycloakSession): Session {
  return {
    id: keycloakSession.id,
    ip_address: keycloakSession.ipAddress,
    started: keycloakSession.started,
    last_access: keycloakSession.lastAccess,
    expires: keycloakSession.expires,
    clients: toClients(keycloakSession.clients),
    browser: keycloakSession.browser,
    current: keycloakSession.current,
  }
}

export function toSessions(keycloakSessions: KeycloakSession[]): Session[] {
  return keycloakSessions.map(toSession);
}
