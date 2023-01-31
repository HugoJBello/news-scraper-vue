<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="/">News Scraper</a>
        
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Sources</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/server">Server</RouterLink>
          </li>
          
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="customUrl">
          <div class="btn btn-outline-success button_add"  @click="changeCustomUrl">add</div>
        </form>

        <form class="d-flex">
          <select
            class="form-select form-select-sm"
            v-model="selectedScraper"
            v-on:change="changeSelected"
          >
          <option v-if="allScrapers"
          v-for="item in allScrapers" :value="item">{{ item }}</option>
          </select>

        </form>
      </div>
    </div>

  </nav>
</template>

<style scoped>
.button_add{
  margin-right: 8px;
}
</style>

<script lang="ts">

import { defineComponent } from "vue";
import type { SourceInfo } from "../services/sourceInfoService";
import { mapActions } from "pinia";
import { getAllSources } from "../services/sourceInfoService";
import { useSelectedScraperStore } from "@/stores/selectedScraper";
import { ApiService } from "@/services/apiService";
import { useCustomUrlStore } from "@/stores/customUrl";
import { LocalStorageService } from "@/services/localStorageService";
export default defineComponent({
  props: {
    newspaper: String,
  },
  setup(){
    const customUrlStore= useCustomUrlStore()
    const apiService = new ApiService()
    return {customUrlStore, apiService}
  },
  data() {
    return {
      customUrl: undefined as undefined | string,
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
        this.allScrapers = await this.apiService.getAllScrapers();
        if (this.allScrapers) {
          console.log();
          this.selectedScraper = this.allScrapers[0];
        }
      }
    },
    changeCustomUrl() {
      this.selectCustomUrl(this.customUrl as string)
      LocalStorageService.setCustomUrl(this.customUrl as string)
      
    },
    changeSelected() {
      this.selectScraper(this.selectedScraper)
    },
    getlink(source: SourceInfo) {
      return "/source/" + source.newspaper.replace(".", "_");
    },
    getCustomUrlFromStorage() {
      const customUrl = LocalStorageService.getCustomUrl()
      if (customUrl){
        console.log(customUrl)
        this.selectCustomUrl(customUrl as string)
      }
    },
    ...mapActions(useSelectedScraperStore, ['selectScraper']),
    ...mapActions(useCustomUrlStore, ['selectCustomUrl'])

  },

  created() {
    this.getSources();
    this.getScrapers();

    const customUrlStore= useCustomUrlStore()
    customUrlStore.$onAction(({name:customUrl, args})=>{
      const url = args[0]      
      this.customUrl = url
    }, true)

    this.getCustomUrlFromStorage();


  },
  updated() {
    //this.getSources();
  },
});
</script>
