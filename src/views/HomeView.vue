<template>
  <div class="home-cyber-container">
    <!-- 上方主标题，居中 -->
    <header class="cyber-hero-header">
      <h1 class="cyber-hero-title">
        DETECT <span class="cyber-highlight">JOB SCAMS</span>
      </h1>
    </header>
    <!-- 下方左右布局 -->
    <section class="cyber-hero-main">
      <!-- 左侧动漫人物 -->
      <div class="cyber-hero-illustration-col">
        <div class="anime-lines"></div>
        <img :src="illustration" alt="Cyber Illustration" class="cyber-hero-illustration" />
      </div>
      <!-- 右侧说明+按钮 -->
      <div class="cyber-hero-desc-col">
        <div class="cyber-hero-desc">
          <div class="cyber-hero-subtitle">
            Our <span class="ai-model-highlight">AI model</span> identifies fake jobs before you apply - protecting job seekers from scams
          </div>
          <BaseButton
            variant="primary"
            size="large"
            class="cyber-cta-btn"
            @click="$router.push('/analyse')"
          >
            Analyse Job Now
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Features section -->
    <section class="cyber-features-section">
      <div class="cyber-features-grid">
        <FeatureCard
          icon="🔍"
          title="AI-Powered Analysis"
          description="Machine learning algorithms scan for scam patterns and red flags."
        />
        <FeatureCard
          icon="⚡"
          title="Real-time Detection"
          description="Get instant results for files, URLs, or text descriptions."
        />
        <FeatureCard
          icon="🛡️"
          title="Complete Protection"
          description="Detects fake companies, payment fraud, and identity theft."
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import illustration from '@/assets/images/illustration.svg'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka+One&family=Nunito:wght@700&display=swap');

.home-cyber-container {
  min-height: 100vh;
  background: #fff;
  color: #1d1d1f;
  position: relative;
  overflow-x: hidden;
}

/* 上方主标题 */
.cyber-hero-header {
  width: 100%;
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.cyber-hero-title {
  font-size: 4.5rem;
  font-family: 'Bangers', 'Fredoka One', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #222;
  line-height: 1.05;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #fbbf24, 0 0 12px #f472b6;
  margin: 0 auto;
  display: inline-block;
}
.cyber-highlight {
  display: inline-block;
  color: #fff;
  background: #f472b6;
  border-radius: 10px;
  padding: 0 0.3em;
  font-weight: 900;
  margin-left: 0.2em;
  box-shadow: 2px 2px 0 #fbbf24;
  text-shadow: 0 2px 8px #f472b6cc;
}

/* 下方主区块：左右布局 */
.cyber-hero-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 1500px;
  margin: 0 auto 2.5rem auto;
  padding: 0 1rem;
  min-height: 420px;
  position: relative;
}

/* 左侧动漫人物 */
.cyber-hero-illustration-col {
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-width: 260px;
  max-width: 900px;
  padding-left: 5rem;
}
.cyber-hero-illustration {
  width: 120%;
  max-width: 620px;
  min-width: 220px;
  height: auto;
  filter: grayscale(0.1) contrast(1.15) drop-shadow(0 8px 32px #fbbf2466);
  z-index: 1;
  position: relative;
  border-radius: 32px;
  background: transparent;
  animation: anime-pop 1.2s cubic-bezier(.68,-0.55,.27,1.55);
}
.anime-lines {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 90%;
  pointer-events: none;
  z-index: 0;
  background:
    repeating-linear-gradient(120deg, #fbbf24 0 2px, transparent 2px 16px),
    repeating-linear-gradient(-120deg, #f472b6 0 2px, transparent 2px 16px);
  opacity: 0.2;
  border-radius: 50%;
  filter: blur(1px);
}

/* 右侧说明+按钮 */
.cyber-hero-desc-col {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 220px;
  max-width: 420px;
  margin-left: 2vw;
}
.cyber-hero-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.2rem;
  width: 100%;
}
.cyber-hero-subtitle {
  font-size: 1.5rem;
  color: #222;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.6;
  text-shadow: none;
}
.ai-model-highlight {
  color: #f472b6;
  font-size: 1.8rem;
  font-weight: 900;
  font-family: 'Bangers', 'Fredoka One', sans-serif;
  letter-spacing: 0.02em;
  text-shadow: 2px 2px 0 #fbbf24;
  display: inline-block;
  animation: ai-pulse 2s ease-in-out infinite;
}
.cyber-cta-btn {
  font-size: 1.3rem; /* 从 1.15rem 增加到 1.3rem */
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  padding: 1.3rem 3rem; /* 从 1.1rem 2.5rem 增加到 1.3rem 3rem */
  border-radius: 16px; /* 从 14px 增加到 16px */
  background: linear-gradient(135deg, #fbbf24 0%, #f472b6 100%); /* 渊变色 */
  color: #fff;
  border: none;
  box-shadow: 0 4px 15px rgba(244, 114, 182, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}
.cyber-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}
.cyber-cta-btn:hover {
  background: linear-gradient(135deg, #f472b6 0%, #fbbf24 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(244, 114, 182, 0.6);
  animation: btn-bounce 0.6s ease-in-out;
}
.cyber-cta-btn:hover::before {
  left: 100%;
}

/* Features Section */
.cyber-features-section {
  padding: 4rem 0 6rem 0;
  background: #fff;
  position: relative;
  z-index: 1;
}
.cyber-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
@media (max-width: 1100px) {
  .cyber-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .cyber-features-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}

/* FeatureCard漫画风格 */
.feature-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px #fbbf2422;
  border: 2.5px dashed #f472b6;
  color: #000 !important; /* 强制黑色 */
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  transition: box-shadow 0.2s, border 0.2s;
  padding: 2rem 1.5rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: card-pop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
}
.feature-card:hover {
  box-shadow: 0 4px 24px #f472b6aa;
  border: 2.5px solid #fbbf24;
  transform: scale(1.03) rotate(1deg);
}
.feature-card .card-title,
.feature-card .card-description,
.feature-card h3,
.feature-card p,
.feature-card * {
  color: #000 !important; /* 强制所有文字为黑色 */
  text-shadow: none !important;
  background: none !important;
  font-weight: 700;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif !important;
}

/* 动画效果 */
@keyframes anime-pop {
  0% { transform: scale(0.92) rotate(-2deg);}
  60% { transform: scale(1.04) rotate(2deg);}
  100% { transform: scale(1) rotate(0);}
}
@keyframes card-pop {
  0% { transform: scale(0.95);}
  60% { transform: scale(1.05);}
  100% { transform: scale(1);}
}
@keyframes ai-pulse {
  0%, 100% { transform: scale(1);}
  50% { transform: scale(1.05);}
}
@keyframes btn-bounce {
  0%, 100% { transform: translateY(-3px) scale(1.05);}
  50% { transform: translateY(-5px) scale(1.08);}
}

/* 响应式布局 */
@media (max-width: 900px) {
  .cyber-hero-main {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    padding: 0 1rem;
  }
  .cyber-hero-illustration-col,
  .cyber-hero-desc-col {
    max-width: 100%;
    margin-left: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .cyber-hero-desc {
    align-items: center;
  }
}
@media (max-width: 600px) {
  .cyber-hero-title {
    font-size: 2.2rem;
  }
  .cyber-highlight {
    font-size: 2.2rem;
  }
  .cyber-hero-subtitle {
    font-size: 1.2rem;
  }
  .ai-model-highlight {
    font-size: 1.4rem;
  }
}
</style>
