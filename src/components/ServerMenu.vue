<template>
  
    <div class="container">

      <div class="separator"></div>

      <div class="card server">
        <img v-if="isActive" :src="publicPath + '/active_server.drawio.png'" class="card-img-top img" alt="...">
        <img v-if="!isActive" :src="publicPath + '/inactive_server.drawio.png'" class="card-img-top img" alt="...">

        <div class="card-body">
          <h5 class="card-title">Server Id:</h5>
          <p class="card-text">{{ lastGlobalConfig?.deviceId }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Last item scraped:</b> {{ lastGlobalConfig?.lastNewspaper }}</li>
          <li class="list-group-item"><b>Scraper Id:</b> {{ lastGlobalConfig?.scraperId }}</li>
          <li class="list-group-item"><b>last activity:</b> {{ getLastActivity()}}</li>

        </ul>
    </div>
      
    <div class="separator"></div>

    <div class="card urlCard" style="">
        <img v-if="isActive" :src="publicPath + '/url.png'" class="card-img-top img" alt="...">

        <div class="card-body">
          <h5 class="card-title">Active server url</h5>
          
          <div class="card-text">
            <form class="d-flex sep">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="customUrl">
            <div class="btn btn-outline-success button_add"  @click="changeCustomUrl">add</div>
          </form>
          </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <form class="d-flex">
              <b>scraper:</b>
              <select
                class="form-select form-select-sm"
                v-model="selectedScraper"
                v-on:change="changeSelected"
              >
              <option v-if="allScrapers"
              v-for="item in allScrapers" :value="item">{{ item }}</option>
              </select>

            </form>  
            </li>
          </ul>
    </div>

    
    <div class="separator"></div>

  </div>
</template>

<style scoped lang="css"> 
.server{
  margin: 0 auto;
  max-width: 18rem;
}

.urlCard{
  margin: 0 auto;
  max-width: 30rem;
}

.sep{margin-bottom: 15px;}

.container {
  margin: 0 auto;
  max-width: 100 px;
}
.img{
  padding-top:10px;
  max-height: 80px;
  max-width: 80px;
  margin:0 auto;
}
.separator{
  margin-bottom: 25px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { ApiService } from "../services/apiService";
import moment from "moment"
import { useCustomUrlStore } from "@/stores/customUrl";
import { useSelectedScraperStore } from "@/stores/selectedScraper";
import { ServerActivityService } from "@/services/serverActivityService";
import type { GlobalConfigSqlSqlI } from "@/models/GlobalConfigSql";
import { mapActions } from "pinia";
import { LocalStorageService } from "@/services/localStorageService";

export default defineComponent({
  components: {
  
  },
  setup(){
    const useSelectedScraper= useSelectedScraperStore()
    const customUrlStore= useCustomUrlStore()
    const apiService =  new ApiService();
    const serverActivityService =  new ServerActivityService(apiService);

    return {useSelectedScraper, customUrlStore, apiService, serverActivityService}
  },
  data() {
    return {
      customUrl: undefined as undefined | string,
      publicPath: window.location.origin,
      isActive: false,
      selectedScraper: "" as string,
      allScrapers: [] as string[],
      lastGlobalConfig: {} as GlobalConfigSqlSqlI | undefined,
    };
  },
  methods: {
    async getScrapers() {
      if (this.allScrapers.length === 0) {
        this.allScrapers = await this.apiService.getAllScrapers();
        if (this.allScrapers) {
          this.selectedScraper = this.allScrapers[0] as string;
        }
      }
    },
    getLastActivity(){
      if (this.lastGlobalConfig){
        return this.getDateFromNow(this.lastGlobalConfig.lastActive as Date)
      } else {
        return 'no activity'
      }
    },
    getDateFromNow(date: Date){
      return moment(date).fromNow() 
    },
    changeCustomUrl() {
      this.selectCustomUrl(this.customUrl as string)
      LocalStorageService.setCustomUrl(this.customUrl as string)
      this.getData()
    },
    changeSelected() {
      this.selectScraper(this.selectedScraper)
    },
    async getData() {
      try {
        const selected = (this.selectedScraper)? this.selectedScraper : this.useSelectedScraper.getSelectedScraper 
         this.lastGlobalConfig = await this.serverActivityService.getLastActiveService(selected as string)
         if (this.lastGlobalConfig){
          console.log(this.lastGlobalConfig)
          this.isActive = this.serverActivityService.isActive(this.lastGlobalConfig)
         } else {
          this.isActive = false
         }
      } catch (error) {
        this.isActive = false
        this.lastGlobalConfig = undefined
        console.log(error);
      }
    },
    getCustomUrlFromStorage() {
      const customUrl = LocalStorageService.getCustomUrl()
      if (customUrl){
        console.log(customUrl)
        this.selectCustomUrl(customUrl as string)
      }
    },
    ...mapActions(useCustomUrlStore, ['selectCustomUrl']),
    ...mapActions(useSelectedScraperStore, ['selectScraper']),


  },
  created() {
    this.getScrapers();

    const customUrlStore= useCustomUrlStore()

    customUrlStore.$onAction(({name:customUrl, args})=>{
      const url = args[0]      
      this.apiService.baseUrl = url
      this.customUrl = url

      this.getData();
    }, true)

    this.getCustomUrlFromStorage();

    this.apiService.baseUrl = customUrlStore.getCustomUrl as string
    this.serverActivityService = new ServerActivityService(this.apiService)

  },
  mounted() {
    this.getData();
  },
});
</script>
