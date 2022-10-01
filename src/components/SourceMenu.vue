<template>
  <div>
    <div class="card_container">
      <NavbarSource :newspaper="newspaper" />
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
import { findNewsInDay, getIndex } from "../services/apiService";
import type { NewScrapedI } from "@/models/NewScraped";

import { findCurrentNewsUsingIndex } from "../services/newsInDayFilterService";
import { useSelectedScraperStore } from "@/stores/selectedScraper";

import NavbarSource from "./NavbarSource.vue";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";

export default defineComponent({
  components: {
    NavbarSource,
  },
  setup(){
    const selectedScraper= useSelectedScraperStore()
    selectedScraper.$onAction(()=>{
      this.getData()
    }, true)
    return {selectedScraper}
  },
  data() {
    return {
      newspaper: this.$route.params.newspaper as string,
      news: [] as NewScrapedI[],
      index: {} as ScrapingIndexI,
    };
  },
  
  methods: {
    async getData() {
      try {
        const newspaper = (this.newspaper as string).replace("_", ".");

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.news = await findNewsInDay(newspaper as string, tomorrow, 2);
        this.index = await getIndex(newspaper);
        this.news = findCurrentNewsUsingIndex(this.news, this.index);

        console.log(this.selectedScraper.selectedScraperId)
        console.log(this.news);
      } catch (error) {
        console.log(error);
      }
    },
    getlink(news: NewScrapedI) {
      return "/sourceItem/" + news.id;
    },
  },
  watch: {
    selectedScraper(val: string)  {
      console.log("aaa", val)

      this.getData();
    },
  },
  created() {
    this.getData();
  },
});
</script>
