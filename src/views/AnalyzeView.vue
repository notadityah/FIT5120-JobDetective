<template>
  <div class="analyze-container">
    <div class="analyze-section">
      <div class="content-wrapper">
        <div class="analyze-text">
          <h1 class="analyze-title"><span class="title-accent">Analyse</span> Job Listing</h1>
          <p class="analyze-subtitle">
            Scan job listings for potential scams using our AI-powered tool. Simply paste the job
            description and get instant analysis.
          </p>
          <div class="features-list">
            <div class="feature-item">
              <div class="feature-icon">+</div>
              <div class="feature-text">Identify suspicious job postings</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">+</div>
              <div class="feature-text">Get safety recommendations</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">+</div>
              <div class="feature-text">Verify legitimacy of job offers</div>
            </div>
          </div>
        </div>

        <div class="upload-section">
          <TabNavigation :tabs="tabs" :activeTab="activeTab" @tab-change="handleTabClick" />

          <div class="tab-content">
            <div v-if="activeTab === 'file'" class="file-upload-area">
              <div class="upload-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="#63b3ed"
                >
                  <g
                    fill="none"
                    stroke="#63b3ed"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.75"
                  >
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path
                      d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zm-5-10v6"
                    />
                    <path d="M9.5 13.5L12 11l2.5 2.5" />
                  </g>
                </svg>
              </div>
              <button class="choose-file-btn disabled">Choose file</button>
            </div>

            <!-- URL Tab -->
            <div v-if="activeTab === 'url'" class="url-input-area">
              <!-- Show loading spinner while analyzing URL -->
              <LoadingSpinner
                v-if="isAnalyzingUrl"
                variant="analyzing"
                message="Analysing job URL..."
                sub-message="Extracting and analyzing job content"
                size="medium"
              />

              <!-- Show normal input when not analyzing -->
              <div v-else>
                <input
                  type="url"
                  placeholder="Paste job listing URL here..."
                  class="url-input"
                  v-model="urlInput"
                  @keypress.enter="analyzeUrl"
                />
                <BaseButton
                  variant="primary"
                  @click="analyzeUrl"
                  :disabled="!isValidUrl(urlInput)"
                  class="analyze-btn"
                >
                  Analyse URL
                </BaseButton>
              </div>
            </div>

            <!-- Search Tab -->
            <div v-if="activeTab === 'search'" class="search-input-area">
              <!-- Show loading spinner while analyzing -->
              <LoadingSpinner
                v-if="isAnalyzing"
                variant="analyzing"
                message="Analysing job posting..."
                sub-message="This may take a few moments"
                size="medium"
              />

              <!-- Show normal input when not analyzing -->
              <div v-else>
                <textarea
                  placeholder="Paste or type the job description here..."
                  class="search-textarea"
                  v-model="textInput"
                  rows="6"
                  maxlength="5000"
                ></textarea>
                <BaseButton
                  variant="primary"
                  @click="analyzeText"
                  :disabled="!textInput.trim()"
                  class="analyze-btn"
                >
                  Analyse Text
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification -->
      <div v-if="showNotification" class="notification">
        <div class="notification-content">
          <span>This feature will be available in future updates</span>
          <button class="close-btn" @click="closeNotification">&times;</button>
        </div>
      </div>

      <!-- URL Error Modal -->
      <div v-if="showUrlErrorModal" class="modal-overlay" @click="closeUrlErrorModal">
        <div class="url-error-modal" @click.stop>
          <div class="modal-content">
            <h2 class="modal-title">URL Analysis Error</h2>
            <p class="modal-message">{{ urlErrorMessage }}</p>
            <div class="modal-actions">
              <BaseButton variant="secondary" @click="closeUrlErrorModal">Close</BaseButton>
              <BaseButton variant="primary" @click="switchToTextTab">Use TEXT Input</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabNavigation from '@/components/TabNavigation.vue'
import BaseButton from '@/components/BaseButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'AnalyzeView',
  components: {
    TabNavigation,
    BaseButton,
    LoadingSpinner,
  },
  data() {
    return {
      activeTab: 'search', // Default to text input tab
      urlInput: '',
      textInput: '',
      showNotification: false,
      isAnalyzing: false, // Loading state for text analysis
      isAnalyzingUrl: false, // Loading state for URL analysis
      showUrlErrorModal: false,
      urlErrorMessage: '',
      tabs: [
        { id: 'file', label: 'FILE', disabled: true }, // Coming soon
        { id: 'url', label: 'URL', disabled: false }, // Now active
        { id: 'search', label: 'TEXT', disabled: false }, // Active tab
      ],
    }
  },
  methods: {
    // Handle tab clicks - show notification for disabled tabs
    handleTabClick(tabId) {
      const tab = this.tabs.find((t) => t.id === tabId)
      if (tab && tab.disabled) {
        this.showComingSoonNotification()
      } else {
        this.activeTab = tabId
      }
    },
    // Show notification for disabled features
    showComingSoonNotification() {
      this.showNotification = true
    },
    // Hide the notification
    closeNotification() {
      this.showNotification = false
    },
    // Validate URL format and ensure it's HTTP/HTTPS
    isValidUrl(string) {
      if (!string || !string.trim()) {
        return false
      }

      try {
        const url = new URL(string.trim())
        // Must be HTTP or HTTPS protocol
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch (error) {
        // This catch will trigger for truly malformed URLs
        console.log('Invalid URL format:', error.message)
        return false
      }
    },
    // Close URL error modal
    closeUrlErrorModal() {
      this.showUrlErrorModal = false
      this.urlErrorMessage = ''
    },
    // Switch to text tab when URL fails
    switchToTextTab() {
      this.activeTab = 'search'
      this.closeUrlErrorModal()
    },
    // URL analysis function
    async analyzeUrl() {
      if (!this.isValidUrl(this.urlInput)) {
        this.urlErrorMessage = 'Please enter a valid URL (e.g., https://example.com/job-posting)'
        this.showUrlErrorModal = true
        return
      }

      this.isAnalyzingUrl = true

      try {
        const response = await fetch(import.meta.env.VITE_ANALYSE_URL_API_GATEWAY, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobUrl: this.urlInput.trim(),
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        if (result.analysis && !result.analysis.error) {
          this.$router.push({
            name: 'Report',
            params: { reportData: JSON.stringify(result.analysis) },
          })
        } else {
          throw new Error(result.analysis?.error || 'Unable to analyze the provided URL')
        }
      } catch (error) {
        console.error('URL analysis failed:', error)

        // Set appropriate error message based on error type
        if (error.message.includes('robots.txt')) {
          this.urlErrorMessage =
            'This website does not allow automated analysis. Please copy the job description manually and use the TEXT input method.'
        } else if (error.message.includes('timeout') || error.message.includes('network')) {
          this.urlErrorMessage =
            'Unable to access the URL. Please check your internet connection or try copying the job content to the TEXT tab.'
        } else if (error.message.includes('404') || error.message.includes('not found')) {
          this.urlErrorMessage =
            'The job posting could not be found. The URL may be expired or incorrect.'
        } else if (error.message.includes('403') || error.message.includes('forbidden')) {
          this.urlErrorMessage =
            'Access to this job posting is restricted. Please copy the content manually and use the TEXT input.'
        } else {
          this.urlErrorMessage =
            error.message ||
            'Unable to analyze this URL. Please try copying the job description to the TEXT tab instead.'
        }

        this.showUrlErrorModal = true
      } finally {
        this.isAnalyzingUrl = false
      }
    },
    // Updated text analysis function using AWS Lambda
    async analyzeText() {
      if (!this.textInput.trim()) {
        return
      }

      this.isAnalyzing = true

      try {
        // Call AWS Lambda function for text analysis
        const response = await fetch(import.meta.env.VITE_ANALYSE_TEXT_API_GATEWAY, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobText: this.textInput.trim(),
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        // Check if there was an error in the Lambda response
        if (result.error) {
          throw new Error(result.error)
        }

        // Check if analysis was successful
        if (result.analysis && !result.analysis.error) {
          // Navigate to report page with analysis results
          this.$router.push({
            name: 'Report',
            params: { reportData: JSON.stringify(result.analysis) },
          })
        } else {
          // Handle analysis errors
          throw new Error(result.analysis?.error || 'Unable to analyze the provided text')
        }
      } catch (error) {
        console.error('Text analysis failed:', error)

        // Handle different types of errors with specific messages
        let errorMessage = 'Failed to analyze the text. Please try again.'
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage =
            'Unable to connect to the analysis service. Please check your internet connection.'
        } else if (error.message.includes('HTTP error')) {
          errorMessage = `Server error: ${error.message}. Please try again later.`
        } else if (error.message.includes('Invalid JSON') || error instanceof SyntaxError) {
          errorMessage = 'Received invalid response format. Please try again.'
        } else {
          errorMessage = error.message || 'Unable to analyze the text. Please try again.'
        }

        // Show error modal instead of alert
        this.urlErrorMessage = errorMessage
        this.showUrlErrorModal = true
      } finally {
        this.isAnalyzing = false
      }
    },
  },
}
</script>

<style scoped>
/* Notification styles improvement */
.notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-content {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.close-btn:hover {
  opacity: 1;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* URL Error Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.url-error-modal {
  /* Remove fixed positioning when using overlay */
  position: relative;
  width: 90%;
  max-width: 400px;
  background: rgba(30, 41, 59, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  animation: fadeIn 0.4s ease-out;
}

.modal-content {
  padding: 2rem;
  color: white;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-message {
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Add this CSS */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-wrapper {
    gap: 3rem;
  }

  .analyze-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .analyze-title {
    font-size: 2.5rem;
  }

  .analyze-subtitle {
    margin: 0 auto;
    max-width: 100%;
  }

  .features-list {
    max-width: 400px;
    margin: 2rem auto 0;
    text-align: left;
  }

  .upload-section {
    padding: 1.8rem;
  }

  .search-textarea {
    min-height: 120px;
  }

  .analyze-btn {
    margin: 1.2rem auto 0;
    display: block;
    width: 100%;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-message {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .analyze-container {
    padding: 1.5rem 0;
  }

  .analyze-section {
    padding: 0 1rem;
  }

  .analyze-title {
    font-size: 2rem;
  }

  .analyze-subtitle {
    font-size: 1.1rem;
  }

  .feature-text {
    font-size: 1rem;
  }
}

/* Disabled button styles */
.choose-file-btn.disabled,
.analyze-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #4a5568;
  border-color: #4a5568;
  color: #a0aec0;
}

.choose-file-btn.disabled:hover,
.analyze-btn.disabled:hover {
  background: #4a5568;
  border-color: #4a5568;
  color: #a0aec0;
}

.url-input.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #2d3748;
}

/* Loading/Analyzing State - now handled by LoadingSpinner component */

/* Disabled analyze button - now handled by BaseButton component */

.analyze-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  display: flex;
  align-items: center;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
}

.analyze-container::before {
  content: '';
  position: absolute;
  top: -150px;
  right: -150px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
}

.analyze-container::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%);
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
}

.analyze-section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.analyze-text {
  color: white;
}

.analyze-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.title-accent {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.analyze-subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 90%;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.feature-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.feature-text {
  font-size: 1.1rem;
  color: #e2e8f0;
}

.upload-section {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: floatIn 0.6s ease-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.upload-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tab navigation now handled by TabNavigation component */

.tab-content {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.file-upload-area {
  text-align: center;
  color: #a0aec0;
}

.upload-icon {
  margin-bottom: 2rem;
  color: #63b3ed;
}

.choose-file-btn {
  background: none;
  border: 2px solid #63b3ed;
  color: #63b3ed;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choose-file-btn:hover {
  background: #63b3ed;
  color: white;
}

.url-input-area,
.search-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}

.url-input-area > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input-area > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.url-input {
  background: rgba(51, 65, 85, 0.8);
  border: 2px solid rgba(100, 116, 139, 0.5);
  border-radius: 10px;
  padding: 1.2rem;
  color: #e2e8f0;
  font-size: 1.05rem;
  height: 52px;
  width: 100%;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.url-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.url-input::placeholder {
  color: #94a3b8;
}

.search-textarea {
  background: rgba(51, 65, 85, 0.8);
  border: 2px solid rgba(100, 116, 139, 0.5);
  border-radius: 10px;
  padding: 1.2rem;
  color: #e2e8f0;
  font-size: 1.05rem;
  font-family: inherit;
  resize: vertical;
  min-height: 160px;
  width: 100%;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.search-textarea::placeholder {
  color: #94a3b8;
}

.analyze-btn {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border: none;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  width: auto;
  margin-top: 1.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.analyze-btn:hover {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.analyze-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .analyze-title {
    font-size: 2.5rem;
  }

  .upload-section {
    padding: 1.5rem;
  }

  .tab-btn {
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
