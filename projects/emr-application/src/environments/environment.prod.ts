import keycloakConfigProd from "./keycloak.config.prod";

export const environment = {
  production: true,
  baseURL:"/emr/api/",
  keycloak: keycloakConfigProd,
};
