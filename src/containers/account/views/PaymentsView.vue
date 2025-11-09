<template>
  <ion-page>
    <ion-content>
      <ion-label
        style="font-size: 1.8rem; display: block"
        class="ion-text-center ion-margin-top"
      >
        {{ $t("views.account.payments.tiers_list") }}
      </ion-label>

      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-md="6"
            v-for="tier in tiers"
            :key="tier.title"
          >
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ tier.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>{{ tier.description }}</p>
                <p class="ion-margin-top">
                  <strong>{{ tier.price }}</strong>
                </p>
                <ion-button
                  expand="block"
                  :disabled="tier.active"
                  color="primary"
                  class="ion-margin-top"
                >
                  {{
                    tier.active ? $t("common.current") : $t("buttons.switch_to")
                  }}
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list class="ion-margin-top">
        <ion-list-header>
          <ion-label style="font-size: 1.2rem">{{
            $t("views.account.payments.recent_transactions")
          }}</ion-label>
        </ion-list-header>

        <ion-item v-for="tx in transactions.slice(-5).reverse()" :key="tx.id">
          <ion-label>
            <h2>{{ formatDate(tx.date) }}</h2>
            <p>{{ tx.description }}</p>
          </ion-label>
          <ion-note slot="end">
            ${{ tx.amount.toFixed(2) }} - {{ tx.status }}
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-list class="ion-margin-top">
        <ion-list-header>
          <ion-label style="font-size: 1.2rem">{{
            $t("views.account.payments.security.title")
          }}</ion-label>
        </ion-list-header>

        <ion-item
          v-for="feature in $tm('views.account.payments.security.features')"
          :key="feature"
        >
          <ion-label>{{ feature }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/vue";

import { transactions } from "@/constants";
import { tiers } from "../data";
import { formatDate } from "@/utils";
</script>
