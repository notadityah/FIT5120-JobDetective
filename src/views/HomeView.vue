<script setup>
import { ref, onMounted, computed } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorDisplay from '@/components/ErrorDisplay.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'

// Reactive data
const scamData = ref(null)
const loading = ref(true)
const error = ref(null)

// Cache configuration
const CACHE_KEY = 'jobdetective_scam_stats'
const CACHE_EXPIRY_KEY = 'jobdetective_scam_stats_expiry'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Selection controls
const selectedYear = ref('2025')
const selectedState = ref('ALL')

// Computed properties for available options
const availableYears = computed(() => {
  if (!scamData.value) return []
  return Object.keys(scamData.value.yearly_totals).sort((a, b) => b - a)
})

// const availableStates = computed(() => {
//   if (!scamData.value) return ['ALL']
//   const states = new Set(['ALL'])

//   Object.values(scamData.value.by_state).forEach((yearData) => {
//     Object.keys(yearData).forEach((state) => states.add(state))
//   })

//   return Array.from(states).sort()
// })

// Computed properties for dynamic statistics
const selectedYearData = computed(() => {
  if (!scamData.value || !selectedYear.value) return null

  if (selectedState.value === 'ALL') {
    return scamData.value.yearly_totals[selectedYear.value] || null
  } else {
    const yearData = scamData.value.by_state[selectedYear.value]
    return yearData?.[selectedState.value] || null
  }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// const formatNumber = (number) => {
//   return new Intl.NumberFormat('en-AU').format(number)
// }

// Check if cached data exists and is valid
const getCachedData = () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY)
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY)

    if (cachedData && cacheExpiry) {
      const expiryTime = parseInt(cacheExpiry)
      const now = Date.now()

      // Check if cache is still valid
      if (now < expiryTime) {
        console.log('Using cached scam statistics data')
        return JSON.parse(cachedData)
      } else {
        console.log('Cache expired, will fetch new data')
        // Clear expired cache
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_EXPIRY_KEY)
      }
    }

    return null
  } catch (error) {
    console.error('Error reading cached data:', error)
    // Clear corrupted cache
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_EXPIRY_KEY)
    return null
  }
}

// Save data to cache
const setCacheData = (data) => {
  try {
    const expiryTime = Date.now() + CACHE_DURATION
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString())
    console.log('Scam statistics cached successfully')
  } catch (error) {
    console.error('Error caching data:', error)
  }
}

const fetchScamStatistics = async () => {
  try {
    loading.value = true

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

    console.log('Parsed scam data:', scamData.value)
  } catch (err) {
    console.error('Error fetching scam statistics:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Optional: Function to clear cache manually
const clearCache = () => {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CACHE_EXPIRY_KEY)
  console.log('Scam statistics cache cleared')
}

// Make clearCache available globally for debugging
if (import.meta.env.DEV) {
  window.clearScamStatsCache = clearCache
}

onMounted(() => {
  fetchScamStatistics()
})
</script>

<template>
  <div class="home-container">
    <!-- Stats as main hero section -->
    <div class="stats-hero-section">
      <div class="stats-display" v-if="!loading && !error && scamData">
        <div class="stat-intro-section">Young job seekers aged 18-24 lost a total of</div>

        <div class="stat-amount-section">
          <span class="stat-amount" v-if="selectedYearData">
            {{ formatCurrency(selectedYearData.amount_lost) }}
          </span>
          <span class="stat-amount" v-else>No data available</span>
        </div>

        <div class="stat-description-section">
          in
          <select v-model="selectedYear" class="year-dropdown">
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          due to job and employment scams across Australia.
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

    <!-- Hero content with mockup -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Detect
          <span class="highlight">Job Scams</span>
          with AI-powered analysis
        </h1>
        <p class="hero-subtitle">
          JobDetective uses artificial intelligence to analyze job postings and identify potential
          scams, helping you make informed decisions.
          <span class="highlight">Stay safe in your job search</span>
        </p>
        <div class="cta-buttons">
          <BaseButton variant="primary" size="large" @click="$router.push('/analyze')">
            Analyze Job Now
          </BaseButton>
        </div>
      </div>
      <div class="hero-image">
        <div class="mockup-container">
          <div class="mockup-screen">
            <div class="mockup-header">
              <div class="mockup-controls">
                <span class="control red"></span>
                <span class="control yellow"></span>
                <span class="control green"></span>
              </div>
              <div class="mockup-title">JobDetective Analysis</div>
            </div>
            <div class="mockup-content">
              <div class="analysis-card">
                <div class="risk-indicator high-risk">
                  <span class="risk-dot"></span>
                  High Risk Detected
                </div>
                <div class="analysis-details">
                  <div class="detail-item">
                    <span class="icon">⚠️</span>
                    <span>Suspicious payment requests</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">📧</span>
                    <span>Generic email address</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">💰</span>
                    <span>Unrealistic salary promises</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features section -->
    <div class="features-section">
      <div class="container">
        <h2 class="section-title">How <span class="highlight">JobDetective</span> Protects You</h2>
        <div class="features-grid">
          <FeatureCard
            icon="🔍"
            title="AI-Powered Analysis"
            description="Advanced machine learning algorithms analyze job postings for common scam patterns and red flags."
          />
          <FeatureCard
            icon="⚡"
            title="Real-time Detection"
            description="Get instant results whether you upload files, paste URLs, or enter text descriptions."
          />
          <FeatureCard
            icon="🛡️"
            title="Complete Protection"
            description="Identifies multiple types of job scams including fake companies, payment fraud, and identity theft."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
}

/* Stats as main hero section */
.stats-hero-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 60vh;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Hero content with mockup - now secondary */
.hero-section {
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 4rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  text-align: left;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Statistics Display Styles */
.stats-display {
  max-width: 900px;
  width: 100%;
  text-align: center;
  background: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
}

.stat-intro-section {
  font-size: 2.2rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.stat-amount-section {
  margin-bottom: 2.5rem;
}

.stat-amount {
  display: block;
  font-size: 9rem;
  font-weight: 800;
  color: #ef4444;
  line-height: 1;
  letter-spacing: -0.02em;
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
}

.year-dropdown,
.state-dropdown {
  background: transparent;
  border: none;
  border-radius: 0;
  color: #3b82f6;
  padding: 0.1rem 0.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: auto;
  width: auto;
  display: inline;
}

.year-dropdown:hover,
.state-dropdown:hover,
.year-dropdown:focus,
.state-dropdown:focus {
  background: transparent;
  outline: none;
  color: #60a5fa;
  text-decoration: none;
}

.year-dropdown option,
.state-dropdown option {
  background: #1e293b;
  color: #ffffff;
}

.stats-loading,
.stats-error {
  max-width: 800px;
  width: 100%;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.highlight {
  color: #3b82f6;
  font-weight: 400;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.8;
  font-weight: 300;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.mockup-container {
  perspective: 1000px;
}

.mockup-screen {
  width: 600px;
  height: 300px;
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: rotateY(-5deg) rotateX(5deg);
  overflow: hidden;
}

.mockup-header {
  background: #0f172a;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #334155;
}

.mockup-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red {
  background: #ef4444;
}
.control.yellow {
  background: #f59e0b;
}
.control.green {
  background: #10b981;
}

.mockup-title {
  font-size: 0.9rem;
  color: #94a3b8;
}

.mockup-content {
  padding: 2rem;
}

.analysis-card {
  background: #334155;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #ef4444;
}

.risk-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ef4444;
  font-weight: 600;
}

.risk-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.analysis-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #e2e8f0;
}

.features-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6rem 0;
  background: transparent;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 4rem;
  color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .stats-hero-section {
    padding: 3rem 1rem;
    min-height: 50vh;
  }

  .hero-section {
    flex-direction: column;
    gap: 3rem;
    padding: 3rem 1rem;
  }

  .hero-content {
    text-align: center;
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .stat-amount {
    font-size: 4rem;
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

  .year-dropdown,
  .state-dropdown {
    font-size: 1.2rem;
  }

  .mockup-screen {
    width: 350px;
    height: 300px;
    transform: none;
  }
}
</style>
