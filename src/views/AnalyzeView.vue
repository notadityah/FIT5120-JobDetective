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

        <div class="input-section">
          <!-- 1. 只显示三个输入类型按钮 -->
          <div v-if="!inputTypeSelected" class="input-type-btns">
            <button class="input-btn" @click="selectInputType('file')">
              <span class="input-btn-icon">📁</span> File
            </button>
            <button class="input-btn" @click="selectInputType('url')">
              <span class="input-btn-icon">🔗</span> URL
            </button>
            <button class="input-btn" @click="selectInputType('text')">
              <span class="input-btn-icon">📝</span> Text
            </button>
          </div>

          <!-- 2. 选择后淡入显示输入区 -->
          <transition name="fade">
            <div v-if="inputTypeSelected" class="unified-input-area">
              <div class="input-type-label">
                Current input: <span class="input-type">{{ inputTypeSelectedLabel }}</span>
                <button class="change-type-btn" @click="resetInputType" title="Change input type">⟲</button>
              </div>
              <textarea
                v-model="textInput"
                class="search-textarea"
                placeholder="Paste or type the job description here..."
                rows="6"
                maxlength="5000"
              ></textarea>
              <BaseButton
                variant="primary"
                @click="analyzeText"
                :disabled="!textInput.trim()"
                class="analyze-btn"
              >
                Analyse
              </BaseButton>
            </div>
          </transition>
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
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'AnalyzeView',
  components: { BaseButton },
  data() {
    return {
      inputTypeSelected: '', // 'file' | 'url' | 'text'
      textInput: '',
      showNotification: false,
      isAnalyzing: false,
    }
  },
  computed: {
    inputTypeSelectedLabel() {
      if (this.inputTypeSelected === 'file') return 'File'
      if (this.inputTypeSelected === 'url') return 'URL'
      if (this.inputTypeSelected === 'text') return 'Text'
      return ''
    },
  },
  methods: {
    selectInputType(type) {
      if (type === 'file' || type === 'url') {
        this.showNotification = true // 仅Text可用
        return
      }
      this.inputTypeSelected = type
    },
    resetInputType() {
      this.inputTypeSelected = ''
      this.textInput = ''
    },
    closeNotification() {
      this.showNotification = false
    },
    async analyzeText() {
      if (!this.textInput.trim()) return
      this.isAnalyzing = true
      // ...你的AI分析逻辑不变...
      this.isAnalyzing = false
    },
  },
}
</script>

<style scoped>
/* 保持原有深色风格和蓝色主色调，新增部分样式 */
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

/* 新增：输入类型按钮组 */
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
}
.input-btn {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1.1rem 2.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59,130,246,0.2);
  transition: background 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.input-btn:hover {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transform: translateY(-2px) scale(1.04);
}
.input-btn-icon {
  font-size: 1.5rem;
}

/* 新增：统一输入区 */
.unified-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: stretch;
  animation: fadeIn 0.5s;
}
.input-type-label {
  font-size: 1.1rem;
  color: #60a5fa;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.input-type {
  font-weight: bold;
  color: #fff;
  background: #3b82f6;
  border-radius: 6px;
  padding: 0.1rem 0.7rem;
  margin-left: 0.3rem;
}
.change-type-btn {
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 1.2rem;
  margin-left: 0.7rem;
  cursor: pointer;
  transition: color 0.2s;
}
.change-type-btn:hover { color: #fff; }

.search-textarea {
  background: rgba(51,65,85,0.8);
  border: 2px solid rgba(100,116,139,0.5);
  border-radius: 10px;
  padding: 1.2rem;
  color: #e2e8f0;
  font-size: 1.05rem;
  font-family: inherit;
  resize: vertical;
  min-height: 160px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  transition: all 0.3s;
  align-self: flex-end;
  width: auto;
  margin-top: 1.5rem;
  box-shadow: 0 4px 12px rgba(59,130,246,0.3);
}
.analyze-btn:hover {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59,130,246,0.4);
}
.analyze-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59,130,246,0.3);
}

/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}

/* Notification 样式同原有 */
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
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.1);
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
  transition: opacity 0.2s;
}
.close-btn:hover { opacity: 1; }
@keyframes slideUp {
  from { transform: translate(-50%, 20px); opacity: 0;}
  to { transform: translate(-50%, 0); opacity: 1;}
}

/* 响应式略 */
@media (max-width: 1024px) {
  .content-wrapper { gap: 3rem; }
  .analyze-title { font-size: 3rem; }
}
@media (max-width: 768px) {
  .content-wrapper { grid-template-columns: 1fr; gap: 2rem; text-align: center;}
  .analyze-title { font-size: 2.5rem; }
  .input-section { padding: 1.5rem;}
}
@media (max-width: 480px) {
  .analyze-container { padding: 1.5rem 0;}
  .analyze-section { padding: 0 1rem;}
  .analyze-title { font-size: 2rem;}
}
</style>
