<template>
  <div class="home-container">
    <!-- Hero content with mockup -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Detect
          <span class="highlight">Job Scams</span>
          with AI-powered analysis
        </h1>
        <p class="hero-subtitle">
          JobDetective uses artificial intelligence to analyse job postings and identify potential
          scams, helping you make informed decisions.
          <span class="highlight">Stay safe in your job search</span>
        </p>
        <div class="cta-buttons">
          <BaseButton variant="primary" size="large" @click="$router.push('/analyse')">
            Analyse Job Now
          </BaseButton>
        </div>
      </div>
      <div class="hero-image">
        <div class="mockup-container">
          <div class="mockup-screen">
            <div class="mockup-header">
              <div class="mockup-controls">
                <span class="control red"></span>
                <span class="control yellow"></span>
                <span class="control green"></span>
              </div>
              <div class="mockup-title">JobDetective Analysis</div>
            </div>
            <div class="mockup-content">
              <div class="analysis-card">
                <div class="risk-indicator high-risk">
                  <span class="risk-dot"></span>
                  High Risk Detected
                </div>
                <div class="analysis-details">
                  <div class="detail-item">
                    <span class="icon">⚠️</span>
                    <span>Suspicious payment requests</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">📧</span>
                    <span>Generic email address</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">💰</span>
                    <span>Unrealistic salary promises</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features section -->
    <div class="features-section">
      <div class="container">
        <h2 class="section-title">How <span class="highlight">JobDetective</span> Protects You</h2>
        <div class="features-grid">
          <FeatureCard
            icon="🔍"
            title="AI-Powered Analysis"
            description="Advanced machine learning algorithms analyse job postings for common scam patterns and red flags."
          />
          <FeatureCard
            icon="⚡"
            title="Real-time Detection"
            description="Get instant results whether you upload files, paste URLs, or enter text descriptions."
          />
          <FeatureCard
            icon="🛡️"
            title="Complete Protection"
            description="Identifies multiple types of job scams including fake companies, payment fraud, and identity theft."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%);
  color: white;
  position: relative;
  overflow-x: hidden;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 400px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  opacity: 0.12;
  z-index: 0;
  pointer-events: none;
}

.home-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: -150px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%);
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

/* Hero content with mockup */
.hero-section {
  display: flex;
  align-items: center;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 5rem;
  position: relative;
  background: transparent;
  min-height: 80vh;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  text-align: left;
  position: relative;
  z-index: 2;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeUp 1s ease-out;
}

.highlight {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  background-clip: text;
  color: transparent;
  font-weight: 500;
  position: relative;
  display: inline-block;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 3rem;
  color: #cbd5e1;
  font-weight: 300;
  animation: fadeUp 1s ease-out 0.2s backwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: fadeUp 1s ease-out 0.4s backwards;
}

.mockup-container {
  perspective: 1200px;
  animation: fadeIn 1.2s ease-out 0.6s backwards;
}

.mockup-screen {
  width: 600px;
  height: auto;
  background: #1e293b;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.3),
    0 8px 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transform: rotateY(-8deg) rotateX(5deg);
  overflow: hidden;
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
  animation: float2 8s ease-in-out infinite;
}

.mockup-container:hover .mockup-screen {
  transform: rotateY(-5deg) rotateX(3deg) scale(1.02);
  box-shadow:
    0 40px 70px rgba(0, 0, 0, 0.4),
    0 10px 30px rgba(59, 130, 246, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
}

@keyframes float2 {
  0%,
  100% {
    transform: rotateY(-8deg) rotateX(5deg) translateZ(0);
  }
  50% {
    transform: rotateY(-8deg) rotateX(5deg) translateZ(10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.mockup-header {
  background: linear-gradient(90deg, #0f172a, #1e293b);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
}

.mockup-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.control.red {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
}
.control.yellow {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}
.control.green {
  background: linear-gradient(135deg, #10b981, #059669);
}

.mockup-title {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.mockup-content {
  padding: 2rem;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
}

.analysis-card {
  background: rgba(51, 65, 85, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #ef4444;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transform: translateY(0);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.analysis-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.risk-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ef4444;
  font-weight: 600;
  font-size: 1.1rem;
}

.risk-dot {
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.analysis-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  background: rgba(51, 65, 85, 0.5);
  padding: 0.7rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.detail-item:hover {
  transform: translateX(5px);
  background: rgba(51, 65, 85, 0.7);
}

.features-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 7rem 0;
  background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.8));
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.03);
  border-radius: 50%;
  top: 50%;
  left: 10%;
  filter: blur(60px);
  z-index: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 5rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    gap: 3.5rem;
    padding: 3.5rem 1.5rem;
    min-height: 70vh;
  }

  .hero-content {
    text-align: center;
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .mockup-screen {
    width: 100%;
    max-width: 350px;
    height: 300px;
    transform: none !important;
    animation: none;
  }

  .features-section {
    padding: 5rem 0;
  }
  .section-title {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .cta-buttons {
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
  .hero-subtitle {
    font-size: 1.1rem;
  }

  .features-grid {
    gap: 1.5rem;
  }
}
</style>
