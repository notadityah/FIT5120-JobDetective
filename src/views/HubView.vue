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

    <!-- Before You Apply Section -->
    <div v-if="activeTab === 'before'" class="content-section">
      <SectionHeader title="" />

      <div class="steps-grid">
        <FeatureCard
          v-for="step in steps"
          :key="step.number"
          card-type="step"
          :number="step.number"
          :title="step.title"
          :features="step.details"
          :is-main-step="step.isMain"
        />
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
import { ref, onMounted, computed } from 'vue' // Add 'ref' back to imports
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

    // Cache configuration
    const CACHE_KEY = 'jobdetective_scam_stats'
    const CACHE_EXPIRY_KEY = 'jobdetective_scam_stats_expiry'
    const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

    // Computed properties
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

    // Cache management functions
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
    })

    return {
      scamData,
      loading,
      error,
      totalData,
      formatCurrency,
      formatNumber,
      fetchScamStatistics,
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
      steps: [
        {
          number: 1,
          title: 'Research the Employer',
          isMain: true,
          details: [
            'Look up the company’s website and career page.',
            'Check for online presence on LinkedIn, Glassdoor, or industry directories.',
            'Read company reviews on trusted sites like Glassdoor or Indeed.',
          ],
        },
        {
          number: 2,
          title: 'Check Contact Details',
          isMain: false,
          details: [
            'Verify a legitimate phone number, email with a company domain, and a physical address.',
            'Be cautious if communication only happens through messaging apps or if direct contact is avoided.',
          ],
        },
        {
          number: 3,
          title: 'Validate the Offer',
          isMain: false,
          details: [
            'Compare the role’s salary, hours, and requirements with industry standards.',
            'Be wary of offers that sound “too good to be true” or include urgent pressure tactics.',
            'Ensure the job description is detailed, consistent, and relevant to the role advertised.',
          ],
        },
        {
          number: 4,
          title: 'Protect Your Application',
          isMain: false,
          details: [
            'Never provide sensitive information (bank details, full ID, or upfront payments).',
            'Apply through secure, reputable job portals if possible (e.g., Seek, LinkedIn, Indeed).',
            'If in doubt, use Job Detective’s Analyse Job or report suspicious ads to Scamwatch.',
          ],
        },
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
.steps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
}

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
@media (max-width: 1024px) {
  .steps-grid {
    grid-template-columns: 1fr 1fr;
  }

  .scams-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .steps-grid {
    grid-template-columns: 1fr;
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
}
</style>
