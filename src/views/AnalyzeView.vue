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
              @click="activeTab = 'file'"
            >
              FILE
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'url' }"
              @click="activeTab = 'url'"
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
              <button class="choose-file-btn" @click="triggerFileInput">Choose file</button>
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
            </div>

            <!-- URL Tab -->
            <div v-if="activeTab === 'url'" class="url-input-area">
              <input
                type="url"
                placeholder="Paste job listing URL here..."
                class="url-input"
                v-model="urlInput"
              />
              <button class="analyze-btn" @click="analyzeUrl">Analyze URL</button>
            </div>

            <!-- Search Tab -->
            <div v-if="activeTab === 'search'" class="search-input-area">
              <textarea
                placeholder="Paste or type the job description here..."
                class="search-textarea"
                v-model="textInput"
                rows="6"
              ></textarea>
              <button class="analyze-btn" @click="analyzeText">Analyze Text</button>
            </div>
          </div>
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
      activeTab: 'file',
      urlInput: '',
      textInput: '',
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        console.log('File uploaded:', file.name)
        // Handle file upload logic here
      }
    },
    analyzeUrl() {
      if (this.urlInput.trim()) {
        console.log('Analyzing URL:', this.urlInput)
        // Handle URL analysis logic here
      }
    },
    analyzeText() {
      if (this.textInput.trim()) {
        console.log('Analyzing text:', this.textInput)
        // Handle text analysis logic here
      }
    },
  },
}
</script>

<style scoped>
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
}

.url-input {
  background: #4a5568;
  border: 2px solid #718096;
  border-radius: 6px;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  width: 100%;
}

.url-input:focus {
  outline: none;
  border-color: #63b3ed;
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
