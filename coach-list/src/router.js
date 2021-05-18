//import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./components/coaches/CoachesList.vue";
//import CoachDetail from "./components/coaches/CoachDetail.vue";
//import CoachRegistration from "./components/coaches/CoachRegistration.vue";
//import ContactCoach from "./components/requests/ContactCoach.vue";
//import RequestsList from "./components/requests/RequestsList.vue";
//import UserAuth from "./components/auth/UserAuth.vue";
import NotFound from "./components/NotFound.vue";
import store from "./store/store.js";

// Asynchronous Components / Lazy Loading
const CoachDetail = () => import("./components/coaches/CoachDetail.vue");

const CoachRegistration = () =>
  import("./components/coaches/CoachRegistration.vue");

const ContactCoach = () => import("./components/requests/ContactCoach.vue");

const RequestsList = () => import("./components/requests/RequestsList.vue");

const UserAuth = () => import("./components/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: "/coaches/:id/contact", component: ContactCoach },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsList,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function(to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
