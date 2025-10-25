<template>
  <ion-app>
    <AppMenu />

    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import AppMenu from "./components/AppMenu.vue";
</script>
