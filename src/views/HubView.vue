<template>
  <!-- Awareness hub orchestrating checklist, reports, statistics, and news tabs -->
  <div class="hub-container">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Awareness Hub</h1>
          <p class="hero-subtitle">Learn how to spot scams before they reach you.</p>
          <TabNavigation :tabs="tabs" :active-tab="activeTab" @tab-change="activeTab = $event" />
        </div>
      </div>
    </section>

    <ChecklistSection v-if="activeTab === 'before'" />
    <ScamReportsSection v-else-if="activeTab === 'reported'" />
    <StatisticsSection v-else-if="activeTab === 'statistics'" />
    <NewsSection v-else-if="activeTab === 'news'" />

    <CallToActionSection />
  </div>
</template>

<script setup>
// Handles tab state for awareness hub sections and renders each module
import { ref } from 'vue'
import TabNavigation from '@/components/TabNavigation.vue'
import ChecklistSection from '@/components/hub/ChecklistSection.vue'
import ScamReportsSection from '@/components/hub/ScamReportsSection.vue'
import StatisticsSection from '@/components/hub/StatisticsSection.vue'
import NewsSection from '@/components/hub/NewsSection.vue'
import CallToActionSection from '@/components/hub/CallToActionSection.vue'

const tabs = [
  { id: 'before', label: 'Before You Apply Checklist' },
  { id: 'reported', label: 'Recently Reported Scams' },
  { id: 'statistics', label: 'Australian Scam Statistics' },
  { id: 'news', label: 'Recent Scam News' },
]

const activeTab = ref('before')
</script>

<style scoped>
.hub-container {
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

@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2.25rem 1rem 1.25rem;
  }

  .hero-title {
    font-size: 2rem;
  }
}
</style>
