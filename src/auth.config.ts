import { azureConfig } from "@/config";

const { clientId, tenantName, userFlow } = azureConfig;

export const oauth2Config = {
  appId: clientId,
  authorizationBaseUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize`,
  scope: "openid offline_access",
  redirectUrl: "com.dopii.onmicrosoft.virodip://auth",
  // redirectUrl: "http://localhost:8100/",
  pkceEnabled: true,
  tokenExchangeUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
  serviceConfiguration: {
    authorizationEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
    revocationEndpoint: "",
  },
};
