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
          <ion-icon aria-hidden="true" :icon="clipboardOutline" />
          <ion-label>My Parkings</ion-label>
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
import { addOutline, clipboardOutline } from "ionicons/icons";
</script>
