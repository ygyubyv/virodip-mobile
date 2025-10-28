<template>
  <ion-app>
    <RequiredAuthModal v-if="authModalIsVisible" />

    <AppMenu />

    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import AppMenu from "./components/AppMenu.vue";
import { useAuthStore } from "./stores/auth";
import { App } from "@capacitor/app";
import { onMounted } from "vue";
import RequiredAuthModal from "./components/Modals/RequiredAuthModal.vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { initAuth } = authStore;
const { authModalIsVisible } = storeToRefs(authStore);

onMounted(() => {
  initAuth();
  App.addListener("appUrlOpen", async () => {
    await initAuth();
  });
});
</script>
