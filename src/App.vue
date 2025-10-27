<template>
  <ion-app>
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

const { initAuth } = useAuthStore();

onMounted(() => {
  initAuth();
  App.addListener("appUrlOpen", async () => {
    await initAuth();
  });
});
</script>
