<template>
  <div class="feature-card" :class="cardClasses">
    <div class="feature-icon">{{ icon }}</div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-description">{{ description }}</p>
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'highlight'].includes(value),
  },
  hoverable: { type: Boolean, default: true },
})

const cardClasses = computed(() => [
  'feature-card',
  `card-${props.variant}`,
  {
    'card-hoverable': props.hoverable,
  },
])
</script>

<style scoped>
.feature-card {
  background: #1e293b;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid #334155;
  text-align: center;
  transition: all 0.3s ease;
}

.card-hoverable:hover {
  transform: translateY(-5px);
  border-color: #3b82f6;
}

.card-highlight {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
}

.feature-description {
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .feature-card {
    padding: 2rem;
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.3rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}
</style>
