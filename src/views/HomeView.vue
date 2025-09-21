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
  background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 100%); /* 纯白到很淡的蓝灰 */
  color: #2d3748;
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
  color: #2d3748;
  line-height: 1.05;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #3b82f6, 0 0 12px rgba(59, 130, 246, 0.3); /* 蓝色阴影 */
  margin: 0 auto;
  display: inline-block;
}
.cyber-highlight {
  display: inline-block;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); /* 蓝色渐变 */
  border-radius: 10px;
  padding: 0 0.3em;
  font-weight: 900;
  margin-left: 0.2em;
  box-shadow: 2px 2px 0 #1e40af, 0 4px 15px rgba(59, 130, 246, 0.3);
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
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
  max-width: 800%;
  padding-left: 5%;
}
.cyber-hero-illustration {
  width: 120%;
  max-width: 620px;
  min-width: 220px;
  height: auto;
  filter: grayscale(0) contrast(1.1) drop-shadow(0 8px 32px rgba(59, 130, 246, 0.15));
  z-index: 1;
  position: relative;
  border-radius: 32px;
  background: transparent;
  animation: anime-pop 1.2s cubic-bezier(.68,-0.55,.27,1.55);
}
.anime-lines {
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 120%;
  height: 90%;
  pointer-events: none;
  z-index: 1;
  background:
    repeating-linear-gradient(120deg, #d2691e 0 2px, transparent 2px 18px), /* 温暖棕色 */
    repeating-linear-gradient(-120deg, #cd853f 0 1px, transparent 1px 24px), /* 沙棕色 */
    repeating-linear-gradient(60deg, #deb887 0 1px, transparent 1px 28px); /* 浅棕色点缀 */
  opacity: 0.12; /* 稍微调高透明度 */
  border-radius: 50%;
  filter: blur(1px);
}

/* 右侧说明+按钮 */
.cyber-hero-desc-col {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 420px;
  max-width: 620px;
  margin-left: -3rem;
  position: relative;
  z-index: 2;
}
.cyber-hero-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.2rem;
  width: 100%;
}
.cyber-hero-subtitle {
  font-size: 1.8rem;
  color: #4a5568;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
  background: transparent;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: none;
  backdrop-filter: none;
}
.ai-model-highlight {
  background: linear-gradient(45deg, #3b82f6, #f59e0b); /* 蓝色到温暖金黄 */
  font-size: 2.2rem;
  font-weight: 900;
  font-family: 'Bangers', 'Fredoka One', sans-serif;
  letter-spacing: 0.02em;
  text-shadow: 2px 2px 0 rgba(255,255,255,0.8), 0 0 15px rgba(59, 130, 246, 0.3);
  display: inline-block;
  animation: ai-pulse 2s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cyber-cta-btn {
  font-size: 1.4rem;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  padding: 1.4rem 3.2rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); /* 蓝色渐变 */
  color: #fff;
  border: 2px solid transparent;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25), 0 2px 8px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
  margin-left: 2rem;
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
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); /* hover变温暖金黄 */
  border-color: transparent;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4), 0 4px 15px rgba(59, 130, 246, 0.2);
  animation: btn-bounce 0.6s ease-in-out;
}
.cyber-cta-btn:hover::before {
  left: 100%;
}

/* Features Section */
.cyber-features-section {
  padding: 4rem 0 6rem 0;
  background: linear-gradient(180deg, transparent 0%, #f8fafc 100%);
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

/* FeatureCard蓝色温暖风格 */
.feature-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  border: 2.5px solid #e2e8f0;
  color: #2d3748 !important;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  transition: all 0.3s ease;
  padding: 2rem 1.5rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: card-pop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
}
.feature-card:nth-child(1):hover {
  border-color: #3b82f6; /* 蓝色边框 */
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, #fff 0%, #dbeafe 100%); /* 淡蓝渐变背景 */
}
.feature-card:nth-child(2):hover {
  border-color: #f59e0b; /* 金黄色边框 */
  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.2);
  background: linear-gradient(135deg, #fff 0%, #fef3c7 100%); /* 淡黄渐变背景 */
}
.feature-card:nth-child(3):hover {
  border-color: #8b5cf6; /* 紫色边框 */
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
  background: linear-gradient(135deg, #fff 0%, #ede9fe 100%); /* 淡紫渐变背景 */
}
.feature-card:hover {
  transform: translateY(-5px) scale(1.02);
}
.feature-card .card-title,
.feature-card .card-description,
.feature-card h3,
.feature-card p,
.feature-card * {
  color: #2d3748 !important;
  text-shadow: none !important;
  background: none !important;
  font-weight: 700;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif !important;
}

/* 动画效果 */
@keyframes anime-pop {
  0% { transform: scale(0.95) rotate(-1deg);}
  60% { transform: scale(1.02) rotate(1deg);}
  100% { transform: scale(1) rotate(0);}
}
@keyframes card-pop {
  0% { transform: scale(0.98) translateY(5px);}
  60% { transform: scale(1.02) translateY(-2px);}
  100% { transform: scale(1) translateY(0);}
}
@keyframes ai-pulse {
  0%, 100% { transform: scale(1);}
  50% { transform: scale(1.03);}
}
@keyframes btn-bounce {
  0%, 100% { transform: translateY(-3px) scale(1.05);}
  50% { transform: translateY(-5px) scale(1.06);}
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
    font-size: 1.3rem;
    padding: 0.8rem 1rem;
  }
  .ai-model-highlight {
    font-size: 1.6rem;
  }
  .cyber-cta-btn {
    font-size: 1.2rem;
    padding: 1.2rem 2.8rem;
  }
}
</style>
