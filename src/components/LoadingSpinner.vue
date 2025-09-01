<template>
  <div class="loading-container" :class="containerClasses">
    <div v-if="showSpinner" class="spinner" :class="spinnerSize"></div>
    <div class="loading-text">{{ message }}</div>
    <div v-if="subMessage" class="loading-sub-text">{{ subMessage }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: 'Loading...' },
  subMessage: { type: String },
  showSpinner: { type: Boolean, default: true },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'analyzing', 'stats', 'centered'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})

const containerClasses = computed(() => [
  'loading-container',
  `loading-${props.variant}`,
  `loading-${props.size}`,
])

const spinnerSize = computed(() => `spinner-${props.size}`)
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Variant styles */
.loading-default {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #6b7280;
  max-width: 800px;
  width: 100%;
}

.loading-analyzing {
  padding: 3rem 2rem;
  color: #a0aec0;
  min-height: 200px;
}

.loading-stats {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid #6b7280;
  max-width: 800px;
  width: 100%;
}

.loading-centered {
  padding: 2rem;
  color: #a0aec0;
}

/* Size variants */
.loading-small {
  padding: 1rem;
}

.loading-medium {
  padding: 2rem;
}

.loading-large {
  padding: 3rem;
}

/* Spinner styles */
.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid #4a5568;
  border-top: 3px solid #63b3ed;
}

.spinner-medium {
  width: 50px;
  height: 50px;
  border: 4px solid #4a5568;
  border-top: 4px solid #63b3ed;
}

.spinner-large {
  width: 70px;
  height: 70px;
  border: 5px solid #4a5568;
  border-top: 5px solid #63b3ed;
}

/* Text styles */
.loading-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #e2e8f0;
}

.loading-analyzing .loading-text {
  color: #e2e8f0;
  font-size: 1.2rem;
}

.loading-default .loading-text,
.loading-stats .loading-text {
  color: #d1d5db;
  font-size: 1.4rem;
}

.loading-sub-text {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
  color: #cbd5e1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .loading-default,
  .loading-stats {
    padding: 2rem 1rem;
  }

  .loading-text {
    font-size: 1rem;
  }
}
</style>
