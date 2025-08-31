<script setup>
import NavigationBar from './components/NavigationBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showNavBar = computed(() => route.name !== 'login') // Make it reactive
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
