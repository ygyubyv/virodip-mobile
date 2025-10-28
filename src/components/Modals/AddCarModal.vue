<template>
  <ion-modal :is-open="isOpen" @did-dismiss="close">
    <!-- Toolbar -->
    <ion-header>
      <ion-toolbar class="bg-[#1e1e1e]">
        <ion-buttons slot="start">
          <ion-button color="danger" @click="close">Cancel</ion-button>
        </ion-buttons>

        <ion-title class="ion-text-center text-white">Add Car</ion-title>

        <ion-buttons slot="end">
          <ion-button color="primary" :disabled="!meta.valid" @click="submit">
            Submit
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding bg-[#1e1e1e]">
      <div class="flex flex-col gap-3">
        <ion-item lines="none" class="rounded-xl bg-[#2a2a2a]">
          <ion-label position="stacked" class="text-white">Number</ion-label>
          <ion-input
            v-bind="numberAttrs"
            v-model="number"
            placeholder="Enter number"
          />
        </ion-item>
        <p v-if="errors.number" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.number }}
        </p>

        <ion-item lines="none" class="rounded-xl bg-[#2a2a2a]">
          <ion-label position="stacked" class="text-white">Brand</ion-label>
          <ion-input
            v-bind="brandAttrs"
            v-model="brand"
            placeholder="Enter brand"
          />
        </ion-item>
        <p v-if="errors.brand" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.brand }}
        </p>

        <ion-item lines="none" class="rounded-xl bg-[#2a2a2a]">
          <ion-label position="stacked" class="text-white">Model</ion-label>
          <ion-input
            v-bind="modelAttrs"
            v-model="model"
            placeholder="Enter model"
          />
        </ion-item>
        <p v-if="errors.model" class="text-red-500 text-sm ml-1 -mt-1 mb-0">
          {{ errors.model }}
        </p>

        <ion-item lines="none" class="rounded-xl bg-[#2a2a2a]">
          <ion-label position="stacked" class="text-white">Color</ion-label>
          <ion-input
            v-bind="colorAttrs"
            v-model="color"
            placeholder="Enter color"
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
  try {
    await createUserCar(user.value!.id, {
      number: values.number,
      brand: values.brand,
      model: values.model,
      color: values.color,
    });

    setUserCars(true);
    resetForm();
    close();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
ion-modal::part(content) {
  background-color: #1e1e1e;
  border-radius: 12px;
  max-width: 400px;
  margin: auto;
}
ion-item {
  --highlight-background: transparent;
}
</style>
