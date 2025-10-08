<template>
  <div class="instructions-container mb-4">
    <!-- Full instructions when visible -->
    <div v-if="isVisible" class="instructions-section">
      <div class="instruction-header">
        <h3><i class="fas fa-graduation-cap me-2"></i>How to Use This Simulation</h3>
        <button
          @click="toggleVisibility"
          class="btn btn-sm btn-outline-secondary hide-btn"
          title="Hide Instructions"
        >
          <i class="fas fa-chevron-up"></i>
        </button>
      </div>

      <div class="instruction-cards">
        <div class="instruction-card">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Look Carefully</h4>
            <p>
              Read through the job posting below. Some text contains hidden red flags that indicate
              scam tactics.
            </p>
          </div>
        </div>

        <div class="instruction-card">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Hover to Discover</h4>
            <p>
              Move your mouse over text to reveal clickable areas. Suspicious text will show a mouse
              pointer.
            </p>
            <div class="example-highlight">Try hovering here!</div>
          </div>
        </div>

        <div class="instruction-card">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Click to Learn</h4>
            <p>
              Click on suspicious text to see detailed explanations of why it's a red flag and what
              to look for instead.
            </p>
          </div>
        </div>

        <div class="instruction-card">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>Need Help?</h4>
            <p>
              Stuck? Use the "Reveal Red Flags" button below to highlight all suspicious areas at
              once.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Minimized header when hidden -->
    <div v-else class="instructions-minimized">
      <button @click="toggleVisibility" class="btn btn-outline-primary minimized-btn">
        <i class="fas fa-graduation-cap me-2"></i>Show Instructions
        <i class="fas fa-chevron-down ms-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScenarioInstructions',
  data() {
    return {
      isVisible: true,
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>

<style scoped>
/* Instructions Section Styles - Matching HubView Design System */
/* Container for both states - ensures consistent spacing */

.instructions-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  color: #0f172a;
}

.instruction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.instruction-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.hide-btn {
  border-color: #64748b;
  color: #64748b;
}

.hide-btn:hover {
  background-color: #64748b;
  border-color: #64748b;
  color: white;
}

.instructions-minimized {
  text-align: center;
}

.minimized-btn {
  border-color: #3b82f6;
  color: #3b82f6;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

.minimized-btn:hover {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.instruction-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.instruction-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: white;
}

.step-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.step-content p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #64748b;
  font-weight: 400;
}

.example-highlight {
  background: #e2e8f0;
  color: #475569;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #cbd5e1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-highlight:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #1e40af;
  transform: scale(1.02);
}

/* Button hover effects only */
.btn:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Responsive styles */
@media (max-width: 768px) {
  .instructions-section {
    padding: 1.5rem;
  }

  .instruction-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .instruction-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .instruction-card {
    padding: 1.25rem;
  }

  .instruction-header h3 {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .instructions-section {
    padding: 1.25rem;
  }

  .instruction-header h3 {
    font-size: 1.1rem;
  }

  .minimized-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
