<template>
  <div class="navsource">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <span v-if="index" class="navbar-brand">
          <img :src="index.logoUrl" class="img-logo" />
        </span>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              {{ index.newspaper }}
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
import type { ScrapingIndexI } from "@/models/ScrapingIndex";

import { ApiService } from "@/services/apiService";
import { useSelectedScraperStore } from "@/stores/selectedScraper";

export default defineComponent({
  props: {
    newspaper: String,
  },
   setup(){
    const apiService = new ApiService()
    const selectedScraper= useSelectedScraperStore()

    return {apiService, selectedScraper}
  },
  data() {
    return {
      index: {} as ScrapingIndexI,

    };
  },
  methods: {
    async getData() {
      if (this.newspaper) {
        const scraperId = this.selectedScraper.getSelectedScraper
        this.index = await this.apiService.getIndex(this.newspaper.replace("_", "."), scraperId);
      }
    }
  },

  created() {
    this.getData();
  }
});
</script>
