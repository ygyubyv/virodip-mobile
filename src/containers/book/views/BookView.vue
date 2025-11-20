<template>
  <base-layout :page-title="$t('routes.reserve')">
    <AddCarModal
      v-if="addCarModalIsVisible"
      :is-open="addCarModalIsVisible"
      @close="addCarModalIsVisible = false"
    />

    <BookModal
      :user="user!"
      v-if="bookModalIsVisible"
      :is-open="bookModalIsVisible"
      :parking="bookedParking!"
      @submit="handleSubmit"
      @add-car="handleAddCar"
      @close="bookModalIsVisible = false"
    />

    <div
      class="flex-1 rounded-xl overflow-hidden border border-gray-200 h-[80%] ion-margin"
    >
      <Map v-if="coordinates" :coordinates="coordinates" :parkings="parkings" />

      <div
        v-else
        class="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 text-center p-4"
      >
        <p class="max-w-md mx-auto">
          {{ $t("map.location_access") }}
        </p>
      </div>
    </div>

    <ion-card class="rounded-xl">
      <ion-card-header class="pb-0">
        <ion-toolbar>
          <ion-title class="ion-text-start">
            {{ $t("parkings.nearby_parkings") }}
          </ion-title>

          <ion-buttons slot="end">
            <ion-select
              v-model="selectedOption"
              interface="popover"
              :placeholder="$t('selects.labels.sort_by')"
            >
              <ion-select-option value="distance">
                {{ $t("selects.distance") }}
              </ion-select-option>

              <ion-select-option value="spots">
                {{ $t("selects.available_spots") }}
              </ion-select-option>
            </ion-select>
          </ion-buttons>
        </ion-toolbar>
      </ion-card-header>

      <ion-card-content>
        <ion-list class="pt-0">
          <ParkingCard
            v-for="parking in filteredParkings"
            :key="parking.id"
            :parking="parking"
            :coordinates="coordinates"
            @on-book="handleBook"
          />
        </ion-list>
      </ion-card-content>
    </ion-card>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/Base/BaseLayout.vue";
import Map from "@/components/Map.vue";
import { useMap } from "@/composables/useMap";
import { calculateDistance } from "@/utils";
import { computed, onMounted, ref } from "vue";
import BookModal from "../components/BookModal.vue";
import ParkingCard from "../components/ParkingCard.vue";
import AddCarModal from "@/components/Modals/AddCarModal.vue";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonToolbar,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/vue";
import { BookForm, Parking } from "@/types";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useParkingsStore } from "@/stores/parkings";
import { createBooking } from "@/services/bookings";
import { useNotification } from "@/composables/useNotification";
import { useI18n } from "vue-i18n";

const { coordinates } = useMap();
const { showNotification } = useNotification();
const { t } = useI18n();

const parkingsStore = useParkingsStore();
const { setParkings } = parkingsStore;
const { parkings } = storeToRefs(parkingsStore);

const authStore = useAuthStore();
const { isAuthenticated, authModalIsVisible } = storeToRefs(authStore);

const userStore = useUserStore();
const { setUserCars } = userStore;
const { user } = storeToRefs(userStore);

// Modals
const addCarModalIsVisible = ref(false);
const bookModalIsVisible = ref(false);

const selectedOption = ref<"distance" | "spots">("distance");
const bookedParking = ref<Parking | null>(null);

const filteredParkings = computed(() => {
  if (!coordinates.value) return parkings.value;

  switch (selectedOption.value) {
    case "distance":
      return parkings.value
        .slice()
        .sort(
          (a, b) =>
            calculateDistance(
              coordinates.value!.lat,
              coordinates.value!.lng,
              a.coordinates.lat,
              a.coordinates.lng
            ) -
            calculateDistance(
              coordinates.value!.lat,
              coordinates.value!.lng,
              b.coordinates.lat,
              b.coordinates.lng
            )
        );

    case "spots":
      return parkings.value
        .slice()
        .sort((a, b) => b.availableSpots - a.availableSpots);

    default:
      return parkings.value;
  }
});

const handleAddCar = () => {
  bookModalIsVisible.value = false;
  addCarModalIsVisible.value = true;
};

const handleBook = async (id: string) => {
  if (!isAuthenticated.value || !user.value) {
    authModalIsVisible.value = true;
    return;
  }

  await setUserCars();

  const targetParking = parkings.value.find((parking) => parking.id === id)!;
  bookedParking.value = targetParking;
  bookModalIsVisible.value = true;
};

const handleSubmit = async (form: BookForm) => {
  try {
    const status = await createBooking(form);

    if (status !== 201) {
      throw new Error("Failed create booking");
    }

    showNotification(
      "success",
      t("toasts.success.created", {
        entity: t("common.booking"),
      })
    );

    bookModalIsVisible.value = false;
  } catch (error) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.create"),
        entity: t("common.booking"),
      })
    );

    console.error(error);
  }
};

onMounted(() => {
  setParkings();
});
</script>
