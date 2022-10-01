<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">News Scraper</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Sources</RouterLink>
          </li>
          <li class="nav-item" v-if="sourcesInfo" v-for="item in sourcesInfo">
            <RouterLink class="nav-link" :to="getlink(item)">{{
              item.newspaper
            }}</RouterLink>
          </li>

          <select
            class="form-select form-select-sm"
            v-model="selectedScraper"
            v-on:change="changeSelected"
          >
          <option v-if="allScrapers"
          v-for="item in allScrapers" :value="item">{{ item }}</option>
          </select>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
<script lang="ts">
import { getAllScrapers } from "@/services/apiService";
import { defineComponent } from "vue";
import type { SourceInfo } from "../services/sourceInfoService";
import { mapActions } from "pinia";
import { getAllSources } from "../services/sourceInfoService";
import { useSelectedScraperStore } from "@/stores/selectedScraper";
export default defineComponent({
  props: {
    newspaper: String,
  },
  data() {
    return {
      sourcesInfo: undefined as SourceInfo[] | undefined,
      allScrapers: [] as string[],
      selectedScraper: "" as string,
    };
  },
  methods: {
    async getSources() {
      this.sourcesInfo = getAllSources();
    },
    async getScrapers() {
      if (this.allScrapers.length === 0) {
        this.allScrapers = await getAllScrapers();
        if (this.allScrapers) {
          console.log();
          this.selectedScraper = this.allScrapers[0];
        }
      }
    },
    changeSelected() {
      this.selectScraper(this.selectedScraper)
    },
    getlink(source: SourceInfo) {
      return "/source/" + source.newspaper.replace(".", "_");
    },
    ...mapActions(useSelectedScraperStore, ['selectScraper'])
  },

  created() {
    this.getSources();
    this.getScrapers();
  },
  updated() {
    //this.getSources();
  },
});
</script>
