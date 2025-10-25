import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dopii.onmicrosoft.virodip",
  appName: "Virodip",
  webDir: "dist",

  GenericOAuth2: {
    ios: { redirectUri: "com.dopii.onmicrosoft.virodip://auth" },
    android: {
      redirectUri: "com.dopii.onmicrosoft.virodip://auth",
      customTabsOptions: {
        toolbarColor: "#ffffff",
      },
    },
  },
};

export default config;
