<template>
  <div>console</div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { getAllIndexes } from "../services/apiService";

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
        this.indexes = indexes
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    await this.getData();
  },
});
</script>
