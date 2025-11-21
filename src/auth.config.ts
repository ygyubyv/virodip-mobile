import { azureConfig } from "@/config";

const { clientId, tenantName, userFlow, redirectUri } = azureConfig;

export const oauth2Config = {
  appId: clientId,
  authorizationBaseUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize`,
  scope: `openid offline_access https://${tenantName}.onmicrosoft.com/${clientId}/user_impersonation`,
  redirectUrl: redirectUri,
  responseType: "code",
  pkceEnabled: true,
  logsEnabled: true,
  tokenExchangeUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
  web: {
    appId: clientId,
    responseType: "token",
    accessTokenEndpoint: "",
    redirectUrl: "http://localhost:8100",
    scope: `openid offline_access https://${tenantName}.onmicrosoft.com/${clientId}/user_impersonation`,
    windowOptions: "height=600,left=0,top=0",
    pkceEnabled: false,
  },

  android: {
    redirectUrl: redirectUri,
    scope: `openid offline_access https://${tenantName}.onmicrosoft.com/${clientId}/user_impersonation`,
  },
  extraParams: {
    prompt: "select_account",
  },
};
