import { type KeycloakSession, toSessions, type Session } from 'src/interfaces/Session';

export interface Device {
  os: string;
  os_version: string;
  device: string;
  last_access: number;
  current: boolean;
  sessions: Session[];
  mobile: boolean;
}

export interface KeycloakDevice {
  os: string;
  osVersion: string;
  device: string;
  lastAccess: number;
  current: boolean;
  sessions: KeycloakSession[];
  mobile: boolean;
}

export function toDevice(keycloakDevice: KeycloakDevice): Device {
  return {
    os: keycloakDevice.os,
    os_version: keycloakDevice.osVersion,
    device: keycloakDevice.device,
    last_access: keycloakDevice.lastAccess,
    current: keycloakDevice.current,
    sessions: toSessions(keycloakDevice.sessions),
    mobile: keycloakDevice.mobile,
  }
}

export function toDevices(keycloakDevices: KeycloakDevice[]): Device[] {
  return keycloakDevices.map(toDevice);
}
