

<template>

<div>setup {{id}}</div>
</template>

<style scoped>

</style>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  data() {
    return {
      id:  this.$route.params.id
    }
  }
})
</script>