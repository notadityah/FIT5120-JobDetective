<template>
  <div class="home-cyber-container">
    <div class="cyber-hero-section">
      <!-- Illustration on the left -->
      <div class="cyber-hero-illustration">
        <img :src="illustration" alt="Cyber Illustration" />
      </div>
      <!-- Hero content on the right -->
      <div class="cyber-hero-content">
        <h1 class="cyber-hero-title">
          Detect <span class="cyber-highlight">Job Scams</span><br />
          with <span class="cyber-gradient">AI-powered</span> analysis
        </h1>
        <p class="cyber-hero-subtitle">
          JobDetective uses advanced AI to scan job postings for scams.<br />
          <span class="cyber-highlight">Stay safe in your job search.</span>
        </p>
        <div class="cyber-cta-buttons">
          <BaseButton variant="primary" size="large" @click="$router.push('/analyse')">
            Analyse Job Now
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Features section -->
    <div class="cyber-features-section">
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
    </div>
  </div>
</template>

<script setup>
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import illustration from '@/assets/images/illustration.svg'
</script>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-cyber-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #0f172a 0%, #232b4d 60%, #2e1a47 100%);
  color: #e0e7ef;
  position: relative;
  overflow-x: hidden;
}

.home-cyber-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    135deg,
    rgba(59,130,246,0.07) 0 2px,
    transparent 2px 40px
  );
  pointer-events: none;
  z-index: 0;
}

/* Hero content with mockup */
.cyber-hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4vw;
  padding: 7rem 2rem 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cyber-hero-content {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  padding-left: 2vw;
}

.cyber-hero-illustration {
  flex: 1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 340px;
  max-width: 600px;
  filter: drop-shadow(0 0 40px #3b82f6aa) drop-shadow(0 0 80px #a21caf55);
  animation: float2 8s ease-in-out infinite;
}

.cyber-hero-illustration img {
  width: 100%;
  max-width: 480px;
  height: auto;
  user-select: none;
  pointer-events: none;
}

.cyber-hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
  text-shadow: 0 0 12px #3b82f644, 0 2px 16px #a21caf33;
}

.cyber-highlight {
  color: #3b82f6;
  text-shadow: 0 0 8px #3b82f6cc, 0 0 16px #a21caf66;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.cyber-gradient {
  background: linear-gradient(90deg, #3b82f6 20%, #a21caf 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  text-shadow: 0 0 16px #a21caf66;
}

.cyber-hero-subtitle {
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  color: #cbd5e1;
  font-weight: 400;
  text-shadow: 0 1px 8px #3b82f633;
}

.cyber-cta-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.cyber-cta-buttons .base-btn {
  font-size: 1.15rem;
  font-weight: 700;
  padding: 1.1rem 2.5rem;
  border-radius: 12px;
  background: linear-gradient(90deg, #3b82f6 60%, #a21caf 100%);
  box-shadow: 0 0 16px #3b82f6aa, 0 0 32px #a21caf44;
  border: 2px solid #3b82f6;
  transition: background 0.2s, box-shadow 0.2s;
}

.cyber-cta-buttons .base-btn:hover {
  background: linear-gradient(90deg, #a21caf 0%, #3b82f6 100%);
  box-shadow: 0 0 32px #a21cafcc, 0 0 48px #3b82f6aa;
  border-color: #a21caf;
}

.cyber-features-section {
  padding: 5rem 0 7rem 0;
  background: linear-gradient(180deg, transparent 0%, #181c2f 100%);
  position: relative;
  z-index: 1;
}

.cyber-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

@keyframes float2 {
  0%,100% { transform: translateY(0);}
  50% { transform: translateY(-18px);}
}

/* Mobile Styles */
@media (max-width: 768px) {
  .cyber-hero-section {
    flex-direction: column;
    gap: 3.5rem;
    padding: 3.5rem 1.5rem;
    min-height: 70vh;
  }

  .cyber-hero-content {
    text-align: center;
    max-width: 100%;
  }

  .cyber-hero-title {
    font-size: 2.5rem;
  }

  .mockup-screen {
    width: 100%;
    max-width: 350px;
    height: 300px;
    transform: none !important;
    animation: none;
  }

  .cyber-features-section {
    padding: 5rem 0;
  }
  .section-title {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .cyber-hero-title {
    font-size: 2rem;
  }

  .cyber-cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .mockup-container {
    height: auto;
  }

  .mockup-screen {
    height: auto;
  }
  .cyber-hero-subtitle {
    font-size: 1.1rem;
  }

  .cyber-features-grid {
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .cyber-hero-section {
    flex-direction: column;
    gap: 2.5rem;
    padding: 4rem 1rem 2rem 1rem;
  }
  .cyber-hero-content {
    align-items: center;
    padding-left: 0;
    text-align: center;
  }
  .cyber-hero-title { font-size: 2.2rem; }
  .cyber-hero-illustration { max-width: 340px; }
}

@media (max-width: 600px) {
  .cyber-hero-title { font-size: 1.3rem; }
  .cyber-features-section { padding: 2.5rem 0 3rem 0; }
  .cyber-features-grid { gap: 1.2rem; }
}
</style>
