<template>
  <base-layout page-title="Book Parking">
    <BookModal
      :user="DEFAULT_USER"
      :is-open="bookModalIsVisible"
      :parking="bookedParking!"
      @confirm="handleSubmit"
      @cancel="bookModalIsVisible = false"
    />

    <div
      class="flex-1 rounded-xl overflow-hidden border border-gray-200 h-[80%] ion-margin"
    >
      <Map v-if="coordinates" :coordinates="coordinates" :parkings="parkings" />

      <div
        v-else
        class="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 text-center p-4"
      >
        <p class="max-w-md mx-auto">Access</p>
      </div>
    </div>

    <ion-card class="rounded-xl">
      <ion-card-header class="pb-0">
        <ion-toolbar>
          <ion-title class="ion-text-start"> Nearby parkings </ion-title>

          <ion-buttons slot="end">
            <ion-select
              v-model="selectedOption"
              interface="popover"
              placeholder="Sort By"
            >
              <ion-select-option value="distance">Distance</ion-select-option>
              <ion-select-option value="spots"
                >Available spots</ion-select-option
              >
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
import { parkings } from "@/constants";
import { calculateDistance } from "@/utils";
import { computed, ref } from "vue";
import { DEFAULT_USER } from "@/constants";
import BookModal from "../components/BookModal.vue";
import ParkingCard from "../components/ParkingCard.vue";

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
import { Parking } from "@/types";

const { coordinates } = useMap();

const selectedOption = ref<"distance" | "spots">("distance");
const bookModalIsVisible = ref(false);
const bookedParking = ref<Parking | null>(null);

const filteredParkings = computed(() => {
  if (!coordinates.value) return parkings;

  switch (selectedOption.value) {
    case "distance":
      return parkings
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
      return parkings
        .slice()
        .sort((a, b) => b.availableSpots - a.availableSpots);

    default:
      return parkings;
  }
});

const handleBook = (id: string) => {
  // if (!isAuthenticated.value || !user.value) {
  //   authModalIsVisible.value = true;
  //   return;
  // }

  const targetParking = parkings.find((parking) => parking.id === id)!;
  bookedParking.value = targetParking;
  bookModalIsVisible.value = true;
};

const handleSubmit = (form: any) => {
  console.log(form);
};
</script>
