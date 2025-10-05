<template>
  <!-- Awareness hub section embedding the scam news carousel -->
  <section class="content-section">
    <div class="section-header">
      <h2 class="section-title">Recent Scam News</h2>
      <p class="section-subtitle">Stay updated with the latest scam trends and warnings</p>
    </div>

    <div class="news-wrapper">
      <NewsCarousel />
    </div>
  </section>
</template>

<script setup>
// Wraps the NewsCarousel component for consistent section styling
import NewsCarousel from '@/components/NewsCarousel.vue'
</script>

<style scoped>
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.news-wrapper {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .content-section {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 2rem 1rem;
  }
}
</style>
