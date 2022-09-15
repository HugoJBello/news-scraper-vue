<template>
  <div>
    <div>setup {{ newsItem.headline }}</div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { getNewsItem } from "../services/apiService";
//ab1c7ddb-a19c-49a9-b80e-a53e7db5e91c

export default defineComponent({
  data() {
    return {
      id: this.$route.params.id,
      newsItem: {},
    };
  },
  methods: {
    async getData() {
      try {
        this.newsItem = await getNewsItem(this.id as string);
        console.log(this.newsItem);
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
