import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'COB',
    clientId: 'emr-resource',
  };
  
  export default keycloakConfig;