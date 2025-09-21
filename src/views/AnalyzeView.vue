<template>
  <div class="analyze-container">
    <div class="analyze-section">
      <div class="content-wrapper">
        <div class="analyze-text">
          <h1 class="analyze-title">
            <span class="title-accent">Analyse</span> Job Listing
          </h1>
          <p class="analyze-subtitle">
            Scan job listings for potential scams using our AI-powered tool. Paste the job description and get instant analysis.
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
          <TabNavigation :tabs="tabs" v-model:activeTab="activeTab" @tab-click="handleTabClick" />

          <div class="tab-content">
            <transition name="fade">
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
            </transition>

            <transition name="fade">
              <div v-if="activeTab === 'url'" class="url-input-area">
                <input
                  type="url"
                  placeholder="Paste job listing URL here..."
                  class="url-input disabled"
                  v-model="urlInput"
                  disabled
                />
                <button class="analyze-btn disabled">Analyze URL</button>
              </div>
            </transition>

            <transition name="fade">
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
            </transition>
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
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'AnalyzeView',
  components: { BaseButton },
  data() {
    return {
      activeTab: 'file', // Default to file input tab
      urlInput: '',
      textInput: '',
      urlInput: '',
      selectedFile: null,
      imagePreview: null,
      showNotification: false,
      isAnalyzing: false, // Loading state for analysis
      showUrlErrorModal: false,
      urlErrorMessage: '',
      tabs: [
        { id: 'file', label: 'FILE', disabled: true }, // Coming soon
        { id: 'url', label: 'URL', disabled: true }, // Coming soon
        { id: 'search', label: 'TEXT', disabled: false }, // Active tab
      ],
    }
  },
  methods: {
    // Handle tab clicks - show notification for disabled tabs
    handleTabClick(tab) {
      if (tab.disabled) {
        this.showComingSoonNotification()
      } else {
        this.activeTab = tab.id
      }
    },
    resetInputType() {
      this.inputTypeSelected = ''
      this.textInput = ''
    },
    closeNotification() {
      this.showNotification = false
    },
    showComingSoonNotification() {
      this.showNotification = true
    },
    closeUrlErrorModal() {
      this.showUrlErrorModal = false
    },
    switchToUrlTab() {
      this.activeTab = 'url'
      this.closeUrlErrorModal()
    },
    switchToTextTab() {
      this.activeTab = 'search'
      this.closeUrlErrorModal()
    },
    // Main analysis function using AI API
    async analyzeText() {
      if (!this.textInput.trim()) {
        return
      }

      this.isAnalyzing = true

      try {
        // System prompt for AI scam detection
        const system_prompt = `Role: You are an AI assistant specializing in detecting employment scams targeting young Australians.

Goal: Analyze text input and assess if it is a job posting. If yes, detect scam risk.
If not a job posting, return a standard safe response.

Instructions:
- First, decide if the input is a job ad.
- If it is a job ad: check for these red flags:
  1. Requests for upfront payment or financial info
  2. Unrealistic pay promises
  3. Vague or unclear requirements
  4. Urgent or pressured timelines
  5. Poor grammar/spelling
  6. Fake or unverifiable company details
  7. Minimal-requirement work-from-home schemes
- Always return JSON in the exact schema below.
- Do not include explanations or text outside the JSON.
- Keep lists short and specific.

Output Format (strict JSON only):

For job postings:
{
  "riskLevel": "low" | "medium" | "high",
  "riskScore": 0-100,
  "redFlags": ["specific issues found"],
  "safetyTips": ["max 3 short, practical tips"],
  "isLegitimate": true | false,
  "explanation": "1-2 sentences, under 50 words"
}

If not a job posting:
{
  "riskLevel": "n/a",
  "riskScore": 0,
  "redFlags": [],
  "safetyTips": [],
  "isLegitimate": null,
  "explanation": "The provided text does not appear to be a job posting."
}

DO NOT include explanations or text outside the JSON.
DO NOT write any code.
DO NOT execute any code.
`

        // API call to analyze job posting
        const response = await fetch(import.meta.env.VITE_API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_AGENT_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: system_prompt },
              {
                role: 'user',
                content: `Check this job posting for scams: ${this.textInput.trim()}`,
              },
            ],
            stream: false,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const apiResponse = await response.json()
        const contentString = apiResponse.choices[0].message.content
        const analysisResult = JSON.parse(contentString)

        // Navigate to report page with analysis results
        this.$router.push({
          name: 'Report',
          params: { reportData: JSON.stringify(analysisResult) },
        })
      } catch (error) {
        console.error('Analysis failed:', error)
        // Handle different types of errors with specific messages
        let errorMessage = 'Failed to analyze the text. Please try again.'
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage =
            'Unable to connect to the analysis service. Please check your internet connection.'
        } else if (error.message.includes('HTTP error')) {
          errorMessage = `Server error: ${error.message}. Please try again later.`
        } else if (error instanceof SyntaxError) {
          errorMessage = 'Received invalid response format. Please try again.'
        }
        alert(errorMessage)
      } finally {
        this.isAnalyzing = false
      }
    },
  },
}
</script>

<style scoped>
/* Notification styles - Light theme */
.notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-content {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow:
    0 10px 25px -5px rgba(59, 130, 246, 0.25),
    0 10px 20px -5px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
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

/* URL Error Modal Styles - Light theme */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.url-error-modal {
  position: relative;
  width: 90%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 20px 50px -5px rgba(0, 0, 0, 0.15),
    0 10px 20px -5px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.4s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-content {
  padding: 2rem;
  color: #1f2937;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  color: #1f2937;
}

.modal-message {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  text-align: center;
  color: #6b7280;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-actions .base-button {
  min-width: 120px;
  flex: 1;
  max-width: 140px;
}

/* Mobile responsiveness for modal */
@media (max-width: 768px) {
  .url-error-modal {
    max-width: 450px;
  }

  .analyze-btn {
    margin: 1.2rem auto 0;
    display: block;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .url-error-modal {
    max-width: 95%;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Main Container - Light theme */
.analyze-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0.6;
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
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
  opacity: 0.8;
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

/* Left side content - Light theme */
.analyze-text {
  color: #1f2937;
}

.analyze-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: #0f172a;
}
.title-accent {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}
.analyze-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 90%;
  font-weight: 500;
}
.features-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
}
.feature-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow:
    0 4px 8px rgba(59, 130, 246, 0.25),
    0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}
.feature-text { font-size: 1.1rem; color: #e2e8f0; }

.feature-text {
  font-size: 1.1rem;
  color: #475569;
  font-weight: 500;
}

/* Upload section - Light theme */
.upload-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 20px 40px -5px rgba(0, 0, 0, 0.1),
    0 10px 20px -5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  animation: floatIn 0.6s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upload-section:hover {
  transform: translateY(-8px);
  box-shadow:
    0 25px 50px -5px rgba(0, 0, 0, 0.15),
    0 15px 30px -5px rgba(0, 0, 0, 0.1);
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

.tab-content {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-type-btns {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

/* File upload area - Light theme */
.file-upload-area {
  text-align: center;
  color: #64748b;
}

.upload-icon {
  margin-bottom: 2rem;
  opacity: 0.8;
}

.upload-icon svg {
  filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.2));
}

/* File upload buttons - Light theme */
.file-upload-area .choose-file-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 20px -5px rgba(59, 130, 246, 0.4),
    0 4px 10px -2px rgba(0, 0, 0, 0.1);
  text-transform: none;
  letter-spacing: 0.3px;
  margin-bottom: 1rem;
  min-width: 200px;
}

.file-upload-area .choose-file-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: translateY(-3px);
  box-shadow:
    0 12px 30px -5px rgba(59, 130, 246, 0.5),
    0 8px 20px -2px rgba(0, 0, 0, 0.15);
}

.file-upload-area .choose-file-btn:active {
  transform: translateY(-1px);
  box-shadow:
    0 6px 15px -3px rgba(59, 130, 246, 0.4),
    0 4px 8px -1px rgba(0, 0, 0, 0.1);
}

.file-upload-area .analyze-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  color: white;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: center;
  width: auto;
  box-shadow:
    0 8px 20px -5px rgba(16, 185, 129, 0.4),
    0 4px 10px -2px rgba(0, 0, 0, 0.1);
  text-transform: none;
  margin: 0 1rem;
  letter-spacing: 0.3px;
  min-width: 180px;
}

.file-upload-area .analyze-btn:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-3px);
  box-shadow:
    0 12px 30px -5px rgba(16, 185, 129, 0.5),
    0 8px 20px -2px rgba(0, 0, 0, 0.15);
}

.file-upload-area .analyze-btn:active {
  transform: translateY(-1px);
  box-shadow:
    0 6px 15px -3px rgba(16, 185, 129, 0.4),
    0 4px 8px -1px rgba(0, 0, 0, 0.1);
}

.file-upload-area .change-file-btn {
  background: rgba(248, 250, 252, 0.9);
  border: 2px solid #e2e8f0;
  color: #475569;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-area .change-file-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.15);
}

/* URL and Search input areas */
.url-input-area,
.search-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}

.search-input-area > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.url-input-area .analyze-btn,
.search-input_area .analyze-btn {
  align-self: flex-end;
  width: auto;
  margin-top: 1.5rem;
}

/* Input styling - Light theme */
.url-input {
  background: rgba(248, 250, 252, 0.8);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem;
  color: #1e293b;
  font-size: 1.05rem;
  height: 52px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.05);
}

.url-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.1),
    0 4px 12px -2px rgba(59, 130, 246, 0.2);
  background: white;
}

.url-input::placeholder {
  color: #94a3b8;
}

.search-textarea {
  background: rgba(248, 250, 252, 0.8);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem;
  color: #1e293b;
  font-size: 1.05rem;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.05);
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
}
.search-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.1),
    0 4px 12px -2px rgba(59, 130, 246, 0.2);
  background: white;
}

.search-textarea::placeholder {
  color: #94a3b8;
}

/* Selected file container - Light theme */
.selected-file {
  margin: 1.5rem 0;
  padding: 2rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  align-self: flex-end;
  width: auto;
  margin-top: 1.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.selected-file:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.12);
}

.file-name {
  color: #1e293b;
  font-weight: 700;
  margin: 0 0 0.75rem;
  word-break: break-all;
  font-size: 1.1rem;
  text-align: center;
}

.file-size {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0 0 1.5rem;
  text-align: center;
  font-weight: 500;
}

.image-preview {
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: rgba(248, 250, 252, 0.6);
  padding: 1rem;
  border: 1px solid #e2e8f0;
  max-width: 100%;
}

.image-preview img {
  max-width: 200px;
  max-height: 150px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.15);
}

.pdf-indicator {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.pdf-text {
  color: #475569;
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
}

.file-help-text {
  margin-top: 2rem;
  color: #64748b;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
}

.file-help-text p {
  margin: 0;
  opacity: 0.8;
}

/* Disabled states - Light theme */
.choose-file-btn.disabled,
.analyze-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #94a3b8;
  border-color: #94a3b8;
  color: white;
}

.choose-file-btn.disabled:hover,
.analyze-btn.disabled:hover {
  background: #94a3b8;
  border-color: #94a3b8;
  color: white;
  transform: none;
}

.url-input.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f1f5f9;
}

/* Responsive design */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .analyze-title {
    font-size: 3rem;
  }

  .analyze-subtitle {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .analyze-container {
    padding: 2rem 0;
  }

  .analyze-section {
    padding: 0 1rem;
  }

  .upload-section {
    padding: 2rem;
  }

  .analyze-title {
    font-size: 2.5rem;
  }

  .analyze-subtitle {
    font-size: 1.1rem;
  }

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

  .image-preview img {
    max-width: 150px;
    max-height: 120px;
  }
}

@media (max-width: 480px) {
  .analyze-title {
    font-size: 2rem;
  }

  .analyze-subtitle {
    font-size: 1rem;
  }

  .upload-section {
    padding: 1.5rem;
  }

  .image-preview img {
    max-width: 120px;
    max-height: 100px;
  }

  .selected-file {
    padding: 1rem;
  }
}
</style>
