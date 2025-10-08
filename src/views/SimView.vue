<template>
  <div class="sim-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Interactive Scam Simulation</h1>
          <p class="hero-subtitle">
            Practice spotting red flags in fake job offers through interactive scenarios.
          </p>
        </div>
      </div>
    </section>

    <!-- Simulation Cards Section -->
    <section class="simulation-section">
      <div class="container">
        <div class="row g-4">
          <!-- Scenario 1: Engineering Manager -->
          <div class="col-lg-6 col-md-6">
            <div class="simulation-card h-100">
              <div class="card-icon mb-3">
                <i class="fas fa-cogs"></i>
              </div>
              <h3 class="card-title mb-3">Scenario 1: Engineering Manager</h3>
              <p class="card-description mb-4">
                Senior engineering role with emotional manipulation and excessive empowerment
                language.
              </p>
              <button
                class="btn btn-primary btn-simulation w-100"
                @click="startScenario('engineering-manager')"
              >
                Try Scenario
              </button>
            </div>
          </div>

          <!-- Scenario 2: Healthcare Manager -->
          <div class="col-lg-6 col-md-6">
            <div class="simulation-card h-100">
              <div class="card-icon mb-3">
                <i class="fas fa-user-md"></i>
              </div>
              <h3 class="card-title mb-3">Scenario 2: Healthcare Manager</h3>
              <p class="card-description mb-4">
                Quality improvement manager position with vague application process and generic
                descriptions.
              </p>
              <button
                class="btn btn-primary btn-simulation w-100"
                @click="startScenario('healthcare-manager')"
              >
                Try Scenario
              </button>
            </div>
          </div>

          <!-- Scenario 3: SkyNet IT Sales -->
          <div class="col-lg-6 col-md-6">
            <div class="simulation-card h-100">
              <div class="card-icon mb-3">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3 class="card-title mb-3">Scenario 3: IT Sales Professional</h3>
              <p class="card-description mb-4">
                Technology sales position with promotional language, incomplete contact info, and
                exaggerated company claims.
              </p>
              <button
                class="btn btn-primary btn-simulation w-100"
                @click="startScenario('skynet-sales')"
              >
                Try Scenario
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SimView',
  methods: {
    startScenario(scenarioId) {
      this.$router.push(`/simulation/scenario/${scenarioId}`)
    },
  },
}
</script>

<style scoped>
.sim-container {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

.hero-section {
  padding: 3rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 0 0 24px 24px;
}

.hero-content {
  text-align: center;
}

.hero-text {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 400;
}

.simulation-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.simulation-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: none;
  position: relative;
  transition: all 0.3s ease;
}

.simulation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4f7cff 0%, #3b5aa0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.card-title {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn-simulation {
  background: linear-gradient(135deg, #4f7cff 0%, #3b5aa0 100%);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
}

.btn-simulation:hover {
  background: linear-gradient(135deg, #3b5aa0 0%, #2d4373 100%);
  transform: translateY(-1px);
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .simulation-section {
    padding: 2rem 1.5rem;
  }

  .simulation-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2.25rem 1rem 1.25rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .simulation-section {
    padding: 1.5rem 1rem;
  }
}
</style>
