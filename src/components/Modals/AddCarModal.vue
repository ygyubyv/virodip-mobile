<template>
  <ion-modal :is-open="isOpen" @did-dismiss="close">
    <ion-header>
      <ion-toolbar class="toolbar-bg">
        <ion-buttons slot="start">
          <ion-button color="danger" @click="close">
            {{ $t("buttons.cancel") }}
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button color="primary" :disabled="!meta.valid" @click="submit">
            {{ $t("modals.add_car.submit_text") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding content-bg">
      <div class="flex flex-col gap-3">
        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.number }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.number.label") }}
          </ion-label>

          <ion-input
            v-bind="numberAttrs"
            v-model="number"
            :placeholder="$t('forms.fields.number.placeholder')"
          />
        </ion-item>

        <p v-if="errors.number" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.number }}
        </p>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.brand }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.brand.label") }}
          </ion-label>

          <ion-input
            v-bind="brandAttrs"
            v-model="brand"
            :placeholder="$t('forms.fields.brand.placeholder')"
          />
        </ion-item>

        <p v-if="errors.brand" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.brand }}
        </p>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.model }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.model.label") }}
          </ion-label>

          <ion-input
            v-bind="modelAttrs"
            v-model="model"
            :placeholder="$t('forms.fields.model.placeholder')"
          />
        </ion-item>

        <p v-if="errors.model" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.model }}
        </p>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.color }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.color.label") }}
          </ion-label>

          <ion-input
            v-bind="colorAttrs"
            v-model="color"
            :placeholder="$t('forms.fields.color.placeholder')"
          />
        </ion-item>

        <p v-if="errors.color" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.color }}
        </p>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { useValidateCar } from "@/composables/useValidateCar";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { createUserCar } from "@/services/user";

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();

const userStore = useUserStore();
const { setUserCars } = userStore;
const { user } = storeToRefs(userStore);

const {
  meta,
  number,
  numberAttrs,
  brand,
  brandAttrs,
  model,
  modelAttrs,
  color,
  colorAttrs,
  errors,
  handleSubmit,
  resetForm,
} = useValidateCar();

const close = () => emit("close");

const submit = handleSubmit(async (values) => {
  await createUserCar(user.value!.id, {
    number: values.number,
    brand: values.brand,
    model: values.model,
    color: values.color,
  });

  setUserCars(true);
  resetForm();
  close();
});
</script>

<style scoped>
ion-modal::part(content) {
  background-color: var(--modal-bg);
  border-radius: 12px;
  max-width: 400px;
  margin: auto;
  transition: background-color 0.3s ease;
}

.toolbar-bg {
  background-color: var(--modal-toolbar-bg);
}

.title-color {
  color: var(--modal-title-color);
}

.content-bg {
  background-color: var(--modal-bg);
}

.text-color {
  color: var(--modal-text-color);
}

.input-bg {
  background-color: var(--modal-input-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--modal-input-border);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.ion-invalid {
  border: 1px solid #ef4444;
}

:root {
  --modal-bg: var(--ion-color-light);
  --modal-toolbar-bg: var(--ion-color-light);
  --modal-input-bg: var(--ion-color-step-100);
  --modal-input-border: #e5e7eb;
  --modal-text-color: var(--ion-color-dark);
  --modal-title-color: var(--ion-color-dark);
}

@media (prefers-color-scheme: dark) {
  :root {
    --modal-bg: var(--ion-color-dark);
    --modal-toolbar-bg: var(--ion-color-dark);
    --modal-input-bg: #2a2a2a;
    --modal-input-border: #3a3a3a;
    --modal-text-color: var(--ion-color-light);
    --modal-title-color: var(--ion-color-light);
  }
}
</style>
