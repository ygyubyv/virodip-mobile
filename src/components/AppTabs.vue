<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="book" href="/tabs/book">
          <ion-icon aria-hidden="true" :icon="addOutline" />
          <ion-label>Book</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="parkings" href="/tabs/parkings">
          <ion-icon aria-hidden="true" :icon="carOutline" />
          <ion-label>My Parkings</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="account"
          href="/tabs/account"
          v-if="isAuthenticated"
        >
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { addOutline, carOutline, personCircleOutline } from "ionicons/icons";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
