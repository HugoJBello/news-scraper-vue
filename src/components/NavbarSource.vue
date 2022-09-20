<template>
  <div class="navsource">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <span v-if="sourceInfo" class="navbar-brand">
          <img :src="sourceInfo.logoUrl" class="img-logo" />
        </span>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              {{ sourceInfo.newspaper }}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.img-logo {
  max-height: 30px;
}
.navsource {
  padding-bottom: 10px;
}
.centered {
  margin: 0 auto;
}
.title {
  text-align: center;
  margin: 25px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import type { NewScrapedI } from "@/models/NewScraped";
import type { SourceInfo } from "../services/sourceInfoService";

import { sourceInfoDecider } from "../services/sourceInfoService";

export default defineComponent({
  props: {
    newspaper: String,
  },
  data() {
    return {
      sourceInfo: {} as SourceInfo,
    };
  },
  methods: {
    async getData() {
      if (this.newspaper) {
        this.sourceInfo = sourceInfoDecider(this.newspaper as string);
      }
    },
    getlink(news: NewScrapedI) {
      return "/sourceItem/" + news.id;
    },
  },

  created() {
    this.getData();
  },
  updated() {
    this.getData();
  },
});
</script>
