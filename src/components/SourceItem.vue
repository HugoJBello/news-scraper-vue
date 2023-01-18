<template>
  <div v-if="newsItem">
    <NavbarSource :newspaper="newsItem.newspaper" />

    <div class="container">
      <h1 class="h1">{{ newsItem.headline }}</h1>
      <div class="imgcontainer">
        <img :src="newsItem.image" class="rounded img-fluid" alt="..." />
      </div>

      <Markdown :source="newsItem.contentMarkdown" />
      <!--
      <p class="content-text" v-for="content in contentLines">{{ content }}</p>
       --> 
    </div>
  </div>
</template>

<style scoped lang="scss">

.container {
  margin: 0 auto;
  max-width: 100 px;
}
.imgcontainer {
  padding-top: 10px;
  margin: 0 auto;
  max-width: 600px;
}

.content-text {
  max-width: 200 px;
  white-space: initial;
}
</style>

<script lang="ts">
import NavbarSource from "./NavbarSource.vue";
import { defineComponent } from "vue";
import { ApiService } from "../services/apiService";
//ab1c7ddb-a19c-49a9-b80e-a53e7db5e91c
import type { NewScrapedI } from "@/models/NewScraped";
import Markdown from 'vue3-markdown-it';
import { useCustomUrlStore } from "@/stores/customUrl";
import { useSelectedScraperStore } from "@/stores/selectedScraper";

export default defineComponent({
  components: {
    NavbarSource,
    Markdown
  },
  setup(){
    const selectedScraper= useSelectedScraperStore()

    const apiService = new ApiService()
    const customUrlStore= useCustomUrlStore()

    return {apiService, selectedScraper, customUrlStore}
  },
  data() {
    return {
      id: this.$route.params.id,
      newsItem: {} as NewScrapedI,
      contentLines: [] as string[],
    };
  },
  methods: {
    async getData() {
      try {
        this.newsItem = await this.apiService.getNewsItem(this.id as string);
        if (this.newsItem){
          console.log(this.newsItem);
          this.contentLines = this.newsItem.content.split("\n");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const customUrlStore= useCustomUrlStore()
    customUrlStore.$onAction(({name:customUrl, args})=>{
      const url = args[0]      
      this.apiService.baseUrl = url
      console.log(url)
      this.getData();
    }, true)
  },
  mounted() {
    this.getData();
  },
});
</script>
