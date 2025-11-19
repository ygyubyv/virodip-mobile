<template>
  <ion-modal :is-open="isOpen" @did-dismiss="close">
    <ion-header>
      <ion-toolbar class="toolbar-bg">
        <ion-buttons slot="start">
          <ion-button color="medium" @click="close">Cancel</ion-button>
        </ion-buttons>

        <ion-title class="ion-text-center title-color"> Edit Car </ion-title>

        <ion-buttons slot="end">
          <ion-button color="primary" :disabled="!meta.valid" @click="submit">
            Save
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
          <ion-label position="stacked">Number</ion-label>
          <ion-input v-bind="numberAttrs" v-model="number" />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.brand }"
        >
          <ion-label position="stacked">Brand</ion-label>
          <ion-input v-bind="brandAttrs" v-model="brand" />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.model }"
        >
          <ion-label position="stacked">Model</ion-label>
          <ion-input v-bind="modelAttrs" v-model="model" />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.color }"
        >
          <ion-label position="stacked">Color</ion-label>
          <ion-input v-bind="colorAttrs" v-model="color" />
        </ion-item>
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
import type { Car } from "@/types";

const props = defineProps<{
  isOpen: boolean;
  car: Car;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", car: Car): void;
}>();

const close = () => emit("close");

const {
  meta,
  number,
  brand,
  model,
  color,
  numberAttrs,
  brandAttrs,
  modelAttrs,
  colorAttrs,
  errors,
  handleSubmit,
} = useValidateCar(props.car);

const submit = handleSubmit((values) => {
  emit("save", {
    ...props.car,
    ...values,
  });
});
</script>

<style scoped>
ion-modal::part(content) {
  background-color: var(--modal-bg);
  border-radius: 12px;
  max-width: 400px;
  margin: auto;
}
.toolbar-bg {
  background-color: var(--modal-toolbar-bg);
}
.content-bg {
  background-color: var(--modal-bg);
}
.input-bg {
  background-color: var(--modal-input-bg);
  border: 1px solid var(--modal-input-border);
}
.ion-invalid {
  border-color: #ef4444;
}
</style>
