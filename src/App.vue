<script setup lang="ts">
import { RouterView } from "vue-router";
import NavbarTop from "./components/NavbarTop.vue";
import Alert from "./components/Alert.vue";
</script>

<template>
  <div>
    <NavbarTop />
    <Alert/>
    <RouterView />
  </div>
</template>

<style scoped></style>
