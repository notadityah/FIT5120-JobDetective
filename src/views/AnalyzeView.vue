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
      activeTab: 'search', // 修正：添加activeTab用于tab切换
      inputTypeSelected: '', // 'file' | 'url' | 'text'
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
.analyze-text { color: white; }
.analyze-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.title-accent {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}
.analyze-subtitle {
  font-size: 1.3rem;
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.feature-text { font-size: 1.1rem; color: #e2e8f0; }


.input-section {
  background: rgba(30,41,59,0.8);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  min-width: 340px;
  min-height: 320px;
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

.search-input-area > div {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
.change-type-btn:hover { color: #fff; }

/* Search textarea styling */
.search-textarea {
  background: rgba(51,65,85,0.8);
  border: 2px solid rgba(100,116,139,0.5);
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
}
.search-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
}
.search-textarea::placeholder { color: #94a3b8; }

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
