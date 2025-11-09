<template>
  <ion-page>
    <ion-content>
      <ion-label
        class="text-2xl font-bold ion-text-center block ion-margin-bottom ion-margin-top"
      >
        {{ $t("views.account.statistics.title") }}
      </ion-label>

      <time-range-segment v-model="selectedTab"></time-range-segment>

      <overview :transactions-metadata="transactionsMetadata"></overview>

      <ion-card v-if="user!.transactions?.length">
        <ion-card-header>
          <ion-card-title>
            {{ $t("views.account.statistics.transactions.spending_trend") }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <Chart
            :transactions="filterChartData"
            :label="$t('views.account.statistics.transactions.spent')"
          />
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import Overview from "../components/statistics/Overview.vue";
import TimeRangeSegment from "../components/statistics/TimeRangeSegment.vue";
import { ref, computed, onMounted } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
} from "@ionic/vue";
import Chart from "../components/statistics/Chart.vue";
import { getTimeBoundaries, timeUnitsInMs } from "@/utils";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { setUserTransactions } = userStore;
const { user } = storeToRefs(userStore);

const { monthAgo, yearAgo } = getTimeBoundaries();
const { month } = timeUnitsInMs();

const selectedTab = ref<"month" | "quarter" | "year">("month");

const filterChartData = computed(() => {
  if (!user.value?.transactions?.length) return [];

  switch (selectedTab.value) {
    case "month":
      return user.value.transactions.filter(
        (t) => new Date(t.date).getTime() > monthAgo
      );
    case "quarter":
      return user.value.transactions.filter(
        (t) => new Date(t.date).getTime() > Date.now() - 3 * month
      );
    case "year":
      return user.value.transactions.filter(
        (t) => new Date(t.date).getTime() > yearAgo
      );
  }
});

const transactionsMetadata = computed(() => ({
  total: filterChartData.value.reduce((sum, t) => sum + t.amount, 0),
  count: filterChartData.value.length,
  successfulTransactions: filterChartData.value.filter(
    (t) => t.status === "Success"
  ).length,
  failedTransactions: filterChartData.value.filter((t) => t.status === "Failed")
    .length,
}));

onMounted(() => {
  setUserTransactions();
});
</script>

<style scoped>
.text-gray-500 {
  color: var(--ion-color-medium);
}
.text-black {
  color: var(--ion-color-dark);
}
</style>
