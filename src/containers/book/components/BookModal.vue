<template>
  <ion-modal
    :is-open="isOpen"
    @did-dismiss="emit('close')"
    :initial-breakpoint="1"
    :breakpoints="[0, 0.25, 0.45, 0.5, 1]"
  >
    <ion-header>
      <ion-toolbar class="toolbar-bg">
        <ion-buttons slot="start">
          <ion-button color="danger" @click="emit('close')">
            {{ $t("buttons.cancel") }}
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button
            color="primary"
            @click="onSubmit"
            :strong="true"
            :disabled="!meta.valid"
          >
            {{ $t("buttons.confirm") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding content-bg">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold title-color text-center">
          {{ $t("modals.book_parking.title") }}
        </h2>

        <div class="flex justify-between text-sm">
          <p class="font-medium text-color-step-600">
            {{ $t("common.station") }}: {{ parking.name }}
          </p>
          <p class="text-color-step-400">
            {{ $t("parkings.available_spots") }}: {{ parking.availableSpots }}
          </p>
        </div>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.start }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.start_time.label") }}
          </ion-label>
          <ion-input
            v-model="start"
            v-bind="startAttrs"
            type="datetime-local"
            class="text-input-color"
            :placeholder="$t('forms.fields.start_time.placeholder')"
          />
        </ion-item>
        <p v-if="errors.start" class="text-red-500 text-sm mt-1 ml-1">
          {{ errors.start }}
        </p>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.end }"
        >
          <ion-label position="stacked" class="text-color">
            {{ $t("forms.fields.end_time.label") }}
          </ion-label>
          <ion-input
            v-model="end"
            v-bind="endAttrs"
            type="datetime-local"
            class="text-input-color"
            :placeholder="$t('forms.fields.end_time.placeholder')"
          />
        </ion-item>
        <p v-if="errors.end" class="text-red-500 text-sm mt-1 ml-1">
          {{ errors.end }}
        </p>

        <ion-item lines="none" class="rounded-xl input-bg">
          <ion-label position="stacked" class="text-color">
            {{ $t("selects.labels.select_car") }}
          </ion-label>

          <ion-select
            v-model="selectedCarId"
            interface="popover"
            :placeholder="$t('selects.labels.select_car')"
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

        <div
          class="flex items-center gap-1 cursor-pointer hover:underline text-sm add-car-text justify-end"
          @click="emit('addCar')"
        >
          <ion-icon :icon="addCircleOutline" />
          <span>{{ $t("buttons.add_car") }}</span>
        </div>
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

const selectedCarId = ref(carOptions[0]?.value.id ?? null);

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
ion-modal::part(content) {
  background-color: var(--modal-bg);
  transition: background-color 0.3s ease, color 0.3s ease;
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
.text-color-step-600 {
  color: var(--modal-text-color-step-600);
}
.text-color-step-400 {
  color: var(--modal-text-color-step-400);
}

.text-input-color {
  color: var(--modal-input-text-color);
}

.add-car-text {
  color: var(--modal-text-color);
}

.ion-invalid {
  border: 1px solid #ef4444;
}

.custom-select::part(text) {
  color: var(--modal-input-text-color);
}
.custom-select::part(icon) {
  color: var(--modal-input-text-color);
}

.input-bg {
  background-color: var(--modal-input-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--modal-input-border, transparent);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

:root {
  --modal-bg: var(--ion-color-light);
  --modal-toolbar-bg: var(--ion-color-light);
  --modal-input-bg: var(--ion-color-step-100);
  --modal-input-border: #e5e7eb;
  --modal-text-color: var(--ion-color-dark);
  --modal-text-color-step-600: var(--ion-color-medium);
  --modal-text-color-step-400: var(--ion-color-step-400);
  --modal-input-text-color: var(--ion-color-dark);
  --modal-title-color: var(--ion-color-dark);
}

@media (prefers-color-scheme: dark) {
  :root {
    --modal-bg: var(--ion-color-dark);
    --modal-toolbar-bg: var(--ion-color-dark);
    --modal-input-bg: #1e1e1e;
    --modal-input-border: #2e2e2e;
    --modal-text-color: var(--ion-color-light);
    --modal-text-color-step-600: var(--ion-color-step-400);
    --modal-text-color-step-400: var(--ion-color-step-200);
    --modal-input-text-color: var(--ion-color-light);
    --modal-title-color: var(--ion-color-light);
  }
}
</style>
