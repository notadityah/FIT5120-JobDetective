<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid px-4">
      <!-- Brand Logo -->
      <router-link class="navbar-brand" to="/">
        <span class="brand-box">JobDetective</span>
      </router-link>

      <!-- Toggler Button for Mobile-->
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

      <!-- Navbar -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="setActiveLink('report-scam')"> Report Scam </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="setActiveLink('simulation')"> Simulation </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="setActiveLink('about')"> Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.custom-navbar {
  background-color: #b6ccd7;
  padding: 0.75rem 0;
  border-bottom: 2px solid #2839a7;
}

.brand-box {
  background-color: #2839a7;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
}

.navbar-brand {
  text-decoration: none;
}

.nav-link {
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.btn-login {
  background-color: #2839a7;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.navbar-toggler {
  border: none;
  padding: 4px 8px;
}
</style>
