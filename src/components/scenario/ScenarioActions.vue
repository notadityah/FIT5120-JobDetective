<template>
  <!-- Action Buttons -->
  <div class="scenario-actions">
    <div class="action-buttons">
      <button
        class="btn btn-primary btn-lg"
        @click="$emit('reveal-red-flags')"
        :disabled="redFlagsRevealed"
      >
        <i class="fas fa-flag me-2"></i>
        {{ redFlagsRevealed ? 'Red Flags Revealed' : 'Reveal Red Flags' }}
      </button>

      <button class="btn btn-outline-primary btn-lg" @click="$emit('go-back')">
        <i class="fas fa-arrow-left me-2"></i>Try Another Scenario
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScenarioActions',
  props: {
    redFlagsRevealed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['reveal-red-flags', 'go-back'],
}
</script>

<style scoped>
.scenario-actions {
  margin: 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
