<template>
  <ion-menu content-id="main-content" side="end">
    <ion-header>
      <ion-toolbar class="ion-text-end">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item @click="navigate('/tabs/book')">
          <ion-label class="ion-text-end">Book parking</ion-label>
        </ion-item>

        <ion-item @click="navigate('/contact')">
          <ion-label class="ion-text-end">Contact us</ion-label>
        </ion-item>

        <div v-if="isAuthenticated">
          <ion-item @click="navigate('/tabs/parkings')">
            <ion-label class="ion-text-end">My parkings</ion-label>
          </ion-item>

          <ion-item @click="navigate('/account')">
            <ion-label class="ion-text-end">Account</ion-label>
          </ion-item>

          <ion-item @click="navigate('/account/settings')">
            <ion-label class="ion-text-end">Settings</ion-label>
          </ion-item>

          <ion-item @click="logout">
            <ion-label class="ion-text-end">Logout</ion-label>
          </ion-item>
        </div>

        <div v-if="!isAuthenticated">
          <ion-item @click="login">
            <ion-label class="ion-text-end">Login</ion-label>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  menuController,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = useRouter();

const authStore = useAuthStore();

const { login, logout } = authStore;
const { isAuthenticated } = storeToRefs(authStore);

const navigate = (path: string) => {
  menuController.close();
  router.replace(path);
};
</script>

<style scoped>
ion-list {
  height: 100%;
}
</style>
