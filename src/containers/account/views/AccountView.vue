<template>
  <base-layout
    page-default-back-link="/tabs/book"
    :page-title="$t('routes.account.default')"
  >
    <div class="segment-container">
      <ion-segment
        :value="activeSegment"
        scrollable
        @ionChange="onSegmentChange"
      >
        <ion-segment-button
          v-for="link in links"
          :key="link.to"
          :value="link.to"
          class="segment-button"
        >
          <ion-icon :icon="link.icon" />
          <ion-label>{{ link.text }}</ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <div class="segment-content">
      <ion-router-outlet style="margin-top: 70px" />
    </div>
  </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/Base/BaseLayout.vue";
import {
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonRouterOutlet,
  IonLabel,
} from "@ionic/vue";
import {
  personCircleOutline,
  cardOutline,
  statsChartOutline,
  settingsOutline,
  shieldOutline,
} from "ionicons/icons";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const links = [
  {
    to: "/tabs/account/profile",
    text: t("routes.account.profile") || "Profile",
    icon: personCircleOutline,
  },
  {
    to: "/tabs/account/payments",
    text: t("routes.account.payments") || "Payments",
    icon: cardOutline,
  },
  {
    to: "/tabs/account/stats",
    text: t("routes.account.statistics") || "Stats",
    icon: statsChartOutline,
  },
  {
    to: "/tabs/account/settings",
    text: t("routes.account.settings") || "Settings",
    icon: settingsOutline,
  },
  {
    to: "/tabs/account/security",
    text: t("routes.account.security") || "Security",
    icon: shieldOutline,
  },
];

const activeSegment = ref(route.path);

watch(
  () => route.path,
  (val) => (activeSegment.value = val)
);

const onSegmentChange = (event: any) => {
  const value = event.detail.value;
  if (value && value !== route.path) router.push(value);
};
</script>

<style scoped>
.segment-container {
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: var(--ion-background-color, #ffffff);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

ion-segment {
  display: flex;
  --background: transparent;
  justify-content: space-between;
}

.segment-button {
  min-width: 100px;
  flex: 1 1 auto;
  --color: rgba(0, 0, 0, 0.7);
  --color-checked: #111111;
  --indicator-color: #111111;
  --indicator-height: 2px;
  text-transform: none;
  font-weight: 600;
  font-size: 14px;
  justify-content: center;
}

.segment-button ion-icon {
  font-size: 18px;
  margin-bottom: 2px;
}

.segment-content {
  padding: 16px;
  color: #111111;
}

@media (prefers-color-scheme: dark) {
  .segment-container {
    background-color: #121212;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .segment-button {
    --color: rgba(255, 255, 255, 0.6);
    --color-checked: #ffffff;
    --indicator-color: #ffffff;
  }

  .segment-content {
    color: #ffffff;
  }
}
</style>
