<template>
<div class="card_container">
<div class="centered">
    <MasonryWall :items="indexes" :ssr-columns="1" :column-width="400" :gap="16">
    <template #default="{ item }">

    <div class="card mb-3"
    style="max-width: 1200px">
    <RouterLink :to="getlink(item)">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="getImage(item.newspaper)"
            class="img-fluid img-thumbnail img-max"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ item.newspaper }}</h5>
            <p class="card-text">
              <small class="text-muted">{{ item.dateScraping }}</small>
            </p>
          </div>
        </div>
        </div>
    </RouterLink>
    </div>
    </template>
  </MasonryWall>
  </div>
  </div>
</template>

<style scoped lang="scss">
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
.img-max{
  max-height:100px;
}
.card_container {
  margin-top:30px;
  display: flex;
  justify-content: center;
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
import { getAllIndexes } from "../services/apiService";
import type { ScrapingIndexI } from "@/models/ScrapingIndex";
import { sourceInfoDecider } from "../services/sourceInfoService";

export default defineComponent({
  data() {
    return {
      indexes: [] as ScrapingIndexI[],
    };
  },
  methods: {
    async getData() {
      try {
        const indexes = await getAllIndexes();
        this.indexes = indexes;
      } catch (error) {
        console.log(error);
      }
    },
    getlink(news: ScrapingIndexI) {
      return "/source/" + news.newspaper.replace(".", "_");
    },
    getImage(newspaper: string) {
      const sourceInfo = sourceInfoDecider(newspaper);
      return sourceInfo.logoUrl;
    },
  },

  async created() {
    await this.getData();
  },
});
</script>
