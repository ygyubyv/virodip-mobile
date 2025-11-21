import { defineStore } from "pinia";
import { ref } from "vue";
import { GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { oauth2Config } from "@/auth.config";
import { Preferences } from "@capacitor/preferences";
import { parseJwt, exchangeCodeForToken } from "@/utils";
import { IdTokenClaimsExtended } from "@/types";
import { useUserStore } from "./user";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const idTokenClaims = ref<IdTokenClaimsExtended | null>(null);
  const authModalIsVisible = ref(false);
  const bearerToken = ref("");

  const initAuth = async () => {
    try {
      const id_token = await Preferences.get({ key: "id_token" });
      const access_token = await Preferences.get({ key: "access_token" });

      if (id_token.value && access_token.value) {
        idTokenClaims.value = parseJwt(id_token.value);
        bearerToken.value = access_token.value;
        isAuthenticated.value = true;
        await setUser(idTokenClaims.value!.sub!);
      } else {
        await logout();
      }
    } catch {
      await logout();
    } finally {
      isInitialized.value = true;
    }
  };

  const login = async () => {
    try {
      const result: any = await GenericOAuth2.authenticate(oauth2Config);

      const code = result.authorization_response.code;
      const codeVerifier = result.authorization_response.request.codeVerifier;

      if (!code) throw new Error("No authorization code returned");

      const tokens = await exchangeCodeForToken(code, codeVerifier);

      await Preferences.set({
        key: "id_token",
        value: tokens.id_token,
      });

      await Preferences.set({
        key: "access_token",
        value: tokens.access_token ?? "",
      });

      await initAuth();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await Preferences.remove({ key: "id_token" });
    await Preferences.remove({ key: "access_token" });

    isAuthenticated.value = false;

    router.replace("/");
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
