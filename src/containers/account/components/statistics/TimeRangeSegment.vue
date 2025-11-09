<template>
  <ion-segment v-model="selectedTab" class="ion-margin-bottom">
    <ion-segment-button value="month">
      <ion-label>{{ $t("tabs.labels.this_month") }}</ion-label>
    </ion-segment-button>
    <ion-segment-button value="quarter">
      <ion-label>{{ $t("tabs.labels.this_quarter") }}</ion-label>
    </ion-segment-button>
    <ion-segment-button value="year">
      <ion-label>{{ $t("tabs.labels.this_year") }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";

const selectedTab = defineModel<"month" | "quarter" | "year">();
</script>
