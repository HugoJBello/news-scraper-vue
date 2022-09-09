<template>
  <div>setup {{ newspaper }}</div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { getAllIndexes } from "../services/apiService";

export default defineComponent({
  data() {
    return {
      id: this.$route.params.newspaper,
      indexes: [],
    };
  },
  methods: {
    async getData() {
      try {
        this.indexes = await getAllIndexes();
        console.log(this.indexes);
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
