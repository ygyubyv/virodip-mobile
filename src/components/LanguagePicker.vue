<template>
  <div class="lang-picker">
    <button
      :class="['lang-btn', locale === 'uk' ? 'active' : '']"
      @click="selectLocale('uk')"
    >
      UK
    </button>

    <span class="divider">/</span>

    <button
      :class="['lang-btn', locale === 'en' ? 'active' : '']"
      @click="selectLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLocalization } from "@/composables/useLocalization";
const { locale, selectLocale } = useLocalization();
</script>

<style scoped>
.lang-picker {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 6px;
}

.lang-btn {
  background: none;
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  color: var(--ion-color-medium);
}

.lang-btn.active {
  font-weight: 600;
  color: var(--ion-color-dark);
}

.divider {
  opacity: 0.4;
}
</style>
