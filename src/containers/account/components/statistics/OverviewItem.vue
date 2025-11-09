<template>
  <ion-col size="6" size-md="3" class="ion-text-center">
    <div>
      <ion-icon :icon="icon" class="text-2xl mb-1" />
      <p class="text-sm text-gray-500">{{ text }}</p>
      <p class="text-lg font-bold text-black">{{ value }}</p>
    </div>
  </ion-col>
</template>

<script setup lang="ts">
import { IonCol, IonIcon } from "@ionic/vue";
interface Props {
  icon: string;
  text: string;
  value: number | string;
}

defineProps<Props>();
</script>
