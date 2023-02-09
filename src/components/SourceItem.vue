<template>
  <div v-if="newsItem">
    <NavbarSource :newspaper="newsItem.newspaper" />

    <div class="container">
      <h1 class="h1">{{ newsItem.headline }}</h1>
      
      <div class="separator"></div>


      <div v-if="!newsItem.figuresUrl || newsItem.figuresUrl.length === 0 || newsItem.figuresUrl[0] === null" class="imgcontainer">
        <img :src="newsItem.image" class="rounded img-fluid" alt="..." />
      </div>
      
      <div v-if="newsItem.figuresUrl" id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <div class="carousel-indicators">
          <button v-for="(item, index) in newsItem.figuresUrl" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index" class="active" aria-current="true" aria-label="Slide 1"></button>
        </div>
        <div v-if="newsItem.figuresUrl[0]" class="carousel-inner imgcontainer">
          <div class="carousel-item active">
            <img :src="newsItem.figuresUrl[0]" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <p>{{newsItem.figuresText[0]}}</p>
            </div>
          </div>
          <div v-for="(item, index) in newsItem.figuresUrl" class="carousel-item">
            <img :src="newsItem.figuresUrl[index]" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <p>{{newsItem.figuresText[index]}}</p>
            </div>
          </div>
           
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
      
      <div class="separator"></div>
      <Markdown class="child" :source="newsItem.contentMarkdown" />
      <!--
      <p class="content-text" v-for="content in contentLines">{{ content }}</p>
       --> 
    </div>
  </div>
</template>

<style scoped lang="css">
@import url('https://fonts.googleapis.com/css?family=Noto+Serif');

:deep(h2) {
  font-family: 'Noto Serif';
  }

:deep(h1) {
  font-family: 'Noto Serif';
  }

:deep(p) {
  font-family: 'Noto Serif';
}

:deep(a:link) { text-decoration: none; }



.container {
  margin: 0 auto;
  max-width: 100 px;
}
.separator{
  margin-bottom: 25px;
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
    const customUrlStore= useCustomUrlStore()

    return {selectedScraper, customUrlStore}
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
        this.newsItem = await this.customUrlStore.getApiService.getNewsItem(this.id as string);
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
    this.customUrlStore.$onAction(({name:customUrl, args})=>{
      const url = args[0]      
      this.customUrlStore.getApiService.baseUrl = url
       
      this.getData()
    }, true)
  },
  mounted() {
    this.getData();
  },
});
</script>
