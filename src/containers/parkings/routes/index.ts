import ParkingsView from "../views/ParkingsView.vue";

export default [
  {
    path: "/tabs/parkings",
    name: "parkings",
    component: ParkingsView,
    meta: {
      requiresAuth: true,
    },
  },
];
