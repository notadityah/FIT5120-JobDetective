<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          The AI tool for
          <span class="highlight">job scam detection</span>
        </h1>
        <p class="hero-subtitle">
          Protect yourself from fraudulent job postings with our advanced AI detection system.
        </p>
        <div class="cta-buttons">
          <router-link to="/analyze" class="btn-primary">Get Started - it's free</router-link>
          <button class="btn-secondary">Learn More</button>
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

    <div class="features-section">
      <div class="container">
        <h2 class="section-title">How JobDetective Protects You</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>AI-Powered Analysis</h3>
            <p>
              Advanced machine learning algorithms analyze job postings for common scam patterns and
              red flags.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Real-time Detection</h3>
            <p>
              Get instant results whether you upload files, paste URLs, or enter text descriptions.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Comprehensive Protection</h3>
            <p>
              Identifies multiple types of job scams including fake companies, payment fraud, and
              identity theft.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
}

.hero-section {
  min-height: 75vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  padding-right: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.highlight {
  color: #3b82f6;
  font-weight: 400;
}

.hero-subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.8;
  font-weight: 300;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  text-decoration: none;
  color: white;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid #475569;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup-container {
  perspective: 1000px;
}

.mockup-screen {
  width: 500px;
  height: 350px;
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: rotateY(-5deg) rotateX(5deg);
  overflow: hidden;
}

.mockup-header {
  background: #0f172a;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #334155;
}

.mockup-controls {
  display: flex;
  gap: 0.5rem;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.red {
  background: #ef4444;
}
.control.yellow {
  background: #f59e0b;
}
.control.green {
  background: #10b981;
}

.mockup-title {
  font-size: 0.9rem;
  color: #94a3b8;
}

.mockup-content {
  padding: 2rem;
}

.analysis-card {
  background: #334155;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #ef4444;
}

.risk-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ef4444;
  font-weight: 600;
}

.risk-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.analysis-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #e2e8f0;
}

.features-section {
  padding: 6rem 0;
  background: #0f172a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 4rem;
  color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #1e293b;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid #334155;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #3b82f6;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.feature-card p {
  color: #94a3b8;
  line-height: 1.6;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 4rem 1rem;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .mockup-screen {
    width: 350px;
    height: 250px;
    transform: none;
  }

  .cta-buttons {
    justify-content: center;
  }
}
</style>
