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
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>Scam Detection Simulation</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>Reported Jobs</a>
          </li> -->
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
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3c00ff !important;
}

/* Active tab underline */
.nav-link.router-link-active {
  color: #fff !important;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  border-radius: 1px;
}

/* Optional: Add hover underline effect for non-active links */
.nav-link:not(.router-link-active)::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #3c00ff;
  border-radius: 1px;
  transition: width 0.3s ease;
}

.nav-link:not(.router-link-active):hover::after {
  width: 100%;
}
</style>
