<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span class="brand-icon">🕵️</span>
        JobDetective
      </router-link>

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
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/analyze">Analyze Job</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>Scam Detection Simulation</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>Reported Jobs</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.brand-icon {
  margin-right: 0.5rem;
}

.nav-link {
  font-weight: 500;
  margin: 0 0.5rem;
}

.nav-link:hover {
  color: #3c00ff !important;
}
</style>
