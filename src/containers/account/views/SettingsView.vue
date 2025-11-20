<template>
  <ion-page>
    <AddCarModal
      v-if="addCarModalIsVisible"
      :is-open="addCarModalIsVisible"
      @close="addCarModalIsVisible = false"
    />

    <EditCarModal
      v-if="editCarModalIsVisible && selectedCar"
      :is-open="editCarModalIsVisible"
      :car="selectedCar"
      @close="editCarModalIsVisible = false"
      @save="handleUpdateCar"
    />

    <BaseConfirmModal
      v-if="deleteCarModalIsVisible"
      :is-open="deleteCarModalIsVisible"
      :title="$t('modals.delete_car.title')"
      :message="$t('modals.delete_car.message')"
      :confirm-text="$t('buttons.delete')"
      :cancel-text="$t('buttons.cancel')"
      @confirm="confirmDeleteCar"
      @cancel="deleteCarModalIsVisible = false"
    />

    <BaseConfirmModal
      v-if="deleteAccountModalIsVisible"
      :is-open="deleteAccountModalIsVisible"
      :title="$t('modals.delete_account.title')"
      :message="$t('modals.delete_account.message')"
      :confirm-text="$t('buttons.delete')"
      :cancel-text="$t('buttons.cancel')"
      @confirm="handleDeleteAccount"
      @cancel="deleteAccountModalIsVisible = false"
    />

    <ion-content class="content-bg">
      <ion-card class="ion-margin-bottom card-bg">
        <ion-card-content>
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <label
              for="avatar-input"
              class="relative flex justify-center md:justify-end cursor-pointer"
            >
              <ion-avatar
                class="w-28 h-28 md:w-24 md:h-24 rounded-full overflow-hidden border border-gray-300"
              >
                <img
                  :src="avatarPreview || user?.avatarUrl || DEFAULT_AVATAR"
                  class="object-cover w-full h-full"
                />
              </ion-avatar>

              <div
                class="avatar-btn absolute bottom-[-6px] md:bottom-[-4px] left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-8 h-8 md:w-7 md:h-7 rounded-full flex items-center justify-center border-2"
              >
                <ion-icon :icon="addOutline" class="w-4 h-4" />
              </div>

              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onAvatarChange"
              />
            </label>

            <div class="flex-1 space-y-4">
              <div>
                <ion-item>
                  <ion-label position="stacked">
                    {{ $t("forms.fields.full_name.label") }}
                  </ion-label>
                  <ion-input
                    v-model="editedUser.name.value"
                    type="text"
                    v-bind="editedUser.nameAttrs.value"
                  />
                </ion-item>
                <p
                  v-if="editedUser.errors.value.name"
                  class="text-red-500 text-sm mt-1 ml-1"
                >
                  {{ editedUser.errors.value.name }}
                </p>
              </div>

              <div>
                <ion-item>
                  <ion-label position="stacked">
                    {{ $t("forms.fields.email.label") }}
                  </ion-label>
                  <ion-input
                    v-model="editedUser.email.value"
                    type="email"
                    v-bind="editedUser.emailAttrs.value"
                  />
                </ion-item>
                <p
                  v-if="editedUser.errors.value.email"
                  class="text-red-500 text-sm mt-1 ml-1"
                >
                  {{ editedUser.errors.value.email }}
                </p>
              </div>

              <div>
                <ion-item>
                  <ion-label position="stacked">
                    {{ $t("forms.fields.phone.label") }}
                  </ion-label>
                  <ion-input
                    v-model="editedUser.phoneNumber.value"
                    type="tel"
                    v-bind="editedUser.phoneNumberAttrs.value"
                  />
                </ion-item>
                <p
                  v-if="editedUser.errors.value.phoneNumber"
                  class="text-red-500 text-sm mt-1 ml-1"
                >
                  {{ editedUser.errors.value.phoneNumber }}
                </p>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="card-bg">
        <ion-card-header>
          <ion-card-title>{{ $t("cars.title") }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list v-if="user?.cars?.length">
            <ion-item
              v-for="car in user.cars"
              :key="car.id"
              class="flex justify-between items-center"
            >
              <ion-label>
                {{ car.brand }} {{ car.model }} ({{ car.number }})
              </ion-label>
              <div class="flex gap-2">
                <ion-button fill="clear" size="small" @click="openEditCar(car)">
                  <ion-icon :icon="createOutline" slot="icon-only" />
                </ion-button>

                <ion-button
                  fill="clear"
                  color="danger"
                  size="small"
                  @click="openDeleteCar(car.id)"
                >
                  <ion-icon :icon="trashOutline" slot="icon-only" />
                </ion-button>
              </div>
            </ion-item>
          </ion-list>

          <p v-else>{{ $t("cars.no_cars") }}</p>

          <ion-button expand="full" @click="addCarModalIsVisible = true">
            <ion-icon slot="start" :icon="addOutline" />
            {{ $t("buttons.add_car") }}
          </ion-button>
        </ion-card-content>
      </ion-card>

      <div class="ion-margin-top flex flex-col gap-2 ion-padding">
        <ion-button
          expand="full"
          color="primary"
          :disabled="!hasChanges"
          @click="saveProfile"
        >
          <ion-icon slot="start" :icon="saveOutline" />
          {{ $t("buttons.save_changes") }}
        </ion-button>

        <ion-button
          expand="full"
          color="medium"
          v-if="hasChanges"
          @click="clearState"
        >
          <ion-icon slot="start" :icon="closeOutline" />
          {{ $t("buttons.cancel") }}
        </ion-button>

        <ion-button
          expand="full"
          color="danger"
          @click="deleteAccountModalIsVisible = true"
        >
          <ion-icon slot="start" :icon="trashOutline" />
          {{ $t("buttons.delete_account") }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonList,
  IonIcon,
  IonButton,
} from "@ionic/vue";

import AddCarModal from "@/components/Modals/AddCarModal.vue";
import EditCarModal from "@/components/Modals/EditCarModal.vue";
import BaseConfirmModal from "@/components/Base/BaseConfirmModal.vue";

import { useValidateUser } from "../composables/useValidateUser";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";

import { useNotification } from "@/composables/useNotification";
import { useI18n } from "vue-i18n";

import {
  updateUser,
  deleteUser,
  updateUserCar,
  deleteUserCar,
  createUserAvatarUploadUrl,
  updateUserAvatar,
} from "@/services/user";

import {
  addOutline,
  trashOutline,
  saveOutline,
  closeOutline,
  createOutline,
} from "ionicons/icons";

import { DEFAULT_AVATAR } from "@/constants";
import type { Car } from "@/types";
import { uploadBlob } from "@/utils";

const { t } = useI18n();
const { showNotification } = useNotification();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { setUserCars, updateUserSummary } = userStore;

const editedUser = useValidateUser();
const { logout } = useAuthStore();

const addCarModalIsVisible = ref(false);
const editCarModalIsVisible = ref(false);
const deleteCarModalIsVisible = ref(false);
const deleteAccountModalIsVisible = ref(false);

const selectedCar = ref<Car | null>(null);
const deleteCarId = ref<string | null>(null);

const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(user.value?.avatarUrl || null);

const hasChanges = computed(() => {
  return editedUser.meta.value.dirty || avatarFile.value !== null;
});

const onAvatarChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  }
};

const openEditCar = (car: Car) => {
  selectedCar.value = car;
  editCarModalIsVisible.value = true;
};

const openDeleteCar = (id: string) => {
  deleteCarId.value = id;
  deleteCarModalIsVisible.value = true;
};

const handleUpdateCar = async (updatedCar: Car) => {
  try {
    await updateUserCar(user.value!.id, updatedCar.id, updatedCar);
    setUserCars(true);
    editCarModalIsVisible.value = false;

    showNotification(
      "success",
      t("toasts.success.updated", { entity: t("common.car") })
    );
  } catch (e) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.update"),
        entity: t("common.car"),
      })
    );
  }
};

const confirmDeleteCar = async () => {
  try {
    await deleteUserCar(user.value!.id, deleteCarId.value!);
    setUserCars(true);
    deleteCarModalIsVisible.value = false;

    showNotification(
      "success",
      t("toasts.success.deleted", { entity: t("common.car") })
    );
  } catch (e) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.delete"),
        entity: t("common.car"),
      })
    );
  }
};

const saveAvatar = async () => {
  const { uploadUrl, fileUrl } = await createUserAvatarUploadUrl(
    user.value!.id
  );

  const response = await uploadBlob(uploadUrl, avatarFile.value!);

  if (!response?.ok) {
    throw new Error("Не вдалося завантажити файл на Azure Blob Storage");
  }

  const newAvatarUrl = await updateUserAvatar(user.value!.id, fileUrl);

  return newAvatarUrl;
};

const saveProfile = editedUser.handleSubmit(async (values) => {
  try {
    const updates = await updateUser(user.value!.id, {
      ...values,
    });

    if (avatarFile.value) {
      const newAvatar = await saveAvatar();
      updates.avatarUrl = newAvatar;
    }

    updateUserSummary(updates);

    clearState();

    showNotification(
      "success",
      t("toasts.success.updated", { entity: t("common.account") })
    );
  } catch (e) {
    console.error(e);
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.save"),
        entity: t("common.account"),
      })
    );
  }
});

const clearState = () => {
  editedUser.resetForm();
  avatarFile.value = null;
  avatarPreview.value = user.value?.avatarUrl || null;
};

const handleDeleteAccount = async () => {
  try {
    await deleteUser(user.value!.id);
    showNotification(
      "success",
      t("toasts.success.deleted", { entity: t("common.account") })
    );

    logout();
  } catch (e) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.delete"),
        entity: t("common.account"),
      })
    );
    console.error(e);
  }
};

onMounted(() => setUserCars());
</script>

<style scoped>
.card-bg {
  background-color: var(--card-bg);
}
.content-bg {
  background-color: var(--content-bg);
}
:root {
  --card-bg: #ffffff;
  --content-bg: #f9fafb;
}

.avatar-btn {
  background: var(--ion-color-light);
  color: var(--ion-color-dark);
  border-color: var(--ion-color-light);
}

:host-context(.dark) .avatar-btn,
ion-app.dark .avatar-btn {
  background: var(--ion-color-dark);
  color: var(--ion-color-light);
  border-color: var(--ion-color-dark);
}

@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #1e1e1e;
    --content-bg: #121212;
  }
}
</style>
