<template>
  <ion-modal :is-open="isOpen" @did-dismiss="close">
    <ion-header>
      <ion-toolbar class="toolbar-bg">
        <ion-buttons slot="start">
          <ion-button color="medium" @click="close">
            {{ $t("buttons.cancel") }}
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button color="primary" :disabled="!meta.valid" @click="submit">
            {{ $t("modals.edit_car.submit_text") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding content-bg">
      <div class="flex flex-col gap-3">
        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.number }"
        >
          <ion-label position="stacked">
            {{ $t("forms.fields.number.label") }}
          </ion-label>
          <ion-input
            v-bind="numberAttrs"
            v-model="number"
            :placeholder="$t('forms.fields.number.placeholder')"
          />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.brand }"
        >
          <ion-label position="stacked">
            {{ $t("forms.fields.brand.label") }}
          </ion-label>
          <ion-input
            v-bind="brandAttrs"
            v-model="brand"
            :placeholder="$t('forms.fields.brand.placeholder')"
          />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.model }"
        >
          <ion-label position="stacked">
            {{ $t("forms.fields.model.label") }}
          </ion-label>
          <ion-input
            v-bind="modelAttrs"
            v-model="model"
            :placeholder="$t('forms.fields.model.placeholder')"
          />
        </ion-item>

        <ion-item
          lines="none"
          class="rounded-xl input-bg"
          :class="{ 'ion-invalid': errors.color }"
        >
          <ion-label position="stacked">
            {{ $t("forms.fields.color.label") }}
          </ion-label>
          <ion-input
            v-bind="colorAttrs"
            v-model="color"
            :placeholder="$t('forms.fields.color.placeholder')"
          />
        </ion-item>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { useValidateCar } from "@/composables/useValidateCar";
import type { Car } from "@/types";

const props = defineProps<{
  isOpen: boolean;
  car: Car;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", car: Car): void;
}>();

const close = () => emit("close");

const {
  meta,
  number,
  brand,
  model,
  color,
  numberAttrs,
  brandAttrs,
  modelAttrs,
  colorAttrs,
  errors,
  handleSubmit,
} = useValidateCar(props.car);

const submit = handleSubmit((values) => {
  emit("save", {
    ...props.car,
    ...values,
  });
});
</script>

<style scoped>
ion-modal::part(content) {
  background-color: var(--modal-bg);
  border-radius: 12px;
  max-width: 400px;
  margin: auto;
}
.toolbar-bg {
  background-color: var(--modal-toolbar-bg);
}
.content-bg {
  background-color: var(--modal-bg);
}
.input-bg {
  background-color: var(--modal-input-bg);
  border: 1px solid var(--modal-input-border);
}
.ion-invalid {
  border-color: #ef4444;
}
</style>
