<template>
  <div>
    <div>setup {{ newspaper }}</div>
    <li v-for="item in news">- {{ item.headline }}</li>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { findNewsInDay } from "../services/apiService";

export default defineComponent({
  data() {
    return {
      newspaper: this.$route.params.newspaper,
      news: [],
    };
  },
  methods: {
    async getData() {
      try {
        const newspaper = this.newspaper.replace("_", ".");
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
