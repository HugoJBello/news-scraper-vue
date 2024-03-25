<template>
  
</template>

<style scoped>
</style>

<script lang="ts">

import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { ApiService } from "@/services/apiService";
import { useCustomUrlStore } from "@/stores/customUrl";

export default defineComponent({
  setup(){
    const customUrlStore= useCustomUrlStore();
    const apiService = new ApiService()
    return {customUrlStore, apiService}
  },
  data() {
    return {
      customUrl: undefined as undefined | string,
      allScrapers: [] as string[],
      selectedScraper: "" as string,
    };
  },
  methods: {
    async isActiveUrl(url:string){
      try{
        this.apiService.baseUrl = url
        const config = await this.apiService.findGlobalConfig(null)
        if (config.scraperId){
          return true
        }
      } catch (err){
        return false
      }
      
    },
    ...mapActions(useCustomUrlStore, ['selectCustomUrl']),
  },

  created() {
  }
});
</script>
