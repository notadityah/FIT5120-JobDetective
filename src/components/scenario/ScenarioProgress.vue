<template>
  <!-- Progress Indicator -->
  <div class="progress-section mb-4" v-if="totalRedFlags > 0">
    <div class="progress-header">
      <h4><i class="fas fa-trophy me-2"></i>Your Progress</h4>
      <span class="progress-text"
        >{{ discoveredCount }} of {{ totalRedFlags }} red flags discovered</span
      >
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
    <div class="progress-percentage">{{ progressPercentage }}% Complete</div>
  </div>
</template>

<script>
export default {
  name: 'ScenarioProgress',
  props: {
    discoveredCount: {
      type: Number,
      required: true,
    },
    totalRedFlags: {
      type: Number,
      required: true,
    },
    progressPercentage: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
/* Progress Section Styles */
.progress-section {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-header h4 {
  color: #0f172a;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.progress-text {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 400;
}

.progress-bar {
  background: #e2e8f0;
  border-radius: 8px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: #3b82f6;
  height: 100%;
  border-radius: 8px;
  transition: width 0.6s ease;
}

.progress-percentage {
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Responsive styles */
@media (max-width: 768px) {
  .progress-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .progress-section {
    padding: 1rem;
  }
}
</style>
