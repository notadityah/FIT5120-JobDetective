<script setup>
import NavigationBar from './components/NavigationBar.vue'
import NavFooter from './components/NavFooter.vue'
</script>

<template>
  <header>
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
  background-color: var(--bg-primary);
}
</style>
