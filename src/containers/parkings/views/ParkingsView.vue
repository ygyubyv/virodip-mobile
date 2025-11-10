<template>
  <base-layout page-title="My parkings" page-default-back-link="/">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-card>
            <ion-list lines="none">
              <ion-item>
                <ion-input
                  v-model="selectedName"
                  :placeholder="$t('forms.fields.parking_name.placeholder')"
                  fill="outline"
                  label-placement="stacked"
                  class="ion-margin-bottom"
                />
              </ion-item>

              <ion-item>
                <ion-select
                  interface="popover"
                  slot="end"
                  v-model="selectedOption"
                  :placeholder="$t('common.filter_by')"
                >
                  <ion-select-option
                    v-for="option in filterOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </ion-select-option>
                </ion-select>
              </ion-item>

              <div class="map-container ion-padding" v-if="mapIsVisible">
                <Map
                  v-if="coordinates"
                  ref="mapComponent"
                  :coordinates="coordinates"
                  :center="mapCenter"
                  :parkings="currentParking ? [currentParking] : []"
                />
                <div
                  v-else
                  class="flex items-center justify-center h-[300px] bg-gray-50 text-gray-500 rounded-lg text-center"
                >
                  {{ $t("views.parkings.map_placeholder") }}
                </div>
              </div>

              <template v-if="filteredBookings.length">
                <book-card
                  v-for="booking in filteredBookings"
                  :key="booking.id"
                  :booking="booking"
                  @show-parking-on-map="showParkingOnMap"
                >
                </book-card>
              </template>

              <ion-item v-else>
                <ion-label class="ion-text-center">
                  {{ $t("views.parkings.not_found") }}
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonList,
  IonLabel,
} from "@ionic/vue";
import { onMounted, ref, computed, useTemplateRef } from "vue";
import BaseLayout from "@/components/Base/BaseLayout.vue";
import { useMap } from "@/composables/useMap";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import type { Parking } from "@/types";
import Map from "@/components/Map.vue";
import BookCard from "../components/BookCard.vue";

const { coordinates } = useMap();
const { t } = useI18n();

const userStore = useUserStore();
const { setUserBookings } = userStore;
const { user } = storeToRefs(userStore);

const filterOptions: Array<{ label: string; value: string }> = [
  { label: t("selects.all"), value: "all" },
  { label: t("selects.finished"), value: "finished" },
  { label: t("selects.active"), value: "active" },
];

const mapComponent = useTemplateRef("mapComponent");
const mapIsVisible = ref(false);
const selectedName = ref("");
const selectedOption = ref<string>(filterOptions[0].value);
const currentParking = ref<Parking | null>(null);

const mapCenter = computed(() => {
  return currentParking.value?.coordinates ?? coordinates.value!;
});

const filteredBookings = computed(() => {
  if (!user.value?.bookings || !user.value.bookings.length) {
    return [];
  }

  let bookings = user.value!.bookings.slice();

  if (selectedName.value) {
    bookings = bookings.filter((booking) =>
      booking.parkingObj?.name
        .toUpperCase()
        .includes(selectedName.value.toUpperCase())
    );
  }

  switch (selectedOption.value) {
    case "all":
      bookings = bookings;
      break;

    case "finished":
      bookings = bookings.filter((booking) => booking.status === "completed");
      break;

    case "active":
      bookings = bookings.filter((booking) => booking.status === "active");
      break;
  }

  return bookings;
});

const showParkingOnMap = (parking: Parking) => {
  mapComponent.value?.clearDestination();
  currentParking.value = parking;
  mapIsVisible.value = true;
};

onMounted(() => {
  setUserBookings();
});
</script>

<style scoped>
.map-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--ion-color-step-150);
  aspect-ratio: 3 / 2;
}

:host-context(.ion-palette-dark) {
  ion-card {
    background: var(--ion-color-step-100);
  }
  ion-item {
    --background: var(--ion-color-step-100);
  }
}
</style>
