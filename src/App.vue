<script setup lang="ts">
import { RouterView } from "vue-router";
import NavbarTop from "./components/NavbarTop.vue";
import Alert from "./components/Alert.vue";
import Setup from "./components/Setup.vue";
</script>

<template>
  <div>
    <Setup/>
    <NavbarTop />
    <Alert/>
    <RouterView />
  </div>
</template>

<style scoped></style>
