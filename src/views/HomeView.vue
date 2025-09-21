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
  flex: 7; /* 从 7 减少到 6，给右侧更多空间 */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  min-width: 260px;
  max-width: 800%; /* 从 900px 减少到 800px */
  padding-left: 5%; /* 从 5rem 减少到 3rem */
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
  left: -2rem; /* 从 0 改为 -2rem，让栅格向右扩展 */
  top: 50%;
  transform: translateY(-50%);
  width: 120%; /* 从 100% 增加到 120% */
  height: 90%;
  pointer-events: none;
  z-index: 1; /* 确保栅格在文字下方 */
  background:
    repeating-linear-gradient(120deg, #fbbf24 0 2px, transparent 2px 16px),
    repeating-linear-gradient(-120deg, #f472b6 0 2px, transparent 2px 16px);
  opacity: 0.15; /* 从 0.2 减少到 0.15，让栅格更淡一些 */
  border-radius: 50%;
  filter: blur(0.8px); /* 从 1px 减少到 0.8px */
}

/* 右侧说明+按钮 */
.cyber-hero-desc-col {
  flex: 4; /* 从 3 增加到 4，扩大右侧区域 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 420px; /* 从 220px 增加到 320px */
  max-width: 620px; /* 从 420px 增加到 520px */
  margin-left: -3rem; /* 负边距让文字向左扩展，与栅格交互 */
  position: relative;
  z-index: 2; /* 确保文字在栅格之上 */
}
.cyber-hero-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.2rem;
  width: 100%;
}
.cyber-hero-subtitle {
  font-size: 1.8rem; /* 从 1.5rem 增加到 1.8rem */
  color: #222;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.5; /* 从 1.6 减少到 1.5，让文字更紧凑 */
  text-shadow: 1px 1px 2px rgba(255,255,255,0.8); /* 添加白色阴影，让文字在栅格上更清晰 */
  background: transparent; /* 从 rgba(255,255,255,0.9) 改为 transparent */
  padding: 1rem 1.5rem; /* 添加内边距 */
  border-radius: 12px; /* 圆角 */
  box-shadow: none; /* 从 0 4px 20px rgba(251, 191, 36, 0.1) 改为 none */
  backdrop-filter: none; /* 从 blur(5px) 改为 none */
}
.ai-model-highlight {
  color: #f472b6;
  font-size: 2.2rem; /* 从 1.8rem 增加到 2.2rem */
  font-weight: 900;
  font-family: 'Bangers', 'Fredoka One', sans-serif;
  letter-spacing: 0.02em;
  text-shadow: 2px 2px 0 #fbbf24, 0 0 10px rgba(244, 114, 182, 0.5); /* 增强阴影效果 */
  display: inline-block;
  animation: ai-pulse 2s ease-in-out infinite;
  background: linear-gradient(45deg, #f472b6, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cyber-cta-btn {
  font-size: 1.4rem; /* 从 1.3rem 增加到 1.4rem */
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  padding: 1.4rem 3.2rem; /* 从 1.3rem 3rem 增加到 1.4rem 3.2rem */
  border-radius: 18px; /* 从 16px 增加到 18px */
  background: linear-gradient(135deg, #fbbf24 0%, #f472b6 100%);
  color: #fff;
  border: none;
  box-shadow: 0 6px 20px rgba(244, 114, 182, 0.4); /* 增强阴影 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem; /* 添加上边距 */
  margin-left: 2rem; /* 向右移动按钮 */
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
    font-size: 1.3rem; /* 从 1.2rem 增加到 1.3rem */
    padding: 0.8rem 1rem; /* 移动端减少内边距 */
  }
  .ai-model-highlight {
    font-size: 1.6rem; /* 从 1.4rem 增加到 1.6rem */
  }
  .cyber-cta-btn {
    font-size: 1.2rem;
    padding: 1.2rem 2.8rem;
  }
}
</style>
