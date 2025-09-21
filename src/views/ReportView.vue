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
    // Check if input was not a job posting
    isNotAJobPosting() {
      return this.reportData.riskLevel === 'n/a'
    },
  },
  methods: {
    // Navigate back to previous page
    goBack() {
      this.$router.go(-1)
    },
    // Get user-friendly risk level titles
    getRiskTitle(riskLevel) {
      const titles = {
        high: 'High Risk: This job ad is likely a scam',
        medium: 'Medium Risk: This job ad shows warning signs',
        low: 'Low Risk: This job ad appears legitimate',
      }
      return titles[riskLevel] || 'Unknown Risk Level'
    },
    // Get color codes for risk levels
    getRiskColor(riskLevel) {
      const colors = {
        high: '#dc2626',
        medium: '#f59e0b',
        low: '#10b981',
      }
      return colors[riskLevel] || '#6b7280'
    },
    // Extract main title from red flag descriptions
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
  background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 100%);
  padding: 2rem 0;
  color: #2d3748;
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
  padding: 2rem 0;
}

.report-title {
  font-size: 3rem;
  font-family: 'Bangers', 'Fredoka One', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #2d3748;
  line-height: 1.05;
  text-shadow:
    2px 2px 0 #fff,
    4px 4px 0 #3b82f6,
    0 0 12px rgba(59, 130, 246, 0.3);
  margin: 0;
  display: inline-block;
}

.not-job-posting-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.not-job-posting-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.not-job-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-job-title {
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.not-job-explanation {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
}

.report-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.risk-section {
  margin-bottom: 3rem;
}

.risk-info {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.risk-icon {
  font-size: 2.5rem;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.risk-text {
  flex: 1;
}

.risk-level {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.2;
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
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-weight: 500;
}

.algorithm-note {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.reasons-section {
  border-top: 2px solid #e2e8f0;
  padding-top: 2.5rem;
  margin-top: 2rem;
}

.reasons-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 700;
}

.info-icon {
  color: #64748b;
}

.red-flags-list {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

.red-flag-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  border-left: 4px solid #ef4444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.red-flag-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.red-flag-item:last-child {
  margin-bottom: 0;
}

.flag-icon {
  font-size: 1.2rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.flag-title {
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.flag-description {
  color: #4a5568;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.report-action {
  text-align: right;
  margin-top: 2rem;
}

.safety-tips-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.safety-tips-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #10b981;
}

.safety-tips-card h3 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border-radius: 0 12px 12px 0;
  color: #064e3b;
  font-weight: 500;
  line-height: 1.6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.tips-list li:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.tips-list li:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .report-container {
    padding: 1rem 0;
  }

  .risk-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
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
    padding: 1rem 0;
  }

  .report-title {
    font-size: 2rem;
  }

  .report-card,
  .not-job-posting-card,
  .safety-tips-card {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .red-flags-list {
    padding: 1rem;
  }

  .red-flag-item {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .flag-icon {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .report-content {
    padding: 0 1rem;
  }

  .report-title {
    font-size: 1.5rem;
  }

  .risk-level {
    font-size: 1.5rem;
  }

  .risk-description {
    font-size: 1rem;
  }
}
</style>
