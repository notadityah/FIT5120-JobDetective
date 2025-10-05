<template>
  <!-- Reusable button component with styling variants and loading state -->
  <button :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
    <div v-if="loading" class="spinner-small"></div>
    <slot v-else></slot>
  </button>
</template>

<script setup>
// Provides configurable button styles and emits click events when enabled
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'danger', 'back', 'tab', 'ghost'].includes(value),
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => [
  'base-btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-active': props.active,
    'btn-disabled': props.disabled || props.loading,
    'btn-loading': props.loading,
  },
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-btn {
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

/* Size variants */
.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Color variants */
.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(.btn-disabled) {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover:not(.btn-disabled) {
  background: #b91c1c;
}

.btn-back {
  background: #6b7280;
  color: white;
}

.btn-back:hover:not(.btn-disabled) {
  background: #4b5563;
}

.btn-tab {
  background: none;
  border: none;
  border-radius: 0;
  color: #a0aec0;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  border-bottom: 2px solid transparent;
  flex: 1;
  text-align: center;
  padding: 1rem 2rem;
}

.btn-tab:hover:not(.btn-disabled) {
  color: #63b3ed;
}

.btn-tab.btn-active {
  color: #63b3ed;
  border-bottom-color: #63b3ed;
}

.btn-ghost {
  background: none;
  border: 2px solid #63b3ed;
  color: #63b3ed;
  border-radius: 6px;
}

.btn-ghost:hover:not(.btn-disabled) {
  background: #63b3ed;
  color: white;
}

/* States */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-loading {
  cursor: wait;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
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
  .btn-tab {
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
