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
  background: rgba(30, 41, 59, 0.7);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  height: 100%;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-hoverable:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  background: rgba(30, 41, 59, 0.85);
}

.card-hoverable:hover::before {
  opacity: 1;
}

.card-highlight {
  border-color: rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform 0.3s ease;
}

.card-hoverable:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.feature-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.card-hoverable:hover .feature-title::after {
  width: 50px;
}

.feature-description {
  color: #cbd5e1;
  line-height: 1.7;
  margin: 0;
  transition: color 0.3s ease;
}

.card-hoverable:hover .feature-description {
  color: #e2e8f0;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
