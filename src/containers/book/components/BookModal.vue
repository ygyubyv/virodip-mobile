<template>
  <ion-modal
    :is-open="isOpen"
    @did-dismiss="emit('cancel')"
    :initial-breakpoint="0.45"
    :breakpoints="[0, 0.25, 0.45, 0.5, 0.75]"
  >
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="emit('cancel')">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center text-white">Book Parking</ion-title>
        <ion-buttons slot="end">
          <ion-button
            color="primary"
            @click="emit('confirm', formData)"
            :strong="true"
          >
            Confirm
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding bg-[#121212]">
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-white">Parking Info</h2>

        <div class="flex justify-between text-sm">
          <p class="font-medium text-gray-200">Station: {{ parking.name }}</p>
          <p class="text-gray-400">
            Available Spots: {{ parking.availableSpots }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
            <ion-label position="stacked" class="text-white"
              >Start Date</ion-label
            >
            <ion-input
              v-model="formData.startDate"
              type="date"
              class="text-gray-300"
            />
          </ion-item>

          <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
            <ion-label position="stacked" class="text-white"
              >Start Time</ion-label
            >
            <ion-input
              v-model="formData.startTime"
              type="time"
              class="text-gray-300"
            />
          </ion-item>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
            <ion-label position="stacked" class="text-white"
              >End Date</ion-label
            >
            <ion-input
              v-model="formData.endDate"
              type="date"
              class="text-gray-300"
            />
          </ion-item>

          <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
            <ion-label position="stacked" class="text-white"
              >End Time</ion-label
            >
            <ion-input
              v-model="formData.endTime"
              type="time"
              class="text-gray-300"
            />
          </ion-item>
        </div>

        <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
          <ion-label position="stacked" class="text-white"
            >Select Car</ion-label
          >
          <ion-select
            v-model="formData.selectedCar"
            interface="popover"
            placeholder="Select a car"
            class="custom-select"
          >
            <ion-select-option
              v-for="car in carOptions"
              :key="car.value.id"
              :value="car.value.id"
            >
              {{ car.label }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import type { User } from "@/types";

interface Parking {
  name: string;
  availableSpots: number;
}

const props = defineProps<{
  isOpen: boolean;
  user: User;
  parking: Parking;
}>();

const emit = defineEmits<{
  (e: "confirm", data: any): void;
  (e: "cancel"): void;
}>();

const carOptions = props.user.cars.map((car) => ({
  label: `${car.brand} ${car.model}`,
  value: car,
}));

const formData = ref({
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  selectedCar: carOptions[0]?.value || "",
});
</script>

<style scoped>
ion-input {
  color: #b3b3b3;
}

ion-label {
  font-weight: 500;
  font-size: 0.9rem;
}

ion-item {
  --highlight-background: transparent;
}

ion-modal::part(content) {
  background-color: #121212;
}

.custom-select::part(text) {
  color: #b3b3b3;
}

.custom-select::part(icon) {
  color: white;
}
</style>
