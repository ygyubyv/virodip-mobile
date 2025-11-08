<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-card class="ion-margin-bottom">
        <ion-card-content class="profile-header">
          <div class="profile-info-wrapper">
            <div class="profile-avatar">
              <ion-avatar>
                <img :src="user!.avatarUrl || DEFAULT_AVATAR" alt="Avatar" />
              </ion-avatar>
            </div>

            <div class="profile-info">
              <ion-item lines="none">
                <ion-label>
                  <h3 class="label-title">{{ $t("common.full_name") }}</h3>
                  <p>{{ user!.name }}</p>
                </ion-label>
              </ion-item>

              <ion-item lines="none">
                <ion-label>
                  <h3 class="label-title">{{ $t("common.email") }}</h3>
                  <p>{{ user!.email }}</p>
                </ion-label>
              </ion-item>

              <ion-item v-if="user!.phoneNumber" lines="none">
                <ion-label>
                  <h3 class="label-title">{{ $t("common.phone") }}</h3>
                  <p>{{ user!.phoneNumber }}</p>
                </ion-label>
              </ion-item>

              <ion-item lines="none">
                <ion-label>
                  <h3 class="label-title">{{ $t("common.joined") }}</h3>
                  <p>{{ formatDate(user!.createdAt) }}</p>
                </ion-label>
              </ion-item>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="ion-margin-bottom">
        <ion-card-header>
          <ion-card-subtitle>{{
            $t("pricing.current_plan")
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div v-if="user!.subscription">
            <ion-item lines="none">
              <ion-label>
                <h3 class="label-title">{{ $t("pricing.plan") }}</h3>
                <p>{{ user!.subscription.tier.name }}</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <h3 class="label-title">{{ $t("pricing.price") }}</h3>
                <p>${{ user!.subscription.tier.price }}</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <h3 class="label-title">{{ $t("pricing.start_date") }}</h3>
                <p>{{ formatDate(user!.subscription.startDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <h3 class="label-title">{{ $t("pricing.end_date") }}</h3>
                <p>{{ formatDate(user!.subscription.endDate) }}</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <h3 class="label-title">{{ $t("pricing.status") }}</h3>
                <p>{{ user!.subscription.status }}</p>
              </ion-label>
            </ion-item>
          </div>
          <p v-else class="ion-text-center ion-text-color-medium">
            {{ $t("pricing.no_plan") }}
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ $t("cars.title") }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div
            v-if="user!.cars && user!.cars.length === 0"
            class="ion-text-color-medium"
          >
            {{ $t("cars.no_cars") }}
          </div>
          <ion-list v-else>
            <ion-item v-for="car in user?.cars" :key="car.id" lines="full">
              <ion-label>
                <h3>{{ car.brand }} {{ car.model }}</h3>
                <p>
                  {{ $t("common.number") }}: {{ car.number }} |
                  {{ $t("common.color") }}: {{ car.color }}
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/vue";
import { DEFAULT_AVATAR } from "@/constants";
import { formatDate } from "@/utils";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();
const { setUserCars, setUserSubscriptions } = userStore;
const { user } = storeToRefs(userStore);

onMounted(async () => {
  setUserCars();
  // setUserSubscriptions(); // розкоментувати при потребі
});
</script>

<style scoped>
ion-avatar {
  width: 100px;
  height: 100px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-avatar {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.label-title {
  font-weight: 600;
  font-size: 14px;
  margin: 0;
}

ion-item p {
  margin: 0;
  font-size: 13px;
}
</style>
