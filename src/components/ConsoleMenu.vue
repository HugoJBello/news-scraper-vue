<template>
   <div
        class="card mb-3 centered"
        style="max-width: 1200px"
        v-if="indexes"
        v-for="item in indexes"
      >
        <RouterLink :to="getlink(item)">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="item.image" class="img-fluid img-thumbnail" />
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

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { getAllIndexes } from "../services/apiService";
import type { ScrapingIndex } from "@/models/ScrapingIndex";

export default defineComponent({
  data() {
    return {
      indexes: [],
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
      getlink(news: ScrapingIndex) {
      return "/source/" + news.newspaper.replace(".", "_");
    },
  },

  async created() {
    await this.getData();
  },

});
</script>
