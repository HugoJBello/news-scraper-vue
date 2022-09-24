import { createApp } from "vue";
import { createPinia } from "pinia";
import MasonryWall from '@yeger/vue-masonry-wall'
import Markdown from 'vue3-markdown-it';

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MasonryWall)
app.use(Markdown)

app.mount("#app");
