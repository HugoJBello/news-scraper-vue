import { createRouter, createWebHistory } from "vue-router";
import ConsoleMenu from "../views/ConsoleMenu.vue";
import SourceView from "../views/SourceView.vue";
import SourceItem from "../views/SourceItem.vue";
import ServerMenu from "../views/ServerMenu.vue";

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
    {
      path: "/server",
      name: "ServerMenu",
      component: ServerMenu,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 4000)
      })
    } else {
      return { left: 0, top: 0 }
    }
    
  },
});

export default router;
