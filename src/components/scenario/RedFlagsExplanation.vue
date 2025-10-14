<template>
  <!-- Red Flags Explanation (shown after reveal) -->
  <div v-if="redFlagsRevealed" class="red-flags-explanation">
    <h3 class="explanation-title">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Red Flags Identified
    </h3>

    <div class="red-flag-cards">
      <div class="red-flag-card" v-for="flag in redFlagExplanations" :key="flag.type">
        <div class="flag-header">
          <i class="fas fa-flag flag-icon"></i>
          <h5>{{ flag.title }}</h5>
        </div>
        <p class="flag-description">{{ flag.description }}</p>
        <div class="flag-tip"><strong>Tip:</strong> {{ flag.tip }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedFlagsExplanation',
  props: {
    redFlagsRevealed: {
      type: Boolean,
      required: true,
    },
    redFlagExplanations: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.red-flags-explanation {
  margin-top: 3rem;
  padding: 2rem;
  background: #fef2f2;
  border-radius: 12px;
  border-left: 4px solid #dc2626;
}

.explanation-title {
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.red-flag-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.red-flag-card {
  background: #ffffff;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1.5rem;
}

.flag-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.flag-icon {
  color: #dc2626;
  font-size: 1.25rem;
}

.flag-header h5 {
  color: #0f172a;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.flag-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-weight: 400;
}

.flag-tip {
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  font-size: 0.9rem;
  color: #475569;
}

/* Responsive styles */
@media (max-width: 768px) {
  .red-flag-cards {
    grid-template-columns: 1fr;
  }
}
</style>
