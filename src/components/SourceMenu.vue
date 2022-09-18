<template>
  <div>
    <div class="card_container">
      <h1 class="h1 title">{{ sourceInfo.newspaper }}</h1>
      <div
        class="card mb-3 centered"
        style="max-width: 1200px"
        v-if="news"
        v-for="item in news"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="item.image" class="img-fluid img-thumbnail" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.headline }}</h5>
              <p class="card-text">{{ item.description }}</p>
              <p class="card-text">
                <small class="text-muted">{{ item.date }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { findNewsInDay } from "../services/apiService";
import type { NewScrapedI } from "@/models/NewScraped";
import type {
  SourceInfo,
} from "../services/sourceInfoService";

import {
  sourceInfoDecider,
} from "../services/sourceInfoService";

export default defineComponent({
  data() {
    return {
      newspaper: this.$route.params.newspaper,
      news: [] as NewScrapedI[],
      sourceInfo: {} as SourceInfo,
    };
  },
  methods: {
    async getData() {
      try {
        this.sourceInfo = sourceInfoDecider(this.newspaper as string)
        console.log(this.sourceInfo)
        const newspaper = (this.newspaper as string).replace("_", ".");
        this.news = await findNewsInDay(newspaper as string, new Date(), 2);
        console.log(this.news);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
});
</script>
