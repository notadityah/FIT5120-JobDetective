<template>
  <!-- Awareness hub feed showcasing recently submitted scam reports -->
  <section class="content-section">
    <div class="section-header">
      <div class="section-header-text">
        <h2 class="section-title">Recently Reported Scams</h2>
        <p class="section-subtitle">Learn from real scam job postings reported by other users</p>
      </div>
    </div>

    <div v-if="isLoadingSubmissions" class="loading-container">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <p class="loading-text">Loading recent scam reports...</p>
    </div>

    <div v-else-if="submissionsError" class="error-container">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <h3 class="error-title">Unable to Load Recent Reports</h3>
        <p class="error-message">{{ submissionsError }}</p>
        <button class="retry-button" @click="fetchRecentSubmissions(true)">
          <i class="fas fa-redo"></i>
          Try Again
        </button>
      </div>
    </div>

    <div v-else-if="filteredScams.length === 0" class="empty-container">
      <div class="empty-content">
        <i class="fas fa-inbox empty-icon"></i>
        <h3 class="empty-title">No Reports Available</h3>
        <p class="empty-message">
          No scam reports have been submitted yet. Be the first to help protect the community by
          reporting suspicious job postings.
        </p>
      </div>
    </div>

    <div v-else class="scams-content">
      <div class="scams-grid">
        <div v-for="scam in filteredScams" :key="scam.id" class="scam-card">
          <div class="scam-header">
            <h3 class="scam-title">{{ scam.title }}</h3>
          </div>

          <div class="scam-content">
            <p class="scam-description">
              {{
                scam.description.length > 100
                  ? scam.description.substring(0, 100) + '...'
                  : scam.description
              }}
            </p>

            <div class="red-flags-section" v-if="scam.redFlags?.length">
              <h4 class="red-flags-title">🚩 Red Flags:</h4>
              <ul class="red-flags-list">
                <li v-for="flag in scam.redFlags.slice(0, 2)" :key="flag" class="red-flag-item">
                  {{ flag }}
                </li>
                <li v-if="scam.redFlags.length > 2" class="red-flag-more">
                  and {{ scam.redFlags.length - 2 }} more...
                </li>
              </ul>
            </div>

            <div class="scam-footer">
              <button class="view-details-btn" @click="openScamModal(scam)">
                <i class="fas fa-eye"></i>
                View More Details
              </button>

              <div class="risk-indicator" v-if="scam.riskLevel">
                <span class="risk-label">Risk:</span>
                <span class="risk-badge" :class="scam.riskLevel.toLowerCase()">
                  {{ scam.riskLevel.charAt(0).toUpperCase() + scam.riskLevel.slice(1) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="refresh-actions">
        <button
          class="refresh-button"
          type="button"
          :disabled="isLoadingSubmissions"
          @click="fetchRecentSubmissions(true)"
        >
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoadingSubmissions }"></i>
          <span>{{ isLoadingSubmissions ? 'Refreshing…' : 'Refresh Data' }}</span>
        </button>
      </div>
    </div>

    <div v-if="showScamModal && selectedScam" class="modal-overlay" @click="closeScamModal">
      <div class="scam-modal" @click.stop>
        <div class="scam-modal-header">
          <h3 class="scam-modal-title">{{ selectedScam.title }}</h3>
          <button class="modal-close" @click="closeScamModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="scam-modal-body">
          <div class="modal-section">
            <h4 class="modal-section-title">Job Description</h4>
            <div class="job-description-full">
              {{ selectedScam.originalData.job_ad_text }}
            </div>
          </div>

          <div class="modal-section" v-if="selectedScam.redFlags?.length">
            <h4 class="modal-section-title">All Red Flags ({{ selectedScam.redFlags.length }})</h4>
            <ul class="modal-red-flags-list">
              <li v-for="flag in selectedScam.redFlags" :key="flag" class="modal-red-flag-item">
                <i class="fas fa-flag"></i>
                {{ flag }}
              </li>
            </ul>
          </div>

          <div class="modal-section">
            <h4 class="modal-section-title">Risk Assessment</h4>
            <div class="risk-assessment">
              <div class="risk-level-display">
                <span class="risk-label-large">Risk Level:</span>
                <span class="risk-badge-large" :class="selectedScam.riskLevel.toLowerCase()">
                  {{
                    selectedScam.riskLevel.charAt(0).toUpperCase() + selectedScam.riskLevel.slice(1)
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="scam-modal-footer">
          <BaseButton variant="secondary" @click="closeScamModal">Close</BaseButton>
          <BaseButton variant="primary" @click="goToAnalyse">Analyse Similar Job</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Fetches, caches, and presents recent scam submissions with modal details
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const SUBMISSIONS_CACHE_KEY = 'jobdetective_recent_submissions'
const CACHE_DURATION = 24 * 60 * 60 * 1000

const router = useRouter()
const apiSubmissions = ref([])
const isLoadingSubmissions = ref(false)
const submissionsError = ref(null)
const selectedScam = ref(null)
const showScamModal = ref(false)

const isCacheValid = (timestamp) => {
  if (!timestamp) return false
  return Date.now() - timestamp < CACHE_DURATION
}

const loadSubmissionsFromCache = () => {
  try {
    const cached = localStorage.getItem(SUBMISSIONS_CACHE_KEY)
    if (cached) {
      const cacheData = JSON.parse(cached)
      if (cacheData.data && cacheData.timestamp && isCacheValid(cacheData.timestamp)) {
        return cacheData.data
      }
      localStorage.removeItem(SUBMISSIONS_CACHE_KEY)
    }
  } catch (error) {
    console.error('Error loading submissions from cache:', error)
    localStorage.removeItem(SUBMISSIONS_CACHE_KEY)
  }
  return null
}

const saveSubmissionsToCache = (data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(SUBMISSIONS_CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Error saving submissions to cache:', error)
  }
}

const processSubmission = (submission) => {
  let aiReport = {}
  try {
    if (submission.ai_report_text) {
      aiReport = JSON.parse(submission.ai_report_text)
    }
  } catch (error) {
    console.error('Error parsing AI report:', error)
    aiReport = { redFlags: [], riskLevel: 'unknown' }
  }

  const jobAdText = submission.job_ad_text || ''
  const lines = jobAdText.split('\n').filter((line) => line.trim())
  let title = 'Suspicious Job Posting'

  for (let i = 0; i < Math.min(3, lines.length); i += 1) {
    const line = lines[i].trim()
    if (
      line.length > 10 &&
      line.length < 100 &&
      (line.toLowerCase().includes('job') ||
        line.toLowerCase().includes('position') ||
        line.toLowerCase().includes('work') ||
        line.toLowerCase().includes('earn') ||
        line.toLowerCase().includes('hiring'))
    ) {
      title = line.substring(0, 50) + (line.length > 50 ? '...' : '')
      break
    }
  }

  return {
    id: submission.submission_id,
    title,
    description: jobAdText,
    redFlags: aiReport.redFlags || [],
    riskLevel: aiReport.riskLevel || 'unknown',
    originalData: submission,
  }
}

const fetchRecentSubmissions = async (forceRefresh = false) => {
  if (!forceRefresh) {
    const cachedData = loadSubmissionsFromCache()
    if (cachedData?.length) {
      apiSubmissions.value = cachedData
      return
    }
  }

  isLoadingSubmissions.value = true
  submissionsError.value = null

  try {
    const endpoint = import.meta.env.VITE_REPORT_SCAM_API_GATEWAY
    if (!endpoint) {
      throw new Error('API endpoint not configured')
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    if (Array.isArray(data.submissions)) {
      const processedSubmissions = data.submissions.map(processSubmission)
      apiSubmissions.value = processedSubmissions
      saveSubmissionsToCache(processedSubmissions)
    } else {
      throw new Error('Invalid API response format')
    }
  } catch (error) {
    console.error('Error fetching recent submissions:', error)
    submissionsError.value = error.message

    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(SUBMISSIONS_CACHE_KEY)
        if (cached) {
          const cacheData = JSON.parse(cached)
          if (cacheData.data && Array.isArray(cacheData.data)) {
            apiSubmissions.value = cacheData.data
          }
        }
      } catch (cacheError) {
        console.error('Error loading expired cache:', cacheError)
      }
    }
  } finally {
    isLoadingSubmissions.value = false
  }
}

const openScamModal = (scam) => {
  selectedScam.value = scam
  showScamModal.value = true
}

const closeScamModal = () => {
  selectedScam.value = null
  showScamModal.value = false
}

const goToAnalyse = () => {
  closeScamModal()
  router.push('/analyse')
}

const filteredScams = computed(() => apiSubmissions.value || [])

onMounted(() => {
  fetchRecentSubmissions()
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

.section-header-text {
  max-width: 600px;
  margin: 0 auto;
}

.section-header-text .section-title,
.section-header-text .section-subtitle {
  text-align: inherit;
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
  margin-left: 0;
  margin-right: 0;
}

.scams-content {
  display: flex;
  flex-direction: column;
}

.scams-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  min-height: 600px;
}

.refresh-actions {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px -6px rgba(59, 130, 246, 0.6);
}

.refresh-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.refresh-button:disabled {
  cursor: not-allowed;
  background: #93c5fd;
  box-shadow: none;
}

.refresh-button i {
  font-size: 0.95rem;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 300px;
}

.loading-spinner {
  font-size: 2rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.loading-text {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.error-content,
.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.error-icon,
.empty-icon {
  font-size: 3rem;
  color: #dc2626;
  margin-bottom: 1rem;
}

.empty-icon {
  color: #9ca3af;
}

.error-title,
.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.error-message,
.empty-message {
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.retry-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column;
  min-height: 180px;
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
  flex-shrink: 0;
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
  flex: 1;
  overflow: hidden;
}

.scam-description {
  color: #374151;
  line-height: 1.6;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  margin: 0;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.red-flags-section {
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
  flex-shrink: 0;
}

.red-flags-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #991b1b;
  margin: 0 0 0.5rem 0;
}

.red-flags-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.red-flag-item {
  color: #7f1d1d;
  padding: 0.2rem 0;
  position: relative;
  padding-left: 1rem;
  font-size: 0.85rem;
  line-height: 1.3;
}

.red-flag-item::before {
  content: '•';
  color: #dc2626;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.red-flag-more {
  color: #7f1d1d;
  padding: 0.2rem 0;
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 500;
}

.scam-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.view-details-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.view-details-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.risk-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.risk-label {
  font-size: 0.85rem;
  color: #475569;
}

.risk-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #1e293b;
}

.risk-badge.high {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.risk-badge.medium {
  background: #fffbeb;
  color: #d97706;
  border-color: #fed7aa;
}

.risk-badge.low {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
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

.scam-modal {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 900px;
  width: 90vw;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.scam-modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  position: relative;
  flex-shrink: 0;
}

.scam-modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
  padding-right: 3rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.scam-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section:last-child {
  margin-bottom: 0;
}

.modal-section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.job-description-full {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #050c18;
  color: #374151;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.9rem;
  max-height: 300px;
  overflow-y: auto;
}

.modal-red-flags-list {
  margin: 0;
  padding: 1rem;
  list-style: none;
  background: #fef2f2;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
}

.modal-red-flag-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #7f1d1d;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.modal-red-flag-item:not(:last-child) {
  border-bottom: 1px solid #fecaca;
  padding-bottom: 0.75rem;
  margin-bottom: 0.25rem;
}

.risk-assessment {
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ffffff;
}

.risk-level-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.risk-label-large {
  font-size: 1rem;
  color: #374151;
  font-weight: 500;
}

.risk-badge-large {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.risk-badge-large.high {
  background: #fef2f2;
  color: #dc2626;
  border: 2px solid #fecaca;
}

.risk-badge-large.medium {
  background: #fffbeb;
  color: #d97706;
  border: 2px solid #fed7aa;
}

.risk-badge-large.low {
  background: #f0fdf4;
  color: #16a34a;
  border: 2px solid #bbf7d0;
}

.risk-badge-large.unknown {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.scam-modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .scams-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .scams-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .content-section {
    padding: 2rem 1rem;
  }
}
</style>
