<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ $t("views.account.statistics.transactions.description") }}
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <overview-item
            v-for="item in items"
            :value="item.value"
            :icon="item.icon"
            :text="item.text"
          ></overview-item>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import OverviewItem from "./OverviewItem.vue";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
} from "@ionic/vue";

import {
  walletOutline,
  receiptOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from "ionicons/icons";
import { computed } from "vue";

import { useI18n } from "vue-i18n";

interface Props {
  transactionsMetadata: {
    total: number;
    count: number;
    successfulTransactions: number;
    failedTransactions: number;
  };
}

const props = defineProps<Props>();

const { t } = useI18n();

const items = computed(() => {
  return [
    {
      text: t("views.account.statistics.transactions.total_spent"),
      icon: walletOutline,
      value: `$ ${props.transactionsMetadata.total.toLocaleString()}`,
    },
    {
      text: t("views.account.statistics.transactions.title"),
      icon: receiptOutline,
      value: props.transactionsMetadata.count,
    },
    {
      text: t("status.successful"),
      icon: checkmarkCircleOutline,
      value: props.transactionsMetadata.successfulTransactions,
    },
    {
      text: t("status.failed"),
      icon: closeCircleOutline,
      value: props.transactionsMetadata.failedTransactions,
    },
  ];
});
</script>
