<template>
  <div class="report-container">
    <div class="report-content">
      <!-- Header -->
      <div class="report-header">
        <BaseButton variant="back" @click="goBack" size="medium"> ← Back to Analysis </BaseButton>
        <h1 class="report-title">Job Analysis Report</h1>
      </div>

      <!-- Not a Job Posting Card -->
      <div v-if="isNotAJobPosting" class="not-job-posting-card">
        <div class="not-job-icon">ℹ️</div>
        <h2 class="not-job-title">Not a Job Posting</h2>
        <p class="not-job-explanation">{{ reportData.explanation }}</p>
      </div>

      <!-- Main Report Card -->
      <div v-else class="report-card">
        <!-- Risk Assessment Section -->
        <div class="risk-section">
          <div class="risk-info">
            <div class="risk-icon">{{ getRiskIcon() }}</div>
            <div class="risk-text">
              <h2 class="risk-level" :class="reportData.riskLevel">
                {{ getRiskTitle(reportData.riskLevel) }}
              </h2>
              <p class="risk-description">
                {{ reportData.explanation }}
              </p>
              <p class="algorithm-note">
                {{ getAlgorithmNote() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reasons Section -->
        <div
          class="reasons-section"
          v-if="reportData.riskLevel !== 'low' && reportData.redFlags && reportData.redFlags.length"
        >
          <h3 class="reasons-title">
            Below are the key reasons for this risk score
            <span class="info-icon">ℹ️</span>
          </h3>

          <div class="red-flags-list">
            <div v-for="flag in reportData.redFlags" :key="flag" class="red-flag-item">
              <div class="flag-icon">🚩</div>
              <div class="flag-content">
                <h4 class="flag-title">{{ extractFlagTitle(flag) }}</h4>
                <p class="flag-description">{{ extractFlagDescription(flag) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Button -->
        <!-- <div class="report-action">
          <BaseButton variant="danger" size="large" @click="reportScam">
            Report this job
          </BaseButton>
        </div> -->
      </div>

      <!-- Safety Tips Section -->
      <div class="safety-tips-card" v-if="reportData.safetyTips && reportData.safetyTips.length">
        <h3>🛡️ Safety Tips</h3>
        <ul class="tips-list">
          <li v-for="tip in reportData.safetyTips" :key="tip">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'ReportView',
  components: {
    BaseButton,
  },
  props: {
    reportData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isNotAJobPosting() {
      return this.reportData.riskLevel === 'n/a'
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getRiskTitle(riskLevel) {
      const titles = {
        high: 'High Risk: This job ad is likely a scam',
        medium: 'Medium Risk: This job ad shows warning signs',
        low: 'Low Risk: This job ad appears legitimate',
      }
      return titles[riskLevel] || 'Unknown Risk Level'
    },
    getRiskColor(riskLevel) {
      const colors = {
        high: '#dc2626',
        medium: '#f59e0b',
        low: '#10b981',
      }
      return colors[riskLevel] || '#6b7280'
    },
    extractFlagTitle(flag) {
      // Extract title from flag description (first sentence or before colon)
      const colonIndex = flag.indexOf(':')
      if (colonIndex > 0) {
        return flag.substring(0, colonIndex)
      }
      const sentences = flag.split('.')
      return sentences[0]
    },
    extractFlagDescription(flag) {
      // Extract description (after colon or remaining text)
      const colonIndex = flag.indexOf(':')
      if (colonIndex > 0) {
        return flag.substring(colonIndex + 1).trim()
      }
      const sentences = flag.split('.')
      return sentences.slice(1).join('.').trim()
    },
    getAlgorithmNote() {
      const { riskScore, isLegitimate, riskLevel } = this.reportData

      if (isLegitimate && riskScore <= 30) {
        return "Based on our algorithm's analysis, this advertisement appears legitimate with standard job posting characteristics."
      } else if (riskLevel === 'low' && riskScore <= 40) {
        return "Based on our algorithm's analysis, this advertisement shows minimal risk factors and appears relatively safe."
      } else if (riskLevel === 'medium') {
        return "Based on our algorithm's analysis, this advertisement shows some warning signs that warrant careful consideration."
      } else {
        return "Based on our algorithm's analysis, this advertisement shows multiple red flags commonly found in fraudulent job postings."
      }
    },
    getRiskIcon() {
      if (this.reportData.isLegitimate) {
        return '✅'
      } else if (this.reportData.riskLevel === 'high') {
        return '🚨'
      } else if (this.reportData.riskLevel === 'medium') {
        return '⚠️'
      } else {
        return '⚠️'
      }
    },
    reportScam() {
      // TODO: Implement report functionality
      alert('Report functionality will be available soon')
    },
  },
}
</script>

<style scoped>
.report-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  padding: 2rem 0;
  color: white;
}

.report-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.report-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.back-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #4b5563;
}

.report-title {
  font-size: 2rem;
  color: white;
  margin: 0;
}

.not-job-posting-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid #334155;
}

.not-job-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-job-title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.not-job-explanation {
  color: #cbd5e1;
  font-size: 1.1rem;
}

.report-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  border: 1px solid #334155;
}

.risk-section {
  margin-bottom: 3rem;
}

.risk-info {
  display: flex;
  gap: 1rem;
}

.risk-icon {
  font-size: 2rem;
  margin-top: 0.5rem;
}

.risk-level {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.risk-level.high {
  color: #dc2626;
}

.risk-level.medium {
  color: #f59e0b;
}

.risk-level.low {
  color: #10b981;
}

.risk-description {
  font-size: 1.1rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.probability {
  font-weight: 600;
  color: white;
}

.algorithm-note {
  color: #9ca3af;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.reasons-section {
  border-top: 1px solid #374151;
  padding-top: 2rem;
}

.reasons-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  color: white;
  margin-bottom: 1.5rem;
}

.info-icon {
  color: #9ca3af;
}

.red-flags-list {
  background: #374151;
  border-radius: 8px;
  padding: 1.5rem;
}

.red-flag-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.red-flag-item:last-child {
  margin-bottom: 0;
}

.flag-icon {
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.flag-title {
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.flag-description {
  color: #cbd5e1;
  margin: 0;
  line-height: 1.5;
  font-style: italic;
}

.report-action {
  text-align: right;
  margin-top: 2rem;
}

.report-scam-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.report-scam-btn:hover {
  background: #b91c1c;
}

.safety-tips-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid #334155;
}

.safety-tips-card h3 {
  color: white;
  margin-bottom: 1rem;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  background: #064e3b;
  border-left: 4px solid #10b981;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0 6px 6px 0;
  color: #d1fae5;
}

.tips-list li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .risk-section {
    text-align: center;
  }

  .risk-info {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .risk-icon {
    margin-top: 0;
  }

  .risk-text {
    text-align: center;
  }

  .report-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .report-title {
    font-size: 1.5rem;
  }
}
</style>
