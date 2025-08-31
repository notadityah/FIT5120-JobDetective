<template>
  <div class="analyze-container">
    <div class="analyze-section">
      <div class="content-wrapper">
        <div class="analyze-text">
          <h1 class="analyze-title">Analyze Job Posting</h1>
          <p class="analyze-subtitle">
            Simply drop the file/ paste the link/ or type in the text<br />
            — we'll check it for you !
          </p>
        </div>

        <div class="upload-section">
          <div class="tab-navigation">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'file' }"
              @click="handleTabClick('file')"
            >
              FILE
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'url' }"
              @click="handleTabClick('url')"
            >
              URL
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'search' }"
              @click="activeTab = 'search'"
            >
              TEXT
            </button>
          </div>

          <div class="tab-content">
            <!-- File Upload Tab -->
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
              <input
                type="url"
                placeholder="Paste job listing URL here..."
                class="url-input disabled"
                v-model="urlInput"
                disabled
              />
              <button class="analyze-btn disabled">Analyze URL</button>
            </div>

            <!-- Search Tab -->
            <div v-if="activeTab === 'search'" class="search-input-area">
              <!-- Show loading spinner while analyzing -->
              <div v-if="isAnalyzing" class="analyzing-state">
                <div class="spinner"></div>
                <p class="analyzing-text">Analyzing job posting...</p>
                <small class="analyzing-note">This may take a few moments</small>
              </div>

              <!-- Show normal input when not analyzing -->
              <div v-else>
                <textarea
                  placeholder="Paste or type the job description here..."
                  class="search-textarea"
                  v-model="textInput"
                  rows="6"
                ></textarea>
                <button class="analyze-btn" @click="analyzeText" :disabled="!textInput.trim()">
                  Analyze Text
                </button>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyzeView',
  data() {
    return {
      activeTab: 'search',
      urlInput: '',
      textInput: '',
      showNotification: false,
      isAnalyzing: false,
    }
  },
  methods: {
    handleTabClick(tab) {
      if (tab === 'file' || tab === 'url') {
        this.showComingSoonNotification()
      } else {
        this.activeTab = tab
      }
    },
    showComingSoonNotification() {
      this.showNotification = true
    },
    closeNotification() {
      this.showNotification = false
    },
    async analyzeText() {
      if (!this.textInput.trim()) {
        return
      }

      this.isAnalyzing = true

      try {
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
  "explanation": "1–2 sentences, under 50 words"
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

        this.$router.push({
          name: 'Report',
          params: { reportData: JSON.stringify(analysisResult) },
        })
      } catch (error) {
        console.error('Analysis failed:', error)
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
/* Notification Styles */
.notification {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  animation: slideUp 0.3s ease;
}

.notification-content {
  background: #1e3a8a;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-weight: 500;
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
}

.close-btn:hover {
  opacity: 1;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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

/* Loading/Analyzing State */
.analyzing-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #a0aec0;
  min-height: 200px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #4a5568;
  border-top: 4px solid #63b3ed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.analyzing-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #e2e8f0;
}

.analyzing-note {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
}

/* Disabled analyze button */
.analyze-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #4a5568;
}

.analyze-btn:disabled:hover {
  background: #4a5568;
}

.analyze-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.analyze-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.analyze-text {
  color: white;
}

.analyze-title {
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.analyze-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
}

.upload-section {
  background: #2d3748;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.tab-navigation {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #4a5568;
  width: 100%;
}

.tab-btn {
  background: none;
  border: none;
  color: #a0aec0;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  flex: 1;
  text-align: center;
}

.tab-btn:hover {
  color: #63b3ed;
}

.tab-btn.active {
  color: #63b3ed;
  border-bottom-color: #63b3ed;
}

.tab-content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.search-input-area > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-textarea {
  background: #4a5568;
  border: 2px solid #718096;
  border-radius: 6px;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  box-sizing: border-box;
}

.search-textarea:focus {
  outline: none;
  border-color: #63b3ed;
}

.analyze-btn {
  background: #63b3ed;
  border: none;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  width: auto;
}

.analyze-btn:hover {
  background: #4299e1;
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
