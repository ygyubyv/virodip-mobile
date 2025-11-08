import { defineStore } from "pinia";
import { ref } from "vue";
import { GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { oauth2Config } from "@/auth.config";
import { Preferences } from "@capacitor/preferences";
import { parseJwt } from "@/utils/auth/decodeJwt";
import { IdTokenClaimsExtended } from "@/types";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", () => {
  const { setUser } = useUserStore();

  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const idTokenClaims = ref<IdTokenClaimsExtended | null>(null);
  const authModalIsVisible = ref(false);
  const bearerToken = ref("");

  const initAuth = async () => {
    try {
      const access_token = await Preferences.get({ key: "access_token" });

      if (access_token.value) {
        bearerToken.value = access_token.value;
        idTokenClaims.value = parseJwt(access_token.value);
        isAuthenticated.value = true;

        await setUser(idTokenClaims.value!.sub!);
      } else {
        isAuthenticated.value = false;
      }
    } catch (err) {
      console.error("Auth initialization error:", err);
      isAuthenticated.value = false;
    } finally {
      isInitialized.value = true;
    }
  };

  const login = async () => {
    try {
      const result = await GenericOAuth2.authenticate(oauth2Config);

      await Preferences.set({
        key: "access_token",
        value: result.access_token,
      });

      await initAuth();
    } catch (err) {
      console.error("OAuth2 login error", err);
    }
  };

  const logout = async () => {
    const access_token = await Preferences.get({ key: "access_token" });

    if (access_token.value) {
      await GenericOAuth2.logout(oauth2Config, access_token.value);
    }

    await Preferences.remove({ key: "access_token" });
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    idTokenClaims,
    bearerToken,
    authModalIsVisible,
    isInitialized,
    login,
    logout,
    initAuth,
  };
});
