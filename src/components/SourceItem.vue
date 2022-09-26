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
import { getNewsItem } from "../services/apiService";
//ab1c7ddb-a19c-49a9-b80e-a53e7db5e91c
import type { NewScrapedI } from "@/models/NewScraped";
import Markdown from 'vue3-markdown-it';

export default defineComponent({
  components: {
    NavbarSource,
    Markdown
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
        this.newsItem = await getNewsItem(this.id as string);
        if (this.newsItem){
          console.log(this.newsItem);
          this.contentLines = this.newsItem.content.split("\n");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getData();
  },
});
</script>
