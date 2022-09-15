import { createRouter, createWebHistory } from "vue-router";
import ConsoleMenu from "../views/ConsoleMenu.vue";
import SourceView from "../views/SourceView.vue";
import SourceItem from "../views/SourceItem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "console",
      component: ConsoleMenu,
    },
    {
      path: "/source/:newspaper",
      name: "source",
      component: SourceView,
    },
    {
      path: "/sourceItem/:id",
      name: "sourceItem",
      component: SourceItem,
    },
  ],
});

export default router;
