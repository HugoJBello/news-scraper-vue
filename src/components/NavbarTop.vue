<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" >
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Sources</RouterLink>
          </li>
          <li class="nav-item" v-if="sourcesInfo" v-for="item in sourcesInfo">
            <RouterLink class="nav-link" :to="getlink(item)">{{item.newspaper}}</RouterLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
<script lang="ts">
import { defineComponent } from "vue";
import type { SourceInfo } from "../services/sourceInfoService";

import { getAllSources } from "../services/sourceInfoService";

export default defineComponent({
  props: {
    newspaper: String,
  },
  data() {
    return {
      sourcesInfo: undefined as SourceInfo[]|undefined,
    };
  },
  methods: {
    async getData() {
        this.sourcesInfo = getAllSources();
        console.log("----------", this.sourcesInfo);
        },
    getlink(source: SourceInfo) {
      return "/source/" + source.newspaper.replace(".", "_");
    },
  },

  created() {
    this.getData();
  },
  updated() {
    this.getData();
  },
});
</script>
