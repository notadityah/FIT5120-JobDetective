<template>
  <div class="feature-card" :class="cardType">
    <div v-if="icon || number" class="card-header">
      <div v-if="number" class="step-number" :class="{ 'main-step': isMainStep }">
        {{ number }}
      </div>
      <div v-else-if="icon" class="card-icon">{{ icon }}</div>
    </div>

    <div class="card-title-section">
      <h3 class="card-title">{{ title }}</h3>
      <span v-if="category" class="card-category">{{ category }}</span>
    </div>

    <p v-if="description" class="card-description">{{ description }}</p>

    <div v-if="features && features.length" class="card-features">
      <div v-for="feature in features" :key="feature" class="feature-item">
        <span v-if="cardType === 'step'" class="check-icon">✓</span>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div v-if="redFlags && redFlags.length" class="red-flags">
      <h4 class="red-flags-title">🚩 Red Flags:</h4>
      <ul class="red-flags-list">
        <li v-for="flag in redFlags" :key="flag">{{ flag }}</li>
      </ul>
    </div>

    <div v-if="cardType === 'news'" class="news-meta">
      <span class="news-source">{{ source }}</span>
      <span class="news-date">{{ date }}</span>
    </div>

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
.feature-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  color: #1a1a1a;
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

/* Card type variants with distinct styling */
.feature-card.scam {
  border-left: 4px solid #ef4444;
  background: #fef2f2;
}

.feature-card.news {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.feature-card.news:hover {
  border-color: #64748b;
}

.feature-card.step {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.feature-card.step.main-step {
  background: #ffffff;
  border-color: #3b82f6;
  border-width: 3px;
}

.card-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.step-number {
  background: #3b82f6;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.step-number.main-step {
  background: #1d4ed8;
  box-shadow: 0 6px 16px rgba(29, 78, 216, 0.4);
}

.card-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.card-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  flex: 1;
  text-align: center;
  line-height: 1.3;
}

.card-category {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  white-space: nowrap;
  border: 1px solid #e2e8f0;
}

.card-description {
  color: #374151;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
}

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
  color: #4b5563;
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

.red-flags {
  margin-bottom: 1rem;
}

.red-flags-title {
  color: #dc2626;
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
  color: #374151;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.red-flags-list li:before {
  content: '•';
  color: #dc2626;
  position: absolute;
  left: 0;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.card-cta {
  background: #3b82f6;
  border: 1px solid #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  font-size: 0.95rem;
}

.card-cta:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Dynamic nth-child hover effects for visual variety */
.feature-card:nth-child(1):hover {
  border-color: #3b82f6;
  box-shadow:
    0 15px 35px rgba(59, 130, 246, 0.15),
    0 8px 20px rgba(59, 130, 246, 0.1);
}

.feature-card:nth-child(2):hover {
  border-color: #f59e0b;
  box-shadow:
    0 15px 35px rgba(245, 158, 11, 0.15),
    0 8px 20px rgba(245, 158, 11, 0.1);
}

.feature-card:nth-child(3):hover {
  border-color: #8b5cf6;
  box-shadow:
    0 15px 35px rgba(139, 92, 246, 0.15),
    0 8px 20px rgba(139, 92, 246, 0.1);
}

/* Responsive design breakpoints */
@media (max-width: 768px) {
  .card-title-section {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .card-title {
    text-align: center;
  }

  .card-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-icon {
    font-size: 2rem;
  }
}
</style>
