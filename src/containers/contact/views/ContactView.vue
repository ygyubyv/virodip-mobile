<template>
  <base-layout page-title="Contact" page-default-back-link="/">
    <div class="flex justify-center">
      <ion-card class="w-full max-w-md p-2 rounded-xl space-y-6 card-bg">
        <div class="text-center">
          <h1 class="text-2xl font-bold title-color">
            {{ $t("views.contact.title") }}
          </h1>
          <p class="text-color-step-400 mt-2 text-sm">
            {{ $t("views.contact.description") }}
          </p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-3">
          <ion-item
            lines="none"
            class="rounded-xl input-bg"
            :class="{ 'ion-invalid': errors.fullName }"
          >
            <ion-label position="stacked" class="text-color">
              {{ $t("forms.fields.full_name.label") }}
            </ion-label>
            <ion-input
              v-model="fullName"
              v-bind="fullNameAttrs"
              type="text"
              :placeholder="$t('forms.fields.full_name.placeholder')"
              class="text-input-color"
            />
          </ion-item>
          <p v-if="errors.fullName" class="text-red-500 text-sm mt-1 ml-1">
            {{ errors.fullName }}
          </p>

          <ion-item
            lines="none"
            class="rounded-xl input-bg"
            :class="{ 'ion-invalid': errors.email }"
          >
            <ion-label position="stacked" class="text-color">
              {{ $t("forms.fields.email.label") }}
            </ion-label>
            <ion-input
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              :placeholder="$t('forms.fields.email.placeholder')"
              class="text-input-color"
            />
          </ion-item>
          <p v-if="errors.email" class="text-red-500 text-sm -mt-2 ml-1">
            {{ errors.email }}
          </p>

          <ion-item
            lines="none"
            class="rounded-xl input-bg"
            :class="{ 'ion-invalid': errors.message }"
          >
            <ion-label position="stacked" class="text-color">
              {{ $t("forms.fields.message.label") }}
            </ion-label>
            <ion-textarea
              v-model="message"
              v-bind="messageAttrs"
              auto-grow
              :placeholder="$t('forms.fields.message.placeholder')"
              class="text-input-color"
            />
          </ion-item>
          <p v-if="errors.message" class="text-red-500 text-sm -mt-2 ml-1">
            {{ errors.message }}
          </p>

          <div class="flex justify-end gap-2.5 pt-2">
            <ion-button color="medium" @click="resetForm">
              <ion-icon slot="start" :icon="closeCircleOutline" />
              {{ $t("buttons.clear") }}
            </ion-button>
            <ion-button type="submit" :disabled="!meta.valid">
              <ion-icon slot="start" :icon="paperPlaneOutline" />
              {{ $t("buttons.send") }}
            </ion-button>
          </div>
        </form>
      </ion-card>
    </div>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/Base/BaseLayout.vue";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonCard,
  IonIcon,
} from "@ionic/vue";
import { closeCircleOutline, paperPlaneOutline } from "ionicons/icons";
import { useValidateContactForm } from "../composables/useValidateContactForm";

const {
  meta,
  errors,
  fullName,
  fullNameAttrs,
  email,
  emailAttrs,
  message,
  messageAttrs,
  handleSubmit,
  resetForm,
} = useValidateContactForm();

const onSubmit = handleSubmit((values) => {
  console.log("Contact form:", values);
});
</script>

<style scoped>
.card-bg {
  background-color: var(--modal-bg);
  color: var(--modal-text-color);
}

.input-bg {
  background-color: var(--modal-input-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--modal-input-border, transparent);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
}

.text-color {
  color: var(--modal-text-color);
}
.text-input-color {
  color: var(--modal-input-text-color);
}
.title-color {
  color: var(--modal-title-color);
}
.text-color-step-400 {
  color: var(--modal-text-color-step-400);
}

.ion-invalid {
  border: 1px solid #ef4444;
}

:root {
  --modal-bg: var(--ion-color-light);
  --modal-input-bg: var(--ion-color-step-100);
  --modal-input-border: #e5e7eb;
  --modal-text-color: var(--ion-color-dark);
  --modal-input-text-color: var(--ion-color-dark);
  --modal-title-color: var(--ion-color-dark);
  --modal-text-color-step-400: var(--ion-color-step-400);
}

@media (prefers-color-scheme: dark) {
  :root {
    --modal-bg: var(--ion-color-dark);
    --modal-input-bg: #1e1e1e;
    --modal-input-border: #2e2e2e;
    --modal-text-color: var(--ion-color-light);
    --modal-input-text-color: var(--ion-color-light);
    --modal-title-color: var(--ion-color-light);
    --modal-text-color-step-400: var(--ion-color-step-200);
  }
}
</style>
