<template>
  <!-- Interactive checklist guiding students through safe job application steps -->
  <section class="content-section">
    <div class="section-header">
      <h2 class="section-title">Before You Apply Checklist</h2>
      <p class="section-subtitle">Understand the job and the company before you apply</p>
    </div>

    <div class="progress-summary">
      <div class="progress-info">
        <div class="progress-stats">
          <span class="progress-text">
            Progress: {{ totalCompletedItems }}/{{ totalItems }} items completed
          </span>
          <div class="overall-progress-bar">
            <div
              class="overall-progress-fill"
              :style="{ width: overallProgressPercentage + '%' }"
            ></div>
          </div>
          <span class="progress-percentage">{{ Math.round(overallProgressPercentage) }}%</span>
        </div>
      </div>

      <div class="reset-section" v-if="totalCompletedItems > 0">
        <button class="reset-button" @click="showResetConfirmation = true">
          <i class="fas fa-undo"></i>
          Reset Progress
        </button>
      </div>
    </div>

    <p v-if="showCompletionMessage" class="completion-message">
      Nice work! You've ticked every step. Share what you've learned and help others stay scam
      aware.
    </p>

    <div
      class="checklist-grid"
      :class="{
        'has-expanded-1': expandedCard === 1,
        'has-expanded-2': expandedCard === 2,
        'has-expanded-3': expandedCard === 3,
        'has-expanded-4': expandedCard === 4,
      }"
    >
      <div
        v-for="step in steps"
        :key="step.number"
        class="checklist-card"
        :class="{
          expanded: expandedCard === step.number,
          completed: getStepProgressPercentage(step.number) === 100,
        }"
      >
        <div class="checklist-header" @click="toggleCard(step.number)">
          <div class="step-number">{{ step.number }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <div class="expand-icon" v-if="expandedCard !== step.number">
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="expand-icon" v-else>
            <i class="fas fa-chevron-up"></i>
          </div>
        </div>

        <div class="card-progress">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: getStepProgressPercentage(step.number) + '%' }"
            ></div>
          </div>
        </div>

        <transition name="expand">
          <div v-if="expandedCard === step.number" class="checklist-content">
            <div class="todo-list">
              <div
                v-for="(item, index) in step.details"
                :key="index"
                class="todo-item"
                :class="{ completed: completedItems[`${step.number}-${index}`] }"
              >
                <label class="todo-checkbox" @click.stop>
                  <input
                    type="checkbox"
                    v-model="completedItems[`${step.number}-${index}`]"
                    @change="updateProgress(step.number)"
                  />
                  <span class="checkmark"></span>
                  <div class="todo-content">
                    <span class="todo-text">{{ item.text }}</span>
                    <div v-if="item.links?.length" class="todo-links">
                      <span
                        v-for="(link, linkIndex) in item.links"
                        :key="linkIndex"
                        class="todo-link"
                        @click="handleLinkClick(link.url, $event)"
                      >
                        {{ link.text }}
                        <i class="fas fa-external-link-alt"></i>
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="showResetConfirmation" class="modal-overlay" @click="showResetConfirmation = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Reset Progress</h3>
          <button class="modal-close" @click="showResetConfirmation = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to reset all your checklist progress?</p>
          <p class="modal-warning">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button cancel" @click="showResetConfirmation = false">Cancel</button>
          <button class="modal-button confirm" @click="resetProgress">Reset Progress</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Tracks checklist progress with localStorage persistence and auto-advancing cards
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const CHECKLIST_CACHE_KEY = 'jobdetective_checklist_progress'

const router = useRouter()
const expandedCard = ref(1)
const completedItems = ref({})
const showResetConfirmation = ref(false)
const showCompletionMessage = ref(false)

const steps = [
  {
    number: 1,
    title: 'Research the Employer',
    details: [
      {
        text: "Look up the company's website and career page",
        links: [],
      },
      {
        text: 'Check for online presence on LinkedIn, Seek, or industry directories',
        links: [
          { text: 'LinkedIn', url: 'https://www.linkedin.com/jobs' },
          { text: 'Seek', url: 'https://www.seek.com.au' },
        ],
      },
      {
        text: 'Read company reviews on trusted sites',
        links: [
          { text: 'Trustpilot', url: 'https://au.trustpilot.com/' },
          { text: 'Glassdoor', url: 'https://www.glassdoor.com.au' },
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Check Contact Details',
    details: [
      {
        text: 'Verify a legitimate phone number, email with a company domain, and a physical address.',
        links: [],
      },
      {
        text: 'Be cautious if communication only happens through messaging apps',
        links: [],
      },
    ],
  },
  {
    number: 3,
    title: 'Validate the Offer',
    details: [
      {
        text: 'Compare the salary with industry standards for similar roles',
        links: [
          {
            text: 'RobertHalf Salary Guide',
            url: 'https://www.roberthalf.com/au/en/insights/salary-guide/calculator',
          },
          {
            text: 'PayScale',
            url: 'https://www.payscale.com/research/AU/Country=Australia/Salary',
          },
        ],
      },
      {
        text: 'Be wary of offers that sound "too good to be true" or include urgent pressure tactics',
        links: [],
      },
      {
        text: 'Ensure the job description is detailed, consistent, and relevant to the role advertised.',
        links: [],
      },
    ],
  },
  {
    number: 4,
    title: 'Protect Your Application',
    details: [
      {
        text: 'Never provide sensitive information (bank details, full ID, or upfront payments).',
        links: [],
      },
      {
        text: 'Apply through secure, reputable job portals when possible',
        links: [
          { text: 'Seek', url: 'https://www.seek.com.au' },
          { text: 'Indeed', url: 'https://au.indeed.com' },
          { text: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs' },
        ],
      },
      {
        text: "If in doubt, use Job Detective's Analyse Job or report suspicious ads to Scamwatch.",
        links: [
          { text: 'Analyse Job', url: '/analyse' },
          { text: 'Scamwatch', url: 'https://www.scamwatch.gov.au/report-a-scam' },
        ],
      },
    ],
  },
]

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(CHECKLIST_CACHE_KEY)
    if (saved) {
      completedItems.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading checklist progress:', error)
  }
}

const saveProgress = () => {
  try {
    localStorage.setItem(CHECKLIST_CACHE_KEY, JSON.stringify(completedItems.value))
  } catch (error) {
    console.error('Error saving checklist progress:', error)
  }
}

watch(completedItems, saveProgress, { deep: true })

onMounted(() => {
  loadProgress()
})

const toggleCard = (cardNumber) => {
  expandedCard.value = expandedCard.value === cardNumber ? null : cardNumber
}

const resetProgress = () => {
  completedItems.value = {}
  showResetConfirmation.value = false
  expandedCard.value = 1
  showCompletionMessage.value = false
}

const getStepProgress = (stepNumber) => {
  const stepItems = steps.find((step) => step.number === stepNumber)?.details || []
  let completed = 0
  stepItems.forEach((_, index) => {
    if (completedItems.value[`${stepNumber}-${index}`]) {
      completed += 1
    }
  })
  return completed
}

const getStepProgressPercentage = (stepNumber) => {
  const stepItems = steps.find((step) => step.number === stepNumber)?.details || []
  const completed = getStepProgress(stepNumber)
  return stepItems.length > 0 ? (completed / stepItems.length) * 100 : 0
}

const updateProgress = (stepNumber) => {
  const progress = getStepProgressPercentage(stepNumber)
  if (progress === 100) {
    if (expandedCard.value === stepNumber && stepNumber < steps.length) {
      expandedCard.value = stepNumber + 1
    } else if (expandedCard.value === stepNumber && stepNumber === steps.length) {
      expandedCard.value = null
    }
  }
}

const handleLinkClick = (url, event) => {
  event.stopPropagation()
  if (url.startsWith('/')) {
    router.push(url)
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const totalItems = computed(() => steps.reduce((total, step) => total + step.details.length, 0))

const totalCompletedItems = computed(() => {
  let completed = 0
  steps.forEach((step) => {
    step.details.forEach((_, index) => {
      if (completedItems.value[`${step.number}-${index}`]) {
        completed += 1
      }
    })
  })
  return completed
})

const overallProgressPercentage = computed(() =>
  totalItems.value > 0 ? (totalCompletedItems.value / totalItems.value) * 100 : 0,
)

watch(totalCompletedItems, (newValue) => {
  if (totalItems.value > 0 && newValue === totalItems.value) {
    showCompletionMessage.value = true
  } else if (newValue < totalItems.value) {
    showCompletionMessage.value = false
  }
})
</script>

<style scoped>
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.progress-summary {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.progress-info {
  flex: 1;
}

.progress-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-text {
  font-size: 1rem;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
}

.overall-progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  min-width: 200px;
}

.overall-progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-percentage {
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
  white-space: nowrap;
}

.reset-section {
  flex-shrink: 0;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover:not(:disabled) {
  background: #dc2626;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  transition: grid-template-columns 0.3s ease;
}

.checklist-grid.has-expanded-1 {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

.checklist-grid.has-expanded-2 {
  grid-template-columns: 1fr 2fr 1fr 1fr;
}

.checklist-grid.has-expanded-3 {
  grid-template-columns: 1fr 1fr 2fr 1fr;
}

.checklist-grid.has-expanded-4 {
  grid-template-columns: 1fr 1fr 1fr 2fr;
}

.checklist-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 540px;
  min-height: 540px;
  max-height: 540px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.checklist-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.checklist-card.expanded {
  background: #f8fafc;
  border-color: #3b82f6;
  box-shadow:
    0 0 0 1px #3b82f6,
    0 20px 25px -5px rgba(59, 130, 246, 0.1),
    0 10px 10px -5px rgba(59, 130, 246, 0.04);
}

.checklist-card.completed {
  background: #f0fdf4;
  border-color: #22c55e;
  box-shadow:
    0 0 0 1px #22c55e,
    0 20px 25px -5px rgba(34, 197, 94, 0.1),
    0 10px 10px -5px rgba(34, 197, 94, 0.04);
}

.checklist-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.checklist-header:hover {
  background: #f8fafc;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #e2e8f0;
  color: #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border: 2px solid #cbd5e1;
  transition: all 0.3s ease;
}

.checklist-card.expanded .step-number {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #93c5fd;
}

.checklist-card.completed .step-number {
  background: #dcfce7;
  color: #15803d;
  border-color: #86efac;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
  text-align: center;
}

.expand-icon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: #9ca3af;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.card-progress {
  margin-top: auto;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #9ca3af;
  border-radius: 3px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.checklist-card.expanded .progress-fill {
  background: #3b82f6;
}

.checklist-card.completed .progress-fill {
  background: #22c55e;
}

.checklist-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  flex: 1;
  overflow-y: auto;
  max-height: calc(540px - 140px);
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  transition: all 0.2s ease;
}

.todo-item.completed {
  opacity: 0.7;
}

.todo-checkbox {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.5;
  gap: 0.75rem;
  color: #374151;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.todo-checkbox:hover {
  background: #f9fafb;
}

.todo-checkbox input[type='checkbox'] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 1px;
  background: #ffffff;
}

.todo-checkbox:hover .checkmark {
  border-color: #9ca3af;
}

.todo-checkbox input[type='checkbox']:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.todo-checkbox input[type='checkbox']:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-text {
  color: #374151;
  font-weight: 400;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.todo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #1f2937;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.todo-link:hover {
  background: #3b82f6;
  border-color: #2563eb;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
}

.modal-close:hover {
  background: #f1f5f9;
}

.modal-body {
  padding: 1.5rem;
}

.modal-warning {
  color: #dc2626;
  font-weight: 500;
  font-size: 0.9rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.modal-button.cancel {
  background: #ffffff;
  border-color: #d1d5db;
  color: #374151;
}

.modal-button.cancel:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.modal-button.confirm {
  background: #dc2626;
  color: #ffffff;
}

.modal-button.confirm:hover {
  background: #b91c1c;
  transform: translateY(-1px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.completion-message {
  margin-top: 1rem;
  text-align: center;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .checklist-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .checklist-card {
    height: auto;
    min-height: 0;
    max-height: none;
  }

  .checklist-content {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .content-section {
    padding: 2.5rem 1.5rem;
  }

  .progress-summary {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .progress-stats {
    flex-direction: column;
    align-items: stretch;
  }

  .progress-text,
  .progress-percentage {
    text-align: center;
  }

  .checklist-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
