<template>
  <ion-alert
    :is-open="authModalIsVisible"
    header="Authentication Required"
    sub-header="You need to log in to continue"
    message="Please log in with your account to access this feature."
    :buttons="[
      { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel' },
      { text: 'Login', cssClass: 'alert-submit', handler: login },
    ]"
    css-class="custom-alert"
    @didDismiss="authModalIsVisible = false"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { IonAlert } from "@ionic/vue";

const authStore = useAuthStore();
const { login } = authStore;
const { authModalIsVisible } = storeToRefs(authStore);
</script>

<style scoped>
.custom-alert {
  --background: #2a2a2a;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.alert-cancel {
  --background: #ef4444;
  --color: white;
}

.alert-submit {
  --background: #3b82f6;
  --color: white;
}
</style>
