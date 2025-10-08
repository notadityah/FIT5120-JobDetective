<template>
  <div
    v-if="show && currentRedFlag"
    class="modal fade show"
    style="display: block"
    tabindex="-1"
    @click="handleBackdropClick"
    @keydown.esc="$emit('close')"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="red-flag-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="modal-title-section">
            <h5 class="modal-title">Red Flag Detected!</h5>
          </div>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="explanation-section">
            <h6><i class="fas fa-info-circle me-2"></i>Why This Is Suspicious</h6>
            <p class="explanation-text">{{ currentRedFlag.explanation }}</p>
          </div>

          <div class="tips-section">
            <h6><i class="fas fa-lightbulb me-2"></i>What to Look For Instead</h6>
            <p class="tip-text">{{ currentRedFlag.tip }}</p>
          </div>

          <div class="severity-section">
            <h6><i class="fas fa-gauge-high me-2"></i>Risk Level</h6>
            <div class="severity-indicator">
              <span class="badge" :class="getSeverityClass(currentRedFlag.severity)">
                {{ currentRedFlag.severity.toUpperCase() }}
              </span>
              <span class="severity-description">
                {{ getSeverityDescription(currentRedFlag.severity) }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('close')">
            <i class="fas fa-check me-2"></i>
            Got It!
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <div v-if="show" class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  name: 'RedFlagModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentRedFlag: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleBackdropClick(event) {
      if (event.target === event.currentTarget) {
        this.$emit('close')
      }
    },

    getSeverityClass(severity) {
      const severityClasses = {
        low: 'bg-warning',
        medium: 'bg-warning',
        high: 'bg-danger',
      }
      return severityClasses[severity] || 'bg-secondary'
    },
    getSeverityDescription(severity) {
      const descriptions = {
        low: 'Minor concern - be cautious',
        medium: 'Moderate risk - investigate further',
        high: 'High risk - likely a scam',
      }
      return descriptions[severity] || 'Unknown risk level'
    },
  },
  emits: ['close'],

  mounted() {
    if (this.show) {
      document.body.style.overflow = 'hidden'
    }
  },

  beforeUnmount() {
    document.body.style.overflow = ''
  },

  watch: {
    show(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
        // Focus management for accessibility
        this.$nextTick(() => {
          const modal = this.$el.querySelector('.modal-content')
          if (modal) {
            modal.focus()
          }
        })
      } else {
        document.body.style.overflow = ''
      }
    },
  },
}
</script>

<style scoped>
/* Modal Styles */
.modal {
  z-index: 1055;
}

.modal-backdrop {
  z-index: 1050;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  outline: none;
  background: white;
}

.modal-header {
  background: #f8fafc;
  color: #0f172a;
  border-radius: 12px 12px 0 0;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.red-flag-icon {
  background: #ef4444;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  color: white;
}

.modal-title-section {
  flex: 1;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.red-flag-text {
  font-size: 0.95rem;
  margin: 0;
  font-style: italic;
  background: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  color: #475569;
}

.btn-close {
  background: #f1f5f9;
  border-radius: 6px;
  opacity: 1;
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border: 1px solid #cbd5e1;
  color: #64748b;
}

.btn-close:hover {
  background: #e2e8f0;
  color: #475569;
}

.modal-body {
  padding: 1.5rem;
  background: white;
}

.explanation-section,
.tips-section,
.severity-section {
  margin-bottom: 1.25rem;
}

.explanation-section:last-child,
.tips-section:last-child,
.severity-section:last-child {
  margin-bottom: 0;
}

.modal-body h6 {
  color: #0f172a;
  font-weight: 700;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.explanation-text,
.tip-text {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

.severity-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.severity-indicator .badge {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
}

.severity-indicator .badge.bg-warning {
  background-color: #f59e0b !important;
  color: white;
}

.severity-indicator .badge.bg-danger {
  background-color: #ef4444 !important;
  color: white;
}

.severity-indicator .badge.bg-secondary {
  background-color: #64748b !important;
  color: white;
}

.severity-description {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 400;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 12px 12px;
  background: #f8fafc;
  text-align: right;
}

.modal-footer .btn {
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  border: 1px solid #3b82f6;
  transition: all 0.2s ease;
  background-color: #3b82f6;
  color: white;
  font-size: 0.9rem;
}

.modal-footer .btn:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* Focus styles for accessibility */
.modal-content:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .modal-dialog {
    margin: 1rem;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .severity-indicator {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
