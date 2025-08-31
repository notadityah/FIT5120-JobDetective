<script setup>
import NavigationBar from './components/NavigationBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showNavBar = route.name !== 'login' // Hide nav bar on login page
</script>

<template>
  <header v-if="showNavBar">
    <NavigationBar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  min-height: 65vh;
  background-color: #ffffff;
}
</style>
