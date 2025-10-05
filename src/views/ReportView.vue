<template>
  <div class="report-container">
    <div class="report-content">
      <!-- Empty State - No Report Available -->
      <div v-if="!hasReport" class="empty-state">
        <div class="empty-icon">📋</div>
        <h2 class="empty-title">No Report Available</h2>
        <p class="empty-message">
          You haven't analyzed any job listings yet. Start by analyzing a job to see your report
          here.
        </p>
        <BaseButton variant="primary" @click="goToAnalyze" size="large"> Analyze a Job </BaseButton>
      </div>

      <!-- Report Content - When Report Exists -->
      <template v-else>
        <!-- Header with Back Button, Title, and Report Scam Button -->
        <div class="report-header">
          <BaseButton variant="back" @click="goBack" size="medium"> ← Back to Analysis </BaseButton>
          <h1 class="report-title">Job Analysis Report</h1>
          <BaseButton variant="danger" @click="reportScam" size="medium">
            <span class="button-icon">⚠️</span> Report Scam
          </BaseButton>
        </div>

        <!-- Main Report Card -->
        <div class="report-main">
          <!-- Not a Job Posting Card -->
          <div v-if="isNotAJobPosting" class="not-job-posting-card">
            <div class="not-job-icon">ℹ️</div>
            <h2 class="not-job-title">Not a Job Posting</h2>
            <p class="not-job-explanation">{{ currentReport.explanation }}</p>
          </div>

          <!-- Main Report Card -->
          <div v-else class="report-card">
            <!-- Risk Assessment Section -->
            <div class="risk-section">
              <div class="risk-info">
                <div class="risk-icon">{{ getRiskIcon() }}</div>
                <div class="risk-text">
                  <h2 class="risk-level" :class="currentReport.riskLevel">
                    {{ getRiskTitle(currentReport.riskLevel) }}
                  </h2>
                  <p class="risk-description">
                    {{ currentReport.explanation }}
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
              v-if="
                currentReport.riskLevel !== 'low' &&
                currentReport.redFlags &&
                currentReport.redFlags.length
              "
            >
              <h3 class="reasons-title">
                Below are the key reasons for this risk score
                <span class="info-icon">ℹ️</span>
              </h3>

              <div class="red-flags-list">
                <div v-for="flag in currentReport.redFlags" :key="flag" class="red-flag-item">
                  <div class="flag-icon">🚩</div>
                  <div class="flag-content">
                    <h4 class="flag-title">{{ extractFlagTitle(flag) }}</h4>
                    <p class="flag-description">{{ extractFlagDescription(flag) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information Section for Low Risk Jobs -->
            <div
              class="additional-info-section"
              v-if="currentReport.riskLevel === 'low' || !hasRedFlags"
            >
              <h3 class="section-title"><span class="section-icon">✅</span> What This Means</h3>
              <div class="info-grid">
                <div class="info-card">
                  <div class="info-icon">🔍</div>
                  <h4>Verified Indicators</h4>
                  <p>
                    Our analysis found standard job posting characteristics with clear company
                    information and professional language.
                  </p>
                </div>
                <div class="info-card">
                  <div class="info-icon">💼</div>
                  <h4>Professional Presentation</h4>
                  <p>
                    The job posting follows industry-standard formatting and includes reasonable
                    expectations for the role.
                  </p>
                </div>
                <div class="info-card">
                  <div class="info-icon">📋</div>
                  <h4>Still Be Cautious</h4>
                  <p>
                    While this posting appears legitimate, always verify the company independently
                    and follow our checklist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Two Column Section: Safety Tips & Next Steps (Only show for actual job postings) -->
        <div class="action-cards-grid" v-if="!isNotAJobPosting">
          <!-- Safety Tips Card -->
          <div
            class="safety-tips-card"
            v-if="currentReport.safetyTips && currentReport.safetyTips.length"
          >
            <h3>🛡️ Safety Tips</h3>
            <ul class="tips-list">
              <li v-for="tip in currentReport.safetyTips" :key="tip">{{ tip }}</li>
            </ul>
          </div>

          <!-- Next Steps Card -->
          <div class="next-steps-card">
            <div class="next-steps-header">
              <h3>📋 Next Steps</h3>
            </div>

            <div class="next-steps-content">
              <p class="next-steps-intro">
                Before applying to <strong>any job</strong>, even one that appears legitimate, take
                these essential steps to protect yourself:
              </p>

              <div class="checklist-preview">
                <div class="checklist-item">
                  <span class="checklist-icon">✓</span>
                  <span class="checklist-text">Research the company independently</span>
                </div>
                <div class="checklist-item">
                  <span class="checklist-icon">✓</span>
                  <span class="checklist-text">Verify contact information and details</span>
                </div>
                <div class="checklist-item">
                  <span class="checklist-icon">✓</span>
                  <span class="checklist-text">Protect your personal information</span>
                </div>
                <div class="checklist-item">
                  <span class="checklist-icon">✓</span>
                  <span class="checklist-text">Watch for warning signs during interviews</span>
                </div>
              </div>

              <BaseButton
                variant="primary"
                @click="goToChecklist"
                size="medium"
                class="full-width checklist-button"
              >
                <span class="button-icon">📝</span> View Complete Checklist
              </BaseButton>

              <div class="checklist-note">
                <p>
                  Our comprehensive checklist covers everything you need to know before applying.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Report Card (Centered Below) -->
        <div class="clear-report-wrapper">
          <div class="clear-report-card">
            <p class="clear-report-text">Done with this report?</p>
            <BaseButton
              variant="outline"
              @click="showClearConfirmation = true"
              size="medium"
              class="full-width"
            >
              <span class="button-icon">🗑️</span> Clear Report
            </BaseButton>
          </div>
        </div>
      </template>
    </div>

    <!-- Clear Report Confirmation Modal -->
    <div v-if="showClearConfirmation" class="modal-overlay" @click="showClearConfirmation = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Clear Report</h3>
          <button class="modal-close" @click="showClearConfirmation = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to clear this report?</p>
          <p class="modal-warning">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button cancel" @click="showClearConfirmation = false">Cancel</button>
          <button class="modal-button confirm" @click="clearReport">Clear Report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

const REPORT_STORAGE_KEY = 'jobdetective_latest_report'

export default {
  name: 'ReportView',
  components: {
    BaseButton,
  },
  props: {
    reportData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      currentReport: null,
      showClearConfirmation: false,
    }
  },
  computed: {
    hasReport() {
      return this.currentReport !== null
    },
    isNotAJobPosting() {
      return this.currentReport && this.currentReport.riskLevel === 'n/a'
    },
    hasRedFlags() {
      return (
        this.currentReport && this.currentReport.redFlags && this.currentReport.redFlags.length > 0
      )
    },
    isLowRiskJob() {
      return (
        this.currentReport &&
        (this.currentReport.riskLevel === 'low' || !this.hasRedFlags) &&
        !this.isNotAJobPosting
      )
    },
  },
  created() {
    // Priority 1: Use reportData from route params if available
    if (this.reportData) {
      this.currentReport = this.reportData
      this.saveReportToStorage(this.reportData)
    } else {
      // Priority 2: Load from localStorage if no route params
      this.loadReportFromStorage()
    }
  },
  methods: {
    saveReportToStorage(report) {
      try {
        const reportWithTimestamp = {
          ...report,
          timestamp: new Date().toISOString(),
        }
        localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reportWithTimestamp))
      } catch (error) {
        console.error('Failed to save report to localStorage:', error)
      }
    },
    loadReportFromStorage() {
      try {
        const storedReport = localStorage.getItem(REPORT_STORAGE_KEY)
        if (storedReport) {
          this.currentReport = JSON.parse(storedReport)
        }
      } catch (error) {
        console.error('Failed to load report from localStorage:', error)
        this.currentReport = null
      }
    },
    goBack() {
      this.$router.push({ name: 'analyse' })
    },
    goToAnalyze() {
      this.$router.push({ name: 'analyse' })
    },
    goToChecklist() {
      this.$router.push({ name: 'hub', hash: '#before' })
    },
    clearReport() {
      try {
        localStorage.removeItem(REPORT_STORAGE_KEY)
        this.currentReport = null
        this.showClearConfirmation = false
        console.log('Report cleared from localStorage')
      } catch (error) {
        console.error('Failed to clear report:', error)
      }
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
      const colonIndex = flag.indexOf(':')
      if (colonIndex > 0) {
        return flag.substring(0, colonIndex)
      }
      const sentences = flag.split('.')
      return sentences[0]
    },
    extractFlagDescription(flag) {
      const colonIndex = flag.indexOf(':')
      if (colonIndex > 0) {
        return flag.substring(colonIndex + 1).trim()
      }
      const sentences = flag.split('.')
      return sentences.slice(1).join('.').trim()
    },
    getAlgorithmNote() {
      const { riskScore, isLegitimate, riskLevel } = this.currentReport

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
      if (this.currentReport.isLegitimate) {
        return '✅'
      } else if (this.currentReport.riskLevel === 'high') {
        return '🚨'
      } else if (this.currentReport.riskLevel === 'medium') {
        return '⚠️'
      } else {
        return '⚠️'
      }
    },
    reportScam() {
      // TODO: Implement report scam functionality
      console.log('Report scam clicked')
    },
  },
}
</script>

<style scoped>
.report-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 100%);
  padding: 2rem 0 4rem 0;
  color: #2d3748;
}

.report-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
}

.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 2rem 0 1rem 0;
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
  flex: 1;
  text-align: center;
}

.button-icon {
  margin-right: 0.5rem;
}

/* Main Report Section */
.report-main {
  margin-bottom: 2.5rem;
}

.not-job-posting-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
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
  padding: 3rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
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
  padding: 2.5rem;
  border: 1px solid #e2e8f0;
}

.red-flag-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  border-left: 4px solid #ef4444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

/* Additional Information Section for Low Risk Jobs */
.additional-info-section {
  border-top: 2px solid #e2e8f0;
  padding-top: 2.5rem;
  margin-top: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 700;
}

.section-icon {
  font-size: 1.75rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.info-card h4 {
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.info-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Two Column Grid for Safety Tips & Next Steps */
.action-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.safety-tips-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
}

.safety-tips-card h3 {
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 12px 12px 0;
  color: #064e3b;
  font-weight: 500;
  line-height: 1.6;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tips-list li:last-child {
  margin-bottom: 0;
}

/* Next Steps Card */
.next-steps-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
}

.next-steps-header {
  margin-bottom: 1.5rem;
}

.next-steps-header h3 {
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.next-steps-intro {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.next-steps-intro strong {
  color: #2d3748;
  font-weight: 600;
}

.checklist-preview {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.checklist-item:last-child {
  margin-bottom: 0;
}

.checklist-icon {
  color: #3b82f6;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.checklist-text {
  line-height: 1.5;
}

.checklist-button {
  margin-bottom: 1rem;
}

.checklist-note {
  text-align: center;
}

.checklist-note p {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
  font-style: italic;
}

/* Clear Report Wrapper - Centers the card */
.clear-report-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Clear Report Card (Centered, Limited Width) */
.clear-report-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.clear-report-text {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.full-width {
  width: 100%;
  justify-content: center;
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
  font-size: 1.25rem;
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

/* Empty State Styles */
.empty-state {
  background: #ffffff;
  border-radius: 20px;
  padding: 4rem 2rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-top: 4rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.empty-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.empty-message {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Tablet responsive */
@media (max-width: 1200px) {
  .report-content {
    max-width: 95%;
    padding: 0 2rem;
  }
}

/* Below 900px - Stack action cards vertically */
@media (max-width: 900px) {
  .action-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .report-container {
    padding: 1rem 0 2rem 0;
  }

  .report-content {
    padding: 0 1.5rem;
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
    align-items: stretch;
    gap: 1rem;
    padding: 1rem 0 0.5rem 0;
    margin-bottom: 1.5rem;
  }

  .report-title {
    font-size: 2rem;
    text-align: center;
    order: -1;
  }

  .report-main {
    margin-bottom: 1.5rem;
  }

  .report-card,
  .not-job-posting-card,
  .safety-tips-card,
  .next-steps-card,
  .clear-report-card {
    padding: 1.5rem;
  }

  .action-cards-grid {
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

  .info-card {
    padding: 1.5rem;
  }

  .empty-state {
    padding: 3rem 1.5rem;
    margin-top: 2rem;
  }

  .empty-icon {
    font-size: 4rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .empty-message {
    font-size: 1rem;
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

  .modal-footer {
    flex-direction: column;
  }

  .modal-button {
    width: 100%;
  }
}
</style>
