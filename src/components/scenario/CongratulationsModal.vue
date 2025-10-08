<template>
  <!-- Simplified Congratulations Modal -->
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="congratulations-modal" @click.stop>
      <div class="congrats-header">
        <h3><i class="fas fa-check-circle me-2"></i>Well Done!</h3>
        <button class="modal-close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="congrats-body">
        <div class="success-message">
          <p>
            You successfully identified all <strong>{{ totalRedFlags }} red flags</strong> in this
            job posting!
          </p>
          <p>You're now better equipped to spot similar warning signs in real job scams.</p>
        </div>

        <div class="completion-stats">
          <div class="stat-row">
            <span class="stat-label">Red Flags Found:</span>
            <span class="stat-value">{{ totalRedFlags }}/{{ totalRedFlags }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Completion:</span>
            <span class="stat-value success">100%</span>
          </div>
        </div>

        <div class="skills-learned">
          <h4>Key Skills Developed:</h4>
          <ul>
            <li v-for="skill in completionSkills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>

      <div class="congrats-footer">
        <button class="btn btn-outline-primary" @click="$emit('try-another')">
          <i class="fas fa-redo me-2"></i>Try Another Scenario
        </button>
        <button class="btn btn-primary" @click="$emit('go-back')">
          <i class="fas fa-arrow-left me-2"></i>Back to Simulations
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CongratulationsModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    totalRedFlags: {
      type: Number,
      required: true,
    },
    completionSkills: {
      type: Array,
      required: true,
    },
  },
  emits: ['close', 'try-another', 'go-back'],
}
</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Congratulations Modal */
.congratulations-modal {
  background: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 550px;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid #e2e8f0;
  animation: modalSlideUp 0.3s ease;
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.congratulations-modal .congrats-header {
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.congratulations-modal .congrats-header h3 {
  margin: 0;
  color: #0f172a;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
}

.congratulations-modal .congrats-header .fas.fa-check-circle {
  color: #3b82f6;
}

.modal-close {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.congratulations-modal .congrats-body {
  padding: 2rem;
}

.success-message {
  text-align: center;
  margin-bottom: 2rem;
}

.success-message p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
}

.completion-stats {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-label {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 400;
}

.stat-value {
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
}

.stat-value.success {
  color: #3b82f6;
}

.skills-learned {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.skills-learned h4 {
  color: #0f172a;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.skills-learned ul {
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: none;
}

.skills-learned li {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  position: relative;
  font-weight: 400;
}

.skills-learned li::before {
  content: '✓';
  color: #3b82f6;
  font-weight: bold;
  position: absolute;
  left: -1.2rem;
}

.congratulations-modal .congrats-footer {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Responsive styles */
@media (max-width: 768px) {
  .congratulations-modal {
    width: 95%;
    margin: 1rem;
  }

  .congrats-header {
    padding: 2rem 1.5rem 1.5rem;
  }

  .congrats-header h2 {
    font-size: 2rem;
  }

  .congrats-body {
    padding: 1.5rem;
  }

  .completion-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .congrats-footer {
    padding: 1.5rem;
    flex-direction: column;
  }
}
</style>
