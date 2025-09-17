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
            <!-- File Upload Tab -->
            <div v-if="activeTab === 'file'" class="file-upload-area">
              <!-- Show loading spinner while analyzing file -->
              <LoadingSpinner
                v-if="isAnalyzingFile"
                variant="analyzing"
                message="Processing file..."
                sub-message="This may take a few moments"
                size="medium"
              />

              <!-- Show file upload interface when not analyzing -->
              <div v-else>
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

                <!-- Hidden file input - updated accept attribute -->
                <input
                  ref="fileInput"
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  @change="handleFileSelect"
                  style="display: none"
                />

                <!-- File selection display -->
                <div v-if="selectedFile" class="selected-file">
                  <p class="file-name">{{ selectedFile.name }}</p>
                  <p class="file-size">{{ (selectedFile.size / (1024 * 1024)).toFixed(2) }} MB</p>

                  <!-- Image preview (only for image files) -->
                  <div v-if="imagePreview" class="image-preview">
                    <img :src="imagePreview" alt="Preview" />
                  </div>

                  <!-- PDF indicator (for PDF files) -->
                  <div v-if="selectedFile.type === 'application/pdf'" class="pdf-indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="#ef4444"
                    >
                      <path
                        d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"
                      />
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 2v6h6" />
                      <path
                        d="M8.597 16.932h-.774v-2.58c.154-.018.347-.023.581-.023.809 0 1.302.58 1.302 1.376 0 .914-.465 1.227-1.109 1.227z"
                      />
                    </svg>
                    <p class="pdf-text">PDF Document</p>
                  </div>
                </div>

                <!-- File upload button -->
                <BaseButton
                  v-if="!selectedFile"
                  variant="secondary"
                  @click="triggerFileSelect"
                  class="choose-file-btn"
                >
                  Choose File
                </BaseButton>

                <!-- Analyze button (shown when file is selected) -->
                <BaseButton
                  v-if="selectedFile"
                  variant="primary"
                  @click="analyzeFile"
                  class="analyze-btn"
                >
                  Analyse File
                </BaseButton>

                <!-- Change file button -->
                <BaseButton
                  v-if="selectedFile"
                  variant="secondary"
                  @click="triggerFileSelect"
                  class="change-file-btn"
                >
                  Choose Different File
                </BaseButton>

                <div class="file-help-text">
                  <p>Supported formats: PNG, JPG, WebP, PDF (max 1MB)</p>
                </div>
              </div>
            </div>

            <!-- URL Tab -->
            <div v-if="activeTab === 'url'" class="url-input-area">
              <!-- Show loading spinner while analyzing URL -->
              <LoadingSpinner
                v-if="isAnalyzingUrl"
                variant="analyzing"
                message="Analysing job URL..."
                sub-message="This may take a few moments"
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
                message="Analysing text..."
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
            <h2 class="modal-title">Analysis Error</h2>
            <p class="modal-message">{{ urlErrorMessage }}</p>
            <div class="modal-actions">
              <BaseButton variant="secondary" @click="closeUrlErrorModal">Close</BaseButton>
              <BaseButton variant="primary" @click="switchToUrlTab">Use URL</BaseButton>
              <BaseButton variant="primary" @click="switchToTextTab">Use TEXT</BaseButton>
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
      selectedFile: null,
      imagePreview: null,
      showNotification: false,
      isAnalyzing: false, // Loading state for text analysis
      isAnalyzingUrl: false, // Loading state for URL analysis
      isAnalyzingFile: false, // Loading state for file analysis
      showUrlErrorModal: false,
      urlErrorMessage: '',
      errorSource: '', // Track which input method failed
      tabs: [
        { id: 'file', label: 'FILE', disabled: false },
        { id: 'url', label: 'URL', disabled: false },
        { id: 'search', label: 'TEXT', disabled: false },
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
    // Switch to File tab
    switchToFileTab() {
      this.activeTab = 'file'
      this.closeUrlErrorModal()
    },
    // Switch to URL tab
    switchToUrlTab() {
      this.activeTab = 'url'
      this.closeUrlErrorModal()
    },
    // Switch to text tab
    switchToTextTab() {
      this.activeTab = 'search'
      this.closeUrlErrorModal()
    },
    // Handle file selection
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file type - only PNG, JPG, WebP, and PDF
        const allowedTypes = [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/webp',
          'application/pdf',
        ]
        if (!allowedTypes.includes(file.type)) {
          this.urlErrorMessage =
            'Oops, we could not process your file. Try to use a url or text inputs'
          this.errorSource = 'file'
          this.showUrlErrorModal = true
          return
        }

        // Validate file size (max 1MB)
        if (file.size > 1 * 1024 * 1024) {
          this.urlErrorMessage =
            'Oops, we could not process your file. Try to use a url or text inputs'
          this.errorSource = 'file'
          this.showUrlErrorModal = true
          return
        }

        this.selectedFile = file

        // Only create image preview for image files, not PDFs
        if (file.type.startsWith('image/')) {
          this.createImagePreview(file)
        } else {
          this.imagePreview = null // Clear preview for PDFs
        }
      }
    },
    // Create image preview
    createImagePreview(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // Trigger file input click
    triggerFileSelect() {
      this.$refs.fileInput.click()
    },
    // Convert file to base64
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          // Remove the data:image/jpeg;base64, prefix to get just the base64 string
          const base64String = reader.result.split(',')[1]
          resolve(base64String)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    // Analyze uploaded file
    async analyzeFile() {
      if (!this.selectedFile) {
        this.urlErrorMessage = 'Please select a file first'
        this.errorSource = 'file'
        this.showUrlErrorModal = true
        return
      }

      this.isAnalyzingFile = true

      try {
        // Convert file to base64
        const base64File = await this.convertToBase64(this.selectedFile)

        console.log('Converting file to base64...')
        console.log(`Base64 length: ${base64File.length} characters`)

        // Call AWS Lambda function for file analysis
        const response = await fetch(import.meta.env.VITE_ANALYSE_FILE_API_GATEWAY, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: base64File,
            fileName: this.selectedFile.name,
            fileType: this.selectedFile.type,
            fileSize: this.selectedFile.size,
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
          throw new Error(result.analysis?.error || 'Analysis failed')
        }
      } catch (error) {
        console.error('File analysis failed:', error)

        // Single error message for all file processing failures
        this.urlErrorMessage =
          'Oops, we could not process your file. Try to use a url or text inputs'
        this.errorSource = 'file'
        this.showUrlErrorModal = true
      } finally {
        this.isAnalyzingFile = false
      }
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
    // URL analysis function
    async analyzeUrl() {
      if (!this.isValidUrl(this.urlInput)) {
        this.urlErrorMessage = 'Please enter a valid URL (e.g., https://example.com/job-posting)'
        this.errorSource = 'url'
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
          throw new Error(result.analysis?.error || 'Unable to analyse the provided URL')
        }
      } catch (error) {
        console.error('URL analysis failed:', error)

        // Single error message for URL failures
        this.urlErrorMessage =
          'Oops, we could not process this URL. Try to use a file or text inputs'
        this.errorSource = 'url'
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
          throw new Error(result.analysis?.error || 'Unable to analyse the provided text')
        }
      } catch (error) {
        console.error('Text analysis failed:', error)

        // Single error message for text failures
        this.urlErrorMessage =
          'Oops, we could not process this text. Try to use a file or url inputs'
        this.errorSource = 'text'
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

/* URL Error Modal Styles - Updated */
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
  position: relative;
  width: 90%;
  max-width: 500px; /* Increased from 400px to 500px */
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
  text-align: center; /* Center the title */
}

.modal-message {
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  text-align: center; /* Center the message */
}

.modal-actions {
  display: flex;
  justify-content: center; /* Center the buttons */
  gap: 1rem; /* Increased gap */
  flex-wrap: wrap;
}

.modal-actions .base-button {
  min-width: 120px; /* Increased minimum width */
  flex: 1; /* Make buttons equal width */
  max-width: 140px; /* Prevent buttons from getting too wide */
}

/* Mobile responsiveness for modal actions */
@media (max-width: 768px) {
  .url-error-modal {
    max-width: 450px; /* Slightly smaller on tablets */
  }

  .modal-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal-actions .base-button {
    width: 100%;
    min-width: auto;
    max-width: none;
    flex: none;
  }
}

@media (max-width: 480px) {
  .url-error-modal {
    max-width: 95%; /* Almost full width on small screens */
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

/* Only apply custom styling to file upload buttons */
.file-upload-area .choose-file-btn {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border: none;
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  text-transform: none;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  min-width: 200px;
}

.file-upload-area .choose-file-btn:hover {
  background: linear-gradient(90deg, #5b21b6, #7c3aed);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
}

.file-upload-area .choose-file-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

/* Only apply custom styling to file analyze button */
.file-upload-area .analyze-btn {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border: none;
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: center;
  width: auto;
  margin: 1.5rem 0 0.75rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  text-transform: none;
  letter-spacing: 0.5px;
  min-width: 200px;
}

.file-upload-area .analyze-btn:hover {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}

.file-upload-area .analyze-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

/* Only apply custom styling to file change button */
.file-upload-area .change-file-btn {
  background: rgba(71, 85, 105, 0.8);
  border: 2px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.9rem 2.5rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.75rem;
  backdrop-filter: blur(10px);
  min-width: 180px;
}

.file-upload-area .change-file-btn:hover {
  background: rgba(100, 116, 139, 0.9);
  border-color: rgba(148, 163, 184, 0.5);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* URL and Search input areas styling */
.url-input-area,
.search-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.url-input-area > div,
.search-input-area > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Align URL and text analyze buttons to the right */
.url-input-area .analyze-btn,
.search-input-area .analyze-btn {
  align-self: flex-end;
  width: auto;
  margin-top: 1.5rem;
}

/* URL Input styling */
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

/* Search textarea styling */
.search-textarea {
  background: rgba(51, 65, 85, 0.8);
  border: 2px solid rgba(100, 116, 139, 0.5);
  border-radius: 10px;
  padding: 1.2rem;
  color: #e2e8f0;
  font-size: 1.05rem;
  width: 100%;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
}

.search-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.search-textarea::placeholder {
  color: #94a3b8;
}

/* File upload button container layout */
.file-upload-area > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Ensure all buttons in file area are centered and consistent */
.file-upload-area .analyze-btn,
.file-upload-area .choose-file-btn,
.file-upload-area .change-file-btn {
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Button responsiveness */
@media (max-width: 768px) {
  .file-upload-area .analyze-btn,
  .file-upload-area .choose-file-btn,
  .file-upload-area .change-file-btn {
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .url-input-area .analyze-btn,
  .search-input-area .analyze-btn {
    align-self: stretch;
    width: 100%;
  }

  .selected-file {
    padding: 1.5rem;
  }
}

/* Improve selected file container */
.selected-file {
  margin: 1.5rem 0;
  padding: 2rem;
  background: rgba(51, 65, 85, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(100, 116, 139, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.selected-file:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: rgba(100, 116, 139, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Improve file info styling */
.file-name {
  color: #f1f5f9;
  font-weight: 700;
  margin: 0 0 0.75rem;
  word-break: break-all;
  font-size: 1.1rem;
  text-align: center;
}

.file-size {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0 0 1.5rem;
  text-align: center;
  font-weight: 500;
}

/* Fix image preview size */
.image-preview {
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: rgba(30, 41, 59, 0.5);
  padding: 1rem;
  border: 1px solid rgba(100, 116, 139, 0.3);
  max-width: 100%;
}

.image-preview img {
  max-width: 200px; /* Limit width to 200px */
  max-height: 150px; /* Limit height to 150px */
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

/* Improve PDF indicator */
.pdf-indicator {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(100, 116, 139, 0.3);
}

.pdf-text {
  color: #e2e8f0;
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
}

/* Improve help text */
.file-help-text {
  margin-top: 2rem;
  color: #94a3b8;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
}

.file-help-text p {
  margin: 0;
  opacity: 0.8;
}

/* Mobile responsiveness for image preview */
@media (max-width: 768px) {
  .image-preview img {
    max-width: 150px; /* Smaller on mobile */
    max-height: 120px;
  }

  .selected-file {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .image-preview img {
    max-width: 120px; /* Even smaller on very small screens */
    max-height: 100px;
  }
}
</style>
