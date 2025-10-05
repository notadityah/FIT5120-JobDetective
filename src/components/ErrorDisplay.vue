<template>
  <!-- Unified error presentation block with optional retry control -->
  <div class="error-container" :class="containerClasses">
    <div v-if="showIcon" class="error-icon">{{ icon }}</div>
    <div class="error-text">{{ message }}</div>
    <div v-if="subMessage" class="error-sub-text">{{ subMessage }}</div>
    <BaseButton v-if="showRetry" @click="$emit('retry')" variant="secondary" class="retry-btn">
      {{ retryText }}
    </BaseButton>
  </div>
</template>

<script setup>
// Maps prop-driven variants to formatted error content and retry handling
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  message: { type: String, default: 'An error occurred' },
  subMessage: { type: String },
  showRetry: { type: Boolean, default: false },
  retryText: { type: String, default: 'Try Again' },
  showIcon: { type: Boolean, default: true },
  icon: { type: String, default: '⚠️' },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'stats', 'inline'].includes(value),
  },
})

defineEmits(['retry'])

const containerClasses = computed(() => ['error-container', `error-${props.variant}`])
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.error-default {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid #6b7280;
  max-width: 800px;
  width: 100%;
}

.error-stats {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid #6b7280;
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.error-inline {
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 1rem;
  border-radius: 8px;
  color: #991b1b;
}

.error-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.error-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e5e7eb;
  margin: 0;
}

.error-inline .error-text {
  color: #991b1b;
  font-size: 1rem;
}

.error-sub-text {
  font-size: 1rem;
  color: #9ca3af;
  margin: 0;
  opacity: 0.8;
}

.error-inline .error-sub-text {
  color: #7f1d1d;
}

.retry-btn {
  margin-top: 0.5rem;
}

.error-stats .error-text {
  color: #d1d5db;
  font-size: 1.4rem;
}

@media (max-width: 768px) {
  .error-default,
  .error-stats {
    padding: 2rem 1rem;
  }

  .error-text {
    font-size: 1rem;
  }

  .error-icon {
    font-size: 2rem;
  }
}
</style>
