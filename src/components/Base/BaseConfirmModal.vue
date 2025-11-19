<template>
  <ion-modal :is-open="isOpen" @did-dismiss="cancel">
    <div class="modal-layout">
      <ion-header>
        <ion-toolbar>
          <ion-title class="text-center">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="center-container">
        <div class="message-block">
          <p class="message-text text-center">
            {{ message }}
          </p>
        </div>
      </div>

      <ion-footer class="footer-bg">
        <div class="buttons-wrapper">
          <ion-button color="danger" expand="block" @click="confirm">
            {{ confirmText }}
          </ion-button>

          <ion-button color="medium" expand="block" @click="cancel">
            {{ cancelText }}
          </ion-button>
        </div>
      </ion-footer>
    </div>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonButton,
} from "@ionic/vue";

const props = defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}>();

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>

<style scoped>
.modal-layout {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.message-block {
  max-width: 280px;
}

.message-text {
  font-size: 16px;
  line-height: 1.4;
}

.footer-bg {
  padding: 16px;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
