<template>
  <ion-card class="ion-margin-top">
    <ion-card-header>
      <ion-card-title>
        {{ booking.parkingObj?.name }}
      </ion-card-title>
      <ion-card-subtitle>
        {{ booking.parkingObj?.address }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-text color="medium">
        {{ formatDate(booking.start) }} –
        {{ formatDate(booking.end) }}
      </ion-text>

      <div class="ion-margin-top">
        <ion-text>
          {{ $t("common.status") }}:
          <b>
            {{
              booking.status === "active"
                ? $t("status.active")
                : $t("status.completed")
            }}
          </b>
        </ion-text>
      </div>

      <div
        class="ion-text-right ion-margin-top"
        v-if="booking.status === 'active'"
      >
        <ion-button
          fill="solid"
          color="primary"
          size="small"
          @click="emit('showParkingOnMap', booking.parkingObj!)"
        >
          <ion-icon slot="start" :icon="locationOutline" />
          {{ $t("buttons.show_on_map") }}
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { locationOutline } from "ionicons/icons";
import type { Parking, Booking } from "@/types";
import { formatDate } from "@/utils/date/formatDate";

interface Props {
  booking: Booking;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "showParkingOnMap", parking: Parking): void;
}>();
</script>
