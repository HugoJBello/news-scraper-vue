<template>
    <div v-if="text" class="alert alert-warning alert-dismissible fade show" role="alert">
       {{text}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

</template>

<style scoped>
</style>

<script lang="ts">

import { defineComponent } from "vue";
import { useAlertStore } from "@/stores/alert";

export default defineComponent({
  props: {
    newspaper: String,
  },
  setup(){
    const alertStore= useAlertStore()
    return {alertStore}
  },
  data() {
    return {
      timer: null as null | any,
      text: undefined as undefined | string,
      type:  undefined as undefined | string,
    };
  },
  methods: {

  },
  created() {
    
    this.alertStore.$onAction(({name:name, args})=>{
      const text = args[0]      
      const type = args[1]      
      this.text = text
      this.type = type

      this.timer = setTimeout(()=>{
        this.text = undefined
        this.type = undefined
      }, 2000)

    }, true)
 
  },
  updated() {
    //this.getSources();
  },
});
</script>
