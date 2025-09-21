<template>
  <div class="hub-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Awareness Hub</h1>
          <p class="hero-subtitle">Learn how to spot scams before they reach you.</p>

          <TabNavigation :tabs="tabs" :active-tab="activeTab" @tab-change="activeTab = $event" />
        </div>
      </div>
    </div>

    <!-- Before You Apply Section - Dynamic Checklist -->
    <div v-if="activeTab === 'before'" class="content-section">
      <div class="section-header">
        <h2 class="section-title">Before You Apply Checklist</h2>
        <p class="section-subtitle">Understand the job and the company before you apply</p>
      </div>
      <!-- Progress Summary and Reset Section -->
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
          <button
            class="reset-button"
            @click="showResetConfirmation = true"
            :disabled="totalCompletedItems === 0"
          >
            <i class="fas fa-undo"></i>
            Reset Progress
          </button>
        </div>
      </div>

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
          <!-- Card Header - Clickable for expansion -->
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

          <!-- Progress Indicator -->
          <div class="card-progress">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: getStepProgressPercentage(step.number) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Card Content (Expandable) -->
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
                      @change="updateProgress"
                    />
                    <span class="checkmark"></span>
                    <div class="todo-content">
                      <span class="todo-text">{{ item.text }}</span>
                      <div v-if="item.links && item.links.length > 0" class="todo-links">
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

      <!-- Reset Confirmation Modal -->
      <div
        v-if="showResetConfirmation"
        class="modal-overlay"
        @click="showResetConfirmation = false"
      >
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
            <button class="modal-button cancel" @click="showResetConfirmation = false">
              Cancel
            </button>
            <button class="modal-button confirm" @click="resetProgress">Reset Progress</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Reported Scams Section -->
    <!--
<div v-if="activeTab === 'reported'" class="content-section">
  <div class="section-header">
    <h2 class="section-title">Recently Reported Scams (WORK IN PROGRESS)</h2>
    <p class="section-subtitle">Learn from real scam job postings reported by other users</p>
  </div>

  <FilterTabs
    :filters="scamFilters"
    :active-filter="activeFilter"
    @filter-change="activeFilter = $event"
  />

  <div class="scams-grid">
    <div v-for="scam in filteredScams" :key="scam.id" class="scam-card">
      <div class="scam-header">
        <div class="scam-category">{{ scam.category }}</div>
        <h3 class="scam-title">{{ scam.title }}</h3>
      </div>

      <div class="scam-content">
        <p class="scam-description">{{ scam.description }}</p>

        <div class="red-flags-section">
          <h4 class="red-flags-title">🚩 Red Flags:</h4>
          <ul class="red-flags-list">
            <li v-for="flag in scam.redFlags" :key="flag" class="red-flag-item">
              {{ flag }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
-->

    <!-- Scam Statistics Section -->
    <div v-if="activeTab === 'statistics'" class="content-section">
      <div class="section-header">
        <h2 class="section-title">Australian Scam Statistics</h2>
        <p class="section-subtitle">Interactive dashboard showing job scam trends and data</p>
      </div>

      <!-- Tableau Chart Container -->
      <div class="tableau-container">
        <div class="tableauPlaceholder" id="viz1758442623639" style="position: relative">
          <noscript>
            <a href="#">
              <img
                alt="Dashboard 2"
                src="https://public.tableau.com/static/images/51/5120v1/Dashboard2/1_rss.png"
                style="border: none"
              />
            </a>
          </noscript>
          <object class="tableauViz" style="display: none">
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="5120v1&#47;Dashboard2" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="no" />
            <param
              name="static_image"
              value="https://public.tableau.com/static/images/51/5120v1/Dashboard2/1.png"
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-AU" />
          </object>
        </div>
      </div>
    </div>

    <!-- Recent Scam News Section -->
    <div v-if="activeTab === 'news'" class="content-section">
      <div class="section-header">
        <h2 class="section-title">Recent Scam News</h2>
        <p class="section-subtitle">Stay updated with the latest scam trends and warnings</p>
      </div>

      <div class="news-wrapper">
        <NewsCarousel />
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Think a job might be suspicious?</h2>
        <p class="cta-subtitle">
          Don't risk it. Use our free tool to check the listing for common red flags before you
          apply.
        </p>
        <BaseButton variant="primary" size="large" @click="$router.push('/analyse')">
          Analyse it now
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import TabNavigation from '@/components/TabNavigation.vue'
//import FilterTabs from '@/components/FilterTabs.vue'
import BaseButton from '@/components/BaseButton.vue'
import NewsCarousel from '../components/NewsCarousel.vue'

export default {
  name: 'HubView',
  components: {
    TabNavigation,
    //FilterTabs,
    BaseButton,
    NewsCarousel,
  },
  setup() {
    // New reactive data for checklist functionality
    const expandedCard = ref(1)
    const completedItems = ref({})
    const showResetConfirmation = ref(false)

    // Checklist cache configuration
    const CHECKLIST_CACHE_KEY = 'jobdetective_checklist_progress'

    // Load completed items from localStorage on mount
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

    // Save progress to localStorage
    const saveProgress = () => {
      try {
        localStorage.setItem(CHECKLIST_CACHE_KEY, JSON.stringify(completedItems.value))
      } catch (error) {
        console.error('Error saving checklist progress:', error)
      }
    }

    // Watch for changes in completed items and save
    watch(completedItems, saveProgress, { deep: true })

    // Toggle card expansion
    const toggleCard = (cardNumber) => {
      expandedCard.value = expandedCard.value === cardNumber ? null : cardNumber
    }

    // Reset progress function
    const resetProgress = () => {
      completedItems.value = {}
      showResetConfirmation.value = false
      // Close any expanded cards
      expandedCard.value = 1
      console.log('Progress reset')
    }

    // Steps data with external links
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

    // Update progress functions to work with new data structure
    const getStepProgress = (stepNumber) => {
      const stepItems = steps.find((step) => step.number === stepNumber)?.details || []
      let completed = 0
      stepItems.forEach((_, index) => {
        if (completedItems.value[`${stepNumber}-${index}`]) {
          completed++
        }
      })
      return completed
    }

    const getStepProgressPercentage = (stepNumber) => {
      const stepItems = steps.find((step) => step.number === stepNumber)?.details || []
      const completed = getStepProgress(stepNumber)
      return stepItems.length > 0 ? (completed / stepItems.length) * 100 : 0
    }

    // Add the missing updateProgress function
    const updateProgress = () => {
      // This function is called when checkboxes are changed
      // The watch on completedItems already handles saving to localStorage
      console.log('Progress updated')
    }

    // Handle link clicks
    const handleLinkClick = (url, event) => {
      event.stopPropagation() // Prevent checkbox toggle
      if (url.startsWith('/')) {
        // Internal route
        window.location.href = url
      } else {
        // External link
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }

    // Computed properties for overall progress
    const totalItems = computed(() => {
      return steps.reduce((total, step) => total + step.details.length, 0)
    })

    const totalCompletedItems = computed(() => {
      let completed = 0
      steps.forEach((step) => {
        step.details.forEach((_, index) => {
          if (completedItems.value[`${step.number}-${index}`]) {
            completed++
          }
        })
      })
      return completed
    })

    const overallProgressPercentage = computed(() => {
      return totalItems.value > 0 ? (totalCompletedItems.value / totalItems.value) * 100 : 0
    })

    onMounted(() => {
      loadProgress()
    })

    return {
      // Checklist
      steps,
      expandedCard,
      completedItems,
      toggleCard,
      getStepProgress,
      getStepProgressPercentage,
      updateProgress,
      totalItems,
      totalCompletedItems,
      overallProgressPercentage,
      handleLinkClick,
      // Reset functionality
      showResetConfirmation,
      resetProgress,
    }
  },
  data() {
    return {
      activeTab: 'before',
      activeFilter: 'all',
      tabs: [
        { id: 'before', label: 'Before You Apply Checklist' },
        // { id: 'reported', label: 'Recently Reported Scams (WIP)' },
        { id: 'statistics', label: 'Australian Scam Statistics' },
        { id: 'news', label: 'Recent Scam News' },
      ],
      scamFilters: [
        { id: 'all', label: 'All' },
        { id: 'retail', label: 'Retail' },
        { id: 'hospitality', label: 'Hospitality' },
        { id: 'it', label: 'IT' },
        { id: 'education', label: 'Education' },
      ],
      recentScams: [
        {
          id: 1,
          title: 'Retail Packer (Urgent)',
          category: 'Retail Packing',
          description:
            'We need someone to receive and re-drop high value electronics. Quick cash! Pay via CashApp daily.',
          redFlags: [
            'No experience or paperwork required',
            'Unconventional payment methods',
            '"Urgent" hiring + pressure tactics',
          ],
          type: 'retail',
        },
        {
          id: 2,
          title: 'Mystery Shopper',
          category: 'Market Research',
          description:
            'We\'ll send you a check. Cash it, keep a small amount, and wire the rest to an "agent" to evaluate their service.',
          redFlags: ['Fake check fraud scam', 'Asking to wire money is a major red flag'],
          type: 'retail',
        },
        {
          id: 3,
          title: 'Hotel Booking Assistant',
          category: 'Luxury Travel',
          description:
            'Work from home booking hotel rooms. Must pay for your own certification course to start. Guaranteed reimbursement.',
          redFlags: [
            'Upfront payment for certification',
            '"Guaranteed" reimbursement is a common lie',
          ],
          type: 'hospitality',
        },
        {
          id: 4,
          title: 'Remote IT Support',
          category: 'Technical Support',
          description:
            "We'll send you a check for office supplies. Purchase from our approved vendor. Check is for more than needed, send us the difference.",
          redFlags: ['Overpayment scam', 'Requirement to use a specific vendor'],
          type: 'it',
        },
        {
          id: 5,
          title: 'Online Tutor - All Subjects',
          category: 'Education',
          description:
            'Interview conducted entirely over text message. We need your bank details to set up direct deposit before you sign any contract.',
          redFlags: [
            'Unprofessional interview process (text only)',
            'Requesting bank details before a contract',
          ],
          type: 'education',
        },
      ],
    }
  },
  computed: {
    filteredScams() {
      if (this.activeFilter === 'all') {
        return this.recentScams
      }
      return this.recentScams.filter((scam) => scam.type === this.activeFilter)
    },
  },
  mounted() {
    // Initialize Tableau visualization when statistics tab is active
    this.$nextTick(() => {
      if (this.activeTab === 'statistics') {
        this.initTableauViz()
      }
    })
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'statistics') {
        this.$nextTick(() => {
          this.initTableauViz()
        })
      }
    },
  },
  methods: {
    initTableauViz() {
      // Check if Tableau script is already loaded
      if (typeof tableau !== 'undefined') {
        this.loadTableauChart()
      } else {
        // Load Tableau API script
        const script = document.createElement('script')
        script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
        script.onload = () => {
          this.loadTableauChart()
        }
        document.head.appendChild(script)
      }
    },
    loadTableauChart() {
      const divElement = document.getElementById('viz1758442623639')
      if (divElement) {
        const vizElement = divElement.getElementsByTagName('object')[0]
        if (divElement.offsetWidth > 800) {
          vizElement.style.width = '100%'
          vizElement.style.height = divElement.offsetWidth * 0.75 + 'px'
        } else if (divElement.offsetWidth > 500) {
          vizElement.style.width = '100%'
          vizElement.style.height = divElement.offsetWidth * 0.75 + 'px'
        } else {
          vizElement.style.width = '100%'
          vizElement.style.height = '1027px'
        }

        // Load the visualization if not already loaded
        if (!vizElement.style.display || vizElement.style.display === 'none') {
          const scriptElement = document.createElement('script')
          scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
          vizElement.parentNode.insertBefore(scriptElement, vizElement)
        }
      }
    },
  },
}
</script>

<style scoped>
/* Base Hub Container */
.hub-container {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

/* Hero Section */
.hero-section {
  padding: 3rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 0 0 24px 24px;
}

.hero-content {
  text-align: center;
}

.hero-text {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 400;
}

/* Content Sections */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* Section Headers */
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

/* Checklist Grid Layout - Keep existing styles */
.checklist-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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

.checklist-card.expanded .checklist-content {
  border-top-color: #cbd5e1;
}

.checklist-card.completed .checklist-content {
  border-top-color: #d1fae5;
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

.todo-link i {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Scam Cards - Following checklist card design */
.scams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.scam-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.scam-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.scam-header {
  margin-bottom: 1rem;
}

.scam-category {
  display: inline-block;
  background: #dc2626;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.scam-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
}

.scam-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scam-description {
  color: #374151;
  line-height: 1.6;
  font-style: italic;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  margin: 0;
}

.red-flags-section {
  background: #fef2f2;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
}

.red-flags-title {
  font-size: 1rem;
  font-weight: 600;
  color: #991b1b;
  margin: 0 0 0.75rem 0;
}

.red-flags-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.red-flag-item {
  color: #7f1d1d;
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.red-flag-item::before {
  content: '•';
  color: #dc2626;
  font-weight: bold;
  position: absolute;
  left: 0.5rem;
}

/* Stats Card - Following checklist card design */
.stats-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 3rem 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: center;
  margin-top: 2rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.stats-card:hover {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.stats-content {
  max-width: 800px;
  margin: 0 auto;
}

.stat-intro {
  font-size: 2.2rem;
  color: #374151;
  margin-bottom: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
}

.stat-amount-wrapper {
  margin-bottom: 2.5rem;
  position: relative;
}

.stat-amount {
  display: block;
  font-size: 8rem;
  font-weight: 800;
  color: #dc2626;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-description {
  font-size: 2rem;
  color: #4b5563;
  line-height: 1.5;
}

/* News Wrapper */
.news-wrapper {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Progress Summary Section */
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

.reset-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-button i {
  font-size: 0.875rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  padding: 1.5rem 1.5rem 1rem 1.5rem;
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
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  color: #374151;
  background: #f3f4f6;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0 0 1rem 0;
  color: #374151;
  line-height: 1.5;
}

.modal-warning {
  color: #dc2626;
  font-weight: 500;
  font-size: 0.9rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
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

/* CTA Section */
.cta-section {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 4rem;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.cta-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 400;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
}

/* Mobile-First Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .content-section {
    padding: 1.5rem 1rem;
  }

  .checklist-grid,
  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .checklist-card {
    width: 100%;
    height: auto;
    min-height: auto;
    max-height: none;
    padding: 1.25rem;
    margin-bottom: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .checklist-card.expanded {
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
    border-color: #3b82f6;
  }

  .checklist-card.completed {
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
    border-color: #22c55e;
  }

  .checklist-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 1rem;
    margin-bottom: 0.75rem;
    background: #f8fafc;
    border-radius: 12px;
    cursor: pointer;
  }

  .checklist-header:hover {
    background: #f1f5f9;
  }

  .step-number {
    width: 48px;
    height: 48px;
    font-size: 1.3rem;
    font-weight: 700;
    flex-shrink: 0;
    margin-right: 1rem;
  }

  .step-title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
    flex: 1;
    text-align: left;
    margin: 0;
    color: #1e293b;
  }

  .expand-icon {
    flex-shrink: 0;
    margin-left: 1rem;
    font-size: 1.2rem;
    color: #64748b;
    transition: transform 0.2s ease;
  }

  .checklist-card.expanded .expand-icon {
    transform: rotate(180deg);
  }

  .card-progress {
    margin: 0.75rem 0;
  }

  .progress-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .checklist-card.completed .progress-fill {
    background: linear-gradient(90deg, #22c55e, #16a34a);
  }

  .checklist-content {
    max-height: none;
    overflow: visible;
    padding: 0;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .todo-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .todo-item:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .todo-item.completed {
    background: #f0fdf4;
    border-color: #bbf7d0;
  }

  .todo-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    cursor: pointer;
    min-height: auto;
  }

  .todo-checkbox input[type='checkbox'] {
    margin: 0;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .todo-content {
    flex: 1;
    min-width: 0;
  }

  .todo-text {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #374151;
    margin: 0 0 0.5rem 0;
    word-wrap: break-word;
  }

  .todo-item.completed .todo-text {
    color: #059669;
    text-decoration: line-through;
  }

  .todo-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .todo-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: #f1f5f9;
    color: #3b82f6;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s ease;
    min-height: 44px;
    text-align: center;
  }

  .todo-link:hover {
    background: #e2e8f0;
    color: #1d4ed8;
  }

  .progress-summary {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .progress-info {
    width: 100%;
  }

  .progress-stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  .progress-text {
    font-size: 1rem;
    font-weight: 500;
    color: #374151;
    order: 1;
  }

  .overall-progress-bar {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    order: 2;
  }

  .overall-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-percentage {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
    order: 3;
  }

  .reset-section {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .reset-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: #f1f5f9;
    color: #374151;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;
  }

  .reset-button:hover:not(:disabled) {
    background: #e2e8f0;
    border-color: #9ca3af;
  }

  .reset-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    width: 100%;
    max-width: calc(100vw - 2rem);
    margin: 0;
    border-radius: 12px;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-body {
    padding: 0 1.5rem 1rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal-button {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    min-height: 50px;
    border-radius: 8px;
    font-weight: 600;
  }

  .modal-button.confirm {
    order: 1;
  }

  .modal-button.cancel {
    order: 2;
  }

  .stat-amount {
    font-size: 4rem;
  }

  .stat-intro {
    font-size: 1.4rem;
  }

  .stat-description {
    font-size: 1.2rem;
  }

  .cta-title {
    font-size: 1.8rem;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .content-section {
    padding: 1rem 0.75rem;
  }

  .hero-section {
    padding: 1.5rem 0.75rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .checklist-card {
    padding: 1rem;
    border-radius: 12px;
  }

  .checklist-header {
    padding: 0.875rem;
  }

  .step-number {
    width: 42px;
    height: 42px;
    font-size: 1.2rem;
  }

  .step-title {
    font-size: 1rem;
    line-height: 1.2;
  }

  .todo-checkbox {
    padding: 0.875rem;
  }

  .todo-text {
    font-size: 0.9rem;
  }

  .progress-summary {
    padding: 1.25rem;
    margin: 1rem 0;
  }

  .progress-text {
    font-size: 0.95rem;
  }

  .progress-percentage {
    font-size: 1.3rem;
  }

  .stat-amount {
    font-size: 3rem;
  }

  .stat-intro {
    font-size: 1.2rem;
  }

  .stat-description {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .checklist-grid,
  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .checklist-card {
    height: auto;
    min-height: 350px;
    max-height: none;
  }
}

/* Tableau Container Styles */
.tableau-container {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.tableauPlaceholder {
  width: 100%;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tableau-container {
    margin: 1rem 0;
    padding: 1rem;
  }

  .tableauPlaceholder {
    min-height: 300px;
  }
}

@media (max-width: 480px) {
  .tableau-container {
    padding: 0.75rem;
  }
}
</style>
