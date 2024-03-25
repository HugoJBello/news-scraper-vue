<template>
  <div>
    <div class="card_container">
      <NavbarSource :newspaper="$route.params.newspaper as string" />
      <div
        class="card mb-3 centered"
        style="max-width: 1200px"
        v-if="news"
        v-for="item in news"
      >
        <RouterLink :to="getlink(item)">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="item.image" class="img-fluid img-thumbnail" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ item.headline }}</h5>
                <p class="card-text">{{ item.description }}</p>
                <p class="text-muted">
                  <small class="date">{{ getDateFromNow(item.date) }}</small>
                  <small class="other">{{ item.newsIndex }} </small>
                  
                </p>
                <p class="text-muted">
                  <small class="other">
                    <span v-for="tag in item.sections" class="badge bg-secondary tag">{{tag}}</span>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.other {
  margin-left: 3px;
}
.img-logo {
  max-height: 30px;
}
.centered {
  margin: 0 auto;
}
.tag{
  margin-right: 3px;
}
.title {
  text-align: center;
  margin: 25px;
}
.card_container {
  @media (max-width: 768px) {
    padding: 5px;
  }
  a {
    all: unset;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { ApiService } from "../services/apiService";
import type { NewScrapedI } from "@/models/NewScraped";

import { findCurrentNewsUsingIndex } from "../services/newsInDayFilterService";
import { useSelectedScraperStore } from "@/stores/selectedScraper";

import NavbarSource from "./NavbarSource.vue";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import { useCustomUrlStore } from "@/stores/customUrl";
import moment from "moment";
import { RouterLink } from "vue-router";

export default defineComponent({
  components: {
    NavbarSource,
  },

  setup(){
    const selectedScraper= useSelectedScraperStore()
    const customUrlStore= useCustomUrlStore()

    return {selectedScraper, customUrlStore}
  },
  data() {
    return {
      news: [] as NewScrapedI[],
      index: {} as ScrapingIndexI,
    };
  },
  
  methods: {
    async getData(scraperId: string | undefined) {
      try {

        if (!scraperId){
            let scrapers = await this.customUrlStore.getApiService.getAllScrapers();
            scraperId = scrapers[0]

        }

        console.log("getdata ", scraperId)
        const newspaper = (this.$route.params.newspaper as string).replace("_", ".");
 
        const results = await this.customUrlStore.getApiService.getResultsInNewspaper(newspaper)
        this.index = results.scrapingIndex
        this.news = results.news         

        this.news = this.news.filter(item => !!item )

        console.log(scraperId)
        console.log(this.news);
      } catch (error) {
        console.log(error);
      }
    },
    getDateFromNow(date: Date){
      return moment(date).fromNow() 
    },
    getlink(news: NewScrapedI) {
      return "/sourceItem/" + news.id;
    },
  },
  watch:{
    $route (to, from){
      this.getData(this.selectedScraper.getSelectedScraper as string | undefined);
    }
},
  created() {


    const selectedScraper= useSelectedScraperStore()

    selectedScraper.$onAction(({name:selectedScraper, args})=>{
      const scraperId = args[0]
      this.getData(scraperId)
    }, true)

    const customUrlStore= useCustomUrlStore()
    customUrlStore.$onAction(({name:customUrl, args})=>{
      const url = args[0]      
      this.customUrlStore.getApiService.baseUrl = url
       
      this.getData(this.selectedScraper.getSelectedScraper as string | undefined);

    }, true)

 

    this.getData(this.selectedScraper.getSelectedScraper as string | undefined);
  },
});
</script>
