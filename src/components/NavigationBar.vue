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
            <router-link class="nav-link" to="/analyse">Analyse Jobs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/report">My Report</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/hub">Awareness Hub</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/simulation">Scam Simulation</router-link>
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
.navbar {
  background: linear-gradient(90deg, #0f172a, #1e293b) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.brand-icon {
  margin-right: 0.5rem;
  font-size: 1.6rem;
}

.nav-link {
  font-weight: 500;
  margin: 0 0.5rem;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8) !important;
}

.nav-link:hover {
  color: #ffffff !important;
  background: rgba(59, 130, 246, 0.1);
}

.nav-link.router-link-active {
  color: #fff !important;
  background: rgba(59, 130, 246, 0.15);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 1px;
}

/* Animated underline for non-active links */
.nav-link:not(.router-link-active)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 1px;
  transition: width 0.3s ease;
}

.nav-link:not(.router-link-active):hover::after {
  width: 40%;
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}
</style>
