<template>
  <ion-card class="p-4 rounded-lg flex flex-col gap-2.5">
    <h3 class="!text-[18px] font-medium">
      {{ parking.name }}
    </h3>

    <div v-if="coordinates" class="flex justify-between text-sm">
      <span>Distance:</span>
      <span>
        {{
          formatDistance(
            calculateDistance(
              coordinates.lat,
              coordinates.lng,
              parking.coordinates.lat,
              parking.coordinates.lng
            )
          )
        }}
      </span>
    </div>

    <div class="flex justify-between text-sm">
      <span>Available Spots:</span>
      <span>{{ parking.availableSpots }}</span>
    </div>

    <div class="flex justify-between text-sm">
      <span>Address:</span>
      <span class="text-right max-w-[160px]">{{ parking.address }}</span>
    </div>

    <div class="flex justify-end mt-2">
      <ion-button
        size="small"
        color="primary"
        fill="solid"
        @click="() => emit('onBook', parking.id)"
      >
        <ion-icon :icon="addCircleOutline" slot="start" />
        Book
      </ion-button>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonButton, IonIcon } from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import { calculateDistance, formatDistance } from "@/utils";
import type { Parking, Coordinates } from "@/types";

interface Props {
  parking: Parking;
  coordinates: Coordinates | null;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onBook", id: string): void;
}>();
</script>

<style scoped>
ion-card {
  transition: background-color 0.3s ease, color 0.3s ease;
  color: #111111 !important;
}

ion-card h3,
ion-card p,
ion-card span {
  color: #111111 !important;
}

@media (prefers-color-scheme: dark) {
  ion-card {
    color: #f1f1f1 !important;
  }

  ion-card h3,
  ion-card p,
  ion-card span {
    color: #f1f1f1 !important;
  }
}
</style>
