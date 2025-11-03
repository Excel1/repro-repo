export interface CredentialType {
  type: string;
  category: string;
  display_name: string;
  helptext: string;
  icon_css_class: string;
  update_action?: string | undefined;
  create_action?: string | undefined;
  removeable: boolean;
  user_credential_metadatas: UserCredentialMetadata[];
}

export interface UserCredentialMetadata {
  credential: UserCredential;
}

export interface UserCredential {
  id: string;
  type: string;
  user_label: string;
  created_date: number;
  credential_data: string;
}

export interface KeycloakCredentialType {
  type: string;
  category: string;
  displayName: string;
  helptext: string;
  iconCssClass: string;
  updateAction?: string | undefined;
  createAction?: string | undefined;
  removeable: boolean;
  userCredentialMetadatas: KeycloakUserCredentialMetadata[];
}

export interface KeycloakUserCredentialMetadata {
  credential: KeycloakUserCredential;
}

export interface KeycloakUserCredential {
  id: string;
  type: string;
  userLabel: string;
  createdDate: number;
  credentialData: string;
}

export function toUserCredential (keycloakUserCredential: KeycloakUserCredential): UserCredential {
  return {
    id: keycloakUserCredential.id,
    type: keycloakUserCredential.type,
    user_label: keycloakUserCredential.userLabel,
    created_date: keycloakUserCredential.createdDate,
    credential_data: keycloakUserCredential.credentialData,
  }
}

export function toUserCredentialMetadata (keycloakUserCredentialMetadata: KeycloakUserCredentialMetadata): UserCredentialMetadata {
  return {
    credential: toUserCredential(keycloakUserCredentialMetadata.credential),
  }
}

export function toCredentialType (keycloakCredentialType: KeycloakCredentialType): CredentialType {
  return {
    type: keycloakCredentialType.type,
    category: keycloakCredentialType.category,
    display_name: keycloakCredentialType.displayName,
    helptext: keycloakCredentialType.helptext,
    icon_css_class: keycloakCredentialType.iconCssClass,
    update_action: keycloakCredentialType.updateAction,
    create_action: keycloakCredentialType.createAction,
    removeable: keycloakCredentialType.removeable,
    user_credential_metadatas: keycloakCredentialType.userCredentialMetadatas.map(ucm => toUserCredentialMetadata(ucm)),
  }
}

export function toUserCredentials (keycloakUserCredentials: KeycloakUserCredential[]): UserCredential[] {
  return keycloakUserCredentials.map(kuc => toUserCredential(kuc));
}

export function toUserCredentialTypes (keycloakCredentialTypes: KeycloakCredentialType[]): CredentialType[] {
  return keycloakCredentialTypes.map(kct => toCredentialType(kct));
}

export function toUserCredentialsMetadata (keycloakUserCredentialsMetadata: KeycloakUserCredentialMetadata[]): UserCredentialMetadata[] {
  return keycloakUserCredentialsMetadata.map(kucm => toUserCredentialMetadata(kucm));
}
