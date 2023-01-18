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
                  <small class="date">{{ item.date }}</small>
                  <small class="other">{{ item.newsIndex }}</small>
                  <small class="other">{{ item.scraperId }}</small>
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

export default defineComponent({
  components: {
    NavbarSource,
  },

  setup(){
    const selectedScraper= useSelectedScraperStore()
    const customUrlStore= useCustomUrlStore()

    const apiService = new ApiService()
    return {selectedScraper, apiService, customUrlStore}
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
            let scrapers = await this.apiService.getAllScrapers();
            scraperId = scrapers[0]

        }

        console.log("getdata ", scraperId)
        const newspaper = (this.$route.params.newspaper as string).replace("_", ".");

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let news = await this.apiService.findNewsInDay(newspaper as string, tomorrow, 3, undefined);
        news = news.filter (n => n.scraperId === scraperId)
        this.index = await this.apiService.getIndex(newspaper, scraperId);
        this.news = findCurrentNewsUsingIndex(news, this.index);

        console.log(scraperId)
        console.log(this.index, this.news);
      } catch (error) {
        console.log(error);
      }
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
      this.apiService.baseUrl = url
      console.log(url)
      
      this.getData(this.selectedScraper.getSelectedScraper as string | undefined);

    }, true)

    this.getData(this.selectedScraper.getSelectedScraper as string | undefined);
  },
});
</script>
