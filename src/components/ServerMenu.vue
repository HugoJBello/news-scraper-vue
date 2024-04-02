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
          <li class="list-group-item">
            <b>Last log:</b> {{ getLastLog() }}
          
            <!-- Button trigger modal -->
          <p><button type="button" @click="getLogs()" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            logs
          </button>
          </p>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Logs</h1>
                  <button type="button" class="btn-close"   data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body overflow-auto" style="max-height: 800px"  v-if="logs.length>0">
                  <p v-for="log in logs">
                    {{ log }}
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          </li>
          <li class="list-group-item"><b>Scraper Id:</b> {{ lastGlobalConfig?.scraperId }}</li>
          <li class="list-group-item"><b>Global iteration:</b> {{ lastGlobalConfig?.globalIteration }}</li>
          <li class="list-group-item"><b>last activity:</b> {{ getLastActivity()}}</li>
          <li class="list-group-item"><b>active since</b> {{ getActiveSince()}}</li>
 
        </ul>
    </div>
      
    <div class="separator"></div>

    <div class="card urlCard" style="">
        <img v-if="isActive" :src="publicPath + '/url.png'" class="card-img-top img" alt="...">

        <div class="card-body">
          <h5 class="card-title">Active server url</h5>
          
          <div class="card-text">
            <div class="d-flex sep">
              <input class="form-control me-2" type="search" placeholder="Add server"  v-on:keyup.enter="changeCustomUrl" aria-label="Add server" v-model="customUrl">
              <div class="btn btn-outline-success button_add"  @click="changeCustomUrl">add</div>
          </div>
          </div>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="d-flex">
              <b>scraper:</b>
              <select
                class="form-select form-select-sm"
                v-model="selectedScraper"
                v-on:change="changeSelected"
              >
              <option v-if="allScrapers"
              v-for="item in allScrapers" :value="item">{{ item }}</option>
              </select>

            </div>  
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
import type { GlobalConfigI } from "@/models/GlobalConfigSql";
import { mapActions } from "pinia";
import { LocalStorageService } from "@/services/localStorageService";
import { useAlertStore } from "@/stores/alert";

export default defineComponent({
  components: {
  
  },
  setup(){
    const useSelectedScraper= useSelectedScraperStore()
    const customUrlStore= useCustomUrlStore()
    const serverActivityService =  new ServerActivityService(customUrlStore.getApiService);
    const alertStore = useAlertStore()

    return {useSelectedScraper, customUrlStore, serverActivityService,alertStore}
  },
  data() {
    return {
      customUrl: (this.customUrlStore as any).getCustomUrl as undefined | string,
      publicPath: window.location.origin,
      isActive: false,
      logs: [] as string[] | any,
      selectedScraper: "" as string,
      allScrapers: [] as string[],
      lastGlobalConfig: {} as GlobalConfigI | undefined,
      timer: null as any | undefined,
      autoUpdate: false
    };
  },
  methods: {
    async getScrapers() {
      if (this.allScrapers.length === 0) {
        this.allScrapers = await this.customUrlStore.getApiService.getAllScrapers();
        if (this.allScrapers) {
          this.selectedScraper = this.allScrapers[0] as string;
        }
      }
    },
    getLastLog(){
      if (this.lastGlobalConfig?.lastLog && this.lastGlobalConfig?.lastLog.includes("\n")) {
        const splitted =  this.lastGlobalConfig?.lastLog.split("\n")  
        return splitted[splitted.length-1]
      }
    },
    getLogs(){
      if (this.lastGlobalConfig?.lastLog && this.lastGlobalConfig?.lastLog.includes("\n")) {
        const splitted =  this.lastGlobalConfig?.lastLog.split("\n")  
        this.logs = splitted as string[]
        this.logs.reverse()
        this.$forceUpdate()
      }
    },
    getLastActivity(){
      if (this.lastGlobalConfig){
        return this.getDateFromNow(this.lastGlobalConfig.lastActive as Date)
      } else {
        return 'no activity'
      }
    },
    getActiveSince(){
      if (this.lastGlobalConfig){
        return this.getDateFromNow(this.lastGlobalConfig.activeSince as Date)
      } else {
        return 'no activity'
      }
    },
    getDateFromNow(date: Date){
      return moment(date).fromNow() 
    },
    async changeCustomUrl() {
      await this.selectCustomUrl(this.customUrl as string)
      const active = await this.isActiveUrl(this.customUrl as string)
        
      if (active == true){
        this.setAlert("The url\n "+ this.customUrl + "\n is active", "warning")
        //this.$router.push({ name: 'console' })
      } else {
        this.setAlert("The url\n "+ this.customUrl + "\n is inactive", "error")

      }
      
      LocalStorageService.setCustomUrl(this.customUrl as string)
      
    },
    async isActiveUrl(url:string){
      try{
        const apiService = new ApiService(url)
        const config = await apiService.findGlobalConfig(null)
        if (config.scraperId){
          return true
        }
      } catch (err){
        return false
      }
      
    },

    changeSelected() {
      this.selectScraper(this.selectedScraper)
    },
    async getData() {
      try {
        const selected = (this.selectedScraper)? this.selectedScraper : this.useSelectedScraper.getSelectedScraper 
         this.lastGlobalConfig = await this.serverActivityService.getLastActiveService(selected as string)
         if (this.lastGlobalConfig){
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
    
    ...mapActions(useCustomUrlStore, ['selectCustomUrl']),
    ...mapActions(useSelectedScraperStore, ['selectScraper']),
    ...mapActions(useAlertStore, ['setAlert'])
  },
  created() {
    this.serverActivityService = new ServerActivityService(this.customUrlStore.getApiService)
    this.getData()
    this.getScrapers();
    if (this.autoUpdate){
      this.timer = setInterval(() =>{
      this.getData();
    }, 1000);
    }
 

    const customUrlStore= useCustomUrlStore()

    customUrlStore.$onAction(({name:customUrl, args})=>{
      this.serverActivityService = new ServerActivityService(this.customUrlStore.getApiService)

      this.getData();
    }, true)
  },
  beforeUnmount(){
    clearInterval(this.timer)
  }
});
</script>
