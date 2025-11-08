import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AppTabs from "@/components/AppTabs.vue";

import account from "@/containers/account/routes/index";
import book from "@/containers/book/routes/index";
import parkings from "@/containers/parkings/routes/index";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/book",
  },
  {
    path: "/tabs/",
    component: AppTabs,
    children: [
      {
        path: "",
        redirect: "/tabs/book",
      },
      ...book,
      ...parkings,
      ...account,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  try {
    const authStore = useAuthStore();
    const { initAuth } = authStore;
    const { isAuthenticated, isInitialized, authModalIsVisible } =
      storeToRefs(authStore);
    const { user } = storeToRefs(useUserStore());

    if (to.meta.requiresAuth) {
      if (!isAuthenticated.value) {
        await initAuth();
      }

      if (isInitialized.value && !user.value) {
        authModalIsVisible.value = true;
        return next({ name: "main" });
      }
    }

    if (!isInitialized.value) {
      initAuth();
    }

    next();
  } catch (error) {
    console.error(error);
  }
});

export default router;
