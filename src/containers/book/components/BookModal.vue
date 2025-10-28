<template>
  <ion-modal
    :is-open="isOpen"
    @did-dismiss="emit('close')"
    :initial-breakpoint="1"
    :breakpoints="[0, 0.25, 0.45, 0.5, 1]"
  >
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="emit('close')">Cancel</ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center text-white">Book Parking</ion-title>
        <ion-buttons slot="end">
          <ion-button
            color="primary"
            @click="onSubmit"
            :strong="true"
            :disabled="!meta.valid"
          >
            Confirm
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding bg-[#121212]">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-white">Parking Info</h2>

        <div class="flex justify-between text-sm">
          <p class="font-medium text-gray-200">Station: {{ parking.name }}</p>
          <p class="text-gray-400">
            Available Spots: {{ parking.availableSpots }}
          </p>
        </div>

        <!-- Start -->
        <ion-item
          lines="none"
          class="rounded-xl bg-[#1e1e1e]"
          :class="{ 'ion-invalid': errors.start }"
        >
          <ion-label position="stacked" class="text-white">Start</ion-label>
          <ion-input
            v-model="start"
            v-bind="startAttrs"
            type="datetime-local"
            class="text-gray-300"
          />
        </ion-item>
        <p v-if="errors.start" class="text-red-500 text-sm mt-1 ml-1">
          {{ errors.start }}
        </p>
        <!-- !Start -->

        <!-- End -->
        <ion-item
          lines="none"
          class="rounded-xl bg-[#1e1e1e]"
          :class="{ 'ion-invalid': errors.end }"
        >
          <ion-label position="stacked" class="text-white">End</ion-label>
          <ion-input
            v-model="end"
            v-bind="endAttrs"
            type="datetime-local"
            class="text-gray-300"
          />
        </ion-item>
        <p v-if="errors.end" class="text-red-500 text-sm mt-1 ml-1">
          {{ errors.end }}
        </p>
        <!-- !End -->

        <!-- Car -->
        <ion-item lines="none" class="rounded-xl bg-[#1e1e1e]">
          <ion-label position="stacked" class="text-white"
            >Select Car</ion-label
          >
          <ion-select
            v-model="selectedCarId"
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
        <!-- !Car -->

        <!-- Add Car -->
        <div
          class="flex items-center gap-1 cursor-pointer hover:underline text-sm text-white justify-end"
          @click="emit('addCar')"
        >
          <ion-icon :icon="addCircleOutline" />

          <span>Add Car</span>
        </div>
        <!-- !Add Car -->
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
  IonIcon,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import type { BookForm, Parking, User } from "@/types";
import { useValidateBookModal } from "../composables/useValidateBookModal";

const props = defineProps<{
  isOpen: boolean;
  user: User;
  parking: Parking;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "addCar"): void;
  (e: "submit", data: BookForm): void;
}>();

const {
  meta,
  start,
  startAttrs,
  end,
  endAttrs,
  errors,
  handleSubmit,
  resetForm,
} = useValidateBookModal();

const carOptions = props.user.cars.map((car) => ({
  label: `${car.brand} ${car.model}`,
  value: car,
}));

const selectedCarId = ref(carOptions[0].value.id);

const onSubmit = handleSubmit((values) => {
  emit("submit", {
    userId: props.user.id,
    parkingId: props.parking.id,
    start: start.value,
    end: end.value,
    carId: selectedCarId.value,
  });

  emit("close");
  resetForm();
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
  transition: border 0.2s;
}

.ion-invalid {
  border: 1px solid #ef4444;
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
