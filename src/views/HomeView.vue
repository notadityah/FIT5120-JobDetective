<template>
  <!-- Landing page introducing JobDetective features and live scam statistics -->
  <div class="home-cyber-container">
    <section class="cyber-hero-main">
      <div class="cyber-hero-illustration-col">
        <div class="anime-lines"></div>
        <img :src="illustration" alt="Cyber Illustration" class="cyber-hero-illustration" />
      </div>
      <div class="cyber-hero-desc-col">
        <div class="cyber-hero-title">
          <h1>SAFE JOBS, STRONG FUTURES</h1>
        </div>
        <div class="cyber-hero-desc">
          <div class="cyber-hero-subtitle">
            Empowering young Australians with digital citizenship skills to detect job scams,
            protect their rights, and make
            <b>informed decisions for a safer digital future.</b>
          </div>

          <BaseButton
            variant="primary"
            size="large"
            class="cyber-cta-btn"
            @click="$router.push('/analyse')"
          >
            Analyse Jobs Now
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="cyber-features-section">
      <div class="section-header">
        <h2 class="section-title">Why JobDetective?</h2>
      </div>
      <div class="cyber-features-grid">
        <FeatureCard
          icon="🔍"
          title="Digital Safety For All"
          description="AI-powered scam detection protects you from fake companies and false promises."
        />
        <FeatureCard
          icon="⚡"
          title="Real-Time Scam Alerts"
          description="Upload a screenshot, URL or paste a job ad - we'll tell you in seconds if it looks risky, so you don't waste time or money."
        />
        <FeatureCard
          icon="🛡️"
          title="Make Smarter Decisions"
          description="Learn how to verify jobs, protect your identity, and make informed choices - no matter your tech skills or background."
        />
      </div>
    </section>

    <section class="cyber-stats-section">
      <div class="stats-main-container">
        <div class="stats-illustration-col">
          <div class="stats-anime-lines"></div>
          <img :src="ilus4" alt="Stats Illustration" class="stats-illustration" />
        </div>

        <div class="stats-content-col">
          <div class="cyber-hero-title">
            <h1>Job Scam Awareness</h1>
          </div>
          <div class="stats-card">
            <div class="stats-content">
              <div class="stat-intro">
                In 2025, young job seekers across Australia aged 18-24 lost a total of
              </div>

              <div class="stat-amount-wrapper">
                <span class="stat-amount">
                  {{ formatCurrency(1108089) }}
                </span>
              </div>

              <div class="stat-description">
                to job and employment scams in {{ formatNumber(348) }} reported cases.
              </div>
            </div>
          </div>

          <div class="stats-button-wrapper">
            <BaseButton
              class="hub-stats-btn"
              variant="secondary"
              size="medium"
              @click="$router.push({ path: '/hub' })"
            >
              Learn More with our Awareness Hub
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="mission-container">
        <div class="mission-icon">🛡️</div>
        <div class="mission-content">
          <h2 class="mission-title">Our Mission</h2>
          <p class="mission-text">
            Empowering young Australians for safer work and digital rights - aligning with
            <strong>UN Sustainable Development Goal 16</strong> for peace, justice, and strong
            institutions.
          </p>
        </div>
        <BaseButton
          variant="secondary"
          size="medium"
          class="mission-btn"
          @click="$router.push({ path: '/about-us' })"
        >
          Learn More
        </BaseButton>
      </div>
    </section>

    <section class="cyber-simulation-section">
      <div class="simulation-main-container">
        <div class="simulation-illustration-col">
          <div class="simulation-anime-lines"></div>
          <img :src="ilus5" alt="Simulation Illustration" class="simulation-illustration" />
        </div>

        <div class="simulation-content-col">
          <div class="cyber-hero-title">
            <h1>Practice Makes Perfect</h1>
          </div>
          <div class="simulation-card">
            <div class="simulation-content">
              <div class="simulation-intro">
                Think you can spot a scam? Test your skills with our interactive job scam
                simulations.
              </div>

              <div class="simulation-description">
                Practice identifying red flags in realistic fake job postings across
                <strong>3 different scenarios</strong>. Learn what to look for before you encounter
                a real scam.
              </div>
            </div>
          </div>

          <div class="simulation-button-wrapper">
            <BaseButton
              class="simulation-cta-btn"
              variant="primary"
              size="medium"
              @click="$router.push({ path: '/simulation' })"
            >
              Try Interactive Simulation
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Orchestrates hero + feature sections on the homepage with static statistics
import FeatureCard from '@/components/FeatureCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import illustration from '@/assets/images/ilus3.svg'
import ilus4 from '@/assets/images/ilus4.svg'
import ilus5 from '@/assets/images/ilus5.png'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-AU').format(number)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka+One&family=Nunito:wght@700&display=swap');

.home-cyber-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 100%);
  color: #2d3748;
  position: relative;
  overflow-x: hidden;
}

.cyber-hero-title {
  font-size: 4.5rem;
  font-family: 'Bangers', 'Fredoka One', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #2d3748;
  line-height: 1.05;
  text-shadow:
    2px 2px 0 #fff,
    4px 4px 0 #3b82f6,
    0 0 12px rgba(59, 130, 246, 0.3);
  margin: 0 auto;
  display: inline-block;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 3.5rem;
  font-family: 'Bangers', 'Fredoka One', 'Arial Black', sans-serif;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #2d3748;
  line-height: 1.05;
  text-shadow:
    2px 2px 0 #fff,
    4px 4px 0 #3b82f6,
    0 0 12px rgba(59, 130, 246, 0.3);
  margin: 0 auto 1rem auto;
  display: inline-block;
}

.cyber-highlight {
  display: inline-block;
  color: #fff;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 10px;
  padding: 0 0.3em;
  font-weight: 900;
  margin-left: 0.2em;
  box-shadow:
    2px 2px 0 #1e40af,
    0 4px 15px rgba(59, 130, 246, 0.3);
  text-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

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
  animation: anime-pop 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
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
    repeating-linear-gradient(120deg, #1e90d2 0 2px, transparent 2px 18px),
    repeating-linear-gradient(-120deg, #413fcd 0 1px, transparent 1px 24px),
    repeating-linear-gradient(60deg, #8887de 0 1px, transparent 1px 28px);
  opacity: 0.12;
  border-radius: 50%;
  filter: blur(1px);
}

.cyber-hero-desc-col {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: justify;
  min-width: 720px;
  max-width: 720px;
  margin-left: -3rem;
  position: relative;
  z-index: 2;
}

.cyber-hero-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cyber-hero-subtitle {
  font-size: 1.8rem;
  color: #4a5568;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  background: transparent;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: none;
  backdrop-filter: none;
}

.ai-model-highlight {
  background: linear-gradient(45deg, #134596, #003cac);
  font-size: 2.2rem;
  font-weight: 900;
  font-family: 'Bangers', 'Fredoka One', sans-serif;
  letter-spacing: 0.02em;
  text-shadow:
    2px 2px 0 #fff,
    4px 4px 0 #3b82f6,
    0 0 12px rgba(59, 130, 246, 0.3);
  display: inline-block;
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
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #fff;
  border: 2px solid transparent;
  box-shadow:
    0 6px 20px rgba(59, 130, 246, 0.25),
    0 2px 8px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
}

.cyber-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cyber-cta-btn:hover {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: transparent;
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 10px 30px rgba(245, 158, 11, 0.4),
    0 4px 15px rgba(59, 130, 246, 0.2);
  animation: btn-bounce 0.6s ease-in-out;
}

.cyber-cta-btn:hover::before {
  left: 100%;
}

/* Features Section */
.cyber-features-section {
  padding: 4rem 0 6rem 0;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1d4ed8 100%);
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

/* Stats Section with Illustration */
.cyber-stats-section {
  padding: 4rem 0 6rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, transparent 100%);
  position: relative;
  z-index: 1;
}

.stats-main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 500px;
}

.stats-illustration-col {
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 350px;
  max-width: 650px;
}

.stats-illustration {
  width: 100%;
  max-width: 650px;
  height: auto;
  filter: drop-shadow(0 8px 32px rgba(59, 130, 246, 0.15));
  z-index: 1;
  position: relative;
  border-radius: 20px;
}

.stats-anime-lines {
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 110%;
  height: 80%;
  pointer-events: none;
  z-index: 0;
  background:
    repeating-linear-gradient(45deg, #3b82f6 0 2px, transparent 2px 20px),
    repeating-linear-gradient(-45deg, #1d4ed8 0 1px, transparent 1px 25px);
  opacity: 0.08;
  border-radius: 50%;
  filter: blur(1px);
}

.stats-content-col {
  flex: 4;
  display: flex;
  min-width: 720px;
  max-width: 720px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stats-card {
  background: transparent;
  border: none;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  text-align: center;
  max-width: 100%;
  box-shadow: none;
}

.stats-content {
  margin: 0 auto;
  max-width: 500px;
  margin-top: 1rem;
}

.stat-intro {
  font-size: 1.8rem;
  color: #4b5563;
  line-height: 1.6;
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
}

.stat-amount-wrapper {
  margin-bottom: 2.5rem;
  position: relative;
  padding: 0 2rem;
  overflow: visible;
}

.stat-amount {
  display: block;
  font-size: 6rem;
  font-weight: 800;
  color: #dc2626;
  line-height: 1.1;
  letter-spacing: 0.01em;
  font-family: 'Bangers', sans-serif;
  text-align: center;
}

.stat-description {
  font-size: 2rem;
  color: #4b5563;
  line-height: 1.5;
  font-family: 'Nunito', sans-serif;

  margin: 0 auto;
  text-align: center;
}

.stats-button-wrapper {
  text-align: center;
  margin-top: 2rem;
}

.hub-stats-btn {
  font-size: 1.2rem;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  padding: 1.2rem 2.5rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #fff;
  border: 2px solid transparent;
  box-shadow:
    0 6px 20px rgba(59, 130, 246, 0.25),
    0 2px 8px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.hub-stats-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow:
    0 8px 25px rgba(59, 130, 246, 0.4),
    0 4px 12px rgba(59, 130, 246, 0.2);
}

/* Custom keyframe animations */
@keyframes anime-pop {
  0% {
    transform: scale(0.95) rotate(-1deg);
  }
  60% {
    transform: scale(1.02) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

@keyframes btn-bounce {
  0%,
  100% {
    transform: translateY(-3px) scale(1.05);
  }
  50% {
    transform: translateY(-5px) scale(1.06);
  }
}

@keyframes stats-float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.02);
  }
}

/* Mission Section */
.mission-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1d4ed8 100%);
  position: relative;
  z-index: 1;
}

.mission-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.mission-icon {
  font-size: 3.5rem;
  flex-shrink: 0;
}

.mission-content {
  flex: 1;
  color: #ffffff;
}

.mission-title {
  font-size: 2rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
}

.mission-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
}

.mission-btn {
  flex-shrink: 0;
  font-size: 1.1rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
  background: #ffffff !important;
  color: #1e40af !important;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: none;
  letter-spacing: 0.01em;
}

.mission-btn:hover {
  background: #f8fafc !important;
  color: #1d4ed8 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Simulation Section with Illustration */
.cyber-simulation-section {
  padding: 4rem 0 6rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, transparent 100%);
  position: relative;
  z-index: 1;
}

.simulation-main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 500px;
}

.simulation-content-col {
  flex: 4;
  display: flex;
  min-width: 720px;
  max-width: 720px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.simulation-illustration-col {
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 350px;
  max-width: 650px;
}

.simulation-illustration {
  width: 100%;
  max-width: 650px;
  height: auto;
  filter: drop-shadow(0 8px 32px rgba(79, 124, 255, 0.2));
  z-index: 1;
  position: relative;
  border-radius: 20px;
}

.simulation-anime-lines {
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 110%;
  height: 80%;
  pointer-events: none;
  z-index: 0;
  background:
    repeating-linear-gradient(45deg, #4f7cff 0 2px, transparent 2px 20px),
    repeating-linear-gradient(-45deg, #3b5aa0 0 1px, transparent 1px 25px);
  opacity: 0.08;
  border-radius: 50%;
  filter: blur(1px);
}

.simulation-card {
  background: transparent;
  border: none;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  text-align: center;
  max-width: 100%;
  box-shadow: none;
}

.simulation-content {
  margin: 0 auto;
  max-width: 500px;
  margin-top: 1rem;
}

.simulation-intro {
  font-size: 1.8rem;
  color: #4b5563;
  line-height: 1.6;
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
}

.simulation-description {
  font-size: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  margin: 0 auto;
  text-align: center;
}

.simulation-button-wrapper {
  text-align: center;
  margin-top: 2rem;
}

.simulation-cta-btn {
  font-size: 1.2rem;
  font-family: 'Nunito', 'Comic Neue', Arial, sans-serif;
  font-weight: 700;
  padding: 1.2rem 2.5rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #4f7cff 0%, #3b5aa0 100%);
  color: #fff;
  border: 2px solid transparent;
  box-shadow:
    0 6px 20px rgba(79, 124, 255, 0.25),
    0 2px 8px rgba(79, 124, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.simulation-cta-btn:hover {
  background: linear-gradient(135deg, #3b5aa0 0%, #2d4373 100%);
  transform: translateY(-2px);
  box-shadow:
    0 8px 25px rgba(79, 124, 255, 0.4),
    0 4px 12px rgba(79, 124, 255, 0.2);
}

/* Responsive breakpoints */
@media (max-width: 1100px) {
  .cyber-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .stats-main-container {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .stats-illustration-col,
  .stats-content-col {
    max-width: 100%;
    min-width: auto;
  }

  .stats-illustration {
    max-width: 400px;
  }

  .stat-amount {
    font-size: 6rem;
  }

  .simulation-main-container {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .simulation-illustration-col,
  .simulation-content-col {
    max-width: 100%;
    min-width: auto;
  }

  .simulation-illustration {
    max-width: 400px;
  }
}

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

  .mission-container {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .mission-icon {
    font-size: 3rem;
  }

  .mission-title {
    font-size: 1.8rem;
  }

  .mission-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .cyber-hero-desc-col {
    min-width: auto;
    max-width: 100%;
    padding: 0 1rem;
  }

  .mission-section {
    padding: 2rem 1rem;
  }

  .mission-container {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .mission-icon {
    font-size: 2.5rem;
  }

  .mission-title {
    font-size: 1.5rem;
  }

  .mission-text {
    font-size: 0.95rem;
  }

  .mission-btn {
    width: 100%;
  }

  .stats-content-col {
    min-width: auto !important;
    max-width: 100% !important;
    order: 2 !important;
    flex: none !important;
  }

  .stats-illustration-col {
    min-width: auto !important;
    max-width: 100% !important;
    flex: none !important;
    order: 1 !important;
    margin-bottom: 2rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .stats-main-container {
    padding: 0 1rem !important;
    flex-direction: column !important;
    min-height: auto !important;
    display: flex !important;
  }

  .stats-illustration {
    max-width: 280px !important;
    width: 90% !important;
    display: block !important;
    margin: 0 auto !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: relative !important;
    z-index: 1 !important;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .stats-anime-lines {
    display: none !important;
  }

  .stat-amount {
    font-size: 4.5rem;
    padding: 0.5rem;
  }

  .simulation-content-col {
    min-width: auto !important;
    max-width: 100% !important;
    order: 2 !important;
    flex: none !important;
  }

  .simulation-illustration-col {
    min-width: auto !important;
    max-width: 100% !important;
    flex: none !important;
    order: 1 !important;
    margin-bottom: 2rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .simulation-main-container {
    padding: 0 1rem !important;
    flex-direction: column !important;
    min-height: auto !important;
    display: flex !important;
  }

  .simulation-illustration {
    max-width: 280px !important;
    width: 90% !important;
    display: block !important;
    margin: 0 auto !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: relative !important;
    z-index: 1 !important;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .simulation-anime-lines {
    display: none !important;
  }
}

@media (max-width: 700px) {
  .cyber-features-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
}

@media (max-width: 600px) {
  .cyber-hero-title {
    font-size: 2.2rem;
  }

  .cyber-highlight {
    font-size: 1.1rem;
    padding: 0.1em 0.25em;
    display: inline;
    margin-left: 0;
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
