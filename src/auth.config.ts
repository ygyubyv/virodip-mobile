import { azureConfig } from "@/config";

const { clientId, tenantName, userFlow } = azureConfig;

export const oauth2Config = {
  appId: clientId,
  authorizationBaseUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize`,
  scope:
    "openid offline_access https://dopii.onmicrosoft.com/627832f9-0ef9-4e36-a551-ebe6f1686e15/user_impersonation",
  redirectUrl: "msauth://com.dopii.virodip/Jv1bcrt54hsetFb2mo7KDMpuErU",
  responseType: "code",
  pkceEnabled: true,
  logsEnabled: true,
  tokenExchangeUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
  web: {
    appId: clientId,
    responseType: "token",
    accessTokenEndpoint: "",
    redirectUrl: "http://localhost:8100",
    scope:
      "openid https://dopii.onmicrosoft.com/627832f9-0ef9-4e36-a551-ebe6f1686e15/user_impersonation",
    windowOptions: "height=600,left=0,top=0",
    pkceEnabled: false,
  },

  android: {
    redirectUrl: "msauth://com.dopii.virodip/Jv1bcrt54hsetFb2mo7KDMpuErU",
    scope:
      "openid https://dopii.onmicrosoft.com/627832f9-0ef9-4e36-a551-ebe6f1686e15/user_impersonation",
  },
  extraParams: {
    prompt: "select_account",
  },
};
