<template>
  <ion-alert
    :is-open="authModalIsVisible"
    :header="$t('modals.required_auth.title')"
    :sub-header="$t('modals.required_auth.subtitle')"
    :message="$t('modals.required_auth.message')"
    :buttons="[
      { text: $t('buttons.cancel'), role: 'cancel', cssClass: 'alert-cancel' },
      {
        text: $t('modals.required_auth.submit_text'),
        cssClass: 'alert-submit',
        handler: login,
      },
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
:deep(.custom-alert::part(alert)) {
  background: var(--alert-bg) !important;
  color: var(--alert-text) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  opacity: 1 !important;
}

:deep(.custom-alert button.alert-button.role-cancel) {
  background: #ef4444 !important;
  color: #fff !important;
}

:deep(.custom-alert button.alert-button:not(.role-cancel)) {
  background: #3b82f6 !important;
  color: #fff !important;
}

:root {
  --alert-bg: #ffffff;
  --alert-text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --alert-bg: #2a2a2a;
    --alert-text: #f5f5f5;
  }
}
</style>
