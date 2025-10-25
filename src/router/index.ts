import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AppTabs from "@/components/AppTabs.vue";
import BookView from "@/containers/book/views/BookView.vue";
import ParkingsView from "@/containers/parkings/views/ParkingsView.vue";
import AccountView from "@/containers/account/views/AccountView.vue";
import AuthView from "@/containers/auth/views/AuthView.vue";

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
      {
        path: "book",
        component: BookView,
      },
      {
        path: "parkings",
        component: ParkingsView,
      },
      {
        path: "auth",
        component: AuthView,
      },
      {
        path: "account",
        component: AccountView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
