import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "@/components/Tabs.vue";
import BookView from "@/containers/book/views/BookView.vue";
import ParkingsView from "@/containers/parkings/views/ParkingsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/book",
  },
  {
    path: "/tabs/",
    component: Tabs,
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
