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
    </div>

    <!-- Recently Reported Scams Section -->
    <div v-if="activeTab === 'reported'" class="content-section">
      <SectionHeader title="" />

      <FilterTabs
        :filters="scamFilters"
        :active-filter="activeFilter"
        @filter-change="activeFilter = $event"
      />

      <div class="scams-grid">
        <FeatureCard
          v-for="scam in filteredScams"
          :key="scam.id"
          card-type="scam"
          :title="scam.title"
          :category="scam.category"
          :description="scam.description"
          :red-flags="scam.redFlags"
        />
      </div>
    </div>

    <!-- Scam Statistics Section -->
    <div v-if="activeTab === 'statistics'" class="content-section">
      <SectionHeader title="" />

      <!-- Stats Hero Section -->
      <div class="stats-hero-section">
        <div class="stats-display" v-if="!loading && !error && scamData">
          <div class="stat-intro-section">
            In 2025, young job seekers across Australia aged 18-24 lost a total of
          </div>
          <div class="stat-amount-section">
            <span class="stat-amount" v-if="totalData">
              {{ formatCurrency(totalData.total_amount_lost) }}
            </span>
            <span class="stat-amount" v-else>No data available</span>
          </div>

          <div class="stat-description-section">
            to job and employment scams in
            {{ totalData ? formatNumber(totalData.total_reports) : '0' }} reported cases.
          </div>
        </div>

        <!-- Loading State -->
        <LoadingSpinner
          v-else-if="loading"
          variant="stats"
          message="Loading statistics..."
          size="large"
        />

        <!-- Error State -->
        <ErrorDisplay
          v-else-if="error"
          variant="stats"
          message="Unable to load current statistics"
          :show-retry="true"
          @retry="fetchScamStatistics"
        />
      </div>
    </div>

    <!-- Recent Scam News Section -->
    <div v-if="activeTab === 'news'" class="content-section">
      <NewsCarousel />
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <h2 class="cta-title">Think a job might be suspicious?</h2>
      <p class="cta-subtitle">
        Don't risk it. Use our free tool to check the listing for common red flags before you apply.
      </p>
      <BaseButton variant="primary" size="large" @click="$router.push('/analyse')">
        Analyse it now
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import TabNavigation from '@/components/TabNavigation.vue'
import FilterTabs from '@/components/FilterTabs.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorDisplay from '@/components/ErrorDisplay.vue'
import NewsCarousel from '../components/NewsCarousel.vue'

export default {
  name: 'HubView',
  components: {
    TabNavigation,
    FilterTabs,
    SectionHeader,
    FeatureCard,
    BaseButton,
    LoadingSpinner,
    ErrorDisplay,
    NewsCarousel,
  },
  setup() {
    // Reactive data for statistics
    const scamData = ref(null)
    const loading = ref(true)
    const error = ref(null)

    // New reactive data for checklist functionality
    const expandedCard = ref(1) // Changed from null to 1
    const completedItems = ref({})

    // Cache configuration
    const CACHE_KEY = 'jobdetective_scam_stats'
    const CACHE_EXPIRY_KEY = 'jobdetective_scam_stats_expiry'
    const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

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
            text: 'If in doubt, use Job Detective’s Analyse Job or report suspicious ads to Scamwatch.',
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

    // Computed properties for statistics
    const totalData = computed(() => {
      return scamData.value || null
    })

    // Format functions
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    }

    const formatNumber = (number) => {
      return new Intl.NumberFormat('en-AU').format(number)
    }

    // Cache management functions for statistics
    const getCachedData = () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY)
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY)

        if (cachedData && cacheExpiry) {
          const now = Date.now()
          const expiryTime = parseInt(cacheExpiry, 10)

          if (now < expiryTime) {
            console.log(
              'Using cached data, expires in:',
              Math.round((expiryTime - now) / (1000 * 60)),
              'minutes',
            )
            return JSON.parse(cachedData)
          } else {
            console.log('Cache expired, will fetch fresh data')
            clearCache()
          }
        }
        return null
      } catch (error) {
        console.error('Error reading cache:', error)
        clearCache()
        return null
      }
    }

    const setCacheData = (data) => {
      try {
        const expiryTime = Date.now() + CACHE_DURATION
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString())
        console.log('Data cached until:', new Date(expiryTime).toLocaleString())
      } catch (error) {
        console.error('Error setting cache:', error)
      }
    }

    const clearCache = () => {
      try {
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_EXPIRY_KEY)
        console.log('Cache cleared')
      } catch (error) {
        console.error('Error clearing cache:', error)
      }
    }

    const fetchScamStatistics = async () => {
      try {
        loading.value = true
        error.value = null

        // First check if we have valid cached data
        const cachedData = getCachedData()
        if (cachedData) {
          scamData.value = cachedData
          loading.value = false
          return
        }

        // If no valid cache, fetch from API
        console.log('Fetching fresh data from API...')
        const API_ENDPOINT = import.meta.env.VITE_API_GATEWAY_URL
        const API_KEY = import.meta.env.VITE_API_KEY

        const fetchOptions = {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }

        // Add API key if available
        if (API_KEY) {
          fetchOptions.headers['X-API-Key'] = API_KEY
        }

        console.log('Fetching from:', API_ENDPOINT)
        const response = await fetch(API_ENDPOINT, fetchOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Received fresh data:', data)

        // Store the data and cache it
        scamData.value = data
        setCacheData(data)
      } catch (err) {
        console.error('Error fetching scam statistics:', err)
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchScamStatistics()
      loadProgress()
    })

    return {
      // Statistics
      scamData,
      loading,
      error,
      totalData,
      formatCurrency,
      formatNumber,
      fetchScamStatistics,
      // Checklist
      steps,
      expandedCard,
      completedItems,
      toggleCard,
      getStepProgress,
      getStepProgressPercentage,
      updateProgress, // Added this missing function
      totalItems,
      totalCompletedItems,
      overallProgressPercentage,
      handleLinkClick,
    }
  },
  data() {
    return {
      activeTab: 'before',
      activeFilter: 'all',
      tabs: [
        { id: 'before', label: 'Before You Apply Checklist' },
        { id: 'reported', label: 'Recently Reported Scams' },
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
}
</script>

<style scoped>
.hub-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
}

/* Hero Section */
.hero-section {
  padding: 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  color: white;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #cbd5e1;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

/* Content Sections */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem;
}

/* Checklist Grid Layout */
.checklist-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  transition: grid-template-columns 0.3s ease;
}

/* When card 1 is expanded */
.checklist-grid.has-expanded-1 {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

/* When card 2 is expanded */
.checklist-grid.has-expanded-2 {
  grid-template-columns: 1fr 2fr 1fr 1fr;
}

/* When card 3 is expanded */
.checklist-grid.has-expanded-3 {
  grid-template-columns: 1fr 1fr 2fr 1fr;
}

/* When card 4 is expanded */
.checklist-grid.has-expanded-4 {
  grid-template-columns: 1fr 1fr 1fr 2fr;
}

.checklist-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 480px;
  min-height: 480px;
  max-height: 480px;
}

.checklist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

.checklist-card.expanded {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.checklist-card.completed {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.checklist-card.completed:hover {
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
}

.checklist-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

.checklist-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.3;
  text-align: center;
}

.expand-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.card-progress {
  margin-top: auto;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.checklist-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;
  overflow-y: auto;
  max-height: calc(480px - 140px);
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
  opacity: 0.8;
}

.todo-checkbox {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
  gap: 0.75rem;
  color: white;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.todo-checkbox:hover {
  background: rgba(255, 255, 255, 0.05);
}

.todo-checkbox input[type='checkbox'] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 1px;
}

.todo-checkbox:hover .checkmark {
  border-color: white;
}

.todo-checkbox input[type='checkbox']:checked + .checkmark {
  background: white;
  border-color: white;
}

.todo-checkbox input[type='checkbox']:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: #3b82f6;
  font-size: 12px;
  font-weight: bold;
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
  color: rgba(255, 255, 255, 0.95);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: rgba(255, 255, 255, 0.7);
}

.todo-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.todo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #1e293b;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-link:hover {
  background: #fbbf24;
  border-color: #f59e0b;
  color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.todo-link i {
  font-size: 0.7rem;
  opacity: 0.8;
}

.todo-item.completed .todo-link {
  opacity: 0.6;
  pointer-events: none;
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

/* Stats Hero Section */
.stats-hero-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
  min-height: 50vh;
  align-items: center;
  background: transparent;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-bottom: 2rem;
}

.stats-hero-section::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.03);
  border-radius: 50%;
  top: -150px;
  left: -50px;
  filter: blur(40px);
  z-index: -1;
}

.stats-hero-section::after {
  content: '';
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(239, 68, 68, 0.03);
  border-radius: 50%;
  bottom: -100px;
  right: -100px;
  filter: blur(30px);
  z-index: -1;
}

/* Statistics Display Styles */
.stats-display {
  max-width: 900px;
  width: 100%;
  text-align: center;
  background: transparent;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.stat-intro-section {
  font-size: 2.2rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.stat-amount-section {
  margin-bottom: 2.5rem;
  position: relative;
}

.stat-amount {
  display: block;
  font-size: 9rem;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(90deg, #ef4444, #ef4444);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 1;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}

.stat-description-section {
  font-size: 2rem;
  color: #e2e8f0;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  justify-content: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Grid Layouts */
.scams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 4rem;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: white;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: #cbd5e1;
  margin: 0 0 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
}

/* Mobile Responsiveness */
@media (max-width: 1200px) {
  .checklist-grid,
  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .checklist-card {
    height: 240px;
    min-height: 240px;
    max-height: 240px;
  }

  .checklist-content {
    max-height: calc(240px - 140px);
  }

  .scams-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .content-section {
    padding: 2rem 1rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .stats-hero-section {
    padding: 2rem 1rem;
    min-height: 40vh;
  }

  .stat-amount {
    font-size: 5rem;
  }

  .stat-intro-section {
    font-size: 1.6rem;
  }

  .stat-description-section {
    font-size: 1.4rem;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .checklist-grid,
  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .checklist-card {
    height: 220px;
    min-height: 220px;
    max-height: 220px;
    padding: 1.5rem;
  }

  .checklist-content {
    max-height: calc(220px - 130px);
  }

  .step-title {
    font-size: 1.1rem;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 580px) {
  .checklist-grid,
  .checklist-grid.has-expanded-1,
  .checklist-grid.has-expanded-2,
  .checklist-grid.has-expanded-3,
  .checklist-grid.has-expanded-4 {
    grid-template-columns: 1fr 1fr;
  }

  .checklist-card {
    height: 240px;
    min-height: 240px;
    max-height: 240px;
    padding: 1rem;
  }

  .checklist-content {
    max-height: calc(240px - 140px);
  }

  .step-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .step-title {
    font-size: 1rem;
  }
}
</style>
