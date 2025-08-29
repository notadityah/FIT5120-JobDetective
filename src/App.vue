<script setup>
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header>
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
