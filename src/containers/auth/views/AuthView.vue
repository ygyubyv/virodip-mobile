<template>
  <base-layout page-default-back-link="/tabs/book" page-title="Login">
    <button @click="login">LOGIN</button>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/Base/BaseLayout.vue";
import { GenericOAuth2 } from "@capacitor-community/generic-oauth2";
import { oauth2Config } from "@/auth.config";

const login = async () => {
  try {
    const result = await GenericOAuth2.authenticate(oauth2Config);
    console.log("Access token:", result.access_token);
    console.log("ID token:", result.id_token);
  } catch (err) {
    console.error("OAuth2 login error", err);
  }
};
</script>
