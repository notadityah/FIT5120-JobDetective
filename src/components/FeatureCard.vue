<template>
  <div class="feature-card" :class="cardType">
    <!-- Icon or Number -->
    <div v-if="icon || number" class="card-header">
      <div v-if="number" class="step-number" :class="{ 'main-step': isMainStep }">
        {{ number }}
      </div>
      <div v-else-if="icon" class="card-icon">{{ icon }}</div>
    </div>

    <!-- Title and Category -->
    <div class="card-title-section">
      <h3 class="card-title">{{ title }}</h3>
      <span v-if="category" class="card-category">{{ category }}</span>
    </div>

    <!-- Description -->
    <p v-if="description" class="card-description">{{ description }}</p>

    <!-- Features/Details List -->
    <div v-if="features && features.length" class="card-features">
      <div v-for="feature in features" :key="feature" class="feature-item">
        <span v-if="cardType === 'step'" class="check-icon">✓</span>
        <span>{{ feature }}</span>
      </div>
    </div>

    <!-- Red Flags (for scam cards) -->
    <div v-if="redFlags && redFlags.length" class="red-flags">
      <h4 class="red-flags-title">🚩 Red Flags:</h4>
      <ul class="red-flags-list">
        <li v-for="flag in redFlags" :key="flag">{{ flag }}</li>
      </ul>
    </div>

    <!-- News Meta (for news cards) -->
    <div v-if="cardType === 'news'" class="news-meta">
      <span class="news-source">{{ source }}</span>
      <span class="news-date">{{ date }}</span>
    </div>

    <!-- CTA Button -->
    <button v-if="cta" class="card-cta" @click="$emit('card-action', $event)">
      {{ cta }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    cardType: {
      type: String,
      default: 'feature',
      validator: (value) => ['feature', 'step', 'scam', 'news'].includes(value),
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    features: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: '',
    },
    number: {
      type: Number,
      default: null,
    },
    isMainStep: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: '',
    },
    redFlags: {
      type: Array,
      default: () => [],
    },
    source: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    cta: {
      type: String,
      default: '',
    },
  },
  emits: ['card-action'],
}
</script>

<style scoped>
/* Base card styles - all cards use the scam card blue gradient design */
.feature-card {
  background: linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #3b82f6;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
  transition: all 0.3s ease;
  position: relative;
  color: white;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.25);
  border-color: #60a5fa;
}

/* Specific styling for scam cards */
.feature-card.scam {
  border-left: 4px solid #dddddd;
}

/* Specific styling for news cards */
.feature-card.news {
  background: linear-gradient(145deg, #1e40af 0%, #1d4ed8 100%);
  box-shadow: 0 8px 25px rgba(30, 64, 175, 0.15);
}

.feature-card.news:hover {
  box-shadow: 0 15px 35px rgba(30, 64, 175, 0.25);
}

/* Step cards keep the main step highlighting */
.feature-card.step.main-step {
  background: linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%);
  border-color: #3b82f6;
}

/* Header Elements */
.card-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.step-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.step-number.main-step {
  background: rgba(255, 255, 255, 0.9);
  color: #2563eb;
}

.card-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

/* Title Section */
.card-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: white;
  flex: 1;
  text-align: center;
}

.card-category {
  background: rgba(255, 255, 255, 0.2);
  color: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

/* Description */
.card-description {
  color: #e2e8f0;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  text-align: center;
}

/* Features */
.card-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  line-height: 1.5;
}

.check-icon {
  background: #10b981;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* Red Flags */
.red-flags {
  margin-bottom: 1rem;
}

.red-flags-title {
  color: #fecaca;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.red-flags-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.red-flags-list li {
  color: #f1f5f9;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.red-flags-list li:before {
  content: '•';
  color: #fecaca;
  position: absolute;
  left: 0;
}

/* News Meta */
.news-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #cbd5e1;
  font-size: 0.9rem;
}

/* CTA Button */
.card-cta {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(10px);
  width: 100%;
}

.card-cta:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .card-title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .card-title {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 1.5rem;
  }
}
</style>
