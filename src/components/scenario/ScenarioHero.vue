<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle">{{ intro }}</p>

        <!-- Back Button -->
        <div class="hero-actions">
          <button class="btn btn-outline-secondary" @click="$emit('go-back')">
            <i class="fas fa-arrow-left me-2"></i>Back to Simulations
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ScenarioHero',
  props: {
    title: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
  },
  emits: ['go-back'],
}
</script>

<style scoped>
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
  font-size: 2.5rem;
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

.hero-actions {
  margin-top: 1.5rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }
}
</style>
