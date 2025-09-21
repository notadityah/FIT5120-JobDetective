<script setup>
import NavigationBar from './components/NavigationBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import NavFooter from './components/NavFooter.vue'

const route = useRoute()
// Hide navigation bar on login page only
const showNavBar = computed(() => route.name !== 'login')
</script>

<template>
  <header v-if="showNavBar">
    <NavigationBar />
  </header>
  <main>
    <router-view />
  </main>
  <NavFooter />
</template>

<style scoped>
main {
  min-height: 65vh;
  background-color: #ffffff;
}
</style>
